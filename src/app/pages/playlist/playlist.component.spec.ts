import { PlaylistComponent } from './playlist.component';
import { render, screen } from '@testing-library/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PlaylistComponent', () => {
  it('should render', async () => {
    await render(PlaylistComponent, {
      imports: [HttpClientTestingModule],
    });

    expect(await screen.findByRole('table')).toBeDefined();
  });
});
