import { Injectable } from '@nestjs/common';
import { LlmService } from 'src/modules/llm/services/llm.service';
import { BusinessService } from 'src/modules/business/services/business.service';
import { BaseAgent } from './base.agent';

@Injectable()
export class SupportAgent extends BaseAgent {
  constructor(
    protected readonly llmService: LlmService,
    protected readonly businessService: BusinessService,
  ) {
    super(llmService, businessService);
  }
}
