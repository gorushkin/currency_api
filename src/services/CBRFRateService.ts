import { CBRFRateApiClient } from '../api/CBRFRateApiClient';
import { convertXML } from 'simple-xml-to-json';
import { ParsedData, Rates, RatesInfo, CBRFCurrency } from '../api/types';
import { getCBRFDate } from '../utils';
import { AppError } from '../utils';
import { dailyCBRFEntriesService } from '../database';
import { RateService } from './RateService';
import { getCurrentDateTime, getResponseFormattedDate } from '../utils/dates';

const ERROR_RESPONSE = 'Error in parameters';

class CBRFRateService extends RateService {
  private apiClient = new CBRFRateApiClient();
  private db = dailyCBRFEntriesService;

  private convertXML = (data: string) => {
    const myJson = convertXML(data) as unknown as ParsedData;

    if (
      !myJson.ValCurs ||
      !myJson.ValCurs.children ||
      myJson.ValCurs?.content === ERROR_RESPONSE
    ) {
      throw new AppError.ValidationError('Invalid data format');
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

  async getCurrentRates(): Promise<RatesInfo> {
    const date = getCurrentDateTime();

    return this.getRates(date);
  }

  async getRatesByDate(date: string): Promise<RatesInfo> {
    this.validateDate(date);

    return this.getRates(date);
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
}

export const cbrfRateService = new CBRFRateService();
