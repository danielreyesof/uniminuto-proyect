import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
}

@Injectable({ providedIn: 'root' })
export class AuthGuardIn implements CanActivate {
  constructor(
    private readonly router: Router // private _authService: AuthService
  ) {}

  canActivate(): boolean {
    // console.log(this._authService.setUser);

    if (!localStorage.getItem('session_t')) {
      this.router.navigate(['/sign-in']);
      return false;
    }
    return true;
  }
}
