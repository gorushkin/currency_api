import { CronJob } from 'cron';
import { oerrRateService } from '../services/OERRateService';
import { cbrfRateService } from '../services/CBRFRateService';
import { getCurrentDateTime } from '../utils/dates';

enum INTERVALS {
  HOUR = '0 0 * * * ',
  DAY = '0 9 * * *',
  MINUTE = '* * * * *',
  SECOND = '*/5 * * * * *',
}

getCurrentDateTime();

const onComplete = () => {
  console.log('updateRates', getCurrentDateTime());
};

export const updateHourlyRates = CronJob.from({
  cronTime: INTERVALS.HOUR,
  onTick: () => {
    oerrRateService.updateCurrentRates();
  },
  onComplete,
  start: true,
  timeZone: 'utc',
});

export const updateDailyRates = CronJob.from({
  cronTime: INTERVALS.HOUR,
  onTick: () => {
    const promises = [
      cbrfRateService.updateYesterdayRates(),
      oerrRateService.updateYesterdayRates(),
    ];

    Promise.all(promises);
  },
  onComplete,
  start: true,
  timeZone: 'utc',
});
