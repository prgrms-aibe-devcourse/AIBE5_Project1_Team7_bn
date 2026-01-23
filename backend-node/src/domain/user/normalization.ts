export function normalizeLikert(v: number): number {
  if (!Number.isFinite(v)) {
    throw new Error('Likert value must be a number');
  }
  if (v < 1 || v > 5) {
    throw new Error('Likert value must be in [1,5]');
  }
  return (v - 1) / 4;
}

export function clamp01(v: number): number {
  if (!Number.isFinite(v)) {
    throw new Error('Value must be a number');
  }
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}
