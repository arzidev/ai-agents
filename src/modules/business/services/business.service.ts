import { Injectable } from '@nestjs/common';
import businessConfig from '../config/agentsConfig.json';

@Injectable()
export class BusinessService {
  getBusinessConfig(businessId: string) {
    return businessConfig;
  }
  getAgentConfig() {
    return businessConfig;
  }

  getAgentIntents() {
    return businessConfig.intents;
  }

  getAgentFlows() {
    return businessConfig.flows;
  }

  getAgentPrompts() {
    return businessConfig.prompts;
  }

  getAgentType() {
    return businessConfig.agentType;
  }

  getAgentName() {
    return businessConfig.name;
  }
}
