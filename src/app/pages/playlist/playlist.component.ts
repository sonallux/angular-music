import { Component, Input, OnInit } from '@angular/core';
import { EMPTY, map, Observable, shareReplay } from 'rxjs';
import { HeroData } from '../../shared/hero-header/hero-header.component';
import { PlaylistObject, PlaylistsApiService } from 'ngx-spotify';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html'
})
export class PlaylistComponent implements OnInit {

  @Input({required: true})
  playlistId!: string

  playlist$: Observable<PlaylistObject> = EMPTY;

  categoryHeroData$: Observable<HeroData> = EMPTY;

  constructor(private playlistsApiService: PlaylistsApiService) {
  }

  ngOnInit(): void {
    this.playlist$ = this.playlistsApiService.getPlaylist(this.playlistId).pipe(
      shareReplay({refCount: true})
    );

    this.categoryHeroData$ = this.playlist$.pipe(
      map(mapPlaylistToHeroData)
    );
  }
}

function mapPlaylistToHeroData(playlist: PlaylistObject) {
  return {
    type: 'Playlist',
    title: playlist.name ?? '',
    imageUrl: playlist.images?.[0].url ?? ''
  };
}
