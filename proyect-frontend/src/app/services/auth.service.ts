import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _db: DbService) {}

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
    return new Promise(function (resolve, reject) {
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
}
