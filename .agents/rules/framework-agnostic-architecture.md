# Framework and Language Agnostic Monorepo Rule

## Directives:
1. **Language & Framework Agnostic Architecture**:
   - Systems and packages must communicate via standardized, well-defined contracts (JSON APIs, OpenAPI specifications, TypeScript types, protobufs/gRPC).
   - Any frontend framework (Next.js, Vite/React, Vue, Svelte) or backend runtime (Node.js/Fastify, Go, Python) can be introduced into `apps/` without breaking existing services.

2. **Monorepo Separation of Concerns**:
   - `apps/frontend`: Next.js React application (UI layer).
   - `apps/agile-dashboard`: Next.js React application (Kanban & Agent Control Center).
   - `apps/backend`: Node.js Fastify API service (Business logic & API layer).
   - `packages/`: Shared packages (`@toy-exchange/types`, `@toy-exchange/ui`, `@toy-exchange/firebase-client`).
   - `agents/`: Autonomous agent scripts that interact via API contracts.

3. **Strict Environment Security**:
   - No hardcoded API keys or secrets in source code.
   - Use `.env` or `.env.local` files locally and Vault / GitHub Secrets in CI/CD pipelines.
