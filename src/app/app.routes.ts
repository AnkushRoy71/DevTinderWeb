import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./feature/auth/login/login'),
  },
  {
    path: 'feed',
    loadComponent: () => import('./feature/home/feed/feed'),
  },
  {
    path: 'profile',
    loadComponent: () => import('./feature/profile/profile'),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
