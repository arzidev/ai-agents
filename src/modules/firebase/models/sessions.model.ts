export interface SessionEntities {
  location?: string;
  service?: string;
  day?: string;
  time?: string;
}

export interface SessionContext {
  agentType: string;
  flow?: string;
  intent: string;
  step?: string;
  entities: SessionEntities;
}

export class Session {
  id?: string;
  userId: string;
  businessId: string;
  context: SessionContext;
  createdAt: number;
  updatedAt: number;
}
