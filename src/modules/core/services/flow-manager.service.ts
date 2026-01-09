import { Injectable } from '@nestjs/common';
import { SessionService } from './session.service';
import { IntentDetectorService } from './intent-detector.service';
import { AgentRegistry } from '../agents/agent-registry';
import { BusinessService } from 'src/modules/business/services/business.service';
import { AI_AGENTS, SYSTEM_INTENTS } from 'src/modules/shared/constants';

@Injectable()
export class FlowManagerService {
  constructor(
    private readonly sessionService: SessionService,
    private readonly intentDetector: IntentDetectorService,
    private readonly agentRegistry: AgentRegistry,
    private readonly businessService: BusinessService,
  ) {}
  async initFlow(userId: string, message: string) {
    console.log(userId, message);
    let session = await this.sessionService.getOrCreate(userId);
    if (!session) {
      return 'Nuestros agentes no están disponibles en este momento';
    }
    let intent = session.currentIntent;
    if (session?.currentIntent) {
      intent = await this.intentDetector.detect(message);
    }
    session.currentIntent = intent;
    await this.sessionService.save(session);
    let intentAgent = await this.getIntentData(intent);
    const agent = this.agentRegistry.get(intentAgent?.agent as string, intent);
    const response = await agent.instance.runAgent(
      agent.name,
      session,
      message,
    );
    return response;
  }

  async getIntentData(intentDetected: string) {
    let intentAgent = this.businessService
      .getIntentsLists()
      .find((i) => i.intent === intentDetected);
    if (!intentAgent) {
      return { intent: SYSTEM_INTENTS.UNKNOWN, agent: AI_AGENTS.SUPPORT };
    }
    return intentAgent;
  }
}
