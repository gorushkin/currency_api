import { RatesInfo } from '../api/types';
import { AppError, validateDate } from '../utils';

export abstract class RateService {
  validateDate(dateString: string) {
    const isValidDate = validateDate(dateString);

    if (!isValidDate) {
      throw new AppError.ValidationError(
        'Invalid date format: use YYYY-MM-DD',
      );
    }
  }

  abstract getCurrentRates(): Promise<RatesInfo>;

  abstract getRatesByDate(date: string): Promise<RatesInfo>;

  abstract prepareData(data: unknown, date: string): RatesInfo;
}
