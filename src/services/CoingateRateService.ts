import { CoingateRateApiClient } from '../api/CoingateRateApiClient';
import { Currency } from '../api/types';
class CoingateRateService {
  private currencies: Currency[] = Object.values(Currency);

  private coingateRateApiClient = new CoingateRateApiClient();

  async getCurrentRates() {
    const promises = this.currencies.map((item) =>
      this.coingateRateApiClient.fetchCurrentRate(item),
    );

    const rates = (await Promise.all(promises)).reduce(
      (acc, item) => ({ ...acc, ...item }),
      {},
    );

    return { base: 'RUB', rates };
  }
}

export const coingateRateService = new CoingateRateService();
