import type { Festival, UserVector } from '../types.js';

export type RuleConfig = {
  maxDistanceKm?: number;
  costPrefHighThreshold: number; // 0..1
  freeFestivalBonus: number;
  farDistancePenalty: number;
};

export const defaultRuleConfig: RuleConfig = {
  maxDistanceKm: 200,
  costPrefHighThreshold: 0.7,
  freeFestivalBonus: 0.1,
  farDistancePenalty: 0.15,
};

export type RuleResult = {
  score: number;
  dropped: boolean;
  reasons: string[];
};

export function scoreRules(params: {
  user: UserVector;
  festival: Festival;
  rule: RuleConfig;
  constraints?: { startDate?: string; endDate?: string };
}): RuleResult {
  const { user, festival, rule, constraints } = params;
  const reasons: string[] = [];
  let score = 0;

  // Date filter (string compare works for YYYY-MM-DD)
  if (constraints?.startDate && festival.dateISO < constraints.startDate) {
    return { score: 0, dropped: true, reasons: ['date_before_range'] };
  }
  if (constraints?.endDate && festival.dateISO > constraints.endDate) {
    return { score: 0, dropped: true, reasons: ['date_after_range'] };
  }

  if (rule.maxDistanceKm != null && festival.distanceKm != null && festival.distanceKm > rule.maxDistanceKm) {
    score -= rule.farDistancePenalty;
    reasons.push('far_distance_penalty');
  }

  if (festival.isFree && user.cost > rule.costPrefHighThreshold) {
    score += rule.freeFestivalBonus;
    reasons.push('free_festival_bonus');
  }

  return { score, dropped: false, reasons };
}
