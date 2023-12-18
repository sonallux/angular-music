import { CardListComponent } from './card-list.component';
import { render, screen } from '@testing-library/angular';

describe('CardListComponent', () => {
  it('should render', async () => {
    await render(CardListComponent, {
      componentInputs: {
        items: [
          {
            title: 'Test Hero',
            subtitle: 'Fancy sub title',
            imageUrl: 'https://hero.image',
            link: '/hero',
          },
        ],
      },
    });

    expect(await screen.findByRole('heading', { name: 'Test Hero' })).toBeDefined();
    expect(await screen.findByText('Fancy sub title')).toBeDefined();
  });
});
