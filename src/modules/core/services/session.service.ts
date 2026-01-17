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

  async getOrCreate(
    userId: string,
    contextData?: any,
  ): Promise<Session | undefined> {
    let session = await this.sessionRepository.getSessionData(userId);
    if (session) return session;
    session = await this.sessionRepository.createSession(userId, contextData);
    return session;
  }

  async save(session: Session) {
    const contextToSave = {
      agentType: session.context.agentType,
      flow: session.context.flow,
      intent: session.context.intent,
      step: session.context.step,
      entities: session.context.entities,
    };
    await this.sessionRepository.updateContext(
      session.id as string,
      contextToSave,
    );
  }
}
