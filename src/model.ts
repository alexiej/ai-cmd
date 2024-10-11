// export type Model
export interface Model {
  source: string;
  modelName: string;
  prompt(prompt: string): Promise<string>;

  status(): {
    isOk: boolean;
    status: string;
    message: string;
  };
}
