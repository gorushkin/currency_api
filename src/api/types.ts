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
  children: CurrencyArray;
};

type StringContent = {
  content: string;
};

export type CurrencyArray = [
  { NumCode: StringContent },
  { CharCode: StringContent },
  { Nominal: StringContent },
  { Name: StringContent },
  { Value: StringContent },
  { VunitRate: StringContent },
];

export type CBRFCurrency = {
  NumCode: StringContent;
  CharCode: StringContent;
  Nominal: StringContent;
  Name: StringContent;
  Value: StringContent;
  VunitRate: StringContent;
};

export type Rates = Record<string, number>;

export enum Currency {
  EUR = 'EUR',
  USD = 'USD',
  NZD = 'NZD',
  TRY = 'TRY',
  CNY = 'CNY',
  RUB = 'RUB',
}

export type RatesInfo = {
  rates: Rates;
  base: string;
  date: string;
};

export type Response<T> = { ok: true; data: T } | { ok: false; error: string };
