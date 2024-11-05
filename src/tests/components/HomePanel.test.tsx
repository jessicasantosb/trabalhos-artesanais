import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HomePanel } from '../../components';

describe('Components - HomePanel', () => {
  it('should render HomePanel', () => {
    const { getByText } = render(
      <MemoryRouter>
        <HomePanel
          onSearch={() => 'test'}
          years={[2022, 2023, 2024]}
          handleSearchYear={() => 'test'}
        />
      </MemoryRouter>,
    );

    expect(getByText('Criar um novo trabalho')).toBeInTheDocument();
    expect(getByText('Filtros')).toBeInTheDocument();
  });
});
