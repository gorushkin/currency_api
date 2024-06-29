import { FastifyInstance } from 'fastify';
import { config } from '../config';
import { currencyRateController } from '../controllers/CurrencyRateController';

const PREFIX = '/currency-rates';

enum ROUTES {
  CURRENT = '/current',
  ROOT = '/',
  DATE = '/date',
  DATES = '/dates',
}

const currentRoutes = async (app: FastifyInstance) => {
  app.get(ROUTES.CURRENT, (req, res) => currencyRateController.getCurrent(req, res));
};

const testRoutes = async (app: FastifyInstance) => {
  app.get(ROUTES.ROOT, (_, reply) => {
    reply.send({ message: `Server is running on port ${config.PORT}` });
  });
};

export const routes = async (app: FastifyInstance) => {
  app.register(currentRoutes, { prefix: PREFIX});
  app.register(testRoutes);
};
