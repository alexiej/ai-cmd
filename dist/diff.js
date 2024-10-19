import { simpleGit } from "simple-git";
// @ts-nocheck
import { highlightText } from "./lib/speed-highlight/terminal.js";
import { LINE_TOP, LINE_MID, LINE_BOT, getLines, LINE_TEX, PAD_WIDTH, LINE_DIV, } from "./utils/window.js";
import { text } from "./theme.js";
function parseHunk(lines, startLine) {
    const match = startLine.match(/^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@/);
    if (!match)
        throw new Error(`Invalid hunk header: ${startLine}`);
    const [_, oldStart, oldLines, newStart, newLines] = match.map(Number);
    return {
        oldStart,
        oldLines: oldLines || 1,
        newStart,
        newLines: newLines || 1,
        content: lines,
        isStaged: false,
    };
}
function parseDiffOutput(diffOutput, isStaged) {
    const diffFiles = [];
    const sections = diffOutput.split(/^diff --git /m).slice(1);
    sections.forEach((section) => {
        const lines = section.split("\n");
        const filePaths = lines[0].match(/^a\/(.*?) b\/(.*)$/);
        const oldFilePath = filePaths ? filePaths[1] : "";
        const newFilePath = filePaths ? filePaths[2] : "";
        const hunks = [];
        let currentHunkLines = [];
        let currentHunkHeader = null;
        lines.forEach((line) => {
            if (line.startsWith("@@ ")) {
                if (currentHunkHeader) {
                    const hunk = parseHunk(currentHunkLines, currentHunkHeader);
                    hunks.push({ ...hunk, isStaged: isStaged });
                }
                currentHunkHeader = line;
                currentHunkLines = [];
            }
            else if (currentHunkHeader) {
                currentHunkLines.push(line);
            }
        });
        if (currentHunkHeader) {
            const hunk = parseHunk(currentHunkLines, currentHunkHeader);
            hunks.push({ ...hunk, isStaged: isStaged });
        }
        diffFiles.push({
            filePath: newFilePath || oldFilePath,
            oldFilePath: oldFilePath,
            newFilePath: newFilePath,
            hunks,
        });
    });
    return diffFiles;
}
function combineDiffs(stagedDiff, unstagedDiff) {
    const combinedFiles = {};
    // Helper function to process staged/unstaged diffs and flatten hunks into lines
    const processDiff = (diffFiles, isStaged) => {
        diffFiles.forEach((file) => {
            if (!combinedFiles[file.filePath]) {
                combinedFiles[file.filePath] = {
                    filePath: file.filePath,
                    oldFilePath: file.oldFilePath,
                    newFilePath: file.newFilePath,
                    hunks: [],
                };
            }
            file.hunks.forEach((hunk) => {
                combinedFiles[file.filePath].hunks.push({
                    ...hunk,
                    isStaged: isStaged,
                });
            });
        });
    };
    // Process both staged and unstaged diffs
    processDiff(stagedDiff, true);
    processDiff(unstagedDiff, false);
    // Sort the combined lines by line number
    Object.values(combinedFiles).forEach((file) => {
        file.hunks = file.hunks.sort((a, b) => {
            // Sort by hunk index first, then by line number
            if (a.newStart !== b.newStart)
                return a.newStart - b.newStart;
            if (a.isStaged !== b.isStaged)
                return (a.isStaged ? 0 : 1) - (b.isStaged ? 0 : 1);
            return 0;
        });
    });
    return Object.values(combinedFiles);
}
async function syntaxHighlight(code, language) {
    return await highlightText(code, language);
}
async function displayDiff(diffFiles) {
    const drawLine = async (prefix, line, language = "") => {
        let isHeader = true;
        for (let l of getLines(line)) {
            const lh = language ? await syntaxHighlight(l, language) : text.border(l);
            if (isHeader) {
                console.log(prefix + lh);
                isHeader = false;
            }
            else {
                console.log(LINE_TEX + lh);
            }
        }
    };
    for (const file of diffFiles) {
        // if (file.filePath != "src/diff.ts") {
        //   continue;
        // console.log(JSON.stringify(file, null, 2));
        const title = text.blue(`${file.filePath}`);
        console.log("\n" + LINE_TOP);
        await drawLine(LINE_TEX, title);
        console.log(LINE_MID);
        const extension = file.filePath.split(".").pop();
        const language = extension ?? "md";
        for (const hunk of file.hunks) {
            const green = hunk.isStaged ? text.greenStageLine : text.greenLine;
            const red = hunk.isStaged ? text.redStageLine : text.redLine;
            let isn = hunk.newStart; // Staged new start
            let iso = hunk.oldStart; // Staged new start
            for (const line of hunk.content) {
                if (line.startsWith("+")) {
                    await drawLine(green(` ${isn}.`.padEnd(PAD_WIDTH)) + text.success("│ "), line.slice(1), language);
                    isn += 1;
                }
                else if (line.startsWith("-")) {
                    await drawLine(red(` ${iso}.`.padEnd(PAD_WIDTH)) + text.error("│ "), line.slice(1), language);
                    iso += 1;
                }
                else if (line.startsWith("@@")) {
                    await drawLine(text.yellow(` ${isn}.`.padEnd(PAD_WIDTH)) + text.yellow("│ "), line.slice(1), language);
                    isn += 1;
                    iso += 1;
                }
                else if (line.startsWith("\\")) {
                    await drawLine(red(` ${iso}.`.padEnd(PAD_WIDTH)) + text.red("│ "), line.slice(1), undefined);
                    iso += 1;
                }
                else {
                    await drawLine(text.border(` ${isn}.`.padEnd(PAD_WIDTH)) + text.border("│ "), line.slice(1), language);
                    isn += 1;
                    iso += 1;
                }
            }
            if (hunk != file.hunks[file.hunks.length - 1]) {
                console.log(LINE_DIV);
            }
        }
        console.log(LINE_BOT);
    }
}
export async function showCustomColoredDiff(staged = false, unstaged = false, commit = "", filesFilter = []) {
    const git = simpleGit();
    try {
        if (!(await git.checkIsRepo())) {
            console.log(text.red("Not a git repository."));
            return;
        }
        let stagedDiff = [];
        let unstagedDiff = [];
        if (commit.length > 0) {
            console.log(text.blue(`Diff for commit: `), text.yellow(commit));
            const commitDiffOutput = await git.show([
                ...[commit],
                ...(filesFilter.length > 0 ? ["--", filesFilter.join(" ")] : []),
            ]);
            stagedDiff = staged ? parseDiffOutput(commitDiffOutput, true) : [];
        }
        else {
            const stagedDiffOutput = await git.diff([
                ...["--cached"],
                ...(filesFilter.length > 0 ? ["--", filesFilter.join(" ")] : []),
            ]);
            const unstagedDiffOutput = await git.diff([
                ...(filesFilter.length > 0 ? ["--", filesFilter.join(" ")] : []),
            ]);
            stagedDiff = staged ? parseDiffOutput(stagedDiffOutput, true) : [];
            unstagedDiff = unstaged ? parseDiffOutput(unstagedDiffOutput, false) : [];
        }
        const combinedDiff = combineDiffs(stagedDiff, unstagedDiff);
        await displayDiff(combinedDiff);
    }
    catch (error) {
        console.log(text.red("Failed to get and display diff:"), error);
    }
}
