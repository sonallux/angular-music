import { AlbumLinkComponent } from './album-link.component';
import { render, screen } from '@testing-library/angular';

describe('AlbumLinkComponent', () => {
  it('should render', async () => {
    await render(AlbumLinkComponent, {
      componentInputs: { album: { id: '42', name: 'Test Album' } },
    });

    expect(await screen.findByRole('link', { name: 'Test Album' })).toBeDefined();
  });
});
