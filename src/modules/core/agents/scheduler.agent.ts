import { Injectable } from '@nestjs/common';
import { BaseAgent } from './base.agent';
import { LlmService } from 'src/modules/llm/services/llm.service';
import { BusinessService } from 'src/modules/business/services/business.service';

@Injectable()
export class SchedulerAgent extends BaseAgent {
  constructor(
    protected readonly llmService: LlmService,
    protected readonly businessService: BusinessService,
  ) {
    super(llmService, businessService);
  }
}
