import { OllamaClient } from '../infra/ollama.client.js';
import { normalizeVector } from '../domain/ranking/vector.math.js';

export interface EmbeddingProvider {
  embed(text: string): Promise<number[]>;
}

export class OllamaEmbeddingProvider implements EmbeddingProvider {
  private readonly client: OllamaClient;
  private readonly model: string;

  constructor(params?: { client?: OllamaClient; model?: string }) {
    this.client = params?.client ?? new OllamaClient();
    this.model = params?.model ?? process.env.OLLAMA_EMBED_MODEL ?? 'nomic-embed-text';
  }

  async embed(text: string): Promise<number[]> {
    const res = await this.client.embed({ model: this.model, prompt: text });
    return normalizeVector(res.embedding);
  }
}

export const EmbeddingExample = {
  festivalText: 'Busan night food festival with live music',
  userText: 'I like food, music, and night views with my partner',
};
