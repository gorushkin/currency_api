import { CoingateRateApiClient } from '../frameworks-drivers/http/CoingateRateApiClient';

class CoingateRateRepository {
  private apiClient: CoingateRateApiClient;

  constructor() {
    this.apiClient = new CoingateRateApiClient();
  }

  async getCurrentRates() {
    return await this.apiClient.fetchCurrentRates();
  }

  async getRatesByDate(date: string) {
    throw new Error('Method not implemented.');
  }

  async getRatesByDates(dates: string[]) {
    throw new Error('Method not implemented.');
  }
}

export default CoingateRateRepository;
