import { TestBed } from '@angular/core/testing';
import { PlaylistDescriptionPipe } from './playlist-description.pipe';
import { Playlist } from '@spotify/web-api-ts-sdk';

describe('PlaylistDescriptionPipe', () => {
  let pipe: PlaylistDescriptionPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [PlaylistDescriptionPipe] });
    pipe = TestBed.inject(PlaylistDescriptionPipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('does nothing on no spotify link', () => {
    const description = 'Visit <a href="https://spotify.com">Spotify</a>';
    expect(pipe.transform({ description } as Playlist)).toEqual(description);
  });

  it('formats one link', () => {
    expect(
      pipe.transform({ description: 'Visit <a href=spotify:artist:foo123>Artist</a>' } as Playlist),
    ).toEqual('Visit <a href="/artist/foo123">Artist</a>');
  });

  it('formats release date with day precision', () => {
    expect(
      pipe.transform({
        description:
          'Visit <a href=spotify:artist:foo123>Artist 1</a> and <a href=spotify:artist:bar567>Artist 2</a>',
      } as Playlist),
    ).toEqual(
      'Visit <a href="/artist/foo123">Artist 1</a> and <a href="/artist/bar567">Artist 2</a>',
    );
  });
});
