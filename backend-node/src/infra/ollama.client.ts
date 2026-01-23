import { FetchHttpClient, type HttpClient } from './http.js';

export type OllamaGenerateRequest = {
  model: string;
  prompt: string;
  stream: false;
  format?: 'json';
  options?: {
    temperature?: number;
    top_p?: number;
    num_predict?: number;
  };
};

export type OllamaGenerateResponse = {
  response: string;
};

export type OllamaEmbedRequest = {
  model: string;
  prompt: string;
};

export type OllamaEmbedResponse = {
  embedding: number[];
};

export class OllamaClient {
  private readonly http: HttpClient;
  private readonly baseUrl: string;

  constructor(params?: { http?: HttpClient; baseUrl?: string }) {
    this.http = params?.http ?? new FetchHttpClient();
    this.baseUrl = (params?.baseUrl ?? process.env.OLLAMA_BASE_URL ?? 'http://localhost:11434').replace(/\/$/, '');
  }

  async generate(req: OllamaGenerateRequest): Promise<OllamaGenerateResponse> {
    return this.http.postJson<OllamaGenerateResponse>(`${this.baseUrl}/api/generate`, req);
  }

  async embed(req: OllamaEmbedRequest): Promise<OllamaEmbedResponse> {
    return this.http.postJson<OllamaEmbedResponse>(`${this.baseUrl}/api/embeddings`, req);
  }
}
