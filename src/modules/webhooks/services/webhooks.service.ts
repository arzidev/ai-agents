import { Injectable } from '@nestjs/common';
import { FlowManagerService } from 'src/modules/core/services/flow-manager.service';

@Injectable()
export class WebhooksService {
  constructor(private readonly flowManager: FlowManagerService) {}

  async whatsappHandlerMessage(message: any) {
    return this.flowManager.initFlow(message.from, message.text);
  }

  async webHandlerMessage(userId: string, message: string) {
    return this.flowManager.initFlow(userId, message);
  }
}
