import { SidenavComponent } from './sidenav.component';
import { findByRole, render, screen } from '@testing-library/angular';

describe('SidenavComponent', () => {
  it('should render', async () => {
    await render(SidenavComponent);

    const navigation = await screen.findByRole('navigation');
    expect(await findByRole(navigation, 'link', { name: 'Home' })).toBeDefined();
    expect(await findByRole(navigation, 'link', { name: 'Browse' })).toBeDefined();
    expect(await findByRole(navigation, 'link', { name: 'Open Spotify' })).toBeDefined();
  });
});
