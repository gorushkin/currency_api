import { FastifyReply, FastifyRequest } from 'fastify';
import { CBRFRateService } from '../services/CBRFRateService';
import { CoingateRateService } from '../services/CoingateRateService';
import { OERRateService } from '../services/OERRateService';

export type WithDateRequest = FastifyRequest<{
  Querystring: { date: string };
}>;

class RatesController {
  private cbrfRateService = new CBRFRateService();
  private coingateRateService = new CoingateRateService();
  private OERRateService = new OERRateService();

  async getCBRFRates(req: WithDateRequest, res: FastifyReply) {
    const date = req.query.date;

    const rates = date
      ? await this.cbrfRateService.getRatesByDate(date)
      : await this.cbrfRateService.getCurrentRates();

    res.send(rates);
  }

  async getCoingateRates(_: FastifyRequest, res: FastifyReply) {
    const rates = await this.coingateRateService.getCurrentRates();

    res.send(rates);
  }

  async getOERRates(_: FastifyRequest, res: FastifyReply) {
    const rates = await this.OERRateService.getCurrentRates();

    res.send(rates);
  }
}

export const ratesController = new RatesController();
