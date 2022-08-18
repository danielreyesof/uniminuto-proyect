import { readFiles } from './../../../shared/file';
import { TypeForm } from './../../../shared/interfaces/authForm';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  authForm!: FormGroup;
  @Input() options!: TypeForm;

  response: any;

  public readFiles = readFiles;

  constructor(
    private readonly fb: FormBuilder,
    private _authservice: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.readFiles();
  }

  private initForm(): void {
    if (this.options.id === 'sign-in') {
      this.authForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
      });
    } else {
      this.authForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
      });
    }
  }

  async onSubmit() {
    const credentials = this.authForm.value;
    console.log(credentials);

    if (this.options.id === 'sign-in') {
      await this._authservice
        .signIn(credentials)
        .then((res) => {
          console.log(res);
          this.redirectUser();
          this.response = res;
        })
        .catch((error) => {
          console.log(error);
          return throwError(() => new Error(error));
        });
    } else {
      await this._authservice
        .signUp(credentials)
        .then((res) => {
          console.log(res);

          this.redirectUser();
          this.response = res;
        })
        .catch((error) => {
          console.log(error);

          return throwError(() => new Error(error));
        });
    }
  }

  private redirectUser(): void {
    this.router.navigate(['/home']);
  }
}
