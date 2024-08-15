import { FastifyReply, FastifyRequest } from 'fastify';
import CoingateRateService from '../services/CoingateRateService';

const DEFAULT_MESSAGE = 'Is not implemented yet';

class CoingateRateController {
  private currencyRateService: CoingateRateService;

  constructor() {
    this.currencyRateService = new CoingateRateService();
  }

  async getCurrent(_: FastifyRequest, res: FastifyReply) {
    const rates = await this.currencyRateService.getCurrentRates();
    res.send({ rates });
  }

  async getByDate(
    req: FastifyRequest<{ Params: { date: string } }>,
    res: FastifyReply,
  ) {
    const { date } = req.params;
    res.send({ message: DEFAULT_MESSAGE });
  }

  async getByDates(
    req: FastifyRequest<{ Body: { dates: string[] } }>,
    res: FastifyReply,
  ) {
    const { dates } = req.body;
    // const rates = await this.getRatesByDates.execute(dates);
    res.send({ message: DEFAULT_MESSAGE });
  }
}

export const coingateRateController = new CoingateRateController();
