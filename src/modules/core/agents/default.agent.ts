import { Inject, Injectable } from '@nestjs/common';
import { BusinessService } from 'src/modules/business/services/business.service';
import { Session } from 'src/modules/firebase/models/sessions.model';
import { AgentContext } from '../interfaces/agent-context.interface';
import { BusinessConfig } from '../interfaces/business-config.interface';
import { LlmService } from 'src/modules/llm/services/llm.service';
import { ContextBuilder } from '../context/context-builder';
import { PromptRegistry } from '../prompts/prompt-registry';

@Injectable()
export class DefaultAgent {
  private session: Session;
  private businessConfig: BusinessConfig;

  constructor(
    protected readonly llmService: LlmService,
    private readonly contextBuilder: ContextBuilder,
  ) {}
  async initialize(context: AgentContext) {
    this.session = context.session;
    this.businessConfig = context.businessConfig;
  }
  async runAgent(message: string) {
    const promptContext = this.contextBuilder.build({
      businessConfig: this.businessConfig,
      session: this.session,
    });
    const systemPrompt = await this.buildPrompt(
      this.businessConfig.intents[this.session.context.intent],
      promptContext,
    );
    return await this.reply(message, systemPrompt);
  }

  async buildPrompt(intentConfig: any, resolvedContext: any) {
    const promptFunc = PromptRegistry[intentConfig.prompt];
    if (!promptFunc) {
      throw new Error(`No prompt found for intent: ${intentConfig.intent}`);
    }
    const prompt = promptFunc(resolvedContext);
    return prompt;
  }

  async reply(message: string, systemPrompt: string) {
    const userMessage = { role: 'user', content: message };
    const systemPromptObj = { role: 'system', content: systemPrompt };
    const query = await this.llmService.chat([systemPromptObj, userMessage]);
    return query;
  }
}
