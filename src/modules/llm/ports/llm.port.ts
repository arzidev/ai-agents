import { ChatCompletionMessageParam } from 'openai/resources';

export interface LlmPort {
  chat(
    messages:
      | { role: string; content: string }[]
      | ChatCompletionMessageParam[],
  ): Promise<string>;
}
