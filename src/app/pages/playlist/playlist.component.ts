import { Component } from '@angular/core';
import { map, Observable, shareReplay, switchMap } from 'rxjs';
import { HeroData } from '../../shared/hero-header/hero-header.component';
import { Page, Playlist, PlaylistedTrack, Track } from '@spotify/web-api-ts-sdk';
import { SpotifyPlaylistApi } from '../../spotify-client/api/playlist-api.service';
import { Breakpoint, TailwindBreakpointObserver } from '../../shared/services/tailwind-breakpoint-observer.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

export interface PlaylistTrack extends PlaylistedTrack {
  track: Track
}

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html'
})
export class PlaylistComponent {

  displayedColumns: string[] = ['name', 'artist', 'album'];

  playlist$: Observable<Playlist>;

  playlistHeroData$: Observable<HeroData>;

  playlistTracks$: Observable<Page<PlaylistTrack>>;

  constructor(
    private playlistApi: SpotifyPlaylistApi,
    private breakpointObserver: TailwindBreakpointObserver,
    activatedRoute: ActivatedRoute
  ) {
    this.breakpointObserver.breakpoint$.pipe(takeUntilDestroyed()).subscribe(breakpoint => {
      if (breakpoint >= Breakpoint.XL) {
        this.displayedColumns = ['name', 'artist', 'album', 'added_at', 'duration'];
      } else if (breakpoint >= Breakpoint.LG) {
        this.displayedColumns = ['name', 'artist', 'album', 'duration'];
      } else {
        this.displayedColumns = ['name', 'artist', 'album'];
      }
    });

    this.playlist$ = activatedRoute.params.pipe(
      map(params => params['playlistId']),
      switchMap(playlistId => this.playlistApi.getPlaylist(playlistId)),
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
