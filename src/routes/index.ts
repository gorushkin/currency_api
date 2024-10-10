import { FastifyInstance } from 'fastify';
import { config } from '../config';
import {
  ratesController,
  WithDateRequest,
} from '../controllers/RatesController';

const PREFIX = '/currency-rates';

enum ROUTES {
  ROOT = '/',
  CBRF = '/cbrf',
  COINGATE = '/coingate',
  OER = '/oer',
  RATES = '/rates',
}

const ratesRoutes = async (app: FastifyInstance) => {
  app.get(ROUTES.CBRF, (req, res) =>
    ratesController.getCBRFRates(req as WithDateRequest, res),
  );
  app.get(ROUTES.COINGATE, (req, res) =>
    ratesController.getCoingateRates(req, res),
  );
  app.get(ROUTES.OER, (req, res) =>
    ratesController.getOERRates(req as WithDateRequest, res),
  );
  app.get(ROUTES.RATES, (req, res) => ratesController.getRates(req, res));
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
