import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Layout } from '../../components';

describe('Components - Layout', () => {
  it('should render Layout', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
  });
});
