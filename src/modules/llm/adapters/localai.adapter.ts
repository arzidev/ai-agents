import OpenAI from 'openai';
import { LlmPort } from '../ports/llm.port';

export class LocalAiAdapter implements LlmPort {
  async chat(messages: { role: string; content: string }[]): Promise<string> {
    const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://172.24.176.1:11434';
    const res = await fetch(`${OLLAMA_HOST}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama2:latest',
        messages,
        stream: false,
        temperature: 0,
      }),
    });

    if (!res.ok) {
      throw new Error('Error llamando a Ollama');
    }

    const data = await res.json();
    return data.message.content;
  }
}
