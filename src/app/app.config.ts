import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
  withRouterConfig,
} from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authenticationInterceptor } from './spotify-client/authentication.interceptor';
import { CACHE_STORE_TOKEN } from './spotify-client/spotify-client.service';
import { BrowserCacheStoreService } from './spotify-client/browser-cache-store.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideRouter(
      routes,
      withRouterConfig({ onSameUrlNavigation: 'reload' }),
      withPreloading(PreloadAllModules),
    ),
    provideHttpClient(withInterceptors([authenticationInterceptor])),
    {
      provide: CACHE_STORE_TOKEN,
      useClass: BrowserCacheStoreService,
    },
  ],
};
