import { CronJob } from 'cron';
import { oerrRateService } from '../services/OERRateService';
import { cbrfRateService } from '../services/CBRFRateService';
import { logger } from '../utils/logger';

enum INTERVALS {
  HOUR = '0 * * * *',
  DAY_MORNING = '0 9 * * *',
  DAY_START = '0 1 * * *',
  MINUTE = '* * * * *',
  SECOND = '*/5 * * * * *',
}

const updateLogger = logger.log('updateRates');

export const updateHourlyRates = CronJob.from({
  cronTime: INTERVALS.HOUR,
  onTick: () => {
    oerrRateService.updateCurrentRates();
    updateLogger('updateCurrentRates');
  },
  start: true,
  timeZone: 'utc',
});

export const updateDailyRates = CronJob.from({
  cronTime: INTERVALS.DAY_START,
  onTick: () => {
    const promises = [
      cbrfRateService.updateYesterdayRates(),
      oerrRateService.updateYesterdayRates(),
    ];

    Promise.all(promises);
    updateLogger('updateDailyRates');
  },
  start: true,
  timeZone: 'utc',
});
