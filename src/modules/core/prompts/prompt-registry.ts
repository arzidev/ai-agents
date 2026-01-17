import { PromptKey } from '../interfaces/promptKeys';
import { BUSINESS_HOURS_PROMPT } from './business-hours.prompt';
import { BUSINESS_LOCATIONS_PROMPT } from './business-locations.prompt.ts';
import { BUSINESS_SERVICES_PROMPT } from './business-services.prompt';
import { WELCOME_PROMPT } from './welcome.prompt';

export const PromptRegistry: Record<PromptKey, Function> = {
  WELCOME_PROMPT,
  BUSINESS_HOURS_PROMPT,
  BUSINESS_LOCATIONS_PROMPT,
  BUSINESS_SERVICES_PROMPT,
};
