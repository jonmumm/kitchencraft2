import { ZodSchema } from "zod";

export interface LLMModel<TInput extends { [key: string]: unknown }> {
  name: string;
  outputSchema: ZodSchema;
  getUserMessage: (input: TInput) => string;
  getSystemMessage: (input: TInput) => string;
}
