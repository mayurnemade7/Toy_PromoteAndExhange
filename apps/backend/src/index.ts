import Fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

const fastify = Fastify({
  logger: true,
});

async function start() {
  await fastify.register(cors, {
    origin: true,
  });

  await fastify.register(swagger, {
    openapi: {
      info: {
        title: 'Toy Exchange Backend API',
        description: 'Fastify Node.js API server for Toy Exchange platform',
        version: '1.0.0',
      },
    },
  });

  await fastify.register(swaggerUi, {
    routePrefix: '/docs',
  });

  // Root route
  fastify.get('/', async () => {
    return {
      message: '🚀 Toy Exchange Fastify Node.js API Server',
      docs: '/docs',
      health: '/health',
      toys: '/api/toys',
      agentStatus: '/api/agent/status',
      timestamp: new Date().toISOString(),
    };
  });

  // Healthcheck
  fastify.get('/health', async () => {
    return { status: 'ok', service: 'toy-exchange-backend', timestamp: new Date().toISOString() };
  });

  // Toys API Endpoint
  fastify.get('/api/toys', async () => {
    return {
      success: true,
      data: [
        { id: '1', title: 'LEGO Duplo Cargo Train Set', category: 'building_blocks', ageRange: '2-5 yrs', points: 3 },
        { id: '2', title: 'Hot Wheels Track Builder Deluxe', category: 'vehicles', ageRange: '4-8 yrs', points: 2 },
        { id: '3', title: 'Fisher-Price Laugh & Learn Smart Stages Scooter', category: 'toddler', ageRange: '1-3 yrs', points: 3 }
      ]
    };
  });

  // Active Stories Endpoint for Agents
  fastify.get('/api/agent/status', async () => {
    return {
      service: 'fastify-backend',
      status: 'ready_for_tasks',
      monorepoApps: ['frontend (Next.js)', 'agile-dashboard (Next.js)', 'backend (Fastify)']
    };
  });

  const PORT = parseInt(process.env.PORT || '4000', 10);
  const HOST = process.env.HOST || '0.0.0.0';

  try {
    await fastify.listen({ port: PORT, host: HOST });
    console.log(`🚀 Fastify Backend Server running at http://localhost:${PORT}`);
    console.log(`📚 Swagger Docs available at http://localhost:${PORT}/docs`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();

