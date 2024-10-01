import axios from 'axios';
import { Currency, Rates } from './types';
import { config } from '../config';
import { DataCache, errorUtils } from '../utils';

type OERRates = Record<Currency, number>;

type OERResponse = {
  disclaimer: string;
  license: string;
  timestamp: number;
  base: string;
  rates: OERRates;
};

export class OERApiClient {
  private API_BASE = 'https://openexchangerates.org/api/';
  private APP_ID = config.APP_ID;
  private BASE_CURRENCY = Currency.USD;

  private dataCache = new DataCache<OERResponse>(axios);

  private getApiUrl = (params: string) =>
    `${this.API_BASE}${params}.json?app_id=${this.APP_ID}&base=${this.BASE_CURRENCY}&callback`;

  private getApiUrlCurrent = () => this.getApiUrl('latest');

  private getApiUrlDate = (date: string) =>
    this.getApiUrl(`historical/${date}`);

  async fetchRates(func: Promise<OERResponse>): Promise<Rates> {
    try {
      return (await func).rates;
    } catch (error) {
      throw new errorUtils.APIError('Error fetching OER rate');
    }
  }

  fetchCurrentRate(): Promise<Rates> {
    return this.fetchRates(this.dataCache.get(this.getApiUrlCurrent()));
  }

  fetchDateRate(date: string): Promise<Rates> {
    return this.fetchRates(this.dataCache.get(this.getApiUrlDate(date)));
  }
}
