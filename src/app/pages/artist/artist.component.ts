import { Component, Input, OnInit } from '@angular/core';
import { EMPTY, map, Observable, shareReplay } from 'rxjs';
import { HeroData } from '../../shared/hero-header/hero-header.component';
import { Artist, Track } from '@spotify/web-api-ts-sdk';
import { Breakpoint, TailwindBreakpointObserver } from '../../shared/services/tailwind-breakpoint-observer.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SpotifyArtistApi } from '../../spotify-client/api/artist-api.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html'
})
export class ArtistComponent implements OnInit {

  @Input({required: true})
  artistId!: string

  displayedColumns: string[] = ['name', 'artist', 'album'];

  artist$: Observable<Artist> = EMPTY;

  artistHeroData$: Observable<HeroData> = EMPTY;

  topTracks$: Observable<Track[]> = EMPTY;

  constructor(private artistApi: SpotifyArtistApi,
              private breakpointObserver: TailwindBreakpointObserver) {
    this.breakpointObserver.breakpoint$.pipe(takeUntilDestroyed()).subscribe(breakpoint => {
      if (breakpoint >= Breakpoint.LG) {
        this.displayedColumns = ['name', 'artist', 'album', 'duration'];
      } else {
        this.displayedColumns = ['name', 'artist', 'album'];
      }
    });
  }

  ngOnInit(): void {
    this.artist$ = this.artistApi.getArtist(this.artistId).pipe(
      shareReplay({refCount: true})
    );

    this.artistHeroData$ = this.artist$.pipe(
      map(mapArtistToHeroData)
    );

    this.topTracks$ = this.artistApi.getArtistsTopTracks(this.artistId, {market: 'DE'}).pipe(
      map(result => result.tracks)
    )
  }
}

function mapArtistToHeroData(artist: Artist) {
  return {
    type: 'Artist',
    title: artist.name,
    imageUrl: artist.images[0].url ?? ''
  };
}
