import { appStart } from './app';
import { config } from './config';
import { updateDailyRates, updateHourlyRates } from './updater';
import { logger } from './utils/logger';

const startApp = async () => {
  await appStart(config.APP_PORT);
  updateHourlyRates.start();
  updateDailyRates.start();
  logger.log('app')(`App started on port ${config.APP_PORT}`);
};

startApp();
