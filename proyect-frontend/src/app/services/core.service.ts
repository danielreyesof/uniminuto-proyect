import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  public urlServicesBD = 'http://localhost:4003/api';
  // public urlServicesBD = '/api';

  isLoading: boolean = false;

  constructor() {
    console.log('App - Ready ✅');
  }
}
