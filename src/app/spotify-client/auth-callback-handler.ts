import {
  ActivatedRouteSnapshot,
  createUrlTreeFromSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { SpotifyClientService } from './spotify-client.service';

export function authCallbackHandler(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  return inject(SpotifyClientService)
    .exchangeToken(state.url)
    .catch(console.error)
    .then(() => createUrlTreeFromSnapshot(route, ['../home']));
}
