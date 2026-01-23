import type { FestivalTagVector } from '../domain/types.js';
import { compileSchema } from '../infra/jsonschema.js';
import { OllamaClient } from '../infra/ollama.client.js';

type TagSchema = FestivalTagVector;

const tagSchemaValidator = compileSchema<TagSchema>({
  type: 'object',
  additionalProperties: false,
  required: ['theme', 'companion', 'mood', 'time_visual', 'cost', 'crowded'],
  properties: {
    theme: {
      type: 'object',
      additionalProperties: false,
      required: ['music', 'food', 'nature', 'traditional', 'art'],
      properties: {
        music: { type: 'number', minimum: 0, maximum: 1 },
        food: { type: 'number', minimum: 0, maximum: 1 },
        nature: { type: 'number', minimum: 0, maximum: 1 },
        traditional: { type: 'number', minimum: 0, maximum: 1 },
        art: { type: 'number', minimum: 0, maximum: 1 },
      },
    },
    companion: {
      type: 'object',
      additionalProperties: false,
      required: ['family', 'couple', 'solo', 'friends', 'pet'],
      properties: {
        family: { type: 'number', minimum: 0, maximum: 1 },
        couple: { type: 'number', minimum: 0, maximum: 1 },
        solo: { type: 'number', minimum: 0, maximum: 1 },
        friends: { type: 'number', minimum: 0, maximum: 1 },
        pet: { type: 'number', minimum: 0, maximum: 1 },
      },
    },
    mood: { type: 'number', minimum: 0, maximum: 1 },
    time_visual: { type: 'number', minimum: 0, maximum: 1 },
    cost: { type: 'number', minimum: 0, maximum: 1 },
    crowded: { type: 'number', minimum: 0, maximum: 1 },
  },
});

const PROMPT_TEMPLATE = (festivalDescription: string) => `You are a strict JSON generator.

Task: classify a festival description into a fixed schema of confidence scores.

Rules:
- Output MUST be valid JSON only.
- Use exactly the keys defined in the schema.
- Every value MUST be a float in [0.0, 1.0].
- If information is missing, set it to 0.0.
- Do NOT output any extra keys.

Schema:
{
  "theme": {"music":0.0,"food":0.0,"nature":0.0,"traditional":0.0,"art":0.0},
  "companion": {"family":0.0,"couple":0.0,"solo":0.0,"friends":0.0,"pet":0.0},
  "mood": 0.0,
  "time_visual": 0.0,
  "cost": 0.0,
  "crowded": 0.0
}

Festival description:
"""${festivalDescription}"""
`; 

export class FestivalTagger {
  private readonly client: OllamaClient;
  private readonly model: string;

  constructor(params?: { client?: OllamaClient; model?: string }) {
    this.client = params?.client ?? new OllamaClient();
    this.model = params?.model ?? process.env.OLLAMA_CHAT_MODEL ?? 'llama3.5';
  }

  // Offline/batch use only.
  async tagFestivalDescription(festivalDescription: string): Promise<FestivalTagVector> {
    const resp = await this.client.generate({
      model: this.model,
      prompt: PROMPT_TEMPLATE(festivalDescription),
      stream: false,
      format: 'json',
      options: {
        temperature: 0,
        top_p: 0.1,
        num_predict: 256,
      },
    });

    const parsed = safeJsonParse(resp.response);
    return tagSchemaValidator.validate(parsed);
  }
}

function safeJsonParse(text: string): unknown {
  // Ollama sometimes returns trailing whitespace/newlines; keep parsing strict.
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    throw new Error(`LLM output is not valid JSON: ${trimmed.slice(0, 400)}`);
  }
}

export const TagSchemaExample = {
  input: "A night food festival with live music and local street vendors.",
  output: {
    theme: { music: 0.7, food: 0.9, nature: 0.0, traditional: 0.2, art: 0.0 },
    companion: { family: 0.3, couple: 0.6, solo: 0.2, friends: 0.7, pet: 0.0 },
    mood: 0.7,
    time_visual: 0.8,
    cost: 0.5,
    crowded: 0.7,
  },
};
