# PortPilot Backend — Travel Recommendation + Personal Assistant (FE-friendly)

## Jan 28 Log

**Hot Festivals Feature & Frontend Integration Complete** ✅
- Added two-row layout on Home page: 3 AI-recommended festivals (top row) + 5 hot festivals from Typesense (bottom row)
- Implemented separate data fetching: `/recommend` API for AI recommendations, `/search` API for Typesense hot festivals
- Enhanced loading messages: "🤖 AI가 3개의 맞춤 축제를 찾고 있습니다..." for better UX clarity
- Fixed layout constraints: Hot festivals section now properly fits left column space (5-column grid within grid layout)
- Updated TownCard component to maintain consistent styling across both sections
- Pushed all changes to frontend submodule (feat/integration) and main repository (feat/typesense-search)
- Backend serving 768 festivals, Typesense indexed with 749 documents, all services running stable
- Continued improving chatbot error handling and response validation from previous session
- Successfully managed Git operations: staged changes, committed with descriptive messages, pushed to remote repositories
- Documentation updated with today's feature additions and architectural improvements

---

## Jan 27 Log

**Pet Festival Search Fix & Frontend Comparison** ✅
- Fixed CSV loader to use `ministry_description` field for actual festival descriptions (was using URL field)
- Re-indexed Typesense: 803 chunks from 749 festivals, pet festival search ("반려동물") now returns 10 results
- Created SOURCE_OF_TRUTH.md documenting all canonical data sources and API specs
- Set up dual frontend comparison: `frontend-app` (port 5173) vs FE submodule (port 5174)
- Branch: `feat/typesense-search` | Submodule branch: `tmp-compare`

---

## Jan 26 Log

**Typesense Search Integration Complete** ✅
- Dockerized full-text search with 632 Korean festivals indexed
- Backend API with intelligent chunking, theme inference, and filtering
- Frontend persona-based category dropdown with instant search
- UTF-8 encoding fix for Korean data, persistent storage with Docker volumes
- Branch: `feat/typesense-search`

**Documentation:**
- [START_SERVICES.md](./START_SERVICES.md) - Docker setup and service startup guide
- [backend-node/docker-compose.yml](./backend-node/docker-compose.yml) - Unified Typesense + Backend container config
- [typesense/.env.example](./typesense/.env.example) - Typesense configuration reference

**Data Source:** `ai/reference/festivals_original.csv` (30MB, from Google Drive standardized format)

---

This backend is a **Spring Boot 2.7.x / Java 11 / Maven** application.

The target product direction is a **travel recommendation + personal assistant** experience designed to be FE-friendly:

## Core principles (non-negotiable)

1. **Frontend sees one stable API**
   - `/api/recommend` response schema should stay stable as internals evolve.
2. **Model logic is replaceable**
   - Tag weights / ranking formula / embedding model / LLM provider are swappable behind interfaces.
3. **Every stage is observable & tunable**
   - Stage-level timings + config snapshot logging is required.
4. **LLM calls are isolated and minimal**
   - LLM is optional “last-mile” reranker/explainer, not the primary judge.

Think in **layers**, not microservices (yet).

---

## Quick start (local)

### Run

```bash
./mvnw spring-boot:run
```

### Key env vars
Configured via `src/main/resources/application.properties` (override by env vars):

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `UPLOAD_PATH`
- `CORS_ALLOWED_ORIGINS`

### Smoke test endpoints

```bash
curl -s http://localhost:8080/api/health
```

```bash
curl -s -X POST http://localhost:8080/api/recommend \
  -H 'Content-Type: application/json' \
  -d '{
    "userId": "u_123",
    "survey": {
      "mood": 5,
      "cost": 4,
      "timeVisual": 2,
      "crowded": 2,
      "theme": ["music", "food"],
      "companion": ["couple"]
    },
    "constraints": {
      "region": "busan",
      "startDate": "2026-02-01",
      "endDate": "2026-02-28"
    }
  }'
```

Note: the current `/api/recommend` is a **stub** that returns deterministic sample results for FE integration.

---

## What FE can rely on (stable contract)

### POST `/api/recommend`

Response is render-ready (frontend “just renders — no thinking”).

Response (example):

```json
{
  "results": [
    {
      "id": "fest_001",
      "name": "Busan Night Food Festival",
      "score": 0.87,
      "reason": "Matches your love for food and night views",
      "cta": ["add_calendar", "notify_me"]
    }
  ]
}
```

If internals evolve, we keep this schema stable (or add fields in a backward-compatible way).

---

## End-to-end pipeline (offline + online)

```
[Festival Raw Data]
        ↓ (offline / batch)
[LLM Tagging + Festival Embedding]
        ↓
[Festival DB + Vector Index]
        ↓
[User Survey → User Vector]
        ↓
[Candidate Selection (cheap)]
        ↓
[Ranking (tag + emb + rules)]
        ↓
[LLM Rerank + Explanation]   (optional, expensive)
        ↓
[Frontend (3–5 cards + CTA)]
```

Key separation:
- Tagging = mostly offline
- Ranking = always online
- Reranking = optional & expensive

---

## Tagging (LLM) — schema-first, versioned

Do NOT tag on request. Tag festivals once and store results.

Schema-first tagging (prevents pipeline breakage):

```json
{
  "theme": {
    "music": 0.0,
    "food": 0.0,
    "nature": 0.0,
    "traditional": 0.0,
    "art": 0.0
  },
  "companion": {
    "family": 0.0,
    "couple": 0.0,
    "solo": 0.0,
    "friends": 0.0,
    "pet": 0.0
  },
  "mood": 0.0,
  "timeVisual": 0.0,
  "cost": 0.0,
  "crowded": 0.0
}
```

Version your tags:

```text
festival.tag_version = "v1.1"
```

---

## User Vector (Survey → Vector)

Normalize Likert (1~5) into 0~1:

```java
static double normalizeLikert(int v) {
  return (v - 1) / 4.0;
}
```

Store the user vector and recompute only when survey changes.

---

## Ranking (math-first, tunable)

Tag-based score (interpretable):

$$score_{tag} = \sum_i (w_i \times U_i \times F_i)$$

Example weights (configurable):

```text
w_theme      = 0.35
w_companion  = 0.15
w_mood       = 0.15
w_timeVisual = 0.15
w_cost       = 0.10
w_crowded    = 0.10
```

Final score:

```text
final = a * score_tag + b * score_emb + c * score_rules
a=0.50, b=0.35, c=0.15 (starting point)
```

---

## Observability (don’t skip)

Log per request:
- `request_id`
- `user_id` (or hashed)
- `user_vector_hash`
- candidate counts: `filtered`, `topK`, `ranked`
- weights/config snapshot
- stage timings (ms)

---

## Codebase structure (Spring Boot, layer-first)

Base package: `com.example.portpilot`.

Recommendation slice (conceptual layout):

```
com.example.portpilot
├─ web
│  ├─ controller
│  │  ├─ RecommendController.java   // /api/recommend
│  │  └─ HealthController.java      // /api/health
│  └─ dto
│     ├─ RecommendRequest.java
│     └─ RecommendResponse.java
└─ domain / ai / global
```

---

## Frontend submodule notes (for the super-repo)

In the super-repo, the frontend lives under `team-fe/FE` (React + Vite). For FE setup, follow the FE README.
