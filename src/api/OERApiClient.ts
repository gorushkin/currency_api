import axios from 'axios';
import { Currency, Rates, Response } from './types';
import { config } from '../config';
import { DataCache } from '../utils';

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

  async fetchCurrentRate(): Promise<Response<Rates>> {
    try {
      const rates = await this.dataCache.get(this.getApiUrlCurrent());

      return { ok: true, data: rates.rates };
    } catch (error) {
      console.error('Error fetching OER rate', error);
      return { ok: false, error: 'Something went wrong' };
    }
  }

  async fetchDateRate(date: string): Promise<Response<Rates>> {
    try {
      const rates = await this.dataCache.get(this.getApiUrlDate(date));

      return { ok: true, data: rates.rates };
    } catch (error) {
      console.error('Error fetching OER rate', error);
      return { ok: false, error: 'Something went wrong' };
    }
  }
}
