import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withRouterConfig } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authenticationInterceptor } from './spotify-client/authentication.interceptor';
import { BrowserSessionStorage } from './spotify-client/browser-session-storage.service';
import { SessionStorage } from './spotify-client/session-store.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideRouter(routes, withRouterConfig({ onSameUrlNavigation: 'reload' })),
    provideHttpClient(withInterceptors([authenticationInterceptor])),
    {
      provide: SessionStorage,
      useClass: BrowserSessionStorage,
    },
  ],
};
