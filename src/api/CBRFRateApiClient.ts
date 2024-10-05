import { fetcher } from './fetcher';

export class CBRFRateApiClient {
  private URL = 'https://www.cbr.ru/scripts/XML_daily.asp?date_req=';

  private getApiUrl = (date: string) => `${this.URL}${date}`;
  private fetcher = fetcher;

  async fetchRates(date: string): Promise<string> {
    const url = this.getApiUrl(date);
    console.log('url: ', url);

    return await this.fetcher<string>(url, 'CBRF');
  }
}
