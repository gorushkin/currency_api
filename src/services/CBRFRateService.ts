import { CBRFRateApiClient } from '../api/CBRFRateApiClient';
import { convertXML } from 'simple-xml-to-json';
import { ParsedData, Rates, RatesInfo, CBRFCurrency } from '../api/types';
import { Response } from '../api/types';
import { getCurrentDate } from '../utils';

export class CBRFRateService {
  private apiClient = new CBRFRateApiClient();

  convertXML = (data: string) => {
    const myJson = convertXML(data) as unknown as ParsedData;

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

  async getRates(response: Response<string>, date: string): Promise<RatesInfo> {
    if (!response.ok) {
      throw new Error(response.error);
    }

    const rates = this.convertXML(response.data);

    return { base: 'RUB', rates, date };
  }

  async getCurrentRates(): Promise<RatesInfo> {
    const date = getCurrentDate();
    const response = await this.apiClient.fetchRates(date);

    return this.getRates(response, date);
  }

  async getRatesByDate(date: string): Promise<RatesInfo> {
    const response = await this.apiClient.fetchRates(date);

    return this.getRates(response, date);
  }
}
