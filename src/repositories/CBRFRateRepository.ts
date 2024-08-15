import { CBRFRateApiClient } from '../frameworks-drivers/http/CBRFRateApiClient';

export class CBRFRateRepository {
  private apiClient: CBRFRateApiClient;

  constructor() {
    this.apiClient = new CBRFRateApiClient();
  }

  async getCurrentRates() {
    return await this.apiClient.fetchTodayRates();
  }

  async getRatesByDate(date: string) {
    throw new Error('Method not implemented.');
  }

  async getRatesByDates(dates: string[]) {
    throw new Error('Method not implemented.');
  }
}
