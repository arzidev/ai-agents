import { Injectable } from '@nestjs/common';
import { AiAgent } from '../interfaces/ai-agent.interface';

@Injectable()
export class AgentRegistry {
  private agents = new Map<string, Map<string, AiAgent>>();
  register(agentName: string, intent: string, agent: AiAgent) {
    if (!this.agents.has(agentName)) {
      this.agents.set(agentName, new Map());
    }
    this.agents.get(agentName)!.set(intent, agent);
    console.log(`Registered agent '${agentName}' for intent '${intent}'`);
  }

  // Obtener un agente por nombre de agente y por intent
  get(agentName: string, intent: string): { name: string; instance: AiAgent } {
    const intentsMap = this.agents.get(agentName);
    if (!intentsMap) {
      throw new Error(`No agent registered with name: ${agentName}`);
    }

    const agent = intentsMap.get(intent);
    if (!agent) {
      throw new Error(
        `No agent registered for intent '${intent}' under agent '${agentName}'`,
      );
    }

    return {
      name: agentName,
      instance: agent,
    };
  }
}
