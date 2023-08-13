import { Component } from '@angular/core';
import { map, Observable, shareReplay, switchMap } from 'rxjs';
import { HeroData } from '../../shared/hero-header/hero-header.component';
import { Artist, Track } from '@spotify/web-api-ts-sdk';
import { Breakpoint, TailwindBreakpointObserver } from '../../shared/services/tailwind-breakpoint-observer.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SpotifyArtistApi } from '../../spotify-client/api/artist-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html'
})
export class ArtistComponent {

  displayedColumns: string[] = ['name', 'artist', 'album'];

  artist$: Observable<Artist>;

  artistHeroData$: Observable<HeroData>;

  topTracks$: Observable<Track[]>;

  constructor(private artistApi: SpotifyArtistApi,
              private breakpointObserver: TailwindBreakpointObserver,
              activatedRoute: ActivatedRoute
  ) {
    this.breakpointObserver.breakpoint$.pipe(takeUntilDestroyed()).subscribe(breakpoint => {
      if (breakpoint >= Breakpoint.LG) {
        this.displayedColumns = ['name', 'artist', 'album', 'duration'];
      } else {
        this.displayedColumns = ['name', 'artist', 'album'];
      }
    });

    const artistId$ = activatedRoute.params.pipe(map(params => params['artistId']));

    this.artist$ = artistId$.pipe(
      switchMap(artistId => this.artistApi.getArtist(artistId)),
      shareReplay({refCount: true})
    );

    this.artistHeroData$ = this.artist$.pipe(
      map(mapArtistToHeroData)
    );

    this.topTracks$ = artistId$.pipe(
      switchMap(artistId => this.artistApi.getArtistsTopTracks(artistId, {market: 'DE'})),
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
