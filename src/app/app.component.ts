import { Component, inject } from '@angular/core';
import { injectNavigationEnd } from 'ngxtension/navigation-end';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { from, switchMap } from 'rxjs';
import { SpotifyClientService } from './spotify-client/spotify-client.service';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  host: {
    class: 'flex flex-col h-screen',
  },
  standalone: true,
  imports: [RouterOutlet, MainLayoutComponent, AsyncPipe],
})
export class AppComponent {
  private spotifyClientService = inject(SpotifyClientService);

  isAuthenticated = injectNavigationEnd().pipe(
    takeUntilDestroyed(),
    switchMap(() => from(this.spotifyClientService.isAuthenticated())),
  );
}
