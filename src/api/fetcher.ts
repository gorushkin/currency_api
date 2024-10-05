import axios from 'axios';
import { AppError } from '../utils';
import { logger } from '../utils/logger';

const fetchLogger = logger.log('fetchLogger');
export const fetcher = async <T>(url: string, source: string) => {
  try {
    const { data } = await axios<T>(url);
    fetchLogger(`FETCH ${source} RATE`);

    return data;
  } catch (error) {
    throw new AppError.APIError(`Error fetching ${source} rate`);
  }
};
