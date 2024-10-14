import { select, input } from "@inquirer/prompts";
import { text } from "../theme.js";
import { Ollama } from "ollama";
const DEFAULT_HOST = "http://127.0.0.1:11434";
const DEFAULT_MODEL = "llama2";
export const OllamaModelNames = [
    {
        name: `llama2\t${text.dim("Optimized for dialogue use cases")}`,
        value: "llama2",
    },
    {
        name: `llama3\t${text.dim("instruction tuned models are optimized for dialogue use cases,")}`,
        value: "llama3",
    },
    {
        name: `mistral\t${text.dim("Top-tier reasoning model for high-complexity tasks")}`,
        value: "mistral",
    },
];
export class OllamaModel {
    constructor() {
        this.ollama = null;
        this.config = {
            source: "Ollama",
            host: DEFAULT_HOST,
            model: "llama2",
        };
        this.status = {
            status: "idle",
            message: text.dim("[Not initialized] "),
        };
    }
    // Method to get the single instance (Singleton pattern)
    static getInstance() {
        if (!OllamaModel.instance) {
            OllamaModel.instance = new OllamaModel();
        }
        return OllamaModel.instance;
    }
    async initialize(host) {
        if (this.ollama && this.config.host === host) {
            return this.ollama;
        }
        try {
            // Assuming we are running locally, Ollama model doesn't need API keys
            this.ollama = new Ollama({ host: this.config.host });
            const models = await this.ollama.list();
            this.status = {
                status: "running",
                message: text.green(` [Ollama is live - ${models.models.length} models available] `),
            };
        }
        catch (error) {
            this.ollama = null;
            this.status = {
                status: "error",
                message: text.red(` [${error}] `),
            };
        }
        return this.ollama;
    }
    async init(config) {
        try {
            this.config = config;
            await this.initialize(this.config.host);
        }
        catch (error) {
            this.ollama = null;
            this.status = {
                status: "error",
                message: text.red(` [${error}] `),
            };
        }
        return this;
    }
    async configure() {
        const host = await input({
            message: "Enter Ollama host:",
            default: DEFAULT_HOST,
        });
        this.config.host = host;
        await this.initialize(host);
        console.log(`\nStatus: ${this.status.message}`);
        if (!this.ollama) {
            return this.config;
        }
        // show status
        const downloadedModels = (await this.ollama.list()).models
            .map((m) => m.name)
            .join(", ");
        console.log(`Downloaded Models: ${text.blue(downloadedModels)}\n`);
        // show model names
        const modelName = await select({
            message: `Select model name for Ollama:`,
            default: DEFAULT_MODEL,
            choices: OllamaModelNames,
        });
        this.config.model = modelName;
        return this.config;
    }
    async prompt(prompt) {
        try {
            if (!this.ollama) {
                return "";
            }
            // Ensuring we combine retrieval for enterprise needs
            const response = await this.ollama.chat({
                model: this.config.model,
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful assistant.",
                    },
                    { role: "user", content: prompt },
                ],
            });
            if (!response || response.message === null) {
                throw "Empty response";
            }
            return response.message.content.trim();
        }
        catch (error) {
            throw error;
        }
    }
}
