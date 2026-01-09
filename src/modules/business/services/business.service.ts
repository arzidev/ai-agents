import { Injectable } from '@nestjs/common';
import {
  BUSINESS_DATA,
  INTENT_SELECTOR_PROMPT,
  UNKNOWN_PROMPT,
} from '../config/business.config';

@Injectable()
export class BusinessService {
  async getInfo() {
    return BUSINESS_DATA.INFO;
  }

  async getDescription() {
    return BUSINESS_DATA.DESCRIPTION;
  }

  async getIntents() {
    return BUSINESS_DATA.INTENTS;
  }

  async getTextTemplates() {
    return BUSINESS_DATA.TEXT_TEMPLATES;
  }

  getIntentSelectorPrompt(): string {
    return INTENT_SELECTOR_PROMPT;
  }

  getUnknonwPrompt(): string {
    return UNKNOWN_PROMPT;
  }

  getIntentsLists(): { intent: string; agent: string }[] {
    return BUSINESS_DATA.INTENTS;
  }
}
