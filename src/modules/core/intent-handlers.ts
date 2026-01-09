export async function welcomeIntentHandler() {
  console.log('welcomeIntentHandler', this.textTemplates);
  return this.textTemplates.WELCOME;
}

export async function businessHoursIntentHandler() {
  const workingHours = this.businessInfo.HOURS.map((hour) => `- ${hour}`).join(
    '\n',
  );
  return `${this.textTemplates.BUSINESS_HOURS}\n\n${workingHours}`;
}

export async function businessLocationsIntentHandler() {
  const locations = this.businessInfo.LOCATIONS.map(
    (location) => `- ${location}`,
  ).join('\n');
  return `${this.textTemplates.BUSINESS_LOCATIONS}\n\n${locations}`;
}

export async function generalInformationIntentHandler() {
  return this.textTemplates.GENERAL_INFORMATION;
}

export async function businessServicesIntentHandler() {
  const services = this.businessInfo.SERVICES.map(
    (service) => `- ${service}`,
  ).join('\n');
  return `${this.textTemplates.BUSINESS_SERVICES}\n\n ${services}`;
}

export async function schedulingIntentHandler() {
  return `Hola, soy el asistente de agendamiento`;
}

export async function businessProductsIntentHandler() {
  const products = this.businessInfo.PRODUCTS.map(
    (product) => `- ${product}`,
  ).join('\n');
  return `${this.textTemplates.BUSINESS_PRODUCTS}\n\n${products}`;
}
