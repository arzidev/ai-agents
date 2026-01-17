import { Injectable } from '@nestjs/common';
import { ConversationOrchestrator } from 'src/modules/core/services/conversationOrchestrator';

@Injectable()
export class WebhooksService {
  constructor(
    private readonly conversationOrchestrator: ConversationOrchestrator,
  ) {}

  async whatsappHandlerMessage(message: any) {
    // return this.flowManager.initFlow(message.from, message.text);
  }

  async webHandlerMessage(userId: string, message: string) {
    return this.conversationOrchestrator.handleMessage(userId, message);
  }
}
