import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '../../src/components';
import { vi } from 'vitest';

vi.mock('../../src/hooks/useAuthContext', () => ({
  useAuthContext: () => mockUseAuthContext()
}));

vi.mock('firebase/auth', () => ({
  signOut: () => mockSignOut(),
  getAuth: () => ({})
}));

const mockUseAuthContext = vi.fn();
const mockSignOut = vi.fn();

describe('Components - Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    mockUseAuthContext.mockReturnValue({
      isSigned: false,
      loadingAuth: false,
      user: null,
      handleUserInfo: vi.fn(),
      loadProjects: vi.fn(),
      projects: [],
      setProjects: vi.fn(),
      projectsDuplicated: []
    });
  });

  it('should render Header with logo', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByAltText('logo')).toBeInTheDocument();
  });

  it('should render color palette link', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('Paleta de cores')).toBeInTheDocument();
  });

  it('should render user info and additional links when signed in', () => {
    mockUseAuthContext.mockReturnValue({
      isSigned: true,
      loadingAuth: false,
      user: { uid: '123', name: 'Test User', email: 'test@example.com' },
      handleUserInfo: vi.fn(),
      loadProjects: vi.fn(),
      projects: [],
      setProjects: vi.fn(),
      projectsDuplicated: []
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('Olá,')).toBeInTheDocument();
    expect(screen.getByText('Test User!')).toBeInTheDocument();
    expect(screen.getByText('Novo')).toBeInTheDocument();
    expect(screen.getByText('Gráfico')).toBeInTheDocument();
    expect(screen.getByText('Sair')).toBeInTheDocument();
  });

  it('should toggle dropdown menu when hamburger button is clicked', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const menuContainer = screen.getByText('Paleta de cores').parentElement;
    expect(menuContainer).toHaveClass('hidden');
    
    const hamburgerButton = screen.getByRole('button');
    fireEvent.click(hamburgerButton);
    
    expect(menuContainer).not.toHaveClass('hidden');
  });
});