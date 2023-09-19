import { AlbumComponent } from './album.component';
import { render, screen } from '@testing-library/angular';
import { AlbumModule } from './album.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AlbumComponent', () => {
  it('should render', async () => {
    await render(AlbumComponent, {
      imports: [AlbumModule, HttpClientTestingModule],
    });

    expect(await screen.findByRole('table')).toBeDefined();
  });
});
