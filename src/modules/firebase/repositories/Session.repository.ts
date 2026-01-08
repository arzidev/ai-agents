import { Inject } from '@nestjs/common';
import { FIRESTORE, FIRESTORE_COLLECTIONS } from '../tokens';
import { CollectionReference } from 'firebase-admin/firestore';
import { Session } from '../models/sessions.model';

export class SessionRepository {
  constructor(
    @Inject(FIRESTORE_COLLECTIONS.SESSION_COLLECTION)
    private readonly sessionCollection: CollectionReference<Session>,
    @Inject(FIRESTORE)
    private readonly firestore: any,
  ) {}

  async setCurrentIntent(sessionId: string, currentIntent: string) {
    await this.sessionCollection
      .doc(sessionId)
      .update({ currentIntent: currentIntent, updatedAt: Date.now() });
  }

  async getSessionData(userId: string): Promise<Session | undefined> {
    const sessionSnapshot = await this.sessionCollection
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get();
    if (sessionSnapshot.empty) {
      return undefined;
    }
    return {
      ...(sessionSnapshot.docs[0].data() as Session),
      id: sessionSnapshot.docs[0].id,
    };
  }

  async addStep(sessionId: string, step: any) {
    await this.sessionCollection.doc(sessionId).update({
      steps: this.firestore.FieldValue.arrayUnion(step),
      updatedAt: Date.now(),
    });
  }

  async createSession(userId: string, currentIntent: string) {
    const dataToSave: Session = {
      userId: userId,
      currentIntent: currentIntent,
      currentStep: 1,
      steps: [],
      context: {},
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const savedRef = await this.sessionCollection.add(dataToSave);
    return (await savedRef.get()).data();
  }

  async setStep(sessionId: string, step: number) {
    await this.sessionCollection.doc(sessionId).update({
      currentStep: step,
      updatedAt: Date.now(),
    });
  }
}
