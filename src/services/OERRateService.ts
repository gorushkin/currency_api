import { OERApiClient } from '../api/OERApiClient';
import { Rates, RatesInfo } from '../api/types';
import { dailyOEREntriesService, hourlyCBRFEntriesService } from '../database';
import { RateService } from './RateService';

export class OERRateService extends RateService {
  private OERApiClient = new OERApiClient();
  private dailyDB = dailyOEREntriesService;
  private hourlyDB = hourlyCBRFEntriesService;

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
    const currentEntry = await this.hourlyDB.getLastEntry();

    if (currentEntry) {
      return currentEntry;
    }

    const response = await this.OERApiClient.fetchCurrentRate();

    const rates = this.prepareData(response, 'no date');
    await this.hourlyDB.addEntry(rates);

    return rates;
  }

  async getRatesByDate(date: string): Promise<RatesInfo> {
    this.validateDate(date);

    const entry = await this.dailyDB.getEntry(date);

    if (entry) {
      return entry;
    }

    const response = await this.OERApiClient.fetchDateRate(date);

    const rates = this.prepareData(response, date);

    await this.dailyDB.setEntry(date, rates);

    return rates;
  }
}
