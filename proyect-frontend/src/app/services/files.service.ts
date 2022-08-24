import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { UserInfo } from '../shared/interfaces/authForm';
import { CoreService } from './core.service';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(
    private _db: DbService,
    private http: HttpClient,
    private _coreService: CoreService
  ) {}

  filesData: any;

  public setUser() {
    const session = localStorage.getItem('token');
    return session;
  }

  public downloadFile(_id: string) {
    const url = `${this._coreService.urlServicesBD}/files/download?_id=${_id}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Expose-Headers': '*',
    }).set('authorization', `${this.setUser()}`);

    return this.http
      .get(url, { headers: headers, responseType: 'blob' as 'json' })
      .pipe(map((res: any) => res));
  }

  public getFiles() {
    const options = {
      headers: new HttpHeaders().append('authorization', `${this.setUser()}`),
    };

    if (this.filesData) {
      return of(this.filesData);
    } else {
      return this.http
        .get<UserInfo>(
          `${this._coreService.urlServicesBD}/files/counter`,
          options
        )
        .pipe((data) => {
          data.subscribe((d) => (this.filesData = d));
          return data;
        });
    }
  }

  public getUpload() {
    let vm = this;
    return new Promise(function (resolve, reject) {
      vm._db.readService('files/counter').subscribe((data: any) => {
        resolve(data);
      });
    });
  }

  public generateFiles(data: any) {
    let vm = this;
    return new Promise(function (resolve, reject) {
      vm._db.addService('pdf/generate', data).subscribe((data: any) => {
        resolve(data);
      });
    });
  }
}
