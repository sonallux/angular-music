import { Component } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { CardItem } from '../../shared/clickable-card/clickable-card.component';
import { SimplifiedAlbum, SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';
import { SpotifyBrowseApi } from '../../spotify-client/api/browse-api.service';
import { SpotifyUserApi } from '../../spotify-client/api/user-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  userName$ = this.userApi.getCurrentUser().pipe(
    map(user => user.display_name)
  );

  private featuredPlaylists$ = this.browseApi.getFeaturedPlaylists({
    country: 'DE',
    locale: 'en_US',
    limit: 10
  }).pipe(
    shareReplay({refCount: true})
  );

  featuredPlaylistsMessage$ = this.featuredPlaylists$.pipe(
    map(featuredPlaylists => featuredPlaylists.message)
  );

  playlists$ = this.featuredPlaylists$.pipe(
    map(featuredPlaylists => featuredPlaylists.playlists.items),
    map(playlists => playlists.map(playlistToCardItem))
  );

  newReleases$ = this.browseApi.getNewReleases({country: 'US', limit: 10}).pipe(
    map(newReleases => newReleases.albums.items),
    map(albums => albums.map(albumToCardItem))
  );

  constructor(
    private userApi: SpotifyUserApi,
    private browseApi: SpotifyBrowseApi
  ) {
  }
}

function playlistToCardItem(playlist: SimplifiedPlaylist): CardItem {
  return {
    title: playlist.name,
    subtitle: playlist.description,
    imageUrl: playlist.images[0].url,
    link: `/playlist/${playlist.id}`
  };
}

function albumToCardItem(album: SimplifiedAlbum): CardItem {
  return {
    title: album.name,
    subtitle: album.artists.map(artist => artist.name).join(', '),
    imageUrl: album.images[0].url,
    link: `/album/${album.id}`
  };
}
