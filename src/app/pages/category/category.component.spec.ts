import { CategoryComponent } from './category.component';
import { render, screen } from '@testing-library/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CategoryModule } from './category.module';

describe('CategoryComponent', () => {
  it('should render', async () => {
    await render(CategoryComponent, {
      imports: [CategoryModule, HttpClientTestingModule],
    });

    expect(await screen.findByRole('heading')).toBeDefined();
  });
});
