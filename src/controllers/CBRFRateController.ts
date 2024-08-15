import { FastifyReply, FastifyRequest } from 'fastify';
import { CBRFRateService } from '../services/CBRFRateService';

const DEFAULT_MESSAGE = 'Is not implemented yet';

class CBRFRateController {
  private cbrfRateService: CBRFRateService;

  constructor() {
    this.cbrfRateService = new CBRFRateService();
  }

  async getCurrent(_: FastifyRequest, res: FastifyReply) {
    const rates = await this.cbrfRateService.getCurrentRates();
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

export const cbrfRateController = new CBRFRateController();
