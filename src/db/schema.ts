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
      id: integer('id').primaryKey({ autoIncrement: true }).unique(),
      date: text('date').unique().default(sql`(CURRENT_DATE)`),
      textContent: text('text_content').notNull(),
      createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
      updatedAt: text('updated_at')
        .default(sql`(CURRENT_TIMESTAMP)`)
        .$onUpdateFn(() => sql`(CURRENT_TIMESTAMP)`),
    },
    (table) => ({ dateIndex: uniqueIndex(`${name}_dateIndex`).on(table.date) }),
  );

export const dailyCBRFEntries =
  getDailyEntriesTableConfig('daily_cbrf_entries');

export const dailyOEREntries = getDailyEntriesTableConfig('daily_oer_entries');

export type DailyTable = typeof dailyCBRFEntries | typeof dailyOEREntries;

export const hourlyOEREntries = sqliteTable('hourly_oer_entries', {
  id: integer('id').primaryKey({ autoIncrement: true }).unique(),
  timestamp: text('timestamp').unique().default(sql`(CURRENT_TIMESTAMP)`),
  textContent: text('text_content').notNull(),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdateFn(() => sql`(CURRENT_TIMESTAMP)`),
});


export type HourlyTable = typeof hourlyOEREntries;
