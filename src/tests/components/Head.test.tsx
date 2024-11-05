import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Head } from '../../components';

describe('Components - Head', () => {
  it('should render Head', () => {
    render(
      <MemoryRouter>
        <Head title='Head title' description='Head description' />
      </MemoryRouter>,
    );
  });
});
