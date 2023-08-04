import { Component, Input, OnInit } from '@angular/core';
import { EMPTY, map, Observable, shareReplay } from 'rxjs';
import { HeroData } from '../../shared/hero-header/hero-header.component';
import { Page, Playlist, PlaylistedTrack, Track } from '@spotify/web-api-ts-sdk';
import { SpotifyPlaylistApi } from '../../spotify-client/api/playlist-api.service';

export interface PlaylistTrack extends PlaylistedTrack {
  track: Track
}

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html'
})
export class PlaylistComponent implements OnInit {

  @Input({required: true})
  playlistId!: string

  displayedColumns: string[] = ['name', 'artist', 'album', 'added_at'];

  playlist$: Observable<Playlist> = EMPTY;

  playlistHeroData$: Observable<HeroData> = EMPTY;

  playlistTracks$: Observable<Page<PlaylistTrack>> = EMPTY;

  constructor(private playlistApi: SpotifyPlaylistApi) {
  }

  ngOnInit(): void {
    this.playlist$ = this.playlistApi.getPlaylist(this.playlistId).pipe(
      shareReplay({refCount: true})
    );

    this.playlistHeroData$ = this.playlist$.pipe(
      map(mapPlaylistToHeroData)
    );

    this.playlistTracks$ = this.playlist$.pipe(
      map(playlist => ({
        ...playlist.tracks,
        items: playlist.tracks.items.filter(isPlaylistTrackItem)
      }))
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

function isPlaylistTrackItem(item: PlaylistedTrack): item is PlaylistTrack {
  return item.track?.type === 'track';
}
