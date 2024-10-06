import { RatesInfo } from '../api/types';
import { ValidationError, validateDate } from '../utils';

export abstract class RateService {
  validateDate(dateString: string) {
    const isValidDate = validateDate(dateString);

    if (!isValidDate) {
      throw new ValidationError('Invalid date format: use YYYY-MM-DD');
    }
  }

  abstract getCurrentRates(): Promise<RatesInfo>;

  abstract getRatesByDate(date: string): Promise<RatesInfo>;

  abstract prepareData(data: unknown, date: string): RatesInfo;
}
