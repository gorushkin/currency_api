import { type RatesInfo } from '../api/types';
import { ValidationError, validateDate } from '../utils';

export abstract class RateService {
  validateDate(dateString: string) {
    const isValidDate = validateDate(dateString);

    if (!isValidDate) {
      throw new ValidationError('Invalid date format: use YYYY-MM-DD');
    }
  }

  abstract getCurrentDayRates(): Promise<RatesInfo | null>;

  abstract getRatesByDate(date: string): Promise<RatesInfo | null>;

  abstract prepareData(data: unknown, date: string): RatesInfo;
}
