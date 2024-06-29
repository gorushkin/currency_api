import { CurrencyRateApiClient } from "../../frameworks-drivers/http/CurrencyRateApiClient";

class CurrencyRateRepository {
  private apiClient: CurrencyRateApiClient;

  constructor() {
    this.apiClient = new CurrencyRateApiClient();
  }

  async getCurrentRates() {
    return await this.apiClient.fetchCurrentRates();
  }
}

export default CurrencyRateRepository;
