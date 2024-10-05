import { CronJob } from 'cron';
import { oerrRateService } from '../services/OERRateService';
import { cbrfRateService } from '../services/CBRFRateService';

enum INTERVALS {
  HOUR = '0 0 * * * ',
  DAY = '0 9 * * *',
  MINUTE = '* * * * *',
  SECOND = '*/30 * * * * *',
}


export const updateHourlyRates = CronJob.from({
  cronTime: INTERVALS.HOUR,
  onTick: async () => {
    await oerrRateService.getCurrentRates();
  },
  start: true,
  timeZone: 'utc',
});


export const updateDailyRates = CronJob.from({
  cronTime: INTERVALS.HOUR,
  onTick: async () => {
    await oerrRateService.updateCurrentRates();
    console.log('UPDATE!!!');
  },
  start: true,
  timeZone: 'utc',
});
