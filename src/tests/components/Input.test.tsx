import { render, renderHook } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { MemoryRouter } from 'react-router-dom';
import { Input } from '../../components';

const { result } = renderHook(() => useForm());

describe('Components - Input', () => {
  it('should render Input', () => {
    const { getByPlaceholderText } = render(
      <MemoryRouter>
        <Input
          name='title'
          type='text'
          label='Título: *'
          placeholder='ex: Tapete em crochê'
          register={result.current.register}
        />
      </MemoryRouter>,
    );

    expect(getByPlaceholderText('ex: Tapete em crochê')).toBeInTheDocument();
  });

  it('should render error text when error is passed', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Input
          name='title'
          type='text'
          label='Título: *'
          placeholder='ex: Tapete em crochê'
          register={result.current.register}
          error='error test message'
        />
      </MemoryRouter>,
    );

    const errorMessage = getByText('error test message');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('my-1 text-red text-sm');
  });
});
