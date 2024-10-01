import { CBRFRateApiClient } from '../api/CBRFRateApiClient';
import { convertXML } from 'simple-xml-to-json';
import { ParsedData, Rates, RatesInfo, CBRFCurrency } from '../api/types';
import { getCurrentDate } from '../utils';
import { getCBRFDate, validateDate } from '../utils';
import { error } from '../utils';
import { dailyCBRFEntriesService } from '../database';

const ERROR_RESPONSE = 'Error in parameters';

export class CBRFRateService {
  private apiClient = new CBRFRateApiClient();
  private dailyCBRFEntriesService = dailyCBRFEntriesService;

  convertXML = (data: string) => {
    const myJson = convertXML(data) as unknown as ParsedData;

    if (
      !myJson.ValCurs ||
      !myJson.ValCurs.children ||
      myJson.ValCurs?.content === ERROR_RESPONSE
    ) {
      throw new error.ValidationError('Invalid data format');
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

  private validateDate(dateString: string) {
    const isValidDate = validateDate(dateString);

    if (!isValidDate) {
      throw new error.ValidationError('Invalid date format: use YYYY-MM-DD');
    }
  }

  private async getRates(
    response: { data: string },
    date: string,
  ): Promise<RatesInfo> {
    const rates = this.convertXML(response.data);

    return { base: 'RUB', rates, date };
  }

  async getCurrentRates(): Promise<RatesInfo> {
    const date = getCurrentDate();
    const cbrfDate = getCBRFDate(getCurrentDate());
    const response = await this.apiClient.fetchRates(cbrfDate);

    if (!response.ok) {
      throw new error.APIError(response.error);
    }

    return this.getRates(response, date);
  }

  async getRatesByDate(date: string): Promise<RatesInfo> {
    this.validateDate(date);

    const entry = await this.dailyCBRFEntriesService.getEntry(date);

    if (entry) {
      return entry;
    }

    const cbrfDate = getCBRFDate(date);

    const response = await this.apiClient.fetchRates(cbrfDate);

    if (!response.ok) {
      throw new error.APIError(response.error);
    }

    const rates = await this.getRates(response, date);

    await this.dailyCBRFEntriesService.setEntry(date, rates);

    return rates;
  }
}
