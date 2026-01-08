export interface Step {
  step: number;
  action: string;
  userMessage?: string;
  agentMessage?: string;
  timestamp: Date;
}

export class Session {
  id?: string;
  userId: string;
  currentIntent: string;
  currentStep: number;
  steps: Step[];
  context: {
    [key: string]: any;
  };
  createdAt: number;
  updatedAt: number;
}
