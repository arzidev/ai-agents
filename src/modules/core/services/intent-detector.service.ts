import { Injectable } from '@nestjs/common';
import { BusinessService } from 'src/modules/business/services/business.service';
import { SessionEntities } from 'src/modules/firebase/models/sessions.model';
import { LlmService } from 'src/modules/llm/services/llm.service';

@Injectable()
export class IntentDetectorService {
  constructor(
    private readonly llmService: LlmService,
    private readonly businessService: BusinessService,
  ) {}

  // private systemPrompt = `
  //       Eres un asistente virtual de servicio al cliente de un spa de uñas. Tu tarea es detectar la intención del usuario y responder únicamente con:
  //       - WELCOME, GENERAL_INFORMATION, BUSINESS_HOURS, BUSINESS_LOCATIONS, BUSINESS_SERVICES, SCHEDULING

  //       - Si no puedes identificar la intención, responde EXACTAMENTE: UNKNOWN
  //       - No agregues explicaciones ni texto adicional
  //       - Cuando te saluden, simplemente responde con WELCOME
  //       - Cuando pregunten sobre la empresa o información muy general responde con GENERAL_INFORMATION
  //   `;

  async detect(
    message: string,
    businessConfig,
  ): Promise<{
    intent: string;
    entities: SessionEntities;
  }> {
    const systemPrompt = businessConfig.prompts.INTENT_SELECTOR.replace(
      '{{intents}}',
      Object.keys(businessConfig.intents).join(', '),
    );
    const userMessage = { role: 'user', content: message };
    const systemPromptObj = { role: 'system', content: systemPrompt };
    const response = await this.llmService.chat([systemPromptObj, userMessage]);
    console.log('Intent detected', response);
    return JSON.parse(response);
  }
}
