export class TwilioAdapter {
  normalize(payload: any): any {
    return {
      provider: 'twilio',
      from: payload.From.replace('whatsapp:', ''),
      text: payload.Body,
      messageId: payload.MessageSid,
      profileName: payload.ProfileName || 'Unknown',
      media: payload.NumMedia > '0' ? this.extractMedia(payload) : [],
      raw: payload,
    };
  }

  private extractMedia(payload: any) {
    const media: { url: string; type: string }[] = [];
    const count = Number(payload.NumMedia || 0);

    for (let i = 0; i < count; i++) {
      media.push({
        url: payload[`MediaUrl${i}`],
        type: payload[`MediaContentType${i}`],
      });
    }
    return media;
  }
}
