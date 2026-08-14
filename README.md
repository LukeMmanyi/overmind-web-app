# Overmind

**AI-powered cognitive training platform.** Overmind drops users into high-stakes, realistic scenarios and scores their written responses with structured AI feedback.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![Anthropic](https://img.shields.io/badge/Claude-Haiku-D97757?style=flat)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

**[Live app →](https://lukemmanyi.github.io/overmind-web-app/)**

---

## How it works

1. Pick a topic — **Decision Making**, **Social Intelligence**, or **Strategy**
2. Pick a style — **Realistic** or **Fantasy** (dramatized, anime/sci-fi inspired framing)
3. Get an AI-generated scenario tailored to that topic and style
4. Write out how you'd handle it
5. Get scored out of 100, with a breakdown: what worked, what needs work, and a stronger move

## Tech stack

- **Frontend** — Vanilla HTML / CSS / JavaScript
- **Backend** — Node.js + Express
- **AI** — Anthropic API (Claude Haiku)
- **Deployment** — GitHub Pages (frontend) · Render (backend)

## API

| Route | Method | Purpose |
|---|---|---|
| `/getAIR` | `POST` | Generates a scenario for a given topic + style |
| `/sendUR` | `POST` | Scores a user's response, returns structured feedback |

Requests are proxied through the backend so the API key never touches the client.

## Running locally

\`\`\`bash
cd server
npm install
\`\`\`

Create `server/.env`:
\`\`\`
API_KEY=your_anthropic_api_key
\`\`\`

\`\`\`bash
node app.js
\`\`\`

Open `index.html` with a live server, pointing fetch calls at `http://localhost:3000`.

## Status

> v1 — core training loop is live and working. No accounts or saved history yet.

**Up next:** persistence + auth (PostgreSQL), possible migration to React/TypeScript once the core loop is validated with real users.
