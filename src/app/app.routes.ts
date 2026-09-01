import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./feature/auth/login/login'),
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    }
];
