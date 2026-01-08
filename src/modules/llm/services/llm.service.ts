import { Inject, Injectable } from '@nestjs/common';
import type { LlmPort } from '../ports/llm.port';

@Injectable()
export class LlmService {
  constructor(@Inject('LlmAdapter') private readonly openAiAdapter: LlmPort) {}

  async chat(messages: any[]): Promise<string> {
    return await this.openAiAdapter.chat(messages);
  }
}
