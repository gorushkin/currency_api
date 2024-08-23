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
  children: Currency[];
};

type StringContent = {
  content: string;
};

type Currency = {
  NumCode?: StringContent;
  CharCode?: StringContent;
  Nominal?: StringContent;
  Name?: StringContent;
  Value?: StringContent;
  VunitRate?: StringContent;
};

export type UpdatedCurr = {
  numCode: string;
  charCode: string;
  nominal: string;
  name: string;
  value: string;
  vunitRate: string;
};
