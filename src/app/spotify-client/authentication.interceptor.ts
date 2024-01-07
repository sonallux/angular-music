import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { defaultIfEmpty, map, switchMap } from 'rxjs';
import { SpotifyClientService } from './spotify-client.service';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { filterNil } from 'ngxtension/filter-nil';

export const authenticationInterceptor: HttpInterceptorFn = (request, next) => {
  if (!request.url.startsWith('https://api.spotify.com/')) {
    return next(request);
  }

  return fromPromise(inject(SpotifyClientService).getAccessToken()).pipe(
    filterNil(),
    map((accessToken) =>
      request.clone({
        setHeaders: {
          Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
      }),
    ),
    defaultIfEmpty(request),
    switchMap((req) => next(req)),
  );
};
