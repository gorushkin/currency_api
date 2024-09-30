import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { client, db } from './db';
import { a } from '@electric-sql/pglite/dist/pglite-0lWrV3Ip';

 const applyMigrations = async () => {
  await migrate(db, {
    migrationsFolder: './src/db/migrations',
  });
};


applyMigrations();
