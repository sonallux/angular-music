import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { ServerSessionStorage } from './spotify-client/server-session-storage.service';
import { SessionStorage } from './spotify-client/session-store.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: SessionStorage,
      useClass: ServerSessionStorage,
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
