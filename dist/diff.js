var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { simpleGit } from "simple-git";
import chalk from "chalk";
// import { highlightText } from "./lib/speed-highlight.js";
// import speedHighlight from "./lib/speed-highlight/terminal.d.ts";
// import { highlight } from "./lib/speed-highlight/terminal.js";
// @ts-nocheck
import { highlightText } from "./lib/speed-highlight/terminal.js";
import { window } from "./utils/window.js";
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
    };
}
function parseDiffOutput(diffOutput) {
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
                    hunks.push(hunk);
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
            hunks.push(hunk);
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
function syntaxHighlight(code, language) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield highlightText(code, language);
        // const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
        // return hljs.highlight(code, { language: validLanguage }).value;
    });
}
function displayDiff(diffFiles) {
    return __awaiter(this, void 0, void 0, function* () {
        let text = "";
        // diffFiles.forEach((file) => {
        for (const file of diffFiles) {
            const title = chalk.hex("#3B82F6")(`${file.filePath}`);
            text = "";
            const extension = file.filePath.split(".").pop();
            const language = extension !== null && extension !== void 0 ? extension : "md";
            for (const hunk of file.hunks) {
                for (const line of hunk.content) {
                    // .forEach((line) => {
                    if (line.startsWith("+")) {
                        text +=
                            "\n" +
                                chalk.bgHex("#34D399")(" ") +
                                " " +
                                (yield syntaxHighlight(line.slice(1), language)); // Additions with syntax highlighting
                    }
                    else if (line.startsWith("-")) {
                        text +=
                            "\n" +
                                chalk.bgHex("#ff5252")(" ") +
                                " " +
                                (yield syntaxHighlight(line.slice(1), language)); // Deletions with syntax highlighting
                    }
                    else if (line.startsWith("@@")) {
                        text += "\n" + chalk.yellow(line); // Hunk headers in yellow
                    }
                    else {
                        text += "\n" + chalk.gray(line); // Context lines in gray
                    }
                }
            }
            console.log(window(title, text));
        }
    });
}
export function showCustomColoredDiff() {
    return __awaiter(this, void 0, void 0, function* () {
        const git = simpleGit();
        try {
            const diffOutput = yield git.diff(["--cached"]);
            const parsedDiff = parseDiffOutput(diffOutput);
            yield displayDiff(parsedDiff);
        }
        catch (error) {
            console.error("Failed to get and display diff:", error);
        }
    });
}
