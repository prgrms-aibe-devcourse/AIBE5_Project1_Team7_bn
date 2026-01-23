import type { Festival, FestivalTagVector, UserVector } from '../types.js';
import { log } from '../../infra/logger.js';
import { defaultRuleConfig, scoreRules, type RuleConfig } from './score.rules.js';
import { defaultTagWeights, scoreTag, type TagWeights } from './score.tag.js';
import { scoreEmbedding } from './score.embedding.js';

export type RankWeights = {
  aTag: number;
  bEmbedding: number;
  cRules: number;
};

export const defaultRankWeights: RankWeights = {
  aTag: 0.5,
  bEmbedding: 0.35,
  cRules: 0.15,
};

export type RankedFestival = {
  id: string;
  name: string;
  score: number;
  breakdown: {
    tag: number;
    embedding: number;
    rules: number;
  };
};

export type RankResult = {
  results: RankedFestival[];
  dropped: Array<{ id: string; reason: string }>; // first reason
};

export function rankFestivals(params: {
  user: UserVector;
  userEmbedding?: number[];
  festivals: Festival[];
  weights?: RankWeights;
  tagWeights?: TagWeights;
  rules?: RuleConfig;
  topN: number;
  constraints?: { startDate?: string; endDate?: string };
}): RankResult {
  const w = params.weights ?? defaultRankWeights;
  const tw = params.tagWeights ?? defaultTagWeights;
  const rules = params.rules ?? defaultRuleConfig;

  const dropped: Array<{ id: string; reason: string }> = [];
  const scored: RankedFestival[] = [];

  for (const f of params.festivals) {
    const tagVector: FestivalTagVector | undefined = f.tags;
    if (!tagVector) {
      dropped.push({ id: f.id, reason: 'missing_tags' });
      continue;
    }

    const rr = scoreRules({ user: params.user, festival: f, rule: rules, constraints: params.constraints });
    if (rr.dropped) {
      dropped.push({ id: f.id, reason: rr.reasons[0] ?? 'dropped' });
      continue;
    }

    const sTag = scoreTag(params.user, tagVector, tw);

    const sEmb =
      params.userEmbedding && f.embedding ? scoreEmbedding(params.userEmbedding, f.embedding) : 0;

    const final = w.aTag * sTag + w.bEmbedding * sEmb + w.cRules * rr.score;

    scored.push({
      id: f.id,
      name: f.name,
      score: final,
      breakdown: {
        tag: sTag,
        embedding: sEmb,
        rules: rr.score,
      },
    });
  }

  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, params.topN);

  log('info', 'rank_complete', {
    topN: params.topN,
    candidates: params.festivals.length,
    dropped: dropped.length,
    top: top.slice(0, 3).map((r) => ({ id: r.id, score: r.score })),
    weights: w,
  });

  return { results: top, dropped };
}
