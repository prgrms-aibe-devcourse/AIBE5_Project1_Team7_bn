import { Router } from 'express';
import { surveyDtoValidator } from './dto.js';
import { buildUserVector } from '../domain/user/user.vector.js';
import { RecommendService } from '../domain/recommend/recommend.service.js';

export function createSurveyRouter(service: RecommendService): Router {
  const router = Router();

  router.post('/survey', async (req, res) => {
  try {
    const dto = surveyDtoValidator.validate(req.body);
    const userVector = buildUserVector({
      mood: dto.survey.mood,
      cost: dto.survey.cost,
      timeVisual: dto.survey.timeVisual,
      crowded: dto.survey.crowded,
      theme: dto.survey.theme,
      companion: dto.survey.companion,
    });

    await service.saveSurvey(dto.userId, userVector);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ ok: false, error: e instanceof Error ? e.message : String(e) });
  }
  });

  return router;
}
