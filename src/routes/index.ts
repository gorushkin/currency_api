import { FastifyInstance } from 'fastify';
import { config } from '../config';
import { ratesController } from '../controllers/RatesController';

enum ROUTES {
  ROOT = '/',
  CBRF = '/cbrf',
  COINGATE = '/coingate',
}

const coingateRoutes = async (app: FastifyInstance) => {
  app.get(ROUTES.COINGATE, (req, res) =>
    ratesController.getCoingateRates(req, res),
  );
};

const cbRoutes = async (app: FastifyInstance) => {
  app.get(ROUTES.CBRF, (req, res) => ratesController.getCBRFRates(req, res));
};

const testRoutes = async (app: FastifyInstance) => {
  app.get(ROUTES.ROOT, (_, reply) => {
    reply.send({ message: `Server is running on port ${config.PORT}` });
  });
};

export const routes = async (app: FastifyInstance) => {
  app.register(coingateRoutes);

  app.register(cbRoutes);

  app.register(testRoutes);
};
