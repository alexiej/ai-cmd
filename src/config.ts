import * as fs from "fs";
import * as path from "path";
import * as os from "os";

import { Model, ModelConfig } from "./model.js";
import { OpenAIModel, OpenAIModelNames } from "./models/openai.js";
import { select } from "@inquirer/prompts";
import { text } from "./theme.js";
import { OllamaModel } from "./models/ollama.js";

// Define the directory where the configuration will be stored.
const CONFIG_DIR = path.join(os.homedir(), ".config", "ai-cmd");
const CONFIG_FILE_PATH = path.join(CONFIG_DIR, "config.json");

export const VERSION = "1.1.0";

interface Config {
  model: ModelConfig;
}

const DEFAULT_CONFIG: Config = {
  model: {
    source: "OpenAI",
    model: "gpt-4o-mini",
  },
};

export const getModel = (source: string): Model => {
  switch (source) {
    case "OpenAI":
      return OpenAIModel.getInstance();
    case "Ollama":
      return OllamaModel.getInstance();
    default:
      return OpenAIModel.getInstance();
  }
};

// configuration
// Ensure the configuration directory exists.
function ensureConfigDir() {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
}

async function configureModel(config: Config) {
  const { model } = config;

  // Step 1: Select model source
  const source = await select({
    message: "Select model source:",
    default: model.source,
    choices: [
      { name: "OpenAI", value: "OpenAI" },
      { name: "Ollama", value: "Ollama" },
    ],
  });

  // Step 2: Configure the model
  const modelInstance = getModel(source);

  // Step 3: Configure the model
  const modelConfig = await modelInstance.configure();

  // Step 4: Return the model configuration
  return modelConfig;
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
    const modelConfig = await configureModel(config);

    console.log(
      `${text.success("\nConfiguration saved: ")} ${text.white(CONFIG_FILE_PATH)}`,
    );

    saveConfig({
      model: modelConfig,
    } as Config);
  } catch (error) {
    console.log(`${text.red("Error configuring:")} ${error}`);
  }
}
