import { cosineSimilarity } from './vector.math.js';

export function scoreEmbedding(userEmbedding: number[], festivalEmbedding: number[]): number {
  const cos = cosineSimilarity(userEmbedding, festivalEmbedding);
  // normalize from [-1,1] to [0,1]
  return (cos + 1) / 2;
}
