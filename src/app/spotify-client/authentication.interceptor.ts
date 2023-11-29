import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { defaultIfEmpty, map, Observable, switchMap } from 'rxjs';
import { SpotifyClientService } from './spotify-client.service';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { filterNil } from 'ngxtension/filter-nil';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private spotifyClient: SpotifyClientService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.startsWith('https://api.spotify.com/')) {
      return next.handle(request);
    }

    return fromPromise(this.spotifyClient.getAccessToken()).pipe(
      filterNil(),
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
