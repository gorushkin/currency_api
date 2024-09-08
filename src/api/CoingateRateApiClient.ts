import axios from 'axios';
import { Currency, Rates } from './types';

export class CoingateRateApiClient {
  getApiUrl = (currency: Currency, baseCurrency: Currency = Currency.RUB) =>
    `https://api.coingate.com/v2/rates/merchant/${currency}/${baseCurrency}`;

  async fetchCurrentRate(code: Currency): Promise<Rates | null> {
    try {
      const { data } = await axios<string | undefined>(this.getApiUrl(code));

      return {
        [code]: Number(data) ?? 0,
      };
    } catch (error) {
      console.error('Error fetching Coingate rate', error);
      return null;
    }
  }
}
