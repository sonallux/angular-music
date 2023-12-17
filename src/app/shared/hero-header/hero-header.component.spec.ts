import { HeroHeaderComponent } from './hero-header.component';
import { render, screen } from '@testing-library/angular';
import { SharedModule } from '../shared.module';

describe('HeroHeaderComponent', () => {
  it('should render', async () => {
    await render(HeroHeaderComponent, {
      imports: [SharedModule],
      componentInputs: {
        heroData: {
          title: 'Hero Tester',
          type: 'unknown',
          imageUrl: 'https://image.url',
        },
      },
    });

    expect(await screen.findByRole('heading', { name: 'Hero Tester' })).toBeDefined();
    expect(await screen.findByText('unknown')).toBeDefined();
  });
});
