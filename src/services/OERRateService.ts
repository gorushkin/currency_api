import { OERApiClient } from '../api/OERApiClient';
import { Rates, RatesInfo } from '../api/types';
import { dailyOerRates, hourlyOerRates } from '../entities';
import { NotFoundError } from '../utils';
import {
  getCurrentDateTime,
  getResponseFormattedDate,
  getYesterdayDate,
} from '../utils/dates';
import { logger } from '../utils/logger';
import { RateService } from './RateService';

const oerrLogger = logger.log('oerrLogger');

class OERRateService extends RateService {
  private OERApiClient = new OERApiClient();
  private dailyRates = dailyOerRates;
  private hourlyRates = hourlyOerRates;

  private convertRates(rates: Rates, rubRate: number): Record<string, number> {
    return Object.entries(rates).reduce<Rates>(
      (acc, [key, value]) => ({ ...acc, [key]: rubRate / value }),
      {},
    );
  }

  prepareData(data: Rates, ratesDate: string): RatesInfo {
    const rubRate = data['RUB'];

    const rates = this.convertRates(data, rubRate);

    const requestDate = getCurrentDateTime();

    return { base: 'RUB', rates, ratesDate, requestDate };
  }


  async getHistoryData(): Promise<RatesInfo[]> {
    oerrLogger('FETCH OER HISTORY DATA');
    const res = await this.hourlyRates.getLastEntries();
    return res || [];
  }

  async getCurrentRates(): Promise<RatesInfo> {
    oerrLogger('FETCH OER CURRENT RATES');
    const currentEntry = await this.hourlyRates.getLastEntry();

    if (currentEntry) {
      return currentEntry;
    }

    throw new NotFoundError('No data in the database');
  }

  async updateCurrentRates(): Promise<RatesInfo> {
    const response = await this.OERApiClient.fetchCurrentRate();
    const date = getCurrentDateTime();

    const rates = this.prepareData(response, date);
    await this.hourlyRates.addEntry(rates);
    return rates;
  }

  async getRatesByDate(date: string): Promise<RatesInfo> {
    oerrLogger(`FETCH OER RATES BY DATE ${date}`);
    this.validateDate(date);

    const entry = await this.dailyRates.getEntry(date);

    if (entry) {
      return entry;
    }

    const response = await this.OERApiClient.fetchDateRate(date);
    const ratesDate = getResponseFormattedDate(date);

    const rates = this.prepareData(response, ratesDate);

    await this.dailyRates.setEntry(date, rates);

    return rates;
  }

  async updateYesterdayRates(): Promise<RatesInfo> {
    const yesterdayDate = getYesterdayDate();

    return this.getRatesByDate(yesterdayDate);
  }
}

export const oerrRateService: OERRateService = new OERRateService();
