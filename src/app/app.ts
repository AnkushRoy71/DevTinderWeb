import { Component, inject, OnInit, signal } from '@angular/core';
import { Header } from './core/shared/components/header/header';
import { Router, RouterOutlet } from '@angular/router';
import { Profile } from './core/services/httpServices/profile';
import { UserModel } from './core/shared/models/user.model';
import {
  ApiErrorResponseModel,
  ApiSuccessResponseModel,
} from './core/shared/models/apiReponse.model';
import { Store } from '@ngrx/store';
import { selectUser } from './core/shared/state/user/user.selector';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  imports: [Header, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App implements OnInit {
  protected readonly title = signal('DevTinderWeb');
  profileService = inject(Profile);
  navigateService = inject(Router);
  storeService = inject(Store);

  user = toSignal(this.storeService.select(selectUser));

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    if (this.user()) return;
    this.profileService.getUserDetails().subscribe({
      next: (response: ApiSuccessResponseModel<UserModel>) => {
        console.log('User details:', response.data);
        this.storeService.dispatch({ type: '[User] Add User', user: response.data });
        this.navigateService.navigate(['/feed']);
      },
      error: (error: ApiErrorResponseModel) => {
        if (error.status === 401) {
          console.log('User is not authenticated. Redirecting to login page...');
          // You can redirect the user to the login page here if needed
          this.navigateService.navigate(['/login']);
        }
        console.error('Error fetching user details:', error);
      },
    });
  }
}
