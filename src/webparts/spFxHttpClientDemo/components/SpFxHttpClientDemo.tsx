// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import styles from './SpFxHttpClientDemo.module.scss';
import { ISpFxHttpClientDemoProps } from './ISpFxHttpClientDemoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { imageProperties } from 'office-ui-fabric-react';

import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { ICountryListItem } from '../../../models';

export default class SpFxHttpClientDemo extends React.Component<ISpFxHttpClientDemoProps, {}> {

  private _countries: ICountryListItem[] = [];

  public render(): React.ReactElement<ISpFxHttpClientDemoProps> {
    return (
      <div className={styles.spFxHttpClientDemo}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <p className={styles.title}>Contries from SharePoint Content!</p>
              <a href="#" className={styles.button} onClick={this.onGetListItemsClicked}>
                <span className={styles.label}>Get All Counties</span>
              </a>
              <input className={styles.input} type="text" placeholder="Search..." onKeyDown={(event) => this.onSearchTextChanged(event)}/>
            </div>
          </div>

          <div className={styles.container}>
            <div className={styles.flex}>
              {this._countries &&
                this._countries.map((list) =>
                  <div key={list.Id} className={styles.divCountry}>
                      <img src={list.FlagUrl}></img>
                      <h2>{list.Title}</h2>
                      <h3>{list.Capital}</h3>
                      <a href={list.MoreInfo}>More info</a>
                  </div>                
                )
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

  private onGetListItemsClicked = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();

    this._onGetListItemsWithFilter();
  }

  private onSearchTextChanged(event: React.KeyboardEvent<HTMLInputElement>): void 
  {
    if (event.keyCode === 13)
    {     
      event.preventDefault();
      this._onGetListItemsWithFilter(event.currentTarget.value);
    }
  }

  private _onGetListItemsWithFilter = (searchText?: string): void => {
    this._getListItemsWithFilter(searchText)
      .then(response => {
        this._countries = response;
        this.setState( { searchText } );
      });
  }

  private _getListItemsWithFilter(searchText?: string): Promise<ICountryListItem[]> {
    let searchOption = '';

    if (searchText != null)
    {
      searchOption = `&$filter=substringof('${searchText}', Title)`;
    }

    return this.props.spHttpClient.get(
      this.props.siteUrl + `/_api/web/lists/getbytitle('Countries')/items?$select=Id,Title,Capital,Flag,FlagUrl,MoreInfo` + searchOption,
      SPHttpClient.configurations.v1)
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        return jsonResponse.value;
      }) as Promise<ICountryListItem[]>;
  }
}
