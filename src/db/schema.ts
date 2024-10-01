import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

const getDailyEntriesTableConfig = (name: string) =>
  sqliteTable(
    name,
    {
      date: text('date').primaryKey().notNull().unique(),
      textContent: text('text_content').notNull(),
      createdAt: integer('created_at').default(sql`(strftime('%s', 'now'))`),
      updatedAt: integer('updated_at')
        .default(sql`(strftime('%s', 'now'))`)
        .$onUpdateFn(() => sql`(strftime('%s', 'now'))`),
    },
    (table) => ({ dateIndex: uniqueIndex(`${name}_dateIndex`).on(table.date) }),
  );

export const dailyCBRFEntries =
  getDailyEntriesTableConfig('daily_cbrf_entries');

export const dailyOEREntries = getDailyEntriesTableConfig('daily_oer_entries');

export type DailyTable = typeof dailyCBRFEntries | typeof dailyOEREntries;
