import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HomeCard } from '../../src/components';
import { vi } from 'vitest';

describe('Components - HomeCard', () => {
  const mockHandleDeleteProject = vi.fn();
  const defaultProps = {
    id: 'test-id',
    image: 'test-image.jpg',
    title: 'Test Project',
    date: '01/01/2023',
    client: 'Test Client',
    price: 'R$ 100,00',
    handleDeleteProject: mockHandleDeleteProject
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render HomeCard with all elements', () => {
    render(
      <MemoryRouter>
        <HomeCard {...defaultProps} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('projectLink')).toBeInTheDocument();
    expect(screen.getByTestId('projectTrash')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('01/01/2023')).toBeInTheDocument();
    expect(screen.getByText('Test Client')).toBeInTheDocument();
    expect(screen.getByText('R$ 100,00')).toBeInTheDocument();
  });

  it('should navigate to project details when clicking the link', () => {
    render(
      <MemoryRouter>
        <HomeCard {...defaultProps} />
      </MemoryRouter>
    );

    const projectLink = screen.getByTestId('projectLink');
    expect(projectLink).toHaveAttribute('href', '/projeto/test-id');
    
    fireEvent.click(projectLink);
  });

  it('should call handleDeleteProject when trash button is clicked', () => {
    render(
      <MemoryRouter>
        <HomeCard {...defaultProps} />
      </MemoryRouter>
    );

    const trashButton = screen.getByTestId('projectTrash');
    fireEvent.click(trashButton);
    
    expect(mockHandleDeleteProject).toHaveBeenCalledTimes(1);
  });

  it('should have correct default style for trash button', () => {
    render(
      <MemoryRouter>
        <HomeCard {...defaultProps} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('projectTrash')).toHaveClass('hidden', 'group-hover:block');
  });
});