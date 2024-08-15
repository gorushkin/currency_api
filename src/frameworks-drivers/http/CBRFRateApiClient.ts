import axios from 'axios';
import { convertXML } from 'simple-xml-to-json';
import { getCurrentDate } from '../../utils';

const URL = 'https://www.cbr.ru/scripts/XML_daily.asp?date_req=';

const getApiUrl = (date: string) => `${URL}${date}`;

type ParsedData = {
  ValCurs: {
    Date: string;
    children: Children[];
  };
};

type Children = {
  Valute: Valute;
};

type Valute = {
  ID: string;
  children: Currency[];
};

type StringContent = {
  content: string;
};

type Currency = {
  NumCode?: StringContent;
  CharCode?: StringContent;
  Nominal?: StringContent;
  Name?: StringContent;
  Value?: StringContent;
  VunitRate?: StringContent;
};

type UpdatedCurr = {
  numCode: string;
  charCode: string;
  nominal: string;
  name: string;
  value: string;
  vunitRate: string;
};

export class CBRFRateApiClient {
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

  async fetchTodayRates() {
    const today = getCurrentDate();

    try {
      const { data } = await axios(getApiUrl(today));

      return this.convertXML(data)
    } catch (error) {
      return 'null';
    }
  }
}
