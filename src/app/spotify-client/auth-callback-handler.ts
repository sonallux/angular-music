import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { SpotifyClientService } from './spotify-client.service';

export function authCallbackHandler(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  const homeUrlTree = inject(Router).createUrlTree(['/'], {});

  return inject(SpotifyClientService).exchangeToken(state.url)
    .catch(console.error)
    .then(() => homeUrlTree);
}
