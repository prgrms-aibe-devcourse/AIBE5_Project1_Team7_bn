import { describe, expect, test } from 'vitest';
import { buildUserVector } from '../src/domain/user/user.vector.js';

describe('buildUserVector', () => {
  test('normalizes likert and encodes selections', () => {
    const v = buildUserVector({
      mood: 5,
      cost: 4,
      timeVisual: 2,
      crowded: 1,
      theme: ['music', 'food'],
      companion: 'couple',
    });

    expect(v.mood).toBeCloseTo(1);
    expect(v.cost).toBeCloseTo(0.75);
    expect(v.time_visual).toBeCloseTo(0.25);
    expect(v.crowded).toBeCloseTo(0);

    expect(v.theme.music).toBeCloseTo(0.5);
    expect(v.theme.food).toBeCloseTo(0.5);
    expect(v.theme.nature).toBeCloseTo(0);

    expect(v.companion.couple).toBe(1);
  });
});
