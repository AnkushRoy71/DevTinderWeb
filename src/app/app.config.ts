import { ApplicationConfig, ErrorHandler, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { environment } from '../environments/environment.development';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { userReducer } from './core/shared/state/user/user,reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { feedReducer } from './core/shared/state/feed/feed.reducer';
import { connectionReducer } from './core/shared/state/connection/connection.reducer';
import { requestReducer } from './core/shared/state/request/request.reducer';
import { GlobalErrorHandler } from './core/services/errorHandler/global-error-handler';
import { httpInterceptor } from './core/services/interceptor/http-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
      license: environment.PrimeUILicenseKey,
    }),
    provideHttpClient(withInterceptors([httpInterceptor])),
    provideStore({
      user: userReducer,
      feed: feedReducer,
      connection: connectionReducer,
      request: requestReducer,
    }),
    provideStoreDevtools({
      maxAge: 25,
    }),
  ],
};
