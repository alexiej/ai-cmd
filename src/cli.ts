#!/usr/bin/env node

import { Command } from "commander";

import { text, window } from "./theme.js";
import { generateCommit } from "./commit.js";
import { getLogo } from "./logo.js";
import { textWrap } from "./utils/textWrap.js";
import { getModel, VERSION, loadConfig, configure } from "./config.js";
import { showCustomColoredDiff } from "./diff.js";

// OpenAI Warning: [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
process.removeAllListeners("warning");

const program = new Command();

const config = loadConfig();
const model = await getModel(config.model.source).init(config.model);

program
  .name("ai-cmd")
  .description(
    getLogo() +
      text.green("\nAI Command-line tool\n") +
      text.dim("-----------------------------\n") +
      text.white(
        textWrap(
          "This software enhances Git with AI-powered commit message generation using OpenAI, Claude, and Ollama. Automatically create tailored, insightful commit messages to streamline your development process.  \n",
        ),
      ) +
      "\n" +
      `\n ${text.dim("Version: \t")} ${text.white(VERSION)}` +
      `\n ${text.dim("Model: \t")} ${text.white(model.config.source + " " + model.config.model)}\n\t\t${model.status.message}` +
      `\n\n ${text.dim("Examples: \t")} ${text.white("ai-cmd diff -u src/**/*.ts")}` +
      `\n ${text.dim("\t \t")} ${text.white("ai-cmd commit")}`,
  )
  .configureHelp({
    commandUsage: (cmd) => text.success(`${cmd.name()} command [options]`),
  })
  .version(VERSION)
  .showHelpAfterError()
  .showSuggestionAfterError();

program
  .command("config")
  .description("Configure model")
  .action(async () => {
    await configure(); // Call the generateCommit function here
  });

program
  .command("diff [args...]")
  .description(
    "Show a Git diff of staged and unstaged changes with custom highlighting",
  )
  // .argument("[file]", "Show staged changes only")
  .option("-s, --staged", "Show staged changes only")
  .option("-u, --unstaged", "Show unstaged changes only")
  .option("-c, --commit <commit>", "Show diff of a specific commit")
  .action(async (args, options) => {
    const { staged, unstaged, commit } = options;
    await showCustomColoredDiff(
      staged || !unstaged,
      unstaged || !staged,
      commit,
      args,
    );
  });

program
  .command("commit")
  .description(
    "Generate a Git commit based on the current staged changes and AI-suggested commit message",
  )
  .action(async (o) => {
    await generateCommit(model); // Call the generateCommit function here
  });

program.parse(process.argv);
