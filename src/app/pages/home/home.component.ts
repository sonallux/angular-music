import { Component, inject } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { CardItem } from '../../shared/clickable-card/clickable-card.component';
import { SimplifiedAlbum, SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';
import { SpotifyBrowseApi } from '../../spotify-client/api/browse-api.service';
import { SpotifyUserApi } from '../../spotify-client/api/user-api.service';
import { AsyncPipe } from '@angular/common';
import { CardListComponent } from '../../shared/card-list/card-list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [CardListComponent, AsyncPipe],
})
export class HomeComponent {
  public readonly userName$ = inject(SpotifyUserApi)
    .getCurrentUser()
    .pipe(map((user) => user.display_name));

  private readonly featuredPlaylists$ = inject(SpotifyBrowseApi)
    .getFeaturedPlaylists({
      country: 'DE',
      locale: 'en_US',
      limit: 10,
    })
    .pipe(shareReplay({ refCount: true }));

  public readonly featuredPlaylistsMessage$ = this.featuredPlaylists$.pipe(
    map((featuredPlaylists) => featuredPlaylists.message),
  );

  public readonly playlists$ = this.featuredPlaylists$.pipe(
    map((featuredPlaylists) => featuredPlaylists.playlists.items),
    map((playlists) => playlists.map(playlistToCardItem)),
  );

  public readonly newReleases$ = inject(SpotifyBrowseApi)
    .getNewReleases({ country: 'DE', limit: 10 })
    .pipe(
      map((newReleases) => newReleases.albums.items),
      map((albums) => albums.map(albumToCardItem)),
    );
}

function playlistToCardItem(playlist: SimplifiedPlaylist): CardItem {
  return {
    title: playlist.name,
    subtitle: playlist.description,
    images: playlist.images,
    link: `/playlist/${playlist.id}`,
  };
}

function albumToCardItem(album: SimplifiedAlbum): CardItem {
  return {
    title: album.name,
    subtitle: album.artists.map((artist) => artist.name).join(', '),
    images: album.images,
    link: `/album/${album.id}`,
  };
}
