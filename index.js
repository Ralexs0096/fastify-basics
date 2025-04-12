import Fastify from 'fastify';

const fastify = Fastify({
  logger: true
});

// Declare a route
fastify.get('/', function (_, reply) {
  reply.send({ hello: 'Krys' });
});

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
