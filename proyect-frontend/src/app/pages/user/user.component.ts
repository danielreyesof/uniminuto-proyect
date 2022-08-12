import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  
  menuItems: any[] = [
    {
        label: 'Mis datos personales',
        icon: '',
        routerLink: ['/app', 'user', 'personal'],
    },
    {
        label: 'Mis desprendibles',
        icon: '',
        routerLink: ['/app', 'user', 'detachables'],
    },
    {
        label: 'Mis preferencias',
        icon: '',
        routerLink: ['/app', 'user', 'preferences'],
    }
];

  constructor() { }

  ngOnInit(): void {
  }

}
