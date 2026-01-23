export function dot(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error('Vector length mismatch');
  }
  let s = 0;
  for (let i = 0; i < a.length; i++) {
    s += a[i] * b[i];
  }
  return s;
}

export function l2Norm(a: number[]): number {
  let s = 0;
  for (const v of a) {
    s += v * v;
  }
  return Math.sqrt(s);
}

export function normalizeVector(a: number[]): number[] {
  const n = l2Norm(a);
  if (n === 0) {
    return a.map(() => 0);
  }
  return a.map((v) => v / n);
}

export function cosineSimilarity(a: number[], b: number[]): number {
  const na = l2Norm(a);
  const nb = l2Norm(b);
  if (na === 0 || nb === 0) {
    return 0;
  }
  return dot(a, b) / (na * nb);
}
