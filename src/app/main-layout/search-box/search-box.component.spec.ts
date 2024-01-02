import { SearchBoxComponent } from './search-box.component';
import { render, screen } from '@testing-library/angular';
import { MainLayoutModule } from '../main-layout.module';

describe('SearchBoxComponent', () => {
  it('should render', async () => {
    await render(SearchBoxComponent, { imports: [MainLayoutModule] });

    expect(await screen.findByRole('searchbox')).toBeDefined();
  });
});
