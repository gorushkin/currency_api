import { FastifyReply, FastifyRequest } from 'fastify';
import { CBRFRateService } from '../services/CBRFRateService';
import { CoingateRateService } from '../services/CoingateRateService';
import { OERRateService } from '../services/OERRateService';

class RatesController {
  private cbrfRateService = new CBRFRateService();
  private coingateRateService = new CoingateRateService();
  private OERRateService = new OERRateService();

  async getCBRFRates(_: FastifyRequest, res: FastifyReply) {
    const rates = await this.cbrfRateService.getCurrentRates();

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
