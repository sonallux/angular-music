import { Component, inject } from '@angular/core';
import { map, Observable, shareReplay, switchMap } from 'rxjs';
import { HeroData } from '../../shared/hero-header/hero-header.component';
import { Album, Page, SimplifiedTrack } from '@spotify/web-api-ts-sdk';
import { Breakpoint, TailwindBreakpointObserver } from '../../shared/services/tailwind-breakpoint-observer.service';
import { SpotifyAlbumApi } from '../../spotify-client/api/album-api.service';
import { injectParams } from '../../shared/injectors/inject-params';
import { filterNil } from 'ngxtension/filter-nil';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html'
})
export class AlbumComponent {
  public displayedColumns: string[] = ['name', 'artist'];

  private readonly albumApi = inject(SpotifyAlbumApi);

  public readonly album$: Observable<Album> = injectParams('albumId').pipe(
    filterNil(),
    switchMap(albumId => this.albumApi.getAlbum(albumId)),
    shareReplay({refCount: true})
  );

  public readonly albumHeroData$: Observable<HeroData> = this.album$.pipe(
    map(mapAlbumToHeroData)
  );

  public readonly albumTracks$: Observable<Page<SimplifiedTrack>> = this.album$.pipe(
    map(album => album.tracks)
  );

  constructor() {
    inject(TailwindBreakpointObserver).breakpoint$.pipe(
      takeUntilDestroyed()).subscribe(breakpoint => {
      this.displayedColumns = breakpoint >= Breakpoint.MD ? ['name', 'artist', 'duration'] : ['name', 'artist']
    });
  }
}

function mapAlbumToHeroData(album: Album) {
  return {
    type: album.album_type.slice(0, 1).toUpperCase() + album.album_type.slice(1),
    title: album.name,
    imageUrl: album.images[0].url ?? ''
  };
}
