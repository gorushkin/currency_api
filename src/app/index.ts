import Fastify from 'fastify';
import { routes } from '../routes';

const app = Fastify({ logger: true });

app.register(routes);

export const appStart = async (port: number) => {
  try {
    app.listen({ port, host: '0.0.0.0' }, (err) => {
      if (err) throw err;
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    app.log.error(err);
  }
};
