import Fastify from 'fastify';

const fastify = Fastify({
  logger: true
});

const fruits = [];

// Declare a route
fastify.get('/fruits', function (_, reply) {
  reply.send({ fruits });
});

// JSON SCHEMA
const schema = {
  body: {
    type: 'object',
    required: ['fruit'],
    properties: {
      fruit: { type: 'string', minLength: 4 }
    }
  }
};

fastify.post(
  '/fruit',
  {
    schema
  },
  async function (req, reply) {
    const { fruit } = req.body;
    // TODO: prevent duplicated fruits
    fruits.push(fruit);

    reply.send({
      message: `the fruit ${fruit} was stored.`
    });
  }
);

/**
 * create a new endpoint that verifies
 * the existence of the fruit in the store
 *
 * /fruit/[banana/mango/pera]
 *
 * it returns a boolean value
 */

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
