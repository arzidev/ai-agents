import { Injectable } from '@nestjs/common';
import { AgentFactory } from '../agents/agent.factory';
import { SessionService } from './session.service';
import { IntentDetectorService } from './intent-detector.service';
import { BusinessService } from 'src/modules/business/services/business.service';

@Injectable()
export class ConversationOrchestrator {
  constructor(
    private readonly sessionService: SessionService,
    private readonly agentFactory: AgentFactory,
    private readonly intentDetector: IntentDetectorService,
    private readonly businessService: BusinessService,
  ) {}

  async handleMessage(userId: string, message: string) {
    let session = await this.sessionService.getOrCreate(userId, {
      agentType: this.businessService.getAgentType(),
      flow: null,
      intent: null,
      step: null,
      entities: { location: '', service: '' },
    });

    if (!session) {
      return 'Nuestros agentes no están disponibles en este momento';
    }

    const businessConfig = await this.businessService.getBusinessConfig(
      session.businessId,
    );

    let intent = session.context.intent;
    const agentResponse = await this.intentDetector.detect(
      message,
      businessConfig,
    );
    intent = agentResponse.intent;

    if (!businessConfig.intents[intent]) {
      intent = 'UNKNOWN';
    }

    // actualizar el contexto
    session.context.intent = intent;
    session.context.agentType = businessConfig.agentType;
    // session.context.entities.location = agentResponse.entities.location
    //   ? agentResponse.entities.location
    //   : '';
    // session.context.entities.service = agentResponse.entities.service
    //   ? agentResponse.entities.service
    //   : '';
    await this.sessionService.save(session);
    let agentInstance = this.agentFactory.create(session.context.agentType);
    await agentInstance.initialize({ session, businessConfig });
    const response = await agentInstance.runAgent(message);
    return response;
  }
}
