import CoingateRateRepository from '../repositories/CoingateRateRepository';

class CoingateRateService {
  private coingateRateRepository: CoingateRateRepository;

  constructor() {
    this.coingateRateRepository = new CoingateRateRepository();
  }

  async getCurrentRates() {
    return await this.coingateRateRepository.getCurrentRates();
  }

  async getRatesByDate(date: string) {
    return await this.coingateRateRepository.getRatesByDate(date);
  }

  async getRatesByDates(dates: string[]) {
    return await this.coingateRateRepository.getRatesByDates(dates);
  }
}

export default CoingateRateService;
