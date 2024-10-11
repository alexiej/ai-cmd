var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { text } from "../theme.js";
import OpenAI from "openai";
export class OpenAIModel {
    constructor(modelName) {
        this.source = "OpenAI";
        this.modelName = "";
        this.openai = null;
        this.status = () => ({
            isOk: this.initialized,
            status: this.initialized ? "LIVE" : "DEAD",
            message: this.initialized
                ? text.success(" [OpenAI is live] ")
                : text.red(this.lastError),
        });
        this.modelName = modelName;
        this.initialized = false;
        this.lastError = null;
        this.initialize();
    }
    // Method to get the single instance (Singleton pattern)
    static getInstance(modelName) {
        if (!OpenAIModel.instance || OpenAIModel.instance.modelName !== modelName) {
            OpenAIModel.instance = new OpenAIModel(modelName);
        }
        return OpenAIModel.instance;
    }
    initialize() {
        if (this.openai) {
            return this.openai;
        }
        try {
            // Get the OpenAI API key from the .env file
            const openaiApiKey = process.env.OPENAI_API_KEY;
            if (!openaiApiKey) {
                this.openai = null;
                this.initialized = false;
                this.lastError = " [No OpenAI API key found] ";
                return null;
            }
            this.openai = new OpenAI({
                apiKey: openaiApiKey,
            });
            this.initialized = true;
        }
        catch (error) {
            this.openai = null;
            this.initialized = false;
            this.lastError = `${error}`;
        }
        return this.openai;
    }
    prompt(prompt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const openai = this.initialize();
                if (!openai) {
                    return "";
                }
                const response = yield openai.chat.completions.create({
                    model: this.modelName,
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
        });
    }
}
