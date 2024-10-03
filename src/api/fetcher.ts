import axios from 'axios';
import { errorUtils } from '../utils';

export const fetcher = async <T>(url: string, source: string) => {
  try {
    const { data } = await axios<T>(url);
    console.log(`FETCH ${source} RATE`);

    return data;
  } catch (error) {
    throw new errorUtils.APIError(`Error fetching ${source} rate`);
  }
};
