import Fastify from 'fastify';

const fastify = Fastify({
  logger: true
});

// Declare a route
fastify.get('/', function (_, reply) {
  reply.send({ hello: 'Krys' });
});

// JSON SCHEMA
const schema = {
  body: {
    type: 'object',
    required: ['someKey'],
    properties: {
      someKey: { type: 'boolean' },
      someOtherKey: { type: 'number' }
    }
  }
};

fastify.post(
  // PATH
  '/',
  // options > Schema validator
  {
    schema,
    preHandler: function (req, reply, done) {
      console.log('Hello from pre-handler!', req.body.someKey);
      done();
    }
  },
  // Handler
  async function (req, reply) {
    const { someKey } = req.body;
    reply.send({
      someKey
    });
  }
);

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
