import { Model } from "../model.js";
import { text } from "../theme.js";
import OpenAI from "openai";

export class OpenAIModel implements Model {
  source: string = "OpenAI";
  modelName: string = "";

  private static instance: OpenAIModel;
  private openai: OpenAI | null = null;
  private initialized: boolean;
  private lastError: string | null;

  public status = (): {
    isOk: boolean;
    status: string;
    message: string;
  } => ({
    isOk: this.initialized,
    status: this.initialized ? "LIVE" : "DEAD",
    message: this.initialized
      ? text.success(" [OpenAI is live] ")
      : text.red(this.lastError),
  });

  private constructor(modelName: string) {
    this.modelName = modelName;
    this.initialized = false;
    this.lastError = null;

    this.initialize();
  }

  // Method to get the single instance (Singleton pattern)
  public static getInstance(modelName: string): OpenAIModel {
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
    } catch (error) {
      this.openai = null;
      this.initialized = false;
      this.lastError = `${error}`;
    }

    return this.openai;
  }

  public async prompt(prompt: string): Promise<string> {
    try {
      const openai = this.initialize();

      if (!openai) {
        return "";
      }

      const response = await openai.chat.completions.create({
        model: this.modelName,
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt },
        ],
      });
      if (
        !response ||
        response.choices.length == 0 ||
        response.choices[0].message === null ||
        response.choices[0].message.content === null
      ) {
        throw "Empty response";
      }

      const generatedMessage = response.choices[0].message.content
        .replace("```bash", "")
        .replace("`", "")
        .trim();

      return generatedMessage;
    } catch (error) {
      throw error;
    }
  }
}
