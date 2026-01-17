import { Injectable, Type } from '@nestjs/common';
import { AiAgent } from '../interfaces/ai-agent.interface';

@Injectable()
export class AgentRegistry {
  private agents = new Map<string, Type<AiAgent>>();

  register(agentType: string, agent: Type<AiAgent>) {
    this.agents.set(agentType, agent);
  }
  get(agentType: string) {
    return this.agents.get(agentType);
  }
}
