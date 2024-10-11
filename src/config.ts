import * as fs from "fs";
import * as path from "path";
import * as os from "os";

import { Model } from "./model.js";
import { OpenAIModel } from "./models/openai.js";
import { select } from "@inquirer/prompts";
import { text } from "./theme.js";

// Define the directory where the configuration will be stored.
const CONFIG_DIR = path.join(os.homedir(), ".config", "ai-cmd");
const CONFIG_FILE_PATH = path.join(CONFIG_DIR, "config.json");

export const VERSION = "1.0.0";

// Interface to represent the model configuration.
interface ModelConfig {
  source: string;
  modelName: string;
}

interface Config {
  model: ModelConfig;
}

const DEFAULT_CONFIG: Config = {
  model: {
    source: "OpenAI",
    modelName: "gpt-4o-mini",
  },
};

export const getModel = (modelConfig: ModelConfig): Model => {
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

const modelNames: { [key: string]: { name: string; value: string }[] } = {
  OpenAI: [
    {
      name:
        "gpt-4o-mini" +
        text.dim(
          " \tSmall model for fast, lightweight task. [TOKENS: 128,000, MAX OUTPUT: 16,384]",
        ),
      value: "gpt-4o-mini",
    },
    {
      name:
        "gpt-4o" +
        text.dim(
          " \tHigh-intelligence flagship model for complex, multi-step tasks. [TOKENS: 128,000, MAX OUTPUT: 16,384]",
        ),
      value: "gpt-4o",
    },
    {
      name:
        "gpt-4-turbo" +
        text.dim(
          " \tThe latest GPT-4 Turbo model: [TOKENS: 128,000 MAX OUTPUT: 4,096]",
        ),
      value: "gpt-4-turbo",
    },
    {
      name:
        "gpt-3.5-turbo" +
        text.dim(
          " Turbo model with improved instruction following: [TOKENS: 16,385, MAX OUTPUT: 4,096]",
        ),
      value: "gpt-3.5-turbo",
    },
  ],
};

async function configureModel(config: Config) {
  const { model } = config;
  // Step 1: Select model source
  const source = await select({
    message: "Select model source:",
    default: model.source,
    choices: [{ name: "OpenAI", value: "OpenAI" }],
  });

  // Choose the model name based on the selected source
  const modelName = await select({
    message: `Select model name for ${source}:`,
    default: model.modelName,
    choices: modelNames[source],
  });

  return {
    source: source,
    modelName: modelName,
  } as ModelConfig;
}

// Function to load the configuration file.
export function loadConfig(): Config {
  try {
    if (fs.existsSync(CONFIG_FILE_PATH)) {
      const configData = fs.readFileSync(CONFIG_FILE_PATH, "utf-8");
      return JSON.parse(configData);
    }
    saveConfig(DEFAULT_CONFIG);
  } catch (error) {
    console.log(`${text.red("Error loading configuration file:")} ${error}`);
  }
  return DEFAULT_CONFIG;
}

// Function to load the configuration file.
// Function to save configuration to the config file.
function saveConfig(config: Config) {
  ensureConfigDir();
  fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(config, null, 2));
}

export async function configure() {
  try {
    const config = loadConfig();
    const model = await configureModel(config);

    console.log(
      `${text.success("Configuration saved: ")} ${text.white(CONFIG_FILE_PATH)}`,
    );

    saveConfig({
      model: model,
    } as Config);
  } catch (error) {
    console.log(`${text.red("Error configuring:")} ${error}`);
  }
}
