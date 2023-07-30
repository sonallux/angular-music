import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { SpotifyClientService } from './spotify-client.service';

export function authCallbackHandler(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  const homeUrlTree = inject(Router).createUrlTree(['/'], {});
  if (isPlatformBrowser(inject(PLATFORM_ID))) {

    return inject(SpotifyClientService).exchangeToken(state.url)
      .then(() => homeUrlTree)
  }

  return homeUrlTree;
}
