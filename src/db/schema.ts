import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const dailyEntries = sqliteTable('daily_entries', {
  date: text('date').primaryKey(),
  textContent: text('text_content').notNull(),
  createdAt: integer('created_at').default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer('updated_at')
    .default(sql`(strftime('%s', 'now'))`)
    .$onUpdateFn(() => sql`(strftime('%s', 'now'))`),
});
