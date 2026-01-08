import { Injectable } from '@nestjs/common';
import { LlmService } from 'src/modules/llm/services/llm.service';

@Injectable()
export class IntentDetectionService {
  constructor(private readonly llmService: LlmService) {}

  async detectIntent(message: string, systemPrompt: string): Promise<string> {
    const userMessage = { role: 'user', content: message };
    const systemPromptObj = { role: 'system', content: systemPrompt };
    const query = await this.llmService.chat([systemPromptObj, userMessage]);
    return query;
  }
}
