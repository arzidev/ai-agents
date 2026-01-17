import { AgentContext } from './agent-context.interface';

export interface AiAgent {
  initialize(context: AgentContext): Promise<void>;
  runAgent(message: string): Promise<string>;
  reply(message: string, context: any): Promise<string>;
}
