import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import { selectUser } from '../../state/user/user.selector';
import { clearUser } from '../../state/user/user.actions';
import { AsyncPipe } from '@angular/common';
import { Auth } from '../../../../feature/auth/auth';

@Component({
  imports: [
    AvatarModule,
    BadgeModule,
    MenubarModule,
    InputTextModule,
    RippleModule,
    AsyncPipe,
    RouterLink,
  ],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
  standalone: true,
})
export class Header implements OnInit {
  items: MenuItem[] | undefined;
  storeService = inject(Store);
  router = inject(Router);
  user$ = this.storeService.select(selectUser);
  authService = inject(Auth);

  ngOnInit(): void {}
  logout(): void {
    this.authService.logOutApi().subscribe({
      next: (response) => {
        console.log('Logout successful:', response);
        this.clearUserAndRedirect();
      },
      error: (error) => {
        console.error('Logout failed:', error);
        //this.clearUserAndRedirect();
      }
    });
  }

  private clearUserAndRedirect(): void {
    this.storeService.dispatch(clearUser());
    this.router.navigate(['/login']);
  }
}
