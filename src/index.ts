import { appStart } from './app';
import { config } from './config';
import { updateDailyRates, updateHourlyRates } from './updater';

const startApp = async () => {
  await appStart(config.PORT);
  updateHourlyRates.start();
  updateDailyRates.start();
};

startApp();
