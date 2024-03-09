import { NavbarComponent } from './navbar.component';
import { render, screen } from '@testing-library/angular';

describe('NavbarComponent', () => {
  it('should render', async () => {
    await render(NavbarComponent);

    expect(await screen.findByRole('link', { name: 'Angular Music' })).toBeDefined();
  });
});
