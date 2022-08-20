import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { UserInfo } from '../shared/interfaces/authForm';
import { CoreService } from './core.service';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  headerProperty: any;

  constructor(
    private _db: DbService,
    private http: HttpClient,
    private _coreService: CoreService
  ) {}
  public setUser() {
    const session = localStorage.getItem('token');
    return session;
  }

  public signUp(credentials: any) {
    let vm = this;
    return new Promise(function (resolve, reject) {
      vm._db.postQuery('auth/signup', credentials).subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);
          return resolve(res);
        },
        error: (e: HttpErrorResponse) => reject(e),
      });
    });
  }

  public signIn(credentials: any) {
    let vm = this;
    return new Promise(function (resolve, reject) {
      vm._db.postQuery('auth/signin', credentials).subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);
          return resolve(res);
        },
        error: (e: HttpErrorResponse) => reject(e),
      });
    });
  }

  public signOut() {
    let vm = this;
    return new Promise((resolve, reject) => {
      vm._db
        .postQueryLogout('auth/signout', {
          header: 'authorization',
          headerContent: vm.setUser(),
        })
        .subscribe({
          next: (res: any) => {
            localStorage.removeItem('token');
            return resolve(res);
          },
          error: (e: HttpErrorResponse) => reject(e),
        });
    });
  }

  public verifyToken() {
    const options = {
      headers: new HttpHeaders().append('authorization', `${this.setUser()}`),
    };

    if (this.userData) {
      return of(this.userData);
    } else {
      return this.http
        .get<UserInfo>(
          `${this._coreService.urlServicesBD}/auth/verifytoken`,
          options
        )
        .pipe((data) => {
          data.subscribe((d) => (this.userData = d));
          return data;
        });
    }
  }
}
