import type { FestivalRepository } from '../festival/festival.repository.js';
import type { UserVectorStore } from '../user/user.store.js';
import type { UserVector } from '../types.js';
import { rankFestivals } from '../ranking/ranker.js';
import { ExplanationGenerator } from '../../ai/explain.llm.js';

export type RecommendParams = {
  userId: string;
  userVector: UserVector;
  constraints?: { region?: string; startDate?: string; endDate?: string };
};

export type RecommendForUserIdParams = {
  userId: string;
  constraints?: { region?: string; startDate?: string; endDate?: string };
};

export type RecommendCard = {
  id: string;
  name: string;
  score: number;
  reason: string;
  cta: string[];
};

export class RecommendService {
  private readonly festivals: FestivalRepository;
  private readonly users: UserVectorStore;
  private readonly explainer?: ExplanationGenerator;
  private readonly enableLlmExplanation: boolean;

  constructor(params: {
    festivals: FestivalRepository;
    users: UserVectorStore;
    explainer?: ExplanationGenerator;
    enableLlmExplanation?: boolean;
  }) {
    this.festivals = params.festivals;
    this.users = params.users;
    this.explainer = params.explainer;
    this.enableLlmExplanation = params.enableLlmExplanation ?? (process.env.ENABLE_LLM_EXPLANATION === 'true');
  }

  async saveSurvey(userId: string, vector: UserVector): Promise<void> {
    await this.users.put(userId, vector);
  }

  async recommendTopForUserId(params: RecommendForUserIdParams): Promise<RecommendCard[]> {
    const vector = await this.users.get(params.userId);
    if (!vector) {
      throw new Error('missing_user_survey');
    }
    return this.recommendTop({ userId: params.userId, userVector: vector, constraints: params.constraints });
  }

  async recommendTop(params: RecommendParams): Promise<RecommendCard[]> {
    const all = await this.festivals.listAll();

    const ranked = rankFestivals({
      user: params.userVector,
      festivals: all,
      topN: 5,
      constraints: { startDate: params.constraints?.startDate, endDate: params.constraints?.endDate },
    });

    const baseCards: RecommendCard[] = ranked.results.map((r) => ({
      id: r.id,
      name: r.name,
      score: Number(r.score.toFixed(4)),
      reason: `Score(tag=${r.breakdown.tag.toFixed(3)}, rules=${r.breakdown.rules.toFixed(3)})`,
      cta: ['add_calendar', 'notify_me'],
    }));

    if (!this.enableLlmExplanation || !this.explainer) {
      return baseCards;
    }

    const explained = await this.explainer.explainTop5({
      userProfileSummary: 'User preferences from survey',
      festivals: ranked.results.map((r) => ({ id: r.id, name: r.name, score: r.score })),
    });

    const reasonById = new Map(explained.results.map((x) => [x.festival_id, x.one_line_reason] as const));

    return baseCards.map((c) => ({
      ...c,
      reason: reasonById.get(c.id) ?? c.reason,
    }));
  }
}
