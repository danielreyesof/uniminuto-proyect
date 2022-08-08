import { readFiles } from './../../../shared/file';
import { TypeForm } from './../../../shared/interfaces/authForm';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  authForm!: FormGroup;
  @Input() options!: TypeForm;

  public readFiles = readFiles;

  constructor(
    private readonly fb: FormBuilder,
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
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
      });
    }
  }

  async onSubmit() {
    const credentials = this.authForm.value;
    console.log(credentials);

    if (this.options.id === 'sign-in') {
      localStorage.setItem('session_t', 'token');
      this.router.navigate(['/']);
    } else {
      localStorage.setItem('session_t', 'token');
      this.router.navigate(['/']);
    }
  }
}
