import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, throwError } from 'rxjs';
import { clearConnection } from '../../shared/state/connection/connection.action';
import { clearFeed } from '../../shared/state/feed/feed.actions';
import { clearRequest } from '../../shared/state/request/request.action';
import { clearUser } from '../../shared/state/user/user.actions';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        console.warn('Unauthorized request detected. Logging out...');
        store.dispatch(clearUser());
        store.dispatch(clearFeed());
        store.dispatch(clearConnection());
        store.dispatch(clearRequest());
        router.navigate(['/login']);
      }

      return throwError(() => error);
    }),
  );
};
