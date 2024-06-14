import { LoginComponent } from './login.component';
import { render, screen } from '@testing-library/angular';
import { BrowserSessionStorage } from '../spotify-client/browser-session-storage.service';
import { SessionStorage } from '../spotify-client/session-store.service';

describe('LoginComponent', () => {
  it('should render', async () => {
    await render(LoginComponent, {
      providers: [{ provide: SessionStorage, useClass: BrowserSessionStorage }],
    });

    expect(await screen.findByRole('heading', { name: 'Angular Music' })).toBeDefined();
    expect(await screen.findByRole('button', { name: 'Login with Spotify' })).toBeDefined();
  });
});
