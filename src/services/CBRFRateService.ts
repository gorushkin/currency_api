import { CBRFRateApiClient } from '../api/CBRFRateApiClient';
import { convertXML } from 'simple-xml-to-json';
import { ParsedData, CurrencyType } from '../api/types';

export class CBRFRateService {
  private apiClient: CBRFRateApiClient;

  constructor() {
    this.apiClient = new CBRFRateApiClient();
  }

  convertXML = (data: string) => {
    const myJson = convertXML(data) as unknown as ParsedData;
    const children = myJson.ValCurs.children;

    const convertedData: CurrencyType[] = children.map((item) => ({
      name: item.Valute.children[1].CharCode?.content || '',
      code: item.Valute.children[0].NumCode?.content || '',
      rate: Number(item.Valute.children[3].Value?.content) || 0,
      baseCurrency: 'rub',
    }));

    return convertedData;
  };

  async getCurrentRates() {
    const data = await this.apiClient.fetchTodayRates();

    if (!data) {
      throw new Error('Data is empty');
    }

    return this.convertXML(data);
  }
}
