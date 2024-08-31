import { FastifyReply, FastifyRequest } from 'fastify';
import { CBRFRateService } from '../services/CBRFRateService';
import CoingateRateService from '../services/CoingateRateService';

class RatesController {
  private cbrfRateService: CBRFRateService;
  private coingateRateService: CoingateRateService;

  constructor() {
    this.cbrfRateService = new CBRFRateService();
    this.coingateRateService = new CoingateRateService();
  }

  async getCBRFRates(_: FastifyRequest, res: FastifyReply) {
    const rates = await this.cbrfRateService.getCurrentRates();

    res.send(rates);
  }

  async getCoingateRates(_: FastifyRequest, res: FastifyReply) {
    const rates = await this.coingateRateService.getCurrentRates();

    res.send(rates);
  }
}

export const ratesController = new RatesController();
