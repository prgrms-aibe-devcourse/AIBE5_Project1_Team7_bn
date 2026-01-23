import { describe, expect, test } from 'vitest';
import { rankFestivals } from '../src/domain/ranking/ranker.js';
import { buildUserVector } from '../src/domain/user/user.vector.js';
import { sampleFestivals } from '../src/domain/festival/festivals.sample.js';

describe('rankFestivals', () => {
  test('deterministically ranks with tags+rules', () => {
    const user = buildUserVector({
      mood: 5,
      cost: 5,
      timeVisual: 3,
      crowded: 2,
      theme: ['food'],
      companion: 'couple',
    });

    const out = rankFestivals({
      user,
      festivals: sampleFestivals,
      topN: 2,
      constraints: { startDate: '2026-02-01', endDate: '2026-02-28' },
    });

    expect(out.results.length).toBe(2);
    expect(out.results[0].id).toBe('fest_001');
  });
});
