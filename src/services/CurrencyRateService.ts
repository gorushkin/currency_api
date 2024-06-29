import CurrencyRateRepository from '../repositories/CurrencyRateRepository';

class CurrencyRateService {
  private currencyRateRepository: CurrencyRateRepository;

  constructor() {
    this.currencyRateRepository = new CurrencyRateRepository();
  }

  async getCurrentRates() {
    return await this.currencyRateRepository.getCurrentRates();
  }

  async getRatesByDate(date: string) {
    return await this.currencyRateRepository.getRatesByDate(date);
  }

  async getRatesByDates(dates: string[]) {
    return await this.currencyRateRepository.getRatesByDates(dates);
  }
}

export default CurrencyRateService;
