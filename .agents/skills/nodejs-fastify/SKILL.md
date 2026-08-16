---
name: nodejs-fastify
description: Standards and guidelines for developing high-performance Node.js backend microservices using Fastify, TypeScript, OpenAPI/Swagger, and modular plugin architectures.
---

# Node.js & Fastify Backend Skill

When creating or extending backend microservices using Node.js and Fastify, strictly adhere to these standards:

## 1. Server Architecture & Fastify Plugins
- **Plugin Encapsulation**: Use Fastify's plugin system (`fastify-plugin` or `fp`) to register routes, database connectors, and utility decorators.
- **Asynchronous Handlers**: Always use `async/await` route handlers rather than callback parameters (`done()`).
- **OpenAPI / Swagger**: Auto-generate documentation using `@fastify/swagger` and `@fastify/swagger-ui`.

## 2. Input Validation & Schema
- **JSON Schema / Zod**: Validate all request payloads, query parameters, and headers using JSON Schema or Zod schemas attached to route options.
- **Type Safety**: Derive TypeScript request and reply interfaces directly from JSON/Zod schemas.

## 3. Security & Cross-Origin Rules
- **CORS Configuration**: Configure `@fastify/cors` explicitly for allowed origins, methods, and headers.
- **Environment Isolation**: Load secrets via environment variables (`process.env`), never commit raw credentials or tokens.
