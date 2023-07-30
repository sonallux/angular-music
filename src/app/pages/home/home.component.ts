import { Component } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { CardItem } from '../../shared/clickable-card/clickable-card.component';
import { SpotifyClientService } from '../../spotify-client/spotify-client.service';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { SimplifiedAlbum, SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';

@Component({
  selector: 'app-dashboard',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  userName$ = fromPromise(this.spotifyClient.currentUser.profile()).pipe(
    map(user => user.display_name)
  );

  private featuredPlaylists$ = fromPromise(this.spotifyClient.browse.getFeaturedPlaylists('DE', 'en_US', undefined, 8)).pipe(
    shareReplay({refCount: true})
  );

  featuredPlaylistsMessage$ = this.featuredPlaylists$.pipe(
    map(featuredPlaylists => featuredPlaylists.message)
  );

  playlists$ = this.featuredPlaylists$.pipe(
    map(featuredPlaylists => featuredPlaylists.playlists.items),
    map(playlists => playlists.map(playlistToCardItem))
  );

  newReleases$ = fromPromise(this.spotifyClient.browse.getNewReleases('US', 8)).pipe(
    map(newReleases => newReleases.albums.items),
    map(albums => albums.map(albumToCardItem))
  );

  constructor(private spotifyClient: SpotifyClientService) {
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
