import { HomeComponent } from './home.component';
import { render, screen } from '@testing-library/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomeComponent', () => {
  it('should render', async () => {
    await render(HomeComponent, {
      imports: [HttpClientTestingModule],
    });

    expect(await screen.findByRole('heading', { name: 'Hello' })).toBeDefined();
    expect(await screen.findByRole('heading', { name: 'New releases' })).toBeDefined();
  });
});
