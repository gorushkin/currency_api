import { FastifyInstance } from 'fastify';
import { config } from '../config';
import { coingateRateController } from '../controllers/CoingateRateController';
import { cbrfRateController } from '../controllers/CBRFRateController';

const getPrefix = (...sources: string[]): string => sources.join('');

const PREFIX = '/currency-rates';

enum SOURCES {
  COINGATE = '/coingate',
  CBRF = '/cbrf',
}

enum ROUTES {
  CURRENT = '/current',
  ROOT = '/',
  DATE = '/date',
  DATES = '/dates',
  TODAY = '/today',
}

const coingatePrefix = getPrefix(PREFIX, SOURCES.COINGATE as string);
const cbrfPrefix = getPrefix(PREFIX, SOURCES.CBRF as string);

const coingateRoutes = async (app: FastifyInstance) => {
  app.get(ROUTES.CURRENT, (req, res) =>
    coingateRateController.getCurrent(req, res),
  );
};

const cbRoutes = async (app: FastifyInstance) => {
  app.get(ROUTES.CURRENT, (req, res) =>
    cbrfRateController.getCurrent(req, res),
  );
};

const testRoutes = async (app: FastifyInstance) => {
  app.get(ROUTES.ROOT, (_, reply) => {
    reply.send({ message: `Server is running on port ${config.PORT}` });
  });

  app.get(ROUTES.TODAY, (_, reply) => {
    reply.send({ message: new Date().toDateString() });
  });
};

export const routes = async (app: FastifyInstance) => {
  app.register(coingateRoutes, {
    prefix: coingatePrefix,
  });

  app.register(cbRoutes, {
    prefix: cbrfPrefix,
  });

  app.register(testRoutes);
};
