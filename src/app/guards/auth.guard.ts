import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}

@Injectable({ providedIn: 'root' })
export class AuthGuardIn implements CanActivate {
  constructor(private readonly router: Router) {}

  canActivate(): boolean {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/sign-in']);
      return false;
    }
    return true;
  }
}
