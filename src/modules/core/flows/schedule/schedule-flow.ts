import { ScheduleState } from './schedule-state.interface';
import { SCHEDULE_STEPS } from './schedule-steps';

export class ScheduleFlow {
  private state: ScheduleState;
  constructor(initialState?: Partial<ScheduleState>) {
    this.state = {
      step: 'ASK_SERVICE',
      ...initialState,
    };
  }

  async handleMessage(message: string) {
    switch (this.state.step) {
      case 'ASK_SERVICE':
        this.state.service = message;
        this.state.step = 'ASK_DATE';
        return SCHEDULE_STEPS.ASK_DATE.message;
      case 'ASK_DATE':
        this.state.date = message;
        this.state.step = 'ASK_TIME';
        return SCHEDULE_STEPS.ASK_TIME.message;
      case 'ASK_TIME':
        this.state.time = message;
        this.state.step = 'CONFIRM';
        return SCHEDULE_STEPS.CONFIRM(this.state);
    }
  }

  getState(): ScheduleState {
    return this.state;
  }
}
