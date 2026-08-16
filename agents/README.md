# Agents

## pickup-agent.ts

Polls the Agile Dashboard's `/api/active-stories` endpoint and executes tasks.

### Run locally (against dev server)

```bash
# Start the dashboard first (requires Node >= 20)
nvm use 20 && pnpm dev:dashboard

# In another terminal, run the agent
AGILE_URL=http://localhost:3000 PERSONA=ALL npx -y ts-node --compiler-options '{"module":"CommonJS"}' agents/pickup-agent.ts
```

### Run against production

```bash
AGILE_URL=https://kids-toys-project.web.app PERSONA=ALL npx -y ts-node --compiler-options '{"module":"CommonJS"}' agents/pickup-agent.ts
```

### How it works

1. Agent polls `GET /api/active-stories?assignee=<PERSONA>` every 30s
2. For each active story, `executeTask()` is called with the full story data
3. Implement your AI logic inside `executeTask()` — call Gemini, write code, create PRs, etc.
4. Update story status in Firestore when done (status → `qa_testing`)

### Story lifecycle

```
Board: 🤖 Activate → agentPickup: true
Agent: polls /api/active-stories → receives story
Agent: executes task → writes code / updates files
Agent: updates Firestore → status: "qa_testing", agentCompletedAt: now
Board: Story moves to QA column (real-time)
```
