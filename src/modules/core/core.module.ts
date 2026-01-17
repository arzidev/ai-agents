import { Module } from '@nestjs/common';
import { LlmModule } from '../llm/llm.module';
import { FirebaseModule } from '../firebase/firebase.module';
import { IntentDetectorService } from './services/intent-detector.service';
import { SessionService } from './services/session.service';
import { AgentRegistry } from './agents/agent-registry';
import { BusinessModule } from '../business/business.module';
import { ConversationOrchestrator } from './services/conversationOrchestrator';
import { DefaultAgent } from './agents/default.agent';
import { AgentFactory } from './agents/agent.factory';
import { BusinessService } from '../business/services/business.service';
import { ContextBuilder } from './context/context-builder';

@Module({
  imports: [LlmModule, FirebaseModule, BusinessModule],
  providers: [
    IntentDetectorService,
    SessionService,
    ConversationOrchestrator,
    AgentRegistry,
    AgentFactory,
    DefaultAgent,
    ContextBuilder,
  ],
  exports: [ConversationOrchestrator],
})
export class CoreModule {
  constructor(
    registry: AgentRegistry,
    private readonly businessService: BusinessService,
  ) {
    const agent = this.businessService.getAgentType();
    registry.register(agent, DefaultAgent);
  }
}
