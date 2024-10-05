import { FastifyReply, FastifyRequest } from 'fastify';
import { cbrfRateService } from '../services/CBRFRateService';
import { coingateRateService } from '../services/CoingateRateService';
import { oerrRateService } from '../services/OERRateService';

export type WithDateRequest = FastifyRequest<{
  Querystring: { date: string };
}>;

class RatesController {
  private cbrfRateService = cbrfRateService;
  private coingateRateService = coingateRateService;
  private oerrRateService = oerrRateService;

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

  async getOERRates(req: WithDateRequest, res: FastifyReply) {
    const date = req.query.date;

    const rates = date
      ? await this.oerrRateService.getRatesByDate(date)
      : await this.oerrRateService.getCurrentRates();

    res.send(rates);
  }
}

export const ratesController = new RatesController();
