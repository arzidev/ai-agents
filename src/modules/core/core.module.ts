import { Module, Session } from '@nestjs/common';
import { LlmModule } from '../llm/llm.module';
import { CustomerServiceAgentService } from './services/customer-service-agent.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { IntentDetectionService } from './services/intent-detection.service';
import { SessionService } from './services/session.service';
import { SchedullingAgentService } from './services/scheduling-agent.service';

@Module({
  imports: [LlmModule, FirebaseModule],
  providers: [
    CustomerServiceAgentService,
    IntentDetectionService,
    SessionService,
    SchedullingAgentService,
  ],
  exports: [CustomerServiceAgentService, SchedullingAgentService],
})
export class CoreModule {}
