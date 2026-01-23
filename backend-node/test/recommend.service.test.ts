import { describe, expect, test } from 'vitest';
import { RecommendService } from '../src/domain/recommend/recommend.service.js';
import { InMemoryFestivalRepository } from '../src/domain/festival/festival.repository.js';
import { sampleFestivals } from '../src/domain/festival/festivals.sample.js';
import { InMemoryUserVectorStore } from '../src/domain/user/user.store.js';
import { buildUserVector } from '../src/domain/user/user.vector.js';

describe('RecommendService', () => {
  test('fails fast when user survey is missing', async () => {
    const users = new InMemoryUserVectorStore();
    const festivals = new InMemoryFestivalRepository(sampleFestivals);
    const service = new RecommendService({ festivals, users, enableLlmExplanation: false });

    await expect(service.recommendTopForUserId({ userId: 'u1' })).rejects.toThrow('missing_user_survey');
  });

  test('recommends after survey is saved (shared store)', async () => {
    const users = new InMemoryUserVectorStore();
    const festivals = new InMemoryFestivalRepository(sampleFestivals);
    const service = new RecommendService({ festivals, users, enableLlmExplanation: false });

    await service.saveSurvey(
      'u1',
      buildUserVector({
        mood: 5,
        cost: 5,
        timeVisual: 3,
        crowded: 2,
        theme: ['food'],
        companion: 'couple',
      })
    );

    const out = await service.recommendTopForUserId({
      userId: 'u1',
      constraints: { startDate: '2026-02-01', endDate: '2026-02-28' },
    });

    expect(out.length).toBeGreaterThan(0);
    expect(out[0].id).toBe('fest_001');
    expect(out[0].score).toBeTypeOf('number');
  });
});
