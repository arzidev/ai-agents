import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import {
  BUSINESS_REPOSITORY,
  FIREBASE_ADMIN,
  FIRESTORE,
  FIRESTORE_COLLECTIONS,
  SESSION_REPOSITORY,
} from './tokens';
import { FirestoreService } from './services/firestore.service';
import { BusinessRepository } from './repositories/Business.repository';
import { ConfigService } from '@nestjs/config';
import { SessionRepository } from './repositories/Session.repository';

@Module({
  providers: [
    FirestoreService,
    {
      provide: FIREBASE_ADMIN,
      useFactory: (configService: ConfigService) => {
        const serviceAccount = configService.get<string>(
          'FIREBASE_SERVICE_ACCOUNT',
        );
        return admin.initializeApp({
          credential: admin.credential.cert(serviceAccount as string),
        });
        // return admin.initializeApp({
        //   credential: admin.credential.applicationDefault(),
        // });
      },
      inject: [ConfigService],
    },
    {
      provide: FIRESTORE,
      useFactory: (firebaseApp: admin.app.App) => firebaseApp.firestore(),
      inject: [FIREBASE_ADMIN],
    },
    {
      provide: FIRESTORE_COLLECTIONS.BUSINESS_COLLECTION,
      useFactory: (firestore: admin.firestore.Firestore) =>
        firestore.collection('business'),
      inject: [FIRESTORE],
    },
    {
      provide: FIRESTORE_COLLECTIONS.SESSION_COLLECTION,
      useFactory: (firestore: admin.firestore.Firestore) =>
        firestore.collection('sessions'),
      inject: [FIRESTORE],
    },
    {
      provide: BUSINESS_REPOSITORY,
      useClass: BusinessRepository,
    },
    {
      provide: SESSION_REPOSITORY,
      useClass: SessionRepository,
    },
  ],
  exports: [FirestoreService, BUSINESS_REPOSITORY, SESSION_REPOSITORY],
})
export class FirebaseModule {}
