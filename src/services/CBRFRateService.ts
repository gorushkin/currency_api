import { CBRFRateApiClient } from '../api/CBRFRateApiClient';

export class CBRFRateService {
  private apiClient: CBRFRateApiClient;

  constructor() {
    this.apiClient = new CBRFRateApiClient();
  }

  async getCurrentRates() {
    return await this.apiClient.fetchTodayRates();
  }
}
