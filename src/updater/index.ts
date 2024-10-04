import cron from 'node-cron';

enum INTERVALS {
  HOUR = '0 * * * *',
  DAY = '0 9 * * *',
  MINUTE = '* * * * *',
}

export const updater = async () => {
  cron.schedule(INTERVALS.MINUTE, async () => {
    console.log('sdfasd');
  });
};
