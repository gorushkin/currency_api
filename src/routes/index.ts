import { FastifyInstance } from 'fastify';
import { config } from '../config';
import { ratesController } from '../controllers/RatesController';

const PREFIX = '/currency-rates';

enum ROUTES {
  ROOT = '/',
  CBRF = '/cbrf',
  COINGATE = '/coingate',
}

const ratesRoutes = async (app: FastifyInstance) => {
  app.get(ROUTES.CBRF, (req, res) => ratesController.getCBRFRates(req, res));
  app.get(ROUTES.COINGATE, (req, res) =>
    ratesController.getCoingateRates(req, res),
  );
};

const testRoutes = async (app: FastifyInstance) => {
  app.get(ROUTES.ROOT, (_, reply) => {
    reply.send({ message: `Server is running on port ${config.PORT}` });
  });
};

export const routes = async (app: FastifyInstance) => {
  app.register(ratesRoutes, { prefix: PREFIX });
  app.register(testRoutes);
};
