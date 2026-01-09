import { Session } from 'src/modules/firebase/models/sessions.model';
import { AiAgent } from '../interfaces/ai-agent.interface';
import { BusinessService } from 'src/modules/business/services/business.service';
import { LlmService } from 'src/modules/llm/services/llm.service';
import * as intentHandlers from '../intent-handlers';
import { toCamelCase } from 'src/modules/shared/utils';

export abstract class BaseAgent implements AiAgent {
  protected businessInfo: any;
  protected textTemplates: any;
  protected intentsList: any;
  constructor(
    protected readonly llmService: LlmService,
    protected readonly businessService: BusinessService,
  ) {
    this.businessService.getInfo().then((info) => {
      this.businessInfo = info;
    });
    this.businessService.getTextTemplates().then((info) => {
      this.textTemplates = info;
    });
    this.businessService.getIntents().then((info) => (this.intentsList = info));
  }

  protected baseHandlers(agent): Record<string, () => Promise<string>> {
    return Object.fromEntries(
      this.intentsList
        .filter((intent) => intent.agent === agent)
        .map((item: any) => {
          const handlerName = toCamelCase(item.intent);
          const handlerFunction = intentHandlers[`${handlerName}IntentHandler`];
          if (!handlerFunction) {
            throw new Error(`No handler found for intent: ${item.intent}`);
          }
          return [item.intent, handlerFunction.bind(this)];
        }),
    );
  }

  protected domainHandlers(): Record<string, () => Promise<string>> {
    return {};
  }

  protected async manageUnknownResponse(message: string) {
    const unknownPrompt = this.businessService.getUnknonwPrompt();
    const userMessage = { role: 'user', content: message };
    const systemPromptObj = { role: 'system', content: unknownPrompt };
    const query = await this.llmService.chat([systemPromptObj, userMessage]);
    return query;
  }

  public getHandlers(agent: string): Record<string, () => Promise<string>> {
    return {
      ...this.baseHandlers(agent),
      ...this.domainHandlers(),
    };
  }
  async runAgent(
    agent: string,
    session: Session,
    message: string,
  ): Promise<string> {
    const handlers = this.getHandlers(agent);
    return (
      handlers[session.currentIntent]?.() ?? this.manageUnknownResponse(message)
    );
  }
}
