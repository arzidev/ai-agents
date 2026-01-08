import { Inject, Injectable } from '@nestjs/common';
import { SessionRepository } from 'src/modules/firebase/repositories/Session.repository';
import { SESSION_REPOSITORY } from 'src/modules/firebase/tokens';

@Injectable()
export class SessionService {
  constructor(
    @Inject(SESSION_REPOSITORY)
    private readonly sessionRepository: SessionRepository,
  ) {}

  async getOrCreateSession(userId: string) {
    let session = await this.sessionRepository.getSessionData(userId);
    if (session) return { session: session, isNew: false };

    session = await this.sessionRepository.createSession(userId, 'SALUDO');
    return { session: session, isNew: true };
  }

  async changeIntent(sessionId: string, currentIntent: string) {
    await this.sessionRepository.setCurrentIntent(sessionId, currentIntent);
  }

  async setStep(sessionId: string, step: number) {
    await this.sessionRepository.setStep(sessionId, step);
  }
}
