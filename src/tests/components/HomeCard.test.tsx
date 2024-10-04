import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HomeCard } from '../../components';

describe('Components - HomeCard', () => {
  it('should render HomeCard', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <HomeCard
          key={1}
          id='test'
          image='test'
          title='test'
          date='test'
          client='test'
          price='test'
          handleDeleteProject={() => 'test'}
        />
      </MemoryRouter>
    );

    expect(screen.getByTestId('projectLink')).toBeInTheDocument();
    expect(screen.getByTestId('projectTrash')).toBeInTheDocument();
    expect(getByRole('img')).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
    expect(getByRole('link')).toBeInTheDocument();
    expect(getByRole('heading')).toBeInTheDocument();
  });

  it('should be able to fire a event', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <HomeCard
          key={1}
          id='test'
          image='test'
          title='test'
          date='test'
          client='test'
          price='test'
          handleDeleteProject={() => 'test'}
        />
      </MemoryRouter>
    );

    fireEvent.click(getByTestId('projectLink'));
  });

  it('should be able to have default style', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <HomeCard
          key={1}
          id='test'
          image='test'
          title='test'
          date='test'
          client='test'
          price='test'
          handleDeleteProject={() => 'test'}
        />
      </MemoryRouter>
    );

    expect(getByTestId('projectTrash')).toHaveStyle({
      display: 'inline-block',
    });
  });
});
