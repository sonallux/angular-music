import { LoginComponent } from './login.component';
import { render, screen } from '@testing-library/angular';
import { LoginModule } from './login.module';
import { CACHE_STORE_TOKEN } from '../spotify-client/spotify-client.service';
import { BrowserCacheStoreService } from '../spotify-client/browser-cache-store.service';

describe('LoginComponent', () => {
  it('should render', async () => {
    await render(LoginComponent, {
      imports: [LoginModule],
      providers: [{ provide: CACHE_STORE_TOKEN, useClass: BrowserCacheStoreService }],
    });

    expect(await screen.findByRole('heading', { name: 'Angular Music' })).toBeDefined();
    expect(await screen.findByRole('button', { name: 'Login with Spotify' })).toBeDefined();
  });
});
