import { Module } from '@nestjs/common';
import { LlmService } from './services/llm.service';
import { LocalAiAdapter } from './adapters/localai.adapter';
import { OpenaiAdapter } from './adapters/openai.adapter';

@Module({
  providers: [
    LlmService,
    {
      provide: 'LlmAdapter',
      useClass: OpenaiAdapter,
    },
  ],
  exports: [LlmService],
})
export class LlmModule {}
