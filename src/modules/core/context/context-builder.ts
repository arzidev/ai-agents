import { Injectable } from '@nestjs/common';
import { AgentContext } from '../interfaces/agent-context.interface';
import * as prompts from '../prompts/welcome.prompt';
import { PromptRegistry } from '../prompts/prompt-registry';
import { DataResolvers } from './data-resolvers';
@Injectable()
export class ContextBuilder {
  build(ctx: AgentContext): any {
    const resolvedContext: Record<string, any> = {};
    const intentConfig = ctx.businessConfig.intents[ctx.session.context.intent];
    for (const need of intentConfig.contextNeeds) {
      const resolver = DataResolvers[need];
      if (!resolver) {
        throw new Error(`No resolver found for context need: ${need}`);
      }
      resolvedContext[need] = resolver(ctx);
    }
    return resolvedContext;
  }
}
