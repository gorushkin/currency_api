import { OERApiClient } from '../api/OERApiClient';
import { Rates, RatesInfo } from '../api/types';
import { error } from '../utils';

export class OERRateService {
  private OERApiClient = new OERApiClient();

  private convertRates(rates: Rates, rubRate: number): Record<string, number> {
    return Object.entries(rates).reduce<Rates>(
      (acc, [key, value]) => ({ ...acc, [key]: rubRate / value }),
      {},
    );
  }

  async getCurrentRates(): Promise<RatesInfo> {
    const response = await this.OERApiClient.fetchCurrentRate();

    if (!response.ok) {
      throw new error.APIError(response.error);
    }

    const rubRate = response.data['RUB'];

    const rates = this.convertRates(response.data, rubRate);

    return { base: 'RUB', rates, date: 'no date' };
  }
}
