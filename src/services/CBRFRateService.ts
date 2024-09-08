import { CBRFRateApiClient } from '../api/CBRFRateApiClient';
import { convertXML } from 'simple-xml-to-json';
import { ParsedData, Rates, RatesInfo, CBRFCurrency } from '../api/types';

type Qwe = {
  NumCode: string;
  CharCode: string;
  Nominal: string;
  Name: string;
  Value: string;
  VunitRate: string;
};

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

  async getCurrentRates(): Promise<RatesInfo> {
    const response = await this.apiClient.fetchTodayRates();

    if (!response.ok) {
      throw new Error(response.error);
    }

    const rates = this.convertXML(response.data);

    return { base: 'RUB', rates };
  }
}
