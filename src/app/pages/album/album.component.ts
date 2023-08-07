import { Component, Input, OnInit } from '@angular/core';
import { EMPTY, map, Observable, shareReplay } from 'rxjs';
import { HeroData } from '../../shared/hero-header/hero-header.component';
import { Album, Page, SimplifiedTrack } from '@spotify/web-api-ts-sdk';
import { Breakpoint, TailwindBreakpointObserver } from '../../shared/services/tailwind-breakpoint-observer.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SpotifyAlbumApi } from '../../spotify-client/api/album-api.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html'
})
export class AlbumComponent implements OnInit {

  @Input({required: true})
  albumId!: string

  displayedColumns: string[] = ['name', 'artist'];

  album$: Observable<Album> = EMPTY;

  albumHeroData$: Observable<HeroData> = EMPTY;

  albumTracks$: Observable<Page<SimplifiedTrack>> = EMPTY;

  constructor(private albumApi: SpotifyAlbumApi,
              private breakpointObserver: TailwindBreakpointObserver) {
    this.breakpointObserver.breakpoint$.pipe(takeUntilDestroyed()).subscribe(breakpoint => {
      this.displayedColumns = breakpoint >= Breakpoint.MD
        ? ['name', 'artist', 'duration']
        : ['name', 'artist'];
    });
  }

  ngOnInit(): void {
    this.album$ = this.albumApi.getAlbum(this.albumId).pipe(
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
