import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

import { IDadataAddressServerResponse } from '../interfaces/idadata-address-server-response';
import { IDadataSuggestion } from '../interfaces/idadata-suggestion';

@Injectable()
export class DadataService {

  private readonly _TOKEN = '8b7731722b31e8c5dcb0f72dfd457e9e7041512f';
  private readonly _API_URL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';

  public suggestAddress(query: string, count?: number): Promise<IDadataSuggestion[]> {
    if (!count) {
      count = 5;
    }
    return this._http.post<IDadataAddressServerResponse>(this._API_URL, {
      query: query,
      count: count
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Token ' + this._TOKEN
      }),
      observe: 'body',
      responseType: 'json'
    }).toPromise()
    .then((res: IDadataAddressServerResponse) => {
      return res.suggestions;
    })
    .catch((err: Error) => {
      console.error(err);
      return Promise.reject(err);
    });
  }
  constructor(private _http: HttpClient) { }

}
