import { Currency, Rates } from './types';
import { config } from '../config';
import { fetcher } from './fetcher';

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
  private fetcher = fetcher;

  private getApiUrl = (params: string) =>
    `${this.API_BASE}${params}.json?app_id=${this.APP_ID}&base=${this.BASE_CURRENCY}&callback`;

  private getApiUrlCurrent = () => this.getApiUrl('latest');

  private getApiUrlDate = (date: string) =>
    this.getApiUrl(`historical/${date}`);

  private async fetchRates(url: string): Promise<Rates> {
    const { rates } = await this.fetcher<OERResponse>(url, 'OER');
    return rates;
  }

  fetchCurrentRate(): Promise<Rates> {
    return this.fetchRates(this.getApiUrlCurrent());
  }

  fetchDateRate(date: string): Promise<Rates> {
    return this.fetchRates(this.getApiUrlDate(date));
  }
}
