import { AgentContext } from '../interfaces/agent-context.interface';

export class DataResolvers {
  static BUSINESS_DESCRIPTION(ctx: AgentContext) {
    return `${ctx.businessConfig.businessDescription}`;
  }
  static PRIMARY_LOCATION(ctx: AgentContext) {
    return ctx.businessConfig.locations.find((l: any) => l.isDefault)?.name;
  }
  static PRIMARY_LOCATION_HOURS(ctx: AgentContext) {
    return (
      ctx.businessConfig.locations.find((l: any) => l.isDefault)?.schedule &&
      Object.entries(
        ctx.businessConfig.locations.find((l: any) => l.isDefault).schedule,
      )
        .map(([day, hours]: any) => `${day}: ${hours}`)
        .join('\n')
    );
  }
  static BUSINESS_LOCATIONS(ctx: AgentContext) {
    return ctx.businessConfig.locations.map((l: any) => l.name).join(', ');
  }

  static PRIMARY_LOCATION_SERVICES(ctx: AgentContext) {
    return ctx.businessConfig.locations.map((l: any) => l.services).join(', ');
  }
}
