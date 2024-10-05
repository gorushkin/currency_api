import { RatesInfo } from '../api/types';
import { hourlyOEREntries, HourlyTable } from '../dbConfig/schema';
import { AppError } from '../utils';
import { DBService } from './dbTable';
import { desc } from 'drizzle-orm';

export class HourlyEntriesService extends DBService {
  private table: HourlyTable;

  constructor(table: HourlyTable) {
    super();
    this.table = table;
  }

  getLastEntry = async (): Promise<RatesInfo | undefined> => {
    try {
      const [lastTransaction] = await this.db
        .select({ textContent: this.table.textContent })
        .from(this.table)
        .orderBy(desc(this.table.id))
        .limit(1);

      if (lastTransaction) {
        return JSON.parse(lastTransaction.textContent);
      }
    } catch (error) {
      throw new AppError.DBError('Something went wrong on getting entry');
    }
  };

  addEntry = async (rates: RatesInfo) => {
    const textContent = JSON.stringify(rates);

    try {
      await this.db.insert(this.table).values({
        textContent,
      });
    } catch (error) {
      throw new AppError.DBError('Something went wrong on setting entry');
    }
  };
}

export const hourlyCBRFEntriesService = new HourlyEntriesService(
  hourlyOEREntries,
);
