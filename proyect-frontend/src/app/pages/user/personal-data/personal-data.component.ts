import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss'],
})
export class PersonalDataComponent implements OnInit {
  isLoading: boolean = true;
  hasError: boolean = false;

  userData: any;

  personalDataForm!: FormGroup;

  firstName: any = [];
  lastName: any = [];
  email: any = [];
  roles: any = [];

  constructor(
    private authService: AuthService,
    private readonly fb: FormBuilder,
    private formBuilder: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    this.initForm();
    await this.authService.verifyToken().subscribe({
      next: (res) => {
        console.log(res);

        this.userData = res.user;
        this.personalDataForm = this.formBuilder.group({
          firstName: [this.userData.firstName],
          lastName: [this.userData.lastName],
          employeeId: [this.userData.employeeId],
          position: [this.userData.position],
          backAccount: [this.userData.backAccount],
          salary: [this.userData.salary],
          bank: [this.userData.bank],
          eps: [this.userData.eps],
          pensionFund: [this.userData.pensionFund],
          email: [this.userData.email],
          roles: [this.userData.roles],
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  private initForm(): void {
    this.personalDataForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      employeeId: [''],
      position: [''],
      backAccount: [''],
      salary: [''],
      bank: [''],
      eps: [''],
      pensionFund: [''],
      email: [''],
      roles: [''],
    });
  }
}
