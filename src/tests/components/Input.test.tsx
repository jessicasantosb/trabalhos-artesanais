import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Input } from '../../components';

describe('Components - Input', () => {
  it('should render Input', () => {
    render(
      <MemoryRouter>
        <Input
          name='title'
          type='text'
          label='Título: *'
          placeholder='ex: Tapete em crochê'
          register={() => 'test'}
        />
      </MemoryRouter>
    );
  });

  it('should render error text when error is passed', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Input
          name='title'
          type='text'
          label='Título: *'
          placeholder='ex: Tapete em crochê'
          register={() => 'test'}
          error='error test message'
        />
      </MemoryRouter>
    );

    expect(getByRole('paragraph')).toBeInTheDocument();
    expect(getByRole('paragraph')).toHaveClass('my-1 text-red text-sm');
  });
});
