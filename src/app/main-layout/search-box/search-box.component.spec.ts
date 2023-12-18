import { SearchBoxComponent } from './search-box.component';
import { render, screen } from '@testing-library/angular';

describe('SearchBoxComponent', () => {
  it('should render', async () => {
    await render(SearchBoxComponent);

    expect(await screen.findByRole('searchbox')).toBeDefined();
  });
});
