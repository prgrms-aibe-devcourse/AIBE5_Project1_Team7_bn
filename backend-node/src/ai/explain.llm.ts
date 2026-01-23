import { compileSchema } from '../infra/jsonschema.js';
import { OllamaClient } from '../infra/ollama.client.js';

export type ExplainInput = {
  userProfileSummary: string;
  festivals: Array<{ id: string; name: string; tags?: unknown; score: number }>;
};

export type ExplainOutput = {
  results: Array<{
    festival_id: string;
    one_line_reason: string;
    highlight: string[];
  }>;
};

const explainValidator = compileSchema<ExplainOutput>({
  type: 'object',
  additionalProperties: false,
  required: ['results'],
  properties: {
    results: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['festival_id', 'one_line_reason', 'highlight'],
        properties: {
          festival_id: { type: 'string' },
          one_line_reason: { type: 'string', minLength: 1, maxLength: 120 },
          highlight: { type: 'array', items: { type: 'string', maxLength: 60 }, maxItems: 3 },
        },
      },
      maxItems: 5,
    },
  },
});

const PROMPT = (input: ExplainInput) => `You are a strict JSON generator.

Task: write SHORT explanations for already-ranked festivals.

Constraints:
- Output MUST be valid JSON only.
- No new ranking logic.
- No hallucinated facts.
- one_line_reason: max 120 characters.
- highlight: max 3 bullets.

Output schema:
{
  "results": [
    {
      "festival_id": "...",
      "one_line_reason": "...",
      "highlight": ["...", "...", "..."]
    }
  ]
}

User profile summary:
"""${input.userProfileSummary}"""

Festivals (structured; do not invent details):
${JSON.stringify(input.festivals)}
`;

export class ExplanationGenerator {
  private readonly client: OllamaClient;
  private readonly model: string;

  constructor(params?: { client?: OllamaClient; model?: string }) {
    this.client = params?.client ?? new OllamaClient();
    this.model = params?.model ?? process.env.OLLAMA_CHAT_MODEL ?? 'llama3.5';
  }

  async explainTop5(input: ExplainInput): Promise<ExplainOutput> {
    const resp = await this.client.generate({
      model: this.model,
      prompt: PROMPT(input),
      stream: false,
      format: 'json',
      options: {
        temperature: 0,
        top_p: 0.1,
        num_predict: 256,
      },
    });

    const parsed = safeJsonParse(resp.response);
    return explainValidator.validate(parsed);
  }
}

function safeJsonParse(text: string): unknown {
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    throw new Error(`LLM output is not valid JSON: ${trimmed.slice(0, 400)}`);
  }
}
