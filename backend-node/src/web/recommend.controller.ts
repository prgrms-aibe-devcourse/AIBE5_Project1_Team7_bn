import { Router } from 'express';
import { recommendDtoValidator, type RecommendResponseDto } from './dto.js';
import { RecommendService } from '../domain/recommend/recommend.service.js';

export function createRecommendRouter(service: RecommendService): Router {
  const router = Router();

  router.post('/recommend', async (req, res) => {
  try {
    const dto = recommendDtoValidator.validate(req.body);

    const cards = await service.recommendTopForUserId({ userId: dto.userId, constraints: dto.constraints });

    const response: RecommendResponseDto = {
      results: cards,
    };

    res.json(response);
  } catch (e) {
    res.status(400).json({ ok: false, error: e instanceof Error ? e.message : String(e) });
  }
  });

  return router;
}
