import { Component, Input } from '@angular/core';
import { Album, SimplifiedAlbum } from '@spotify/web-api-ts-sdk';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-album-link',
  templateUrl: './album-link.component.html',
  styleUrl: 'album-link.component.scss',
  standalone: true,
  imports: [RouterLink],
})
export class AlbumLinkComponent {
  @Input({ required: true })
  album!: Album | SimplifiedAlbum;
}
