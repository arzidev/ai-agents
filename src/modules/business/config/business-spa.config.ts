import { AI_AGENTS, SYSTEM_INTENTS } from 'src/modules/shared/constants';

export const BUSINESS_INFO = {
  DESCRIPTION: 'Spa de uñas',
  INFO: {
    SERVICES: ['manicure', 'pedicure', 'tratamientos de belleza'],
    HOURS: ['lunes a viernes 9am – 12m / 1pm – 5pm', 'sábados 10am – 1pm'],
    LOCATIONS: ['Bucaramanga'],
  },
  TEXT_TEMPLATES: {
    WELCOME:
      'Hola, soy el asistente de atencion al cliente de un spa de belleza.',
    GENERAL_INFORMATION:
      'Somos un spa de uñas que presta sus servicios en bucaramanga.',
    BUSINESS_HOURS: 'Nuestros horarios son:',
    BUSINESS_LOCATIONS: 'Estas son nuestras sedes:',
    BUSINESS_SERVICES: 'Estos son nuestros servicios:',
    SCHEDULING: 'Hola, soy el asistente de agendamiento',
  },
  INTENTS: [
    { intent: SYSTEM_INTENTS.WELCOME, agent: AI_AGENTS.SUPPORT },
    { intent: SYSTEM_INTENTS.GENERAL_INFORMATION, agent: AI_AGENTS.SUPPORT },
    { intent: SYSTEM_INTENTS.BUSINESS_HOURS, agent: AI_AGENTS.SUPPORT },
    { intent: SYSTEM_INTENTS.BUSINESS_LOCATIONS, agent: AI_AGENTS.SUPPORT },
    { intent: SYSTEM_INTENTS.BUSINESS_SERVICES, agent: AI_AGENTS.SERVICE },
    { intent: SYSTEM_INTENTS.SCHEDULING, agent: AI_AGENTS.SCHEDULER },
  ],
};
