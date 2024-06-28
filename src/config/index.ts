import * as dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env.PORT) ?? 4500;

export const config = { PORT };
