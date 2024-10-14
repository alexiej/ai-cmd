import { input, select, confirm } from "@inquirer/prompts";
import { execSync } from "child_process";
import { text } from "./theme.js";
export async function generateCommit(model) {
    try {
        if (model.status.status === "error") {
            console.log(` ${text.error("Model is not available:")} ${model.status.message}`);
            process.exit(1);
        }
        // Step 1: List modified or untracked files
        const modifiedFiles = execSync("git status --short", { encoding: "utf8" });
        if (!modifiedFiles) {
            console.log(text.error("No changes are available for commit."));
            process.exit(1);
        }
        // sstaged and unstaged fileess
        const coloredFiles = modifiedFiles
            .split("\n")
            .filter((line) => line.trim()) // Remove empty lines
            .reduce((acc, line) => {
            if (line.startsWith("M ") ||
                line.startsWith("A ") ||
                line.startsWith("D ") ||
                line.startsWith("AM")) {
                // Staged files
                acc.staged.push(line);
            }
            else if (line.startsWith(" M") ||
                line.startsWith(" D") ||
                line.startsWith("??")) {
                // Unstaged files
                acc.unstaged.push(line);
            }
            return acc;
        }, { staged: [], unstaged: [] });
        // Apply color coding based on git status type
        // Map over each file list to apply color and symbols
        const stagedFiles = coloredFiles.staged
            .map((line) => {
            if (line.startsWith("A ")) {
                return text.green("+: " + line.slice(3)); // Green for staged added files
            }
            else if (line.startsWith("M ")) {
                return text.yellow("*: " + line.slice(3)); // Green for staged modified files
            }
            else if (line.startsWith("D ")) {
                return text.red("-: " + line.slice(3)); // Red for staged removed files
            }
            else if (line.startsWith("AM")) {
                return text.orange("^: " + line.slice(3)); // Green for added/modified files
            }
            return line; // Default for staged files
        })
            .join("\n");
        const unstagedFiles = coloredFiles.unstaged
            .map((line) => {
            if (line.startsWith("??")) {
                return text.orange("*: " + line.slice(3)); // Orange for untracked files
            }
            else if (line.startsWith(" M")) {
                return text.yellow("^: " + line.slice(3)); // Yellow for unstaged modified files
            }
            else if (line.startsWith(" D")) {
                return text.red("-: " + line.slice(3)); // Red for unstaged removed files
            }
            return line; // Default for unstaged files
        })
            .join("\n");
        // Print the staged and unstaged files with headers
        console.log(text.blue.bold("Staged Files:"));
        console.log(stagedFiles.length > 0 ? stagedFiles : text.gray("No staged files.\n"));
        console.log(text.blue.bold("\n\nUnstaged Files:"));
        console.log(unstagedFiles.length > 0
            ? unstagedFiles + "\n"
            : text.gray("No unstaged files.\n"));
        // Check if there are any files to stage (modified but not staged, untracked files)
        const needsStaging = modifiedFiles
            .split("\n")
            .some((line) => line.startsWith("??") || line.startsWith(" M"));
        if (needsStaging) {
            // Ask if the user wants to stage all the files
            const addFilesConfirmation = await confirm({
                message: "Do you want to stage all these files with 'git add .'?",
                default: true,
            });
            if (addFilesConfirmation) {
                execSync("git add .");
                console.log(text.green("All files have been staged."));
            }
            else {
                console.log(text.yellow("No files were added. Proceeding to commit generation."));
            }
        }
        // Step 2: Check if there are still any staged changes (git diff --cached)
        const gitDiff = execSync("git diff --cached", { encoding: "utf8" });
        if (!gitDiff.trim()) {
            console.log(text.red("No changes are staged for commit. Please stage changes using git add."));
            process.exit(1);
        }
        // Step 3: Select commit type
        const commitType = await select({
            message: "Select commit type:",
            choices: [
                { name: "fix: A bug fix (PATCH)", value: "fix" },
                { name: "feat: A new feature (MINOR)", value: "feat" },
                { name: "docs: Documentation only changes", value: "docs" },
                { name: "style: Code style changes (formatting)", value: "style" },
                { name: "refactor: Code refactoring", value: "refactor" },
                { name: "perf: Performance improvements", value: "perf" },
                { name: "test: Add or update tests", value: "test" },
                { name: "build: Build system changes", value: "build" },
                { name: "ci: Continuous integration changes", value: "ci" },
            ],
        });
        // Step 4: Ask for issue number or link (optional)
        const issueNumber = await input({
            message: "Enter issue number or link (optional):",
        });
        const issueTitle = await input({
            message: "Enter some additional information about your changes:",
        });
        const issue = issueNumber ? `#${issueNumber}` : "";
        // Step 5: Generate prompt to send to OpenAI
        const generatePrompt = (diff) => {
            return `You are a code expert and should generate a git commit message using the following information. The commit must follow the "Conventional Commits" standard. Include a good commit title, description, and tag with best practices.

Commit type: ${commitType}
Issue: ${issue}
Title: ${issueTitle}

Here are the changes from git diff:
\`\`\`
${diff}
\`\`\`

Please generate a proper git commit message (AND ONLY MESSAGE WITHOUT ANY EXPLANATIONS) with correct format:
- The commit message should include the title, description, and link to issue (if provided).
- Format should be in line with the Conventional Commits standard (e.g., "<type>[scope]: <description>").`;
        };
        const chatGptPrompt = generatePrompt(gitDiff);
        console.log(`${text.dim("Using")} ${text.orange(model.config.source + " " + model.config.model)} ${text.dim(" to generate commit message..\n")}`);
        // Step 6: Use Model to generate the commit message
        const promptResult = (await model.prompt(chatGptPrompt))
            .replace(/"/g, "") // Escape double quotes
            .replace(/`/g, "") // Escape backticks
            .trim();
        console.log(text.green("Generated Commit Message:\n------------------------------------\n"));
        console.log(text.yellow(promptResult));
        // Extract git messsage
        let [title, message] = ["", ""];
        const regex = /^(.*)\n([\s\S]*)$/;
        const match = promptResult.match(regex);
        if (match && match.length >= 3) {
            title = match[1].trim(); // First line as the title
            message = match[2].trim(); // Remaining lines as the message
        }
        else {
            // If there's no message body, return the whole commit as title
            title = promptResult.trim();
            message = "";
        }
        // Step 7: Ask for confirmation to proceed with the commit
        // Ask for confirmation of the commit title
        const titleConfirmation = await confirm({
            message: "Do you want to use this commit title?",
            default: true,
        });
        let finalTitle = title;
        if (!titleConfirmation) {
            finalTitle = await input({
                message: "Please provide your own commit title:",
                validate: (value) => value.length > 0 ? true : "Title cannot be empty.",
            });
        }
        // Ask for confirmation of the commit message
        const messageConfirmation = await confirm({
            message: "Do you want to use this commit message?",
            default: true,
        });
        let finalMessage = message;
        if (!messageConfirmation) {
            finalMessage = await input({
                message: "Please provide your own commit message:",
                validate: (value) => value.length > 0 ? true : "Message cannot be empty.",
            });
        }
        const finalCommitMessage = `${finalTitle}\n\n${finalMessage}`;
        // Ask for confirmation to proceed with the commit
        const finalConfirmation = await confirm({
            message: `Proceed with commit? \n${text.orange(finalCommitMessage)}\n`,
            default: true,
        });
        if (!finalConfirmation) {
            console.log(text.red("Commit operation aborted."));
            process.exit(0);
        }
        // Step 8: Proceed with the commit if confirmed
        execSync(`git commit -m "${finalCommitMessage}"`);
        console.log(text.green("Commit has been successfully created."));
    }
    catch (error) {
        console.log(text.error(`Error generating commit: `) + text.dim(error));
        process.exit(1);
    }
}
