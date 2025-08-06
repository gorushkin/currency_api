import Fastify from 'fastify';
import { routes } from '../routes';
import cors from '@fastify/cors';

const app = Fastify({ logger: true });

void app.register(cors, {});

void app.register(routes);

app.setErrorHandler((_error, _request, reply) => {
  void reply.status(500).send({ ok: false });
});

export const appStart = async (port: number) => {
  try {
    app.listen({ port, host: '0.0.0.0' }, (err) => {
      if (err != null) throw err;
      console.info(`Server is running on port ${port}`);
    });
  } catch (err) {
    if (err instanceof Error) {
      console.info(err.message);
    }

    app.log.error(err);
  }
};
