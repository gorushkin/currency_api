import { RatesInfo } from '../api/types';
import { hourlyOEREntries, HourlyTable } from '../db/schema';
import { errorUtils } from '../utils';
import { DBService } from './dbTable';

export class HourlyEntriesService extends DBService {
  private table: HourlyTable;

  constructor(table: HourlyTable) {
    super();
    this.table = table;
  }

  getLastEntry = async (): Promise<RatesInfo | undefined> => {
    try {
      const [result] = await this.db
        .select({ textContent: this.table.textContent })
        .from(this.table)
        .limit(1);

      if (result) {
        return JSON.parse(result.textContent);
      }
    } catch (error) {
      throw new errorUtils.DBError('Something went wrong on getting entry');
    }
  };

  addEntry = async (rates: RatesInfo) => {
    const textContent = JSON.stringify(rates);

    try {
      await this.db.insert(this.table).values({
        textContent,
      });
    } catch (error) {
      throw new errorUtils.DBError('Something went wrong on setting entry');
    }
  };
}

export const hourlyCBRFEntriesService = new HourlyEntriesService(
  hourlyOEREntries,
);
