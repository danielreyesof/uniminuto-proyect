import { TypeForm } from './../../../shared/interfaces/authForm';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  authForm!: FormGroup;
  @Input() options!: TypeForm;

  response: any;

  constructor(
    private readonly fb: FormBuilder,
    private _authservice: AuthService,
    private readonly router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    if (this.options.id === 'sign-in') {
      this.authForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
      });
    } else {
      this.authForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
      });
    }
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  async onSubmit() {
    const employeeId = Math.floor(100000 + Math.random() * 900000);
    const backAccount = Math.floor(10000000000 + Math.random() * 90000000000);
    const salary = Math.floor(100000 + Math.random() * 900000);
    const positions = [
      'Jefe',
      'Gerente',
      'Supervisor',
      'Recursos humanos',
      'Coordinador',
      'Consultant',
    ];
    const bank = [
      'Bancolombia',
      'Davivienda',
      'BBVA',
      'Banco de Bogota',
      'Banco Caja Social',
    ];
    const eps = [
      'Compensar',
      'Sanitas',
      'Colsubsidio',
      'Famisanar',
      'Salud Total',
      'Nueva Eps',
    ];
    const pensiones = ['Colfondos', 'Porvenir', 'Colpensiones'];

    let credentials = this.authForm.value;

    credentials = {
      ...credentials,
      employeeId,
      position: positions[this.getRandomInt(5)],
      backAccount,
      salary,
      bank: bank[this.getRandomInt(4)],
      eps: eps[this.getRandomInt(5)],
      pensionFund: pensiones[this.getRandomInt(2)],
    };

    if (credentials.firstName == '' || credentials.lastName == '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Registro de usuario',
        detail: 'Por favor complete los campos',
      });
    } else {
      if (this.options.id === 'sign-in') {
        await this._authservice
          .signIn(credentials)
          .then((res) => {
            this.redirectUser();
            this.response = res;
          })
          .catch(({ error }) => {
            console.log(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Inicio de sesion',
              detail: error.message,
            });
            return throwError(() => new Error(error));
          });
      } else {
        await this._authservice
          .signUp(credentials)
          .then((res) => {
            this.redirectUser();
            this.response = res;
          })
          .catch((error) => {
            console.log(error);

            return throwError(() => new Error(error));
          });
      }
    }
  }

  private redirectUser(): void {
    this.router.navigate(['/home']);
  }
}
