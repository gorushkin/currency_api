import { RatesInfo } from '../api/types';
import { db } from '../db';
import { dailyCBRFEntries, dailyOEREntries, DailyTable } from '../db/schema';
import { eq } from 'drizzle-orm';

class DailyEntriesService {
  private db = db;
  private table: DailyTable;
  constructor(table: DailyTable) {
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
      console.log('error: ', error);
    }
  };

  setEntry = async (date: string, rates: RatesInfo) => {
    const textContent = JSON.stringify(rates);

    await this.db.insert(this.table).values({
      date,
      textContent,
    });
  };
}

export const dailyCBRFEntriesService = new DailyEntriesService(
  dailyCBRFEntries,
);

export const dailyOEREntriesService = new DailyEntriesService(dailyOEREntries);
