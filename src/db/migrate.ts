import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { db } from './db';

const applyMigrations = async () => {
  console.log('we do nothing here!!!!');
  // try {
  //   await migrate(db, {
  //     migrationsFolder: './src/db/migrations',
  //   });
  //   console.log('Migrations applied');
  // } catch (error) {
  //   console.log('error: ', error);
  // }
};

applyMigrations();
