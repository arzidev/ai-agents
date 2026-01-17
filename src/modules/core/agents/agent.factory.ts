import { Session } from 'src/modules/firebase/models/sessions.model';
import { AiAgent } from '../interfaces/ai-agent.interface';
import { AgentRegistry } from './agent-registry';
import { ModuleRef } from '@nestjs/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AgentFactory {
  constructor(
    private readonly agentRegistry: AgentRegistry,
    private readonly moduleRef: ModuleRef,
  ) {}

  create(agentType: string): AiAgent {
    const AgentClass = this.agentRegistry.get(agentType);
    if (!AgentClass) {
      throw new Error(`Agent not registered: ${agentType}`);
    }
    const agentRef = this.moduleRef.get(AgentClass, { strict: false });
    if (!agentRef) {
      throw new Error(`Agent provider not found: ${agentType}`);
    }
    return agentRef;
  }
}
