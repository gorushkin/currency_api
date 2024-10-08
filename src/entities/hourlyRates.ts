import { RatesInfo } from '../api/types';
import { hourlyOEREntries, HourlyTable } from '../db/schema';
import { DBError } from '../utils';
import { Rates } from './rates';
import { desc } from 'drizzle-orm';

export class HourlyRates extends Rates {
  private table: HourlyTable;

  constructor(table: HourlyTable) {
    super();
    this.table = table;
  }

  getLastEntries = async (
    limit: number = 48,
  ): Promise<RatesInfo[] | undefined> => {
    try {
      const entries = await this.db
        .select({ textContent: this.table.textContent })
        .from(this.table)
        .orderBy(desc(this.table.id))
        .limit(limit);

      if (entries.length) {
        return entries.map((entry) => JSON.parse(entry.textContent));
      }
    } catch (error) {
      throw new DBError('Something went wrong on getting entry');
    }
  };

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
      throw new DBError('Something went wrong on getting entry');
    }
  };

  addEntry = async (rates: RatesInfo) => {
    const textContent = JSON.stringify(rates);

    try {
      await this.db.insert(this.table).values({
        textContent,
      });
    } catch (error) {
      throw new DBError('Something went wrong on setting entry');
    }
  };
}

export const hourlyOerRates = new HourlyRates(hourlyOEREntries);
