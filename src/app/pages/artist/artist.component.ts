import { Component } from '@angular/core';
import { BehaviorSubject, combineLatestWith, map, Observable } from 'rxjs';
import { HeroData } from '../../shared/hero-header/hero-header.component';
import { Artist, SimplifiedAlbum, Track } from '@spotify/web-api-ts-sdk';
import { Breakpoint, TailwindBreakpointObserver } from '../../shared/services/tailwind-breakpoint-observer.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SpotifyArtistApi } from '../../spotify-client/api/artist-api.service';
import { ActivatedRoute, Params } from '@angular/router';
import { CardItem } from '../../shared/clickable-card/clickable-card.component';
import { State, withLoadingState } from '../../shared/loading-state';
import { ReleaseDatePipe } from '../../shared/pipes/release-date.pipe';

const albumTypeNames: Record<string, string> = {
  album: 'Album',
  compilation: 'Compilation',
  single: 'Single'
}

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html'
})
export class ArtistComponent {

  displayedColumns: string[] = ['name', 'artist', 'album'];

  showAllTopTracks$ = new BehaviorSubject(false);

  artistHeroData$: Observable<State<HeroData & Pick<Artist, 'followers' | 'genres'>>>;

  topTracks$: Observable<State<Track[]>>;

  albums$: Observable<State<CardItem[]>>;

  relatedArtists$: Observable<State<CardItem[]>>

  constructor(private artistApi: SpotifyArtistApi,
              private breakpointObserver: TailwindBreakpointObserver,
              private releaseDatePipe: ReleaseDatePipe,
              activatedRoute: ActivatedRoute
  ) {
    this.breakpointObserver.breakpoint$.pipe(takeUntilDestroyed()).subscribe(breakpoint => {
      if (breakpoint >= Breakpoint.LG) {
        this.displayedColumns = ['name', 'artist', 'album', 'duration'];
      } else {
        this.displayedColumns = ['name', 'artist', 'album'];
      }
    });

    const artistId$ = activatedRoute.params.pipe(map<Params, string>(params => params['artistId']));

    this.artistHeroData$ = artistId$.pipe(
      withLoadingState(artistId => this.artistApi.getArtist(artistId).pipe(map(this.mapArtistToHeroData))),
    );

    this.topTracks$ = artistId$.pipe(
      withLoadingState(artistId => this.artistApi.getArtistsTopTracks(artistId, {market: 'DE'}).pipe(
        combineLatestWith(this.showAllTopTracks$),
        map(([result, showAllTopTracks]) => result.tracks.slice(0, showAllTopTracks ? undefined : 5))
      ))
    );

    this.albums$ = artistId$.pipe(
      withLoadingState(artistId => this.artistApi.getArtistsAlbums(artistId, {market: 'DE', limit: 10}).pipe(
        map(page => page.items.map(this.mapAlbumToCardItem))
      )),
    );

    this.relatedArtists$ = artistId$.pipe(
      withLoadingState(artistId => this.artistApi.getArtistsRelatedArtists(artistId).pipe(
        map(artists => artists.artists.map(this.mapArtistToCardItem))
      )),
    );
  }

  public toggleShowAllTopTracks() {
    this.showAllTopTracks$.next(!this.showAllTopTracks$.getValue())
  }

  private mapArtistToHeroData = (artist: Artist) => {
    return {
      type: 'Artist',
      title: artist.name,
      imageUrl: artist.images[0].url ?? '',
      followers: artist.followers,
      genres: artist.genres,
    };
  }

  private mapAlbumToCardItem = (album: SimplifiedAlbum): CardItem => {
    return {
      title: album.name,
      imageUrl: album.images[0].url,
      subtitle: `${this.releaseDatePipe.transform(album, 'year')} - ${albumTypeNames[album.album_type]}`,
      link: `/album/${album.id}`
    }
  }

  private mapArtistToCardItem = (artist: Artist): CardItem => {
    return {
      title: artist.name,
      imageUrl: artist.images[0].url,
      subtitle: 'Artist',
      link: `/artist/${artist.id}`
    }
  }
}