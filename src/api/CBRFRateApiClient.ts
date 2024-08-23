import axios, { AxiosResponse } from 'axios';
import { getCurrentDate } from '../utils';

const URL = 'https://www.cbr.ru/scripts/XML_daily.asp?date_req=';

const getApiUrl = (date: string) => `${URL}${date}`;

export class CBRFRateApiClient {
  async fetchTodayRates(): Promise<string | null> {
    const today = getCurrentDate();

    try {
      const res = await axios<string>(getApiUrl(today));

      return res.data
    } catch (error) {
      return null;
    }
  }
}
