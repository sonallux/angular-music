import { MainLayoutComponent } from './main-layout.component';
import { render, screen } from '@testing-library/angular';
import { MainLayoutModule } from './main-layout.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MainLayoutComponent', () => {
  it('should render', async () => {
    await render(MainLayoutComponent, {imports: [MainLayoutModule, HttpClientTestingModule]});

    expect(await screen.findByRole('main')).toBeDefined();
  });
});
