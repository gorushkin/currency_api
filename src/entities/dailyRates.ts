import { RatesInfo } from '../api/types';
import { dailyCBRFEntries, dailyOEREntries, DailyTable } from '../db/schema';
import { eq } from 'drizzle-orm';
import { DBError } from '../utils';
import { Rates } from './rates';

export class DailyRates extends Rates {
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
      throw new DBError('Something went wrong on getting entry');
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
      throw new DBError('Something went wrong on setting entry');
    }
  };
}

export const dailyCbrfRates = new DailyRates(
  dailyCBRFEntries,
);

export const dailyOerRates = new DailyRates(dailyOEREntries);
