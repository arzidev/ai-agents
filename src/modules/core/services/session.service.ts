import { Inject, Injectable } from '@nestjs/common';
import { Session } from 'src/modules/firebase/models/sessions.model';
import { SessionRepository } from 'src/modules/firebase/repositories/Session.repository';
import { SESSION_REPOSITORY } from 'src/modules/firebase/tokens';
import { INITIAL_INTENT } from 'src/modules/shared/constants';

@Injectable()
export class SessionService {
  constructor(
    @Inject(SESSION_REPOSITORY)
    private readonly sessionRepository: SessionRepository,
  ) {}

  async getOrCreate(userId: string): Promise<Session | undefined> {
    let session = await this.sessionRepository.getSessionData(userId);
    if (session) return session;

    session = await this.sessionRepository.createSession(
      userId,
      INITIAL_INTENT,
    );
    return session;
  }

  async save(session: Session) {
    await this.sessionRepository.setCurrentIntent(
      session.id as string,
      session.currentIntent,
    );
  }

  async setStep(sessionId: string, step: number) {
    await this.sessionRepository.setStep(sessionId, step);
  }
}
