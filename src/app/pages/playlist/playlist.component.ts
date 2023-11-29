import { Component, inject } from '@angular/core';
import { map, Observable, shareReplay, switchMap } from 'rxjs';
import { HeroData } from '../../shared/hero-header/hero-header.component';
import { Page, Playlist, PlaylistedTrack, Track } from '@spotify/web-api-ts-sdk';
import { SpotifyPlaylistApi } from '../../spotify-client/api/playlist-api.service';
import { Breakpoint, TailwindBreakpointObserver } from '../../shared/services/tailwind-breakpoint-observer.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { injectParams } from '../../shared/injectors/inject-params';
import { filterNil } from 'ngxtension/filter-nil';

export interface PlaylistTrack extends PlaylistedTrack {
  track: Track
}

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html'
})
export class PlaylistComponent {

  public displayedColumns: string[] = ['name', 'artist', 'album'];

  private readonly playlistApi = inject(SpotifyPlaylistApi);

  public readonly playlist$: Observable<Playlist> = injectParams('playlistId').pipe(
    filterNil(),
    switchMap(playlistId => this.playlistApi.getPlaylist(playlistId)),
    shareReplay({refCount: true})
  );

  public readonly playlistHeroData$: Observable<HeroData> = this.playlist$.pipe(
    map(mapPlaylistToHeroData)
  );

  public readonly playlistTracks$: Observable<Page<PlaylistTrack>> = this.playlist$.pipe(
    map(playlist => ({
      ...playlist.tracks,
      items: playlist.tracks.items.filter(isPlaylistTrackItem)
    }))
  );

  constructor() {
    inject(TailwindBreakpointObserver).breakpoint$.pipe(takeUntilDestroyed()).subscribe(breakpoint => {
      if (breakpoint >= Breakpoint.XL) {
        this.displayedColumns = ['name', 'artist', 'album', 'added_at', 'duration'];
      } else if (breakpoint >= Breakpoint.LG) {
        this.displayedColumns = ['name', 'artist', 'album', 'duration'];
      } else {
        this.displayedColumns = ['name', 'artist', 'album'];
      }
    });
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
