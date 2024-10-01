import { OERApiClient } from '../api/OERApiClient';
import { Rates, RatesInfo } from '../api/types';
import { dailyOEREntriesService } from '../database';
import { RateService } from './RateService';

export class OERRateService extends RateService {
  private OERApiClient = new OERApiClient();
  private db = dailyOEREntriesService;

  private convertRates(rates: Rates, rubRate: number): Record<string, number> {
    return Object.entries(rates).reduce<Rates>(
      (acc, [key, value]) => ({ ...acc, [key]: rubRate / value }),
      {},
    );
  }

  prepareData(data: Rates, date: string): RatesInfo {
    const rubRate = data['RUB'];

    const rates = this.convertRates(data, rubRate);

    return { base: 'RUB', rates, date };
  }

  async getCurrentRates(): Promise<RatesInfo> {
    const response = await this.OERApiClient.fetchCurrentRate();

    return this.prepareData(response, 'no date');
  }

  async getRatesByDate(date: string): Promise<RatesInfo> {
    this.validateDate(date);

    const entry = await this.db.getEntry(date);

    if (entry) {
      return entry;
    }

    const response = await this.OERApiClient.fetchDateRate(date);

    const ratesInfo = this.prepareData(response, date);

    await this.db.setEntry(date, ratesInfo);

    return ratesInfo;
  }
}
