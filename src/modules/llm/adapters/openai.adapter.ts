import OpenAI from 'openai';
import { LlmPort } from '../ports/llm.port';
import { ChatCompletionMessageParam } from 'openai/resources';

export class OpenaiAdapter implements LlmPort {
  private client: OpenAI;
  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async chat(messages: ChatCompletionMessageParam[]): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    });

    return response.choices[0]?.message?.content ?? 'sin respuesta';
  }
}
