import { HomeComponent } from './home.component';
import { render, screen } from '@testing-library/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeModule } from './home.module';

describe('HomeComponent', () => {
  it('should render', async () => {
    await render(HomeComponent, {
      imports: [HomeModule, HttpClientTestingModule],
    });

    expect(await screen.findByRole('heading', {name: 'Hello'})).toBeDefined();
    expect(await screen.findByRole('heading', {name: 'New releases'})).toBeDefined();
  });
});
