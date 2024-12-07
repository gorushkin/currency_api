import { CBRFRateApiClient } from '../api/CBRFRateApiClient';
import { convertXML } from 'simple-xml-to-json';
import { ParsedData, Rates, RatesInfo, CBRFCurrency } from '../api/types';
import { getCBRFDate } from '../utils';
import { ValidationError } from '../utils';
import { dailyCbrfRates } from '../entities';
import { RateService } from './RateService';
import {
  getCurrentDateTime,
  getResponseFormattedDate,
  getYesterdayDate,
} from '../utils/dates';
import { logger } from '../utils/logger';

const ERROR_RESPONSE = 'Error in parameters';
const cbrfLogger = logger.log('cbrfLogger');

class CBRFRateService extends RateService {
  private apiClient = new CBRFRateApiClient();
  private db = dailyCbrfRates;

  private convertXML = (data: string) => {
    const myJson = convertXML(data) as unknown as ParsedData;

    if (
      !myJson.ValCurs ||
      !myJson.ValCurs.children ||
      myJson.ValCurs?.content === ERROR_RESPONSE
    ) {
      throw new ValidationError('Invalid data format');
    }

    const valCursChildren = myJson.ValCurs.children;

    const convertedData: Rates = valCursChildren.reduce((acc, children) => {
      const valuteChildren = children.Valute.children;

      const params = valuteChildren.reduce<CBRFCurrency>((acc, item) => {
        const key = Object.keys(item)[0] as keyof CBRFCurrency;
        acc[key] = (item as any)[key] as CBRFCurrency[keyof CBRFCurrency];
        return acc;
      }, {} as CBRFCurrency);

      return {
        ...acc,
        [params.CharCode.content]: parseFloat(
          params.Value.content.replace(',', '.'),
        ),
      };
    }, {});

    return convertedData;
  };

  prepareData(data: string, ratesDate: string): RatesInfo {
    const rates = this.convertXML(data);

    const requestDate = getCurrentDateTime();

    return { base: 'RUB', rates, ratesDate, requestDate };
  }

  async getCurrentDayRates(): Promise<RatesInfo> {
    const date = getCurrentDateTime();
    cbrfLogger(`FETCH CBRF CURRENT RATES ${date}`);

    return this.getRates(date);
  }

  async getRatesByDate(date: string): Promise<RatesInfo> {
    this.validateDate(date);
    cbrfLogger(`FETCH CBRF RATES BY DATE  ${date}`);

    return this.getRates(date);
  }

  async getRatesByDates(dates: string[]): Promise<RatesInfo[]> {
    cbrfLogger(`FETCH CBRF RATES BY DATE  ${dates.length}`);

    const promises = dates.map((date) => this.getRates(date));

    return Promise.all(promises);
  }

  getRates = async (date: string): Promise<RatesInfo> => {
    const entry = await this.db.getEntry(date);

    if (entry) {
      return entry;
    }

    const cbrfDate = getCBRFDate(date);

    const response = await this.apiClient.fetchRates(cbrfDate);
    const ratesDate = getResponseFormattedDate(date);

    const rates = await this.prepareData(response, ratesDate);

    await this.db.setEntry(date, rates);

    return rates;
  };

  async updateYesterdayRates(): Promise<RatesInfo> {
    const yesterdayDate = getYesterdayDate();

    return this.getRatesByDate(yesterdayDate);
  }
}

export const cbrfRateService = new CBRFRateService();
