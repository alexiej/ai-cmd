#!/usr/bin/env node

import { Command } from "commander";

import { text, window } from "./theme.js";
import { generateCommit } from "./commit.js";
import { getLogo } from "./logo.js";
import { textWrap } from "./utils/textWrap.js";
import { getModel, VERSION, loadConfig, configure } from "./config.js";

// OpenAI Warning: [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
process.removeAllListeners("warning");

const program = new Command();

const config = loadConfig();
const model = getModel(config.model);

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
      `\n ${text.dim("Model: \t")} ${text.white(model.source + " " + model.modelName)}  ${model.status().message}`,
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
  .command("commit")
  .description("Git commit a file")
  .action(async () => {
    await generateCommit(model); // Call the generateCommit function here
  });

program.parse(process.argv);
