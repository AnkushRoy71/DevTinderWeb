import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { LabelModule } from 'primeng/label';
import { LoginRequestModel } from '../models/login.model';
import { form, required, email, minLength, FormField } from '@angular/forms/signals';
import { Auth } from '../auth';

@Component({
  imports: [CardModule, ButtonModule, InputTextModule, LabelModule, FormField],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export default class Login {
  authService = inject(Auth);
  loginModel = signal<LoginRequestModel>({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (schema) => {
    required(schema.email);
    email(schema.email);
    required(schema.password);
    minLength(schema.password, 6);
  });

  onSubmit(event : Event) {
    event.preventDefault();
    if(this.loginForm().valid()) {
      this.login(this.loginModel());
    }
  }

  login(loginData: LoginRequestModel) {
    this.authService.loginApi(loginData).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }
}
