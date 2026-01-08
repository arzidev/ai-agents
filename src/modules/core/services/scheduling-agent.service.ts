import { Injectable } from '@nestjs/common';
import { IntentDetectionService } from './intent-detection.service';
import { SessionService } from './session.service';

@Injectable()
export class SchedullingAgentService {
  constructor(
    private readonly sessionService: SessionService,
    private readonly intentService: IntentDetectionService,
  ) {}
  private intentionMap = {
    CITAS: async () => {
      return {
        message:
          'Hola, para agendar una cita, por favor indicame: tu nombre completo, número de contacto, servicio deseado, fecha y hora preferida.',
      };
    },
  };

  private systemPrompt = `
Eres un asistente que extrae información para agendar citas.

Del mensaje del usuario, identifica si aparecen:
- nombre
- telefono
- fecha
- hora
- servicio

Responde SOLO en JSON.
Si un dato no está presente, usa null.

Formato exacto:
{
  "nombre": string | null,
  "telefono": string | null,
  "fecha": string | null,
  "hora": string | null,
  "servicio": string | null
}

No agregues texto adicional.
`;

  async runAgent(userId: string, message: string): Promise<string | undefined> {
    let { session } = await this.sessionService.getOrCreateSession(userId);
    if (!session || (session && !session.currentIntent)) {
      return 'No puedo entender tu solicitud, te comunicaré con otra área';
    }
    if (!this.intentionMap[session.currentIntent]) {
      return 'No puedo entender tu solicitud, te comunicaré con otra área';
    }
    const step = session.currentStep;

    let response = await this.intentionMap[session.currentIntent]();
    if (step == 0) {
      return response.message;
    }
    if (step == 1) {
      response = await this.intentService.detectIntent(
        message,
        this.systemPrompt,
      );
      const jsonResponse = JSON.parse(response);
      if (
        jsonResponse.nombre == null ||
        jsonResponse.telefono == null ||
        jsonResponse.fecha == null ||
        jsonResponse.hora == null ||
        jsonResponse.servicio == null
      ) {
        return 'Por favor envia todos los datos solicitados';
      }
      //   confirmar disponiblidad del horario solicitado
      await this.sessionService.setStep(session.id as string, step + 1);
      return `Confirma que desea agendar la cita de ${jsonResponse.servicio} el ${jsonResponse.fecha} a las ${jsonResponse.hora} con el nombre ${jsonResponse.nombre} y el telefono ${jsonResponse.telefono} \n
      1. Si confirmas la cita \n
      2. No aceptas
      `;
    }

    if (step == 2) {
      if (Number(message) == 1) {
        return 'Cita confirmada';
      } else if (Number(message) == 2) {
        return 'Cita cancelada';
      }
    }
  }
}
