import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhooksModule } from './modules/webhooks/webhooks.module';
import { LlmModule } from './modules/llm/llm.module';
import { FirebaseModule } from './modules/firebase/firebase.module';
import { FirestoreService } from './modules/firebase/services/firestore.service';
import * as admin from 'firebase-admin';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './modules/core/core.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    WebhooksModule,
    LlmModule,
    FirebaseModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService, FirestoreService],
})
export class AppModule {}
