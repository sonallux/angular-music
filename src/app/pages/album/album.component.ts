import { Component } from '@angular/core';
import { map, Observable, shareReplay, switchMap } from 'rxjs';
import { HeroData } from '../../shared/hero-header/hero-header.component';
import { Album, Page, SimplifiedTrack } from '@spotify/web-api-ts-sdk';
import { Breakpoint, TailwindBreakpointObserver } from '../../shared/services/tailwind-breakpoint-observer.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SpotifyAlbumApi } from '../../spotify-client/api/album-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html'
})
export class AlbumComponent {
  displayedColumns: string[] = ['name', 'artist'];

  album$: Observable<Album>;

  albumHeroData$: Observable<HeroData>;

  albumTracks$: Observable<Page<SimplifiedTrack>>;

  constructor(private albumApi: SpotifyAlbumApi,
              private breakpointObserver: TailwindBreakpointObserver,
              activatedRoute: ActivatedRoute
  ) {
    this.breakpointObserver.breakpoint$.pipe(takeUntilDestroyed()).subscribe(breakpoint => {
      this.displayedColumns = breakpoint >= Breakpoint.MD
        ? ['name', 'artist', 'duration']
        : ['name', 'artist'];
    });

    this.album$ = activatedRoute.params.pipe(map(params => params['albumId'])).pipe(
      switchMap(albumId => this.albumApi.getAlbum(albumId)),
      shareReplay({refCount: true})
    );

    this.albumHeroData$ = this.album$.pipe(
      map(mapAlbumToHeroData)
    );

    this.albumTracks$ = this.album$.pipe(
      map(album => album.tracks)
    );
  }
}

function mapAlbumToHeroData(album: Album) {
  return {
    type: album.album_type.slice(0, 1).toUpperCase() + album.album_type.slice(1),
    title: album.name,
    imageUrl: album.images[0].url ?? ''
  };
}
