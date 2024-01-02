import { Component, inject } from '@angular/core';
import { injectNavigationEnd } from 'ngxtension/navigation-end';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { from, switchMap } from 'rxjs';
import { SpotifyClientService } from './spotify-client/spotify-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  host: {
    class: 'flex flex-col h-screen',
  },
})
export class AppComponent {
  private spotifyClientService = inject(SpotifyClientService);

  isAuthenticated = injectNavigationEnd().pipe(
    takeUntilDestroyed(),
    switchMap(() => from(this.spotifyClientService.isAuthenticated())),
  );
}
