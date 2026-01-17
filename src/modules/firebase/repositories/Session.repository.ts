import { Inject } from '@nestjs/common';
import { FIRESTORE_COLLECTIONS } from '../tokens';
import { CollectionReference } from 'firebase-admin/firestore';
import { Session, SessionContext } from '../models/sessions.model';

export class SessionRepository {
  constructor(
    @Inject(FIRESTORE_COLLECTIONS.SESSION_COLLECTION)
    private readonly sessionCollection: CollectionReference<Session>,
  ) {}

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

  async createSession(
    userId: string,
    contextData: any,
  ): Promise<Session | undefined> {
    const dataToSave: Session = {
      userId: userId,
      businessId: 'abc123',
      context: {
        agentType: contextData.agentType,
        flow: contextData.flow,
        intent: contextData.intent,
        step: contextData.step,
        entities: contextData.entities,
      },
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const savedRef = await this.sessionCollection.add(dataToSave);
    return {
      id: savedRef.id,
      ...((await savedRef.get()).data() as Session),
    };
  }

  async updateContext(sessionId: string, context: SessionContext) {
    await this.sessionCollection.doc(sessionId).update({
      context: context,
      updatedAt: Date.now(),
    });
  }
}
