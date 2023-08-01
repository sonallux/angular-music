import { Component, Input, OnInit } from '@angular/core';
import { EMPTY, map, Observable, shareReplay } from 'rxjs';
import { HeroData } from '../../shared/hero-header/hero-header.component';
import { Playlist } from '@spotify/web-api-ts-sdk';
import { SpotifyPlaylistApi } from '../../spotify-client/api/playlist-api.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html'
})
export class PlaylistComponent implements OnInit {

  @Input({required: true})
  playlistId!: string

  playlist$: Observable<Playlist> = EMPTY;

  playlistHeroData$: Observable<HeroData> = EMPTY;

  constructor(private playlistApi: SpotifyPlaylistApi) {
  }

  ngOnInit(): void {
    this.playlist$ = this.playlistApi.getPlaylist(this.playlistId).pipe(
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
