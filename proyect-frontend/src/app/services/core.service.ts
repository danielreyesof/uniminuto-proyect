import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  public urlServicesBD = 'https://backend-uniminuto-project.herokuapp.com/api';
  // public urlServicesBD = '/api';

  isLoading: boolean = false;

  constructor() {
    console.log('App - Ready ✅');
  }
}
