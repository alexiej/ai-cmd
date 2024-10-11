#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Command } from "commander";
import { text } from "./theme.js";
import { generateCommit } from "./commit.js";
import { getLogo } from "./logo.js";
import { textWrap } from "./utils/textWrap.js";
import { getModel, VERSION, loadConfig, configure } from "./config.js";
const program = new Command();
const config = loadConfig();
const model = getModel(config.model);
program
    .name("ai-cmd")
    .description(getLogo() +
    text.green("\nAI Command-line tool\n") +
    text.dim("-----------------------------\n") +
    text.white(textWrap("This software enhances Git with AI-powered commit message generation using OpenAI, Claude, and Ollama. Automatically create tailored, insightful commit messages to streamline your development process.  \n")) +
    "\n" +
    `\n ${text.dim("Version: \t")} ${text.white(VERSION)}` +
    `\n ${text.dim("Model: \t")} ${text.white(model.source + " " + model.modelName)}  ${model.status().message}`)
    .configureHelp({
    commandUsage: (cmd) => text.success(`${cmd.name()} command [options]`),
})
    .version(VERSION)
    .showHelpAfterError()
    .showSuggestionAfterError();
program
    .command("config")
    .description("Configure model")
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    yield configure(); // Call the generateCommit function here
}));
program
    .command("commit")
    .description("Git commit a file")
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    yield generateCommit(model); // Call the generateCommit function here
}));
program.parse(process.argv);
