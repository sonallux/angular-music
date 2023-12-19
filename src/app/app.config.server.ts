import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { ServerCacheStoreService } from './spotify-client/server-cache-store.service';
import { CACHE_STORE_TOKEN } from './spotify-client/spotify-client.service';
import { mockResizeObserverFactory, RESIZE_OBSERVER_FACTORY } from './shared/resize-observer';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: CACHE_STORE_TOKEN,
      useClass: ServerCacheStoreService,
    },
    {
      provide: RESIZE_OBSERVER_FACTORY,
      useValue: mockResizeObserverFactory,
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
