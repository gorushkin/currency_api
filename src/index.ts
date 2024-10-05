import { appStart } from './app';
import { config } from './config';
import { updateHourlyRates } from './updater';

const startApp = async () => {
  await appStart(config.PORT);
  updateHourlyRates.start();
};

startApp();
