import * as dotenv from 'dotenv';

dotenv.config();

const APP_PORT = Number(process.env.PORT) || 4500;
const APP_ID = process.env.APP_ID;
const DB_URL = process.env.DB_URL;
const LOG_URL = process.env.LOG_URL;

export const config = { APP_PORT, APP_ID, DB_URL, LOG_URL };
