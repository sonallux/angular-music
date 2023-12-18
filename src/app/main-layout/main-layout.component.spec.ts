import { MainLayoutComponent } from './main-layout.component';
import { render, screen } from '@testing-library/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MainLayoutComponent', () => {
  it('should render', async () => {
    await render(MainLayoutComponent, { imports: [HttpClientTestingModule] });

    expect(await screen.findByRole('main')).toBeDefined();
  });
});
