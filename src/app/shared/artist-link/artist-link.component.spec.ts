import { ArtistLinkComponent } from './artist-link.component';
import { render, screen } from '@testing-library/angular';

describe('ArtistLinkComponent', () => {
  it('should render on link', async () => {
    await render(ArtistLinkComponent, {
      componentInputs: { artist: { id: '42', name: 'Test Artist' } },
    });

    expect(await screen.findByRole('link', { name: 'Test Artist' })).toBeDefined();
  });

  it('should render two links', async () => {
    await render(ArtistLinkComponent, {
      componentInputs: {
        artist: [
          { id: '42', name: 'Test Artist' },
          { id: '4711', name: 'Cool Artist' },
        ],
      },
    });

    expect(await screen.findByRole('link', { name: 'Test Artist' })).toBeDefined();
    expect(await screen.findByRole('link', { name: 'Cool Artist' })).toBeDefined();
  });
});
