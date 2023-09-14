import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchResults } from '../../spotify-client/api/search-api.service';
import { Artist, SimplifiedAlbum } from '@spotify/web-api-ts-sdk';
import { CardItem } from '../../shared/clickable-card/clickable-card.component';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html'
})
export class SearchResultComponent {
  @Input({required: true})
  public set searchResults(results: SearchResults | null) {
    if (!results) {
      this.albumResults = null;
      this.artistResults = null;
      return;
    }

    const {albums, artists, playlists} = results;
    this.albumResults = albums.items.map(mapAlbumToCardItem);
    this.artistResults = artists.items.map(mapArtistToCardItem);
    this.playlistResults = playlists.items.map(mapPlaylistToCardItem);
  }

  @Output() public resultSelected = new EventEmitter();
  @Output() public closeButtonClick = new EventEmitter();

  public albumResults: CardItem[] | null = null;
  public artistResults: CardItem[] | null = null;
  public playlistResults: CardItem[] | null = null;
}

function mapAlbumToCardItem(album: SimplifiedAlbum): CardItem {
  return {
    title: album.name,
    imageUrl: album.images[0].url,
    // TODO: format release_date and album_type
    subtitle: `${album.release_date} ${album.album_type}`,
    link: `/album/${album.id}`
  }
}

function mapArtistToCardItem(artist: Artist): CardItem {
  return {
    title: artist.name,
    imageUrl: artist.images[0]?.url,
    subtitle: 'Artist',
    link: `/artist/${artist.id}`
  }
}

// TODO: SearchResult uses not exported type PlaylistBase, therefore use any.
// It should actually be SimplifiedPlaylistBase
function mapPlaylistToCardItem(playlist: any): CardItem {
  return {
    title: playlist.name,
    subtitle: playlist.description,
    imageUrl: playlist.images[0].url,
    link: `/playlist/${playlist.id}`
  };
}
