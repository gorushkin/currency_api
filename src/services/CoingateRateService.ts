import { CoingateRateApiClient } from '../api/CoingateRateApiClient';

class CoingateRateService {
  private coingateRateApiClient: CoingateRateApiClient;

  constructor() {
    this.coingateRateApiClient = new CoingateRateApiClient();
  }

  async getCurrentRates() {
    return await this.coingateRateApiClient.fetchCurrentRates();
  }
}

export default CoingateRateService;
