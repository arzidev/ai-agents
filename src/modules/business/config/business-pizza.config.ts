import { AI_AGENTS, SYSTEM_INTENTS } from 'src/modules/shared/constants';

export const BUSINESS_INFO = {
  DESCRIPTION: 'Pizzería que hace entregas a domicilio.',
  INFO: {
    PRODUCTS: ['pizzas', 'panzerotis', 'granizados'],
    HOURS: ['viernes 5pm – 11pm', 'sábados y domingos 5pm – 10pm'],
    LOCATIONS: ['Bucaramanga', 'Girón'],
  },
  TEXT_TEMPLATES: {
    WELCOME: 'Hola, soy el asistente de atencion al cliente de una pizzería.',
    GENERAL_INFORMATION:
      'Somos una pizzería que presta sus servicios en bucaramanga y girón.',
    BUSINESS_HOURS: 'Nuestros horarios son:',
    BUSINESS_LOCATIONS: 'Estas son nuestras sedes:',
    BUSINESS_PRODUCTS: 'Estos son nuestros productos:',
  },
  INTENTS: [
    { intent: SYSTEM_INTENTS.WELCOME, agent: AI_AGENTS.SUPPORT },
    { intent: SYSTEM_INTENTS.GENERAL_INFORMATION, agent: AI_AGENTS.SUPPORT },
    { intent: SYSTEM_INTENTS.BUSINESS_HOURS, agent: AI_AGENTS.SUPPORT },
    { intent: SYSTEM_INTENTS.BUSINESS_LOCATIONS, agent: AI_AGENTS.SUPPORT },
    { intent: SYSTEM_INTENTS.BUSINESS_PRODUCTS, agent: AI_AGENTS.PRODUCT },
  ],
};
