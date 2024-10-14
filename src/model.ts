// Interface to represent the model configuration.
export interface ModelConfig {
  source: string;
  model: string;
}

export interface ModelStatus {
  /**
   * Status of the model.
   * "idle" - the model is idle and ready to be configured..
   * "running" - the model is running and generating a response.
   * "error" - the model encountered an error and is not running.
   */
  status: "idle" | "running" | "error";
  message: string;
}

// export type Model
export interface Model {
  // get the model configuration
  config: ModelConfig;

  // status of the model
  status: ModelStatus;

  // set the model configuration
  init(config: ModelConfig): Promise<Model>;

  // show prompt to configure the model
  configure(): Promise<ModelConfig>;

  // run a prompt
  prompt(prompt: string): Promise<string>;
}
