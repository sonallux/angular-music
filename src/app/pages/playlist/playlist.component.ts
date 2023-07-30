import { Component, Input, OnInit } from '@angular/core';
import { EMPTY, map, Observable, shareReplay } from 'rxjs';
import { HeroData } from '../../shared/hero-header/hero-header.component';
import { SpotifyClientService } from '../../spotify-client/spotify-client.service';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { Playlist } from '@spotify/web-api-ts-sdk';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html'
})
export class PlaylistComponent implements OnInit {

  @Input({required: true})
  playlistId!: string

  playlist$: Observable<Playlist> = EMPTY;

  playlistHeroData$: Observable<HeroData> = EMPTY;

  constructor(private spotifyClient: SpotifyClientService) {
  }

  ngOnInit(): void {
    this.playlist$ = fromPromise(this.spotifyClient.playlists.getPlaylist(this.playlistId)).pipe(
      shareReplay({refCount: true})
    );

    this.playlistHeroData$ = this.playlist$.pipe(
      map(mapPlaylistToHeroData)
    );
  }
}

function mapPlaylistToHeroData(playlist: Playlist) {
  return {
    type: 'Playlist',
    title: playlist.name,
    imageUrl: playlist.images[0].url ?? ''
  };
}
