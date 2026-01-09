import { Session } from 'src/modules/firebase/models/sessions.model';

export interface AiAgent {
  runAgent(agent: string, session: Session, message: string): Promise<string>;
}
