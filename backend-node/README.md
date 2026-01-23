# Backend (Node.js + TypeScript) — Local-only (Ollama)

This is the **new recommendation backend** for local development:

- Node.js (TypeScript)
- Ollama running locally (Llama 3.5)
- No cloud APIs / no external SaaS dependencies

## Run

```bash
npm install
npm run dev
```

Server:
- `GET /health`
- `POST /survey`
- `POST /recommend`

## Environment

Copy `.env.example` to `.env` and adjust values.

## Notes

- Controllers never call LLMs directly.
- Tagging is offline (batch only).
- Online LLM is optional for explanations (`ENABLE_LLM_EXPLANATION`).
