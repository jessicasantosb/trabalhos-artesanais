import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from '../../components';

describe('Components - Footer', () => {
  it('should render Footer', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    expect(getByText('ALGUMAS IDEIAS')).toBeInTheDocument();
    expect(getByText('SOBRE NÓS')).toBeInTheDocument();
    expect(
      getByText('© 2024 - Alguns direitos reservados'),
    ).toBeInTheDocument();
  });
});
