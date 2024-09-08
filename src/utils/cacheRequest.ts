import { AxiosPromise } from 'axios';

type MyPromise = <T>(url: string) => AxiosPromise<T>;

export class DataCache<T> {
  PERIOD = 1000 * 60 * 60; // 1 hour
  promise: MyPromise;

  constructor(promise: MyPromise) {
    this.promise = promise;
  }

  private cache: {
    [key: string]: {
      response: T;
      timestamp: number;
    };
  } = {};

  private async request(url: string): Promise<T> {
    const response = await this.promise<T>(url);
    this.set(url, response.data);
    return response.data;
  }

  async get(url: string): Promise<T> {
    if (!this.cache[url]) {
      return this.request(url);
    }

    const { response, timestamp } = this.cache[url];

    if (Date.now() - timestamp > this.PERIOD) {
      return this.request(url);
    }

    return Promise.resolve(response);
  }

  set(key: string, value: T) {
    this.cache[key] = {
      response: value,
      timestamp: Date.now(),
    };
  }
}
