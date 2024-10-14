import { select } from "@inquirer/prompts";
import { text } from "../theme.js";
import OpenAI from "openai";
const DEFAULT_MODEL = "gpt-4o-mini";
export const OpenAIModelNames = [
    {
        name: `gpt-4o-mini\t${text.dim("Small model for fast, lightweight task.")}`,
        value: "gpt-4o-mini",
    },
    {
        name: `gpt-4o\t${text.dim("High-intelligence flagship model for complex, multi-step tasks")}`,
        value: "gpt-4o",
    },
    {
        name: `gpt-4-turbo\t${text.dim("The latest GPT-4 Turbo model")}`,
        value: "gpt-4-turbo",
    },
    {
        name: `gpt-3.5-turbo\t${text.dim("Turbo model with improved instruction following")}`,
        value: "gpt-3.5-turbo",
    },
];
export class OpenAIModel {
    constructor() {
        this.openai = null;
        this.config = {
            source: "OpenAI",
            model: "gpt-4o-mini",
        };
        this.status = {
            status: "idle",
            message: text.dim("[Not initialized] "),
        };
    }
    static getInstance() {
        if (!OpenAIModel.instance) {
            OpenAIModel.instance = new OpenAIModel();
        }
        return OpenAIModel.instance;
    }
    initialize() {
        try {
            // it was initialized already
            if (this.openai) {
                return this.openai;
            }
            // Get the OpenAI API key from the .env file
            const openaiApiKey = process.env.OPENAI_API_KEY;
            if (!openaiApiKey) {
                this.openai = null;
                this.status = {
                    status: "error",
                    message: text.red(" [No OpenAI API key found] "),
                };
                return null;
            }
            this.openai = new OpenAI({
                apiKey: openaiApiKey,
            });
            this.status = {
                status: "running",
                message: text.green(" [OpenAI is live] "),
            };
        }
        catch (error) {
            this.openai = null;
            this.status = {
                status: "error",
                message: text.red(` [${error}] `),
            };
        }
        return this.openai;
    }
    async init(config) {
        try {
            this.config = config;
            this.initialize();
        }
        catch (error) {
            this.status = {
                status: "error",
                message: text.red(` [${error}] `),
            };
        }
        return this;
    }
    async configure() {
        const modelName = await select({
            message: `Select model name for OpenAI:`,
            default: DEFAULT_MODEL,
            choices: OpenAIModelNames,
        });
        this.config.model = modelName;
        return this.config;
    }
    async prompt(prompt) {
        try {
            const openai = this.initialize();
            if (!openai) {
                return "";
            }
            const response = await openai.chat.completions.create({
                model: this.config.model,
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: prompt },
                ],
            });
            if (!response ||
                response.choices.length == 0 ||
                response.choices[0].message === null ||
                response.choices[0].message.content === null) {
                throw "Empty response";
            }
            const generatedMessage = response.choices[0].message.content
                .replace("```bash", "")
                .replace("`", "")
                .trim();
            return generatedMessage;
        }
        catch (error) {
            throw error;
        }
    }
}
