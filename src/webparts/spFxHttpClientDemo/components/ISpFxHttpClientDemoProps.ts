// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { SPHttpClient } from '@microsoft/sp-http';

import {
  ButtonClickedCallback,
  InputTextChangedCallback,
  ICountryListItem
} from '../../../models';

export interface ISpFxHttpClientDemoProps {
  spHttpClient: SPHttpClient;
  siteUrl:string;
}
