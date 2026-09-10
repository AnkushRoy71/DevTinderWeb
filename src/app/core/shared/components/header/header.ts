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
import { clearFeed } from '../../state/feed/feed.actions';
import { clearConnection } from '../../state/connection/connection.action';
import { clearRequest } from '../../state/request/request.action';

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
        this.clearUserAndRedirect();
      },
      error: (error) => {
        console.error('Logout failed:', error);
        //this.clearUserAndRedirect();
      },
    });
  }

  private clearUserAndRedirect(): void {
    this.storeService.dispatch(clearUser());
    this.storeService.dispatch(clearFeed());
    this.storeService.dispatch(clearConnection());
    this.storeService.dispatch(clearRequest());
    this.router.navigate(['/login']);
  }
}
