import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'; // ES 2015
import utc from 'dayjs/plugin/utc';

dayjs.extend(customParseFormat);
dayjs.extend(utc);

const INPUT_DATE_FORMAT = 'YYYY-MM-DD';
const CBRF_DATE_FORMAT = 'DD.MM.YYYY';
const CURRENT_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const utcDayjs = () => dayjs().utc();

export const getCurrentDate = (): string =>
  utcDayjs().format(INPUT_DATE_FORMAT);

export const getCurrentDateTime = (): string =>
  utcDayjs().format(CURRENT_DATE_FORMAT);

export const getYesterdayDate = (): string =>
  utcDayjs().subtract(1, 'day').format(INPUT_DATE_FORMAT);

export const validateDate = (dateString: string) =>
  dayjs(dateString, INPUT_DATE_FORMAT, true).isValid();

const formatDate = (format: string) => (date: string) =>
  dayjs(date).format(format);

export const getCBRFDate = (dateString: string) =>
  formatDate(CBRF_DATE_FORMAT)(dateString);

export const getResponseFormattedDate = (dateString: string) =>
  formatDate(CURRENT_DATE_FORMAT)(dateString);
