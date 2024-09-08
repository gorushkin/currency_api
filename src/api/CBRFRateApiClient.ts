import axios from 'axios';
import { getCurrentDate } from '../utils';
import { Response } from './types';

export class CBRFRateApiClient {
  private URL = 'https://www.cbr.ru/scripts/XML_daily.asp?date_req=';

  protected getApiUrl = (date: string) => `${this.URL}${date}`;

  async fetchTodayRates(): Promise<Response<string>> {
    const today = getCurrentDate();
    const url = this.getApiUrl(today);

    try {
      const {data} = await axios<string>(url);

      return { ok: true, data };
    } catch (error) {
      console.error('Error fetching CBRF rate', error);
      return { ok: false, error: 'Something went wrong' };
    }
  }
}
