import { RatesInfo } from '../api/types';
import { error, validateDate } from '../utils';

export abstract class RateService {
  validateDate(dateString: string) {
    const isValidDate = validateDate(dateString);

    if (!isValidDate) {
      throw new error.ValidationError('Invalid date format: use YYYY-MM-DD');
    }
  }

  abstract getCurrentRates(): Promise<RatesInfo>;

  abstract getRatesByDate(date: string): Promise<RatesInfo>;

  abstract prepareData(response: { data: unknown }, date: string): RatesInfo;
}
