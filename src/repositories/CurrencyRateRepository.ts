import { CurrencyRateApiClient } from "../frameworks-drivers/http/CurrencyRateApiClient";

class CurrencyRateRepository {
  private apiClient: CurrencyRateApiClient;

  constructor() {
    this.apiClient = new CurrencyRateApiClient();
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

export default CurrencyRateRepository;
