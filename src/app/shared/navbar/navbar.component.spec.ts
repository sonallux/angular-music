import { NavbarComponent } from './navbar.component';
import { render, screen } from '@testing-library/angular';
import { SharedModule } from '../shared.module';

describe('NavbarComponent', () => {
  it('should render', async () => {
    await render(NavbarComponent, {
      imports: [SharedModule]
    });

    expect(await screen.findByRole('link', {name: 'Angular Music'})).toBeDefined();
  });
});
