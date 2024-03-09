import { ClickableCardComponent } from './clickable-card.component';
import { render, screen } from '@testing-library/angular';

describe('ClickableCardComponent', () => {
  it('should render', async () => {
    await render(ClickableCardComponent, {
      componentInputs: {
        item: {
          title: 'Test Hero',
          subtitle: 'Fancy sub title',
          imageUrl: 'https://hero.image',
          link: '/hero',
        },
      },
    });

    expect(await screen.findByRole('heading', { name: 'Test Hero' })).toBeDefined();
    expect(await screen.findByText('Fancy sub title')).toBeDefined();
  });
});
