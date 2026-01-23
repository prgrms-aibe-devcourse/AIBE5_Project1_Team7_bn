import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { healthRouter } from './web/health.controller.js';
import { createSurveyRouter } from './web/survey.controller.js';
import { createRecommendRouter } from './web/recommend.controller.js';
import { InMemoryFestivalRepository } from './domain/festival/festival.repository.js';
import { sampleFestivals } from './domain/festival/festivals.sample.js';
import { InMemoryUserVectorStore } from './domain/user/user.store.js';
import { RecommendService } from './domain/recommend/recommend.service.js';
import { ExplanationGenerator } from './ai/explain.llm.js';

dotenv.config();

const app = express();
app.use(express.json({ limit: '1mb' }));

const corsAllowedOrigins = (process.env.CORS_ALLOWED_ORIGINS ?? 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: corsAllowedOrigins,
    credentials: true,
  })
);

app.use(healthRouter);

// Local-only composition (no DI framework). IMPORTANT: share state across routers.
const users = new InMemoryUserVectorStore();
const festivals = new InMemoryFestivalRepository(sampleFestivals);
const explainer = new ExplanationGenerator();
const service = new RecommendService({ festivals, users, explainer });

app.use(createSurveyRouter(service));
app.use(createRecommendRouter(service));

const port = Number(process.env.PORT ?? 8081);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify({ level: 'info', msg: 'server_started', port }));
});
