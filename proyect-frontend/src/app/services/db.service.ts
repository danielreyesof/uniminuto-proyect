import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor(private _http: HttpClient, private _coreservice: CoreService) {}

  getQuery<T>(path: string) {
    const URL = `${this._coreservice.urlServicesBD}/${path}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Expose-Headers': '*',
    });
    return this._http.get<T>(URL, { headers: headers });
  }

  getQueryById(path: string, id: any) {
    const URL = `${this._coreservice.urlServicesBD}/${path}/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Expose-Headers': '*',
    });
    return this._http.get(URL, { headers: headers });
  }

  postQuery<T>(path: string, postData?: any) {
    const URL = `${this._coreservice.urlServicesBD}/${path}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Expose-Headers': '*',
    });
    return this._http.post<T>(URL, postData, { headers: headers });
  }

  updQuery<T>(path: string, Data?: any, id?: string) {
    const URL = `${this._coreservice.urlServicesBD}/${path}/${id}`;
    // const URL = `api/${path}/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Expose-Headers': '*',
    });
    return this._http.put<T>(URL, Data, { headers: headers });
  }

  delQuery<T>(path: string, id?: string) {
    let URL = '';

    if (id) {
      URL = `${this._coreservice.urlServicesBD}/${path}/${id}`;
    } else {
      URL = `${this._coreservice.urlServicesBD}/${path}`;
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Expose-Headers': '*',
    });
    return this._http.delete<T>(URL, { headers: headers });
  }

  postQueryLogout(route: string, allData: any, filters?: string) {
    let headerContent = allData.headerContent;

    const URL = `${this._coreservice.urlServicesBD}/${route}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    }).set('authorization', headerContent);
    return this._http.post(URL, null, { headers: headers });
  }

  getAll(): Observable<any> {
    return this._http.get<any>('/api');
  }
}
