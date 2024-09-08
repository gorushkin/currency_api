import * as dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env.PORT) || 4500;
const APP_ID = process.env.APP_ID;

export const config = { PORT, APP_ID };
