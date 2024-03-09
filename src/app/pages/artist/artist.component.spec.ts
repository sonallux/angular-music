import { ArtistComponent } from './artist.component';
import { render, screen } from '@testing-library/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ArtistComponent', () => {
  it('should render', async () => {
    await render(ArtistComponent, {
      imports: [HttpClientTestingModule],
    });

    expect(await screen.findByRole('button')).toBeDefined();
  });
});
