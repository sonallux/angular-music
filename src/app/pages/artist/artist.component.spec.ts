import { ArtistComponent } from './artist.component';
import { render, screen } from '@testing-library/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ArtistModule } from './artist.module';

describe('ArtistComponent', () => {
  it('should render', async () => {
    await render(ArtistComponent, {
      imports: [ArtistModule, HttpClientTestingModule],
    });

    expect(await screen.findByRole('button')).toBeDefined();
  });
});
