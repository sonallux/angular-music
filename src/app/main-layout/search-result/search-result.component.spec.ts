import { SearchResultComponent } from './search-result.component';
import { findAllByRole, findByRole, render, screen } from '@testing-library/angular';
import { SharedModule } from '../../shared/shared.module';

describe('SearchResultComponent', () => {
  it('should render results', async () => {
    await render(SearchResultComponent, {
      imports: [SharedModule],
      componentInputs: {
        searchResults: {
          albums: { items: [{ images: [{ url: 'https://search-result.image' }], artists: [] }] },
          artists: { items: [{ images: [{ url: 'https://search-result.image' }] }] },
          playlists: { items: [{ images: [{ url: 'https://search-result.image' }] }] },
        },
      },
    });

    await expectRegion('Artists', 1);
    await expectRegion('Albums', 1);
    await expectRegion('Playlists', 1);
  });

  it('should render no results', async () => {
    await render(SearchResultComponent, {
      imports: [SharedModule],
      componentInputs: {
        searchResults: {
          albums: { items: [] },
          artists: { items: [] },
          playlists: { items: [] },
        },
      },
    });

    await expectNoRegion('Artists');
    await expectNoRegion('Albums');
    await expectNoRegion('Playlists');
  });
});

async function expectRegion(name: string, itemCount: number) {
  const region = await screen.findByRole('region', { name });
  expect(region).toBeDefined();
  expect(await findByRole(region, 'heading', { name })).toBeDefined();
  expect(await findAllByRole(region, 'link')).toHaveSize(itemCount);
}

async function expectNoRegion(name: string) {
  expect(screen.queryByRole('region', { name })).toBeNull();
}
