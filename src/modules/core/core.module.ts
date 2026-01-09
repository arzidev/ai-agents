import { Module } from '@nestjs/common';
import { LlmModule } from '../llm/llm.module';
import { FirebaseModule } from '../firebase/firebase.module';
import { IntentDetectorService } from './services/intent-detector.service';
import { SessionService } from './services/session.service';
import { SchedulerAgent } from './agents/scheduler.agent';
import { FlowManagerService } from './services/flow-manager.service';
import { AgentRegistry } from './agents/agent-registry';
import { AI_AGENTS, SYSTEM_INTENTS } from '../shared/constants';
import { BusinessModule } from '../business/business.module';
import { ServiceAgent } from './agents/service.agent';
import { SupportAgent } from './agents/support.agent';
import { ProductAgent } from './agents/product.agent';
import { BaseAgent } from './agents/base.agent';

@Module({
  imports: [LlmModule, FirebaseModule, BusinessModule],
  providers: [
    IntentDetectorService,
    SessionService,
    FlowManagerService,
    AgentRegistry,
    SchedulerAgent,
    ServiceAgent,
    SupportAgent,
    ProductAgent,
  ],
  exports: [SchedulerAgent, FlowManagerService],
})
export class CoreModule {
  constructor(
    registry: AgentRegistry,
    productAgent: ProductAgent,
    schedulerAgent: SchedulerAgent,
    serviceAgent: ServiceAgent,
    supportAgent: SupportAgent,
  ) {
    const agents: { name: string; instance: BaseAgent }[] = [
      { name: AI_AGENTS.PRODUCT, instance: productAgent },
      { name: AI_AGENTS.SCHEDULER, instance: schedulerAgent },
      { name: AI_AGENTS.SERVICE, instance: serviceAgent },
      { name: AI_AGENTS.SUPPORT, instance: supportAgent },
    ];
    agents.forEach((agent: { name: string; instance: BaseAgent }) => {
      const handlers = agent.instance.getHandlers(agent.name);
      Object.keys(handlers).forEach((intent) => {
        registry.register(agent.name, intent, agent.instance);
      });
    });
    registry.register(AI_AGENTS.SUPPORT, SYSTEM_INTENTS.UNKNOWN, supportAgent);
  }
}
