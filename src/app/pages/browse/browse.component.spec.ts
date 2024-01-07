import { BrowseComponent } from './browse.component';
import { render, screen } from '@testing-library/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BrowseComponent', () => {
  it('should render', async () => {
    await render(BrowseComponent, {
      imports: [HttpClientTestingModule],
    });

    expect(await screen.findByRole('heading', { name: 'Browse' })).toBeDefined();
  });
});
