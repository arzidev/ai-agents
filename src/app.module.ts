import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { WebhooksModule } from './modules/webhooks/webhooks.module';
import { LlmModule } from './modules/llm/llm.module';
import { FirebaseModule } from './modules/firebase/firebase.module';
import { FirestoreService } from './modules/firebase/services/firestore.service';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './modules/core/core.module';
import { BusinessModule } from './modules/business/business.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    WebhooksModule,
    LlmModule,
    FirebaseModule,
    CoreModule,
    BusinessModule,
  ],
  controllers: [AppController],
  providers: [FirestoreService],
})
export class AppModule {}
