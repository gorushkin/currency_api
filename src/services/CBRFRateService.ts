import { CBRFRateApiClient } from '../api/CBRFRateApiClient';
import { convertXML } from 'simple-xml-to-json';
import { ParsedData, UpdatedCurr } from '../api/types';

export class CBRFRateService {
  private apiClient: CBRFRateApiClient;

  constructor() {
    this.apiClient = new CBRFRateApiClient();
  }

  convertXML = (data: string) => {
    const myJson = convertXML(data) as unknown as ParsedData;
    const children = myJson.ValCurs.children;

    const convertedData: UpdatedCurr[] = children.map((item) => ({
      charCode: item.Valute.children[1].CharCode?.content || '',
      name: item.Valute.children[3].Name?.content || '',
      nominal: item.Valute.children[2].Nominal?.content || '',
      numCode: item.Valute.children[0].NumCode?.content || '',
      value: item.Valute.children[4].Value?.content || '',
      vunitRate: item.Valute.children[5].VunitRate?.content || '',
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
