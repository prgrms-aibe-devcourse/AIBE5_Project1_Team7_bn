import { compileSchema } from '../infra/jsonschema.js';
import type { TagCompanion, TagTheme } from '../domain/types.js';

export type SurveyDto = {
  userId: string;
  survey: {
    mood: number;
    cost: number;
    timeVisual: number;
    crowded: number;
    theme: TagTheme[];
    companion: TagCompanion;
  };
};

export const surveyDtoValidator = compileSchema<SurveyDto>({
  type: 'object',
  additionalProperties: false,
  required: ['userId', 'survey'],
  properties: {
    userId: { type: 'string', minLength: 1 },
    survey: {
      type: 'object',
      additionalProperties: false,
      required: ['mood', 'cost', 'timeVisual', 'crowded', 'theme', 'companion'],
      properties: {
        mood: { type: 'number', minimum: 1, maximum: 5 },
        cost: { type: 'number', minimum: 1, maximum: 5 },
        timeVisual: { type: 'number', minimum: 1, maximum: 5 },
        crowded: { type: 'number', minimum: 1, maximum: 5 },
        theme: {
          type: 'array',
          items: { type: 'string', enum: ['music', 'food', 'nature', 'traditional', 'art'] },
          maxItems: 5,
        },
        companion: { type: 'string', enum: ['family', 'couple', 'solo', 'friends', 'pet'] },
      },
    },
  },
});

export type RecommendDto = {
  userId: string;
  constraints?: {
    region?: string;
    startDate?: string;
    endDate?: string;
  };
};

export const recommendDtoValidator = compileSchema<RecommendDto>({
  type: 'object',
  additionalProperties: false,
  required: ['userId'],
  properties: {
    userId: { type: 'string', minLength: 1 },
    constraints: {
      type: 'object',
      additionalProperties: false,
      required: [],
      properties: {
        region: { type: 'string' },
        startDate: { type: 'string' },
        endDate: { type: 'string' },
      },
      nullable: true,
    },
  },
});

export type RecommendResponseDto = {
  results: Array<{
    id: string;
    name: string;
    score: number;
    reason: string;
    cta: string[];
  }>;
};
