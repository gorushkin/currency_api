import { CBRFRateRepository } from '../repositories/CBRFRateRepository';

export class CBRFRateService {
  private CBRFRateRepository: CBRFRateRepository;

  constructor() {
    this.CBRFRateRepository = new CBRFRateRepository();
  }

  async getCurrentRates() {
    return await this.CBRFRateRepository.getCurrentRates();
  }

  async getRatesByDate(date: string) {
    return await this.CBRFRateRepository.getRatesByDate(date);
  }

  async getRatesByDates(dates: string[]) {
    return await this.CBRFRateRepository.getRatesByDates(dates);
  }
}
