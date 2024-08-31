import axios from 'axios';
import { Currency, CurrencyType } from './types';

export type Rates = Record<Currency, string>;

const getApiUrl = (currency: Currency, baseCurrency: Currency = Currency.RUB) =>
  `https://api.coingate.com/v2/rates/merchant/${currency}/${baseCurrency}`;

export class CoingateRateApiClient {
  async fetchCurrentRate(name: Currency): Promise<CurrencyType> {
    try {
      const { data } = await axios<string | undefined>(getApiUrl(name));

      return {
        rate: Number(data) ?? 0,
        name,
        baseCurrency: Currency.RUB,
        code: '',
      };
    } catch (error) {
      return {
        rate: 0,
        baseCurrency: Currency.RUB,
        code: '',
        name,
      };
    }
  }
}
