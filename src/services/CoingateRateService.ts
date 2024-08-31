import { CoingateRateApiClient } from '../api/CoingateRateApiClient';
import { Currency } from '../api/types';

const currencies: Currency[] = Object.values(Currency);

class CoingateRateService {
  private coingateRateApiClient: CoingateRateApiClient;

  constructor() {
    this.coingateRateApiClient = new CoingateRateApiClient();
  }

  getCurrentRates() {
    const promises = currencies.map((item) =>
      this.coingateRateApiClient.fetchCurrentRate(item),
    );

    return Promise.all(promises);
  }
}

export default CoingateRateService;
