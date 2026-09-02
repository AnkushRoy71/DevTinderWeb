import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { LabelModule } from 'primeng/label';
import { LoginRequestModel } from '../models/login.model';
import { form, required, email, minLength, FormField } from '@angular/forms/signals';
import { Auth } from '../auth';
import { UserModel } from '../../../core/shared/models/user.model';
import { Store } from '@ngrx/store';
import { addUser } from '../../../core/shared/state/user/user.actions';

@Component({
  imports: [CardModule, ButtonModule, InputTextModule, LabelModule, FormField],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export default class Login {
  authService = inject(Auth);
  store = inject(Store);
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
      next: (response:{data: UserModel, message: string}) => {
        console.log('Login successful:', response);
        const userData = response.data;
        this.store.dispatch(addUser({ user: userData }));

      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }
}
