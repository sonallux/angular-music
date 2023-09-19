import { PlaylistComponent } from './playlist.component';
import { render, screen } from '@testing-library/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PlaylistModule } from './playlist.module';

describe('PlaylistComponent', () => {
  it('should render', async () => {
    await render(PlaylistComponent, {
      imports: [PlaylistModule, HttpClientTestingModule],
    });

    expect(await screen.findByRole('table')).toBeDefined();
  });
});
