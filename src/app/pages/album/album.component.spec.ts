import { AlbumComponent } from './album.component';
import { render, screen } from '@testing-library/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AlbumComponent', () => {
  it('should render', async () => {
    await render(AlbumComponent, {
      imports: [HttpClientTestingModule],
    });

    expect(await screen.findByRole('table')).toBeDefined();
  });
});
