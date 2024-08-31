export type ParsedData = {
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
  children: CBRFCurrency[];
};

type StringContent = {
  content: string;
};

type CBRFCurrency = {
  NumCode?: StringContent;
  CharCode?: StringContent;
  Nominal?: StringContent;
  Name?: StringContent;
  Value?: StringContent;
  VunitRate?: StringContent;
};

export type CurrencyType = {
  name: string;
  code: string;
  rate: number;
  baseCurrency: string;
};

export enum Currency {
  EUR = 'eur',
  USD = 'usd',
  NZD = 'nzd',
  TRY = 'try',
  CNY = 'cny',
  RUB = 'rub',
}
