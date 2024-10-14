import { simpleGit, SimpleGit } from "simple-git";
import chalk from "chalk";

// import { highlightText } from "./lib/speed-highlight.js";
// import speedHighlight from "./lib/speed-highlight/terminal.d.ts";
// import { highlight } from "./lib/speed-highlight/terminal.js";

// @ts-nocheck
import { highlightText } from "./lib/speed-highlight/terminal.js";
import { window } from "./utils/window.js";

interface DiffHunk {
  oldStart: number;
  oldLines: number;
  newStart: number;
  newLines: number;
  content: string[];
}

interface DiffFile {
  filePath: string;
  oldFilePath: string | null;
  newFilePath: string | null;
  hunks: DiffHunk[];
}

function parseHunk(lines: string[], startLine: string): DiffHunk {
  const match = startLine.match(/^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@/);
  if (!match) throw new Error(`Invalid hunk header: ${startLine}`);

  const [_, oldStart, oldLines, newStart, newLines] = match.map(Number);
  return {
    oldStart,
    oldLines: oldLines || 1,
    newStart,
    newLines: newLines || 1,
    content: lines,
  };
}

function parseDiffOutput(diffOutput: string): DiffFile[] {
  const diffFiles: DiffFile[] = [];
  const sections = diffOutput.split(/^diff --git /m).slice(1);

  sections.forEach((section) => {
    const lines = section.split("\n");
    const filePaths = lines[0].match(/^a\/(.*?) b\/(.*)$/);
    const oldFilePath = filePaths ? filePaths[1] : "";
    const newFilePath = filePaths ? filePaths[2] : "";

    const hunks: DiffHunk[] = [];
    let currentHunkLines: string[] = [];
    let currentHunkHeader: string | null = null;

    lines.forEach((line) => {
      if (line.startsWith("@@ ")) {
        if (currentHunkHeader) {
          const hunk = parseHunk(currentHunkLines, currentHunkHeader);
          hunks.push(hunk);
        }
        currentHunkHeader = line;
        currentHunkLines = [];
      } else if (currentHunkHeader) {
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

async function syntaxHighlight(
  code: string,
  language: string,
): Promise<string> {
  return await highlightText(code, language);
  // const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
  // return hljs.highlight(code, { language: validLanguage }).value;
}

async function displayDiff(diffFiles: DiffFile[]) {
  let text = "";
  // diffFiles.forEach((file) => {
  for (const file of diffFiles) {
    const title = chalk.hex("#3B82F6")(`${file.filePath}`);
    text = "";

    const extension = file.filePath.split(".").pop();
    const language = extension ?? "md";

    for (const hunk of file.hunks) {
      for (const line of hunk.content) {
        // .forEach((line) => {
        if (line.startsWith("+")) {
          text +=
            "\n" +
            chalk.bgHex("#34D399")(" ") +
            " " +
            (await syntaxHighlight(line.slice(1), language)); // Additions with syntax highlighting
        } else if (line.startsWith("-")) {
          text +=
            "\n" +
            chalk.bgHex("#ff5252")(" ") +
            " " +
            (await syntaxHighlight(line.slice(1), language)); // Deletions with syntax highlighting
        } else if (line.startsWith("@@")) {
          text += "\n" + chalk.yellow(line); // Hunk headers in yellow
        } else {
          text += "\n" + chalk.gray(line); // Context lines in gray
        }
      }
    }
    console.log(window(title, text));
  }
}

export async function showCustomColoredDiff() {
  const git: SimpleGit = simpleGit();

  try {
    const diffOutput = await git.diff(["--cached"]);
    const parsedDiff = parseDiffOutput(diffOutput);
    await displayDiff(parsedDiff);
  } catch (error) {
    console.error("Failed to get and display diff:", error);
  }
}
