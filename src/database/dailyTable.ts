import { RatesInfo } from '../api/types';
import { dailyCBRFEntries, dailyOEREntries, DailyTable } from '../dbConfig/schema';
import { eq } from 'drizzle-orm';
import { AppError } from '../utils';
import { DBService } from './dbTable';

export class DailyEntriesService extends DBService {
  private table: DailyTable;

  constructor(table: DailyTable) {
    super();
    this.table = table;
  }

  getEntry = async (date: string): Promise<RatesInfo | undefined> => {
    try {
      const [result] = await this.db
        .select({ textContent: this.table.textContent })
        .from(this.table)
        .where(eq(this.table.date, date))
        .limit(1);

      if (result) {
        return JSON.parse(result.textContent);
      }
    } catch (error) {
      throw new AppError.DBError('Something went wrong on getting entry');
    }
  };

  setEntry = async (date: string, rates: RatesInfo) => {
    const textContent = JSON.stringify(rates);

    try {
      await this.db.insert(this.table).values({
        date,
        textContent,
      });
    } catch (error) {
      throw new AppError.DBError('Something went wrong on setting entry');
    }
  };
}

export const dailyCBRFEntriesService = new DailyEntriesService(
  dailyCBRFEntries,
);

export const dailyOEREntriesService = new DailyEntriesService(dailyOEREntries);
