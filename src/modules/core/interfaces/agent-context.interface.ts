import { Session } from 'src/modules/firebase/models/sessions.model';
import { BusinessConfig } from './business-config.interface';

export interface AgentContext {
  session: Session;
  businessConfig: BusinessConfig;
}
