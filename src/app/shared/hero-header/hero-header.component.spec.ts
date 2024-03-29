import { HeroHeaderComponent } from './hero-header.component';
import { render, screen } from '@testing-library/angular';

describe('HeroHeaderComponent', () => {
  it('should render', async () => {
    await render(HeroHeaderComponent, {
      componentInputs: {
        heroData: {
          title: 'Hero Tester',
          type: 'unknown',
          images: [{ url: 'https://image.url' }],
        },
      },
    });

    expect(await screen.findByRole('heading', { name: 'Hero Tester' })).toBeDefined();
    expect(await screen.findByText('unknown')).toBeDefined();
  });
});
