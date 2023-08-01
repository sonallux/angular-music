import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { defaultIfEmpty, filter, map, Observable, switchMap } from 'rxjs';
import { SpotifyClientService } from './spotify-client.service';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { AccessToken } from '@spotify/web-api-ts-sdk';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private spotifyClient: SpotifyClientService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.startsWith('https://api.spotify.com/')) {
      return next.handle(request);
    }

    return fromPromise(this.spotifyClient.getAccessToken()).pipe(
      filter(isNotNull),
      map(accessToken =>
        request.clone({
          setHeaders: {
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`
          }
        })),
      defaultIfEmpty(request),
      switchMap(req => next.handle(req))
    );
  }
}

function isNotNull(token: AccessToken | null): token is AccessToken {
  return token !== null;
}
