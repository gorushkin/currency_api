import axios from 'axios';
import { errorUtils } from '../utils';

export class CBRFRateApiClient {
  private URL = 'https://www.cbr.ru/scripts/XML_daily.asp?date_req=';

  protected getApiUrl = (date: string) => `${this.URL}${date}`;

  async fetchRates(date: string): Promise<string> {
    const url = this.getApiUrl(date);

    try {
      const { data } = await axios<string>(url);

      return data;
    } catch (error) {
      throw new errorUtils.APIError('Error fetching CBRF rate');
    }
  }
}
