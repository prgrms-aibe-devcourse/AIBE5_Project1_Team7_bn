import { describe, expect, test } from 'vitest';
import { cosineSimilarity, normalizeVector } from '../src/domain/ranking/vector.math.js';

describe('vector math', () => {
  test('cosine similarity', () => {
    expect(cosineSimilarity([1, 0], [1, 0])).toBeCloseTo(1);
    expect(cosineSimilarity([1, 0], [0, 1])).toBeCloseTo(0);
  });

  test('normalize vector', () => {
    const v = normalizeVector([3, 4]);
    expect(v[0]).toBeCloseTo(0.6);
    expect(v[1]).toBeCloseTo(0.8);
  });
});
