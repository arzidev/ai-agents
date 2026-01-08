import { Module } from '@nestjs/common';
import { WebhooksController } from './controllers/webhooks.controller';
import { WebhooksService } from './services/webhooks.service';
import { TwilioAdapter } from './adapters/twilio.adapter';
import { LlmModule } from '../llm/llm.module';
import { FirebaseModule } from '../firebase/firebase.module';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [LlmModule, FirebaseModule, CoreModule],
  providers: [WebhooksService, TwilioAdapter],
  controllers: [WebhooksController],
})
export class WebhooksModule {}
