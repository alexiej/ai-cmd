var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { OpenAIModel } from "./models/openai.js";
import { select } from "@inquirer/prompts";
import { text } from "./theme.js";
// Define the directory where the configuration will be stored.
const CONFIG_DIR = path.join(os.homedir(), ".config", "ai-cmd");
const CONFIG_FILE_PATH = path.join(CONFIG_DIR, "config.json");
export const VERSION = "1.0.0";
const DEFAULT_CONFIG = {
    model: {
        source: "OpenAI",
        modelName: "gpt-4o-mini",
    },
};
export const getModel = (modelConfig) => {
    switch (modelConfig.source) {
        case "OpenAI":
            return OpenAIModel.getInstance(modelConfig.modelName);
        default:
            return OpenAIModel.getInstance(DEFAULT_CONFIG.model.modelName);
    }
};
// configuration
// Ensure the configuration directory exists.
function ensureConfigDir() {
    if (!fs.existsSync(CONFIG_DIR)) {
        fs.mkdirSync(CONFIG_DIR, { recursive: true });
    }
}
const modelNames = {
    OpenAI: [
        {
            name: "gpt-4o-mini" +
                text.dim(" \tSmall model for fast, lightweight task. [TOKENS: 128,000, MAX OUTPUT: 16,384]"),
            value: "gpt-4o-mini",
        },
        {
            name: "gpt-4o" +
                text.dim(" \tHigh-intelligence flagship model for complex, multi-step tasks. [TOKENS: 128,000, MAX OUTPUT: 16,384]"),
            value: "gpt-4o",
        },
        {
            name: "gpt-4-turbo" +
                text.dim(" \tThe latest GPT-4 Turbo model: [TOKENS: 128,000 MAX OUTPUT: 4,096]"),
            value: "gpt-4-turbo",
        },
        {
            name: "gpt-3.5-turbo" +
                text.dim(" Turbo model with improved instruction following: [TOKENS: 16,385, MAX OUTPUT: 4,096]"),
            value: "gpt-3.5-turbo",
        },
    ],
};
function configureModel(config) {
    return __awaiter(this, void 0, void 0, function* () {
        const { model } = config;
        // Step 1: Select model source
        const source = yield select({
            message: "Select model source:",
            default: model.source,
            choices: [{ name: "OpenAI", value: "OpenAI" }],
        });
        // Choose the model name based on the selected source
        const modelName = yield select({
            message: `Select model name for ${source}:`,
            default: model.modelName,
            choices: modelNames[source],
        });
        return {
            source: source,
            modelName: modelName,
        };
    });
}
// Function to load the configuration file.
export function loadConfig() {
    try {
        if (fs.existsSync(CONFIG_FILE_PATH)) {
            const configData = fs.readFileSync(CONFIG_FILE_PATH, "utf-8");
            return JSON.parse(configData);
        }
        saveConfig(DEFAULT_CONFIG);
    }
    catch (error) {
        console.log(`${text.red("Error loading configuration file:")} ${error}`);
    }
    return DEFAULT_CONFIG;
}
// Function to load the configuration file.
// Function to save configuration to the config file.
function saveConfig(config) {
    ensureConfigDir();
    fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(config, null, 2));
}
export function configure() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const config = loadConfig();
            const model = yield configureModel(config);
            console.log(`${text.success("Configuration saved: ")} ${text.white(CONFIG_FILE_PATH)}`);
            saveConfig({
                model: model,
            });
        }
        catch (error) {
            console.log(`${text.red("Error configuring:")} ${error}`);
        }
    });
}
