import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { environment } from '../environments/environment.development';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { userReducer } from './core/shared/state/user/user,reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { feedReducer } from './core/shared/state/feed/feed.reducer';
import { connectionReducer } from './core/shared/state/connection/connection.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
      license: environment.PrimeUILicenseKey,
    }),
    provideHttpClient(),
    provideStore({
      user: userReducer,
      feed: feedReducer,
      connection: connectionReducer,
    }),
    provideStoreDevtools({
      maxAge: 25,
    }),
  ],
};
