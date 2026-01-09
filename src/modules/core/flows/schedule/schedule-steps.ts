import { ScheduleState } from './schedule-state.interface';

export const SCHEDULE_STEPS = {
  ASK_SERVICE: {
    messages: '¿Qué servicio deseas agendar?',
  },

  ASK_DATE: {
    message: '¿Para qué fecha deseas la cita?',
  },

  ASK_TIME: {
    message: '¿A qué hora te queda mejor?',
  },

  CONFIRM: async (state: ScheduleState) =>
    `Perfecto ✅
    Servicio: ${state.service}
    Fecha: ${state.date}
    Hora: ${state.time}

    ¿Confirmas la cita?`,
};
