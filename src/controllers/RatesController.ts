import { FastifyReply, FastifyRequest } from 'fastify';
import { cbrfRateService } from '../services/CBRFRateService';
import { coingateRateService } from '../services/CoingateRateService';
import { oerrRateService } from '../services/OERRateService';
import { HistoryData, RatesInfo } from '../api/types';

export type WithDateRequest = FastifyRequest<{
  Querystring: { date: string };
  Body: { dates?: string[] };
}>;

class RatesController {
  private cbrfRateService = cbrfRateService;
  private coingateRateService = coingateRateService;
  private oerrRateService = oerrRateService;

  async getCBRFCurrentRates(req: WithDateRequest, res: FastifyReply) {
    const rates = await this.cbrfRateService.getCurrentDayRates();

    res.send(rates);
  }

  async getCBRFRates(req: WithDateRequest, res: FastifyReply) {
    const date = req.query.date;

    if (!date) {
      return this.getCBRFCurrentRates(req, res);
    }

    const rates = await this.cbrfRateService.getRatesByDate(date);

    res.send(rates);
  }

  async getCBRFRatesByDates(req: WithDateRequest, res: FastifyReply) {
    const { dates } = req.body;

    if (!dates) {
      return this.getCBRFCurrentRates(req, res);
    }

    const rates = await Promise.all(
      dates.map((date) => this.cbrfRateService.getRatesByDate(date)),
    );

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
      : await this.oerrRateService.getCurrentDayRates();

    res.send(rates);
  }

  private prepareHistoryData = (historyData: RatesInfo[]) => {
    return historyData.reduce<HistoryData>((acc, item) => {
      const rates = Object.entries(item.rates);

      return rates.reduce<HistoryData>((ratesAcc, [key, value]) => {
        const withDateValue = { date: item.ratesDate, rate: value };

        return ratesAcc[key]
          ? { ...ratesAcc, [key]: [...ratesAcc[key], withDateValue] }
          : { ...ratesAcc, [key]: [withDateValue] };
      }, acc as HistoryData);
    }, {} as HistoryData);
  };

  async getRates(_req: FastifyRequest, res: FastifyReply) {
    const oerrHistoryData = await this.oerrRateService.getHistoryData();

    const historyData = this.prepareHistoryData(oerrHistoryData);

    res.send(historyData);
  }
}

export const ratesController = new RatesController();
