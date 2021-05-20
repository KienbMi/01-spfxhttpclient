// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

export type FieldUrlValue = {
  [name: string]: {
    Description: string,
    Url: string
  }
};

export interface ICountryListItem {
  Id: string;
  Title: string;
  Capital: string;
  Flag: FieldUrlValue;
  FlagUrl: string;
  MoreInfo: string;
}