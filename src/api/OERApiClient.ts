import axios from 'axios';
import { Currency, Rates, Response } from './types';
import { config } from '../config';

type OERRates = Record<Currency, number>;

type OERResponse = {
  disclaimer: string;
  license: string;
  timestamp: number;
  base: string;
  rates: OERRates;
};

export class OERApiClient {
  API_BASE = 'https://openexchangerates.org/api/';
  APP_ID = config.APP_ID;
  BASE_CURRENCY = Currency.USD;

  getApiUrl = () =>
    `${this.API_BASE}latest.json?app_id=${this.APP_ID}&base=${this.BASE_CURRENCY}&callback`;

  async fetchCurrentRate(): Promise<Response<Rates>> {
    try {
      const { data } = await axios<OERResponse>(this.getApiUrl());

      return { ok: true, data: data.rates };
    } catch (error) {
      console.error('Error fetching OER rate', error);
      return { ok: false, error: 'Something went wrong' };
    }
  }
}
