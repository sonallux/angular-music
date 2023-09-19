import { BrowseComponent } from './browse.component';
import { render, screen } from '@testing-library/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowseModule } from './browse.module';

describe('BrowseComponent', () => {
  it('should render', async () => {
    await render(BrowseComponent, {
      imports: [BrowseModule, HttpClientTestingModule],
    });

    expect(await screen.findByRole('heading', {name: 'Browse'})).toBeDefined();
  });
});
