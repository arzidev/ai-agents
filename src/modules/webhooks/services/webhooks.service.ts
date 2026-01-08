import { Injectable } from '@nestjs/common';
import { CustomerServiceAgentService } from 'src/modules/core/services/customer-service-agent.service';
import { SchedullingAgentService } from 'src/modules/core/services/scheduling-agent.service';
import { FirestoreService } from 'src/modules/firebase/services/firestore.service';
import { LlmService } from 'src/modules/llm/services/llm.service';

@Injectable()
export class WebhooksService {
  constructor(
    private readonly customerAgent: CustomerServiceAgentService,
    private readonly schedulingAgent: SchedullingAgentService,
    private readonly firestoreService: FirestoreService,
  ) {}

  private async formatToText(data: any, type: string): Promise<string> {
    if (!data || data.length === 0) return 'No hay información disponible.';

    switch (type) {
      case 'schedules':
        console.log('schedules data:', data);
        return data
          .map((d: any) => `${d.day}: ${d.open} - ${d.close}`)
          .join('\n');
      case 'locations':
        return data
          .map((l: any) => `${l.name}: ${l.address}, Tel: ${l.phone}`)
          .join('\n');
      case 'services':
        return data.map((s: any) => `${s.name}: $${s.price}`).join('\n');
      default:
        return JSON.stringify(data);
    }
  }

  private intentionMap = {
    SALUDO: async () => '¡Bienvenido al spa de uñas!',
    // AGENDAR: async () => '¿Qué servicio te gustaría agendar?',
    HORARIOS: async () => {
      const schedules = await this.firestoreService.getSchedules();
      const text = await this.formatToText(schedules, 'schedules');
      return text;
    },
    INFORMACION: async () =>
      'Somos un spa especializado en uñas y belleza. Sobre cuál servicio quisieras información?',
    SEDES: async () => {
      const locations = await this.firestoreService.getLocations();
      const text = await this.formatToText(locations, 'locations');
      return text;
    },
    SERVICIOS: async () => {
      const services = await this.firestoreService.getServices();
      const text = await this.formatToText(services, 'services');
      return text;
    },
  };

  async whatsappHandlerMessage(message: any) {
    // const agentResponse = await this.customerServiceAgent.runAgent(
    //   message.text,
    // );
    // return agentResponse;
  }

  async webHandlerMessage(
    userId: string,
    message: string,
  ): Promise<string | undefined> {
    const agentResponse = await this.customerAgent.runAgent(userId, message);
    if (agentResponse.type === 'REPLY') {
      return agentResponse.message;
    }
    if (agentResponse.type === 'REDIRECT') {
      console.log('Redirecting to scheduling agent');
      const agentResponse = await this.schedulingAgent.runAgent(
        userId,
        message,
      );
      return agentResponse;
    }
  }
}
