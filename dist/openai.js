var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { text } from "./theme.js";
import OpenAI from "openai";
// // Initialize OpenAI client
// const openai = new OpenAI({
//   apiKey: openaiApiKey,
// });
// export async
export class OpenAIModel {
    constructor() {
        this.name = "OpenAI gpt-4o-mini";
        this.openai = null;
        this.status = () => ({
            isOk: this.initialized,
            status: this.initialized ? "LIVE" : "DEAD",
            message: this.initialized
                ? text.white("OpenAI is live")
                : text.red(this.lastError),
        });
        this.initialized = false;
        this.lastError = null;
        this.initialize();
    }
    // Method to get the single instance (Singleton pattern)
    static getInstance() {
        if (!OpenAIModel.instance) {
            OpenAIModel.instance = new OpenAIModel();
        }
        return OpenAIModel.instance;
    }
    initialize() {
        try {
            if (this.openai) {
                return this.openai;
            }
            // Get the OpenAI API key from the .env file
            const openaiApiKey = process.env.OPENAI_API_KEY;
            if (!openaiApiKey) {
                this.openai = null;
                this.initialized = false;
                this.lastError =
                    'No OpenAI API key found. Please add this to the environment `export OPENAI_API_KEY="<YOUR-KEY>"`';
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
                    model: "gpt-4o-mini",
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
                console.error(text.red(`Error interacting with OpenAI: ${error}`));
                throw error;
            }
        });
    }
}
