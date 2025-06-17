import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HomePanel } from '../../src/components';
import { vi } from 'vitest';

describe('Components - HomePanel', () => {
  const mockOnSearch = vi.fn();
  const mockHandleSearchYear = vi.fn();
  const years = [2022, 2023, 2024];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render HomePanel with correct elements', () => {
    render(
      <MemoryRouter>
        <HomePanel
          onSearch={mockOnSearch}
          years={years}
          handleSearchYear={mockHandleSearchYear}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText('Criar um novo trabalho')).toBeInTheDocument();
    expect(screen.getByText('Filtros')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /criar um novo trabalho/i })).toHaveAttribute('href', '/criar');
  });

  it('should show filters when filter button is clicked', () => {
    render(
      <MemoryRouter>
        <HomePanel
          onSearch={mockOnSearch}
          years={years}
          handleSearchYear={mockHandleSearchYear}
        />
      </MemoryRouter>,
    );

    expect(screen.queryByPlaceholderText('pesquise pelo título')).not.toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Filtros'));
    
    expect(screen.getByPlaceholderText('pesquise pelo título')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('pesquise pela cor')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should hide filters when filter button is clicked again', () => {
    render(
      <MemoryRouter>
        <HomePanel
          onSearch={mockOnSearch}
          years={years}
          handleSearchYear={mockHandleSearchYear}
        />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText('Filtros'));
    expect(screen.getByPlaceholderText('pesquise pelo título')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Filtros'));
    expect(screen.queryByPlaceholderText('pesquise pelo título')).not.toBeInTheDocument();
  });

  it('should call onSearch when typing in title filter', () => {
    render(
      <MemoryRouter>
        <HomePanel
          onSearch={mockOnSearch}
          years={years}
          handleSearchYear={mockHandleSearchYear}
        />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText('Filtros'));
    
    fireEvent.change(screen.getByPlaceholderText('pesquise pelo título'), { target: { value: 'test title' } });
    
    expect(mockOnSearch).toHaveBeenCalledWith('test title', 'title');
  });

  it('should call onSearch when typing in color filter', () => {
    render(
      <MemoryRouter>
        <HomePanel
          onSearch={mockOnSearch}
          years={years}
          handleSearchYear={mockHandleSearchYear}
        />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText('Filtros'));
    
    fireEvent.change(screen.getByPlaceholderText('pesquise pela cor'), { target: { value: 'blue' } });
    
    expect(mockOnSearch).toHaveBeenCalledWith('blue', 'color');
  });

  it('should call handleSearchYear when selecting a year', () => {
    render(
      <MemoryRouter>
        <HomePanel
          onSearch={mockOnSearch}
          years={years}
          handleSearchYear={mockHandleSearchYear}
        />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText('Filtros'));
    
    const yearSelect = screen.getByRole('combobox');
    fireEvent.change(yearSelect, { target: { value: '2023' } });
    
    expect(mockHandleSearchYear).toHaveBeenCalled();
  });
});