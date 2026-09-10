import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { LabelModule } from 'primeng/label';
import { FormField, email, form, minLength, required } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { SelectModule } from 'primeng/select';
import { RegisterRequestModel } from '../models/auth.model';
import { Auth } from '../auth';
import { Store } from '@ngrx/store';
import { addUser } from '../../../core/shared/state/user/user.actions';

@Component({
  imports: [
    CardModule,
    ButtonModule,
    InputTextModule,
    LabelModule,
    FormField,
    SelectModule,
    RouterLink,
  ],
  selector: 'app-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export default class Register {
  authService = inject(Auth);
  storeService = inject(Store);
  navigationService = inject(Router);
  readonly genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  registerModel = signal<RegisterRequestModel>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: 18,
    gender: '',
  });

  registerForm = form(this.registerModel, (schema) => {
    required(schema.firstName);
    required(schema.lastName);
    required(schema.email);
    email(schema.email);
    required(schema.password);
    minLength(schema.password, 6);
    required(schema.gender);
    required(schema.age);
  });

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.registerForm().valid()) {
      this.authService.registerUser(this.registerModel()).subscribe({
        next: (response)=>{
          this.storeService.dispatch(addUser({user: response.data}))
          this.navigationService.navigate(['/feed']);
        },
        error: (error)=>{
          console.log(error.message)
        }
      })
    }
  }
}
