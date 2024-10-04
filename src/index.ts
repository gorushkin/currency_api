import { appStart } from './app';
import { config } from './config';
import { updater } from './updater';

const startApp = async () => {
  await appStart(config.PORT);
  updater();
};

startApp();
