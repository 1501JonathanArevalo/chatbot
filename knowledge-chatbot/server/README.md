# Server — Knowledge Management Chatbot

Express.js backend that proxies requests to the OpenAI API.

## Quick Start

```bash
cd server
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY
npm install
node server.js
```

## Endpoint

| Method | Path    | Body                              | Response            |
|--------|---------|-----------------------------------|---------------------|
| POST   | `/chat` | `{ message, history[] }` (JSON)   | `{ reply }` (JSON)  |

## Environment Variables

| Variable         | Description                        |
|------------------|------------------------------------|
| `OPENAI_API_KEY` | Your OpenAI API key (required)     |
| `PORT`           | Server port (default: 3000)        |
