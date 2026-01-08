import { Inject, Injectable } from '@nestjs/common';
import { SessionRepository } from 'src/modules/firebase/repositories/Session.repository';
import { SESSION_REPOSITORY } from 'src/modules/firebase/tokens';
import { LlmService } from 'src/modules/llm/services/llm.service';
import { SessionService } from './session.service';
import { IntentDetectionService } from './intent-detection.service';
import { agent } from 'supertest';

@Injectable()
export class CustomerServiceAgentService {
  constructor(
    private readonly sessionService: SessionService,
    private readonly intentService: IntentDetectionService,
  ) {}

  private intentsByAgents = [
    { id: 'SALUDO', agent: 'customer' },
    { id: 'SEDES', agent: 'customer' },
    { id: 'SERVICIOS', agent: 'customer' },
    { id: 'HORARIOS', agent: 'customer' },
    { id: 'CITAS', agent: 'scheduling' },
  ];

  private intentionMap = {
    SALUDO: async () => 'Hola, en que puedo ayudarte?',
    SEDES: async () =>
      'Tenemos sedes en Ciudad de México, Guadalajara y Monterrey.',
    SERVICIOS: async () =>
      'Ofrecemos servicios de manicure, pedicure, y tratamientos de belleza.',
    HORARIOS: async () =>
      'Nuestro horario de atención es de lunes a viernes de 9am a 7pm, y sábados de 10am a 5pm.',
    CITAS: async () =>
      'Para agendar una cita, te comunicaré con el área encargada, un momento por favor',
  };

  private systemPrompt = `
        Eres un asistente virtual de servicio al cliente de un spa de uñas. Tu tarea es detectar la intención del usuario y responder únicamente con: HORARIOS, SEDES, SERVICIOS, CITAS

        - Si no puedes identificar la intención, responde EXACTAMENTE: NO_SE
        - No agregues explicaciones ni texto adicional
    `;

  async runAgent(
    userId: string,
    message: string,
  ): Promise<{ type: string; message: string; intent?: string }> {
    let { session, isNew } =
      await this.sessionService.getOrCreateSession(userId);
    if (session && isNew) {
      return {
        type: 'REPLY',
        message: this.intentionMap[session.currentIntent](),
      };
    }
    const newIntent = await this.intentService.detectIntent(
      message,
      this.systemPrompt,
    );
    if (session && session.id && session.currentIntent != newIntent) {
      await this.sessionService.changeIntent(session.id, newIntent);
    }
    if (
      this.intentsByAgents.find((i) => i.id === newIntent)?.agent != 'customer'
    ) {
      console.log('newIntent', newIntent);
      return {
        type: 'REDIRECT',
        message: this.intentionMap[newIntent](),
        intent: newIntent,
      };
    }
    return { type: 'REPLY', message: this.intentionMap[newIntent]() };
  }
}
