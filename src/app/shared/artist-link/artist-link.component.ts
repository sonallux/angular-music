import { Component, Input } from '@angular/core';
import { SimplifiedArtist } from '@spotify/web-api-ts-sdk';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-artist-link',
  templateUrl: './artist-link.component.html',
  styleUrl: './artist-link.component.scss',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
})
export class ArtistLinkComponent {
  @Input({ required: true })
  set artist(artist: SimplifiedArtist | SimplifiedArtist[]) {
    this.artists = Array.isArray(artist) ? artist : [artist];
  }

  artists: SimplifiedArtist[] = [];
}
