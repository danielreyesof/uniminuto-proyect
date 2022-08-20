import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserInfo } from 'src/app/shared/interfaces/authForm';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
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
  ];

  userData: any;

  constructor(private authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    await this.authService.verifyToken().subscribe((res: any) => {
      console.log(res);

      this.userData = res.user;
    });

    // console.log(this.userData);
  }
}
