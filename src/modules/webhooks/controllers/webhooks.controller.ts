import { Controller, Post, Req, Res } from '@nestjs/common';
import { TwilioAdapter } from '../adapters/twilio.adapter';
import { WebhooksService } from '../services/webhooks.service';
import type { Response } from 'express';

@Controller('webhooks')
export class WebhooksController {
  constructor(
    private readonly twilioAdapter: TwilioAdapter,
    private readonly webhooksService: WebhooksService,
  ) {}
  @Post('whatsapp')
  async whatsappHandler(@Req() request: any, @Res() res: Response) {
    const message = this.twilioAdapter.normalize(request.body);
    const response = await this.webhooksService.whatsappHandlerMessage(message);
    const twiml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <Response>
        <Message>
          ${response}
        </Message>
      </Response>
    `;
    return res.type('text/xml').status(200).send(twiml);
    // return res.status(200).send(response);
  }

  @Post('web')
  async webHandler(@Req() request: any, @Res() res: Response) {
    const response = await this.webhooksService.webHandlerMessage(
      request.body.userId,
      request.body.message,
    );
    return res.status(200).send(response);
  }
}
