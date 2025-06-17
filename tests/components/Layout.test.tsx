import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Layout } from '../../src/components';
import { vi } from 'vitest';

vi.mock('../../src/components/Header', () => ({
  Header: () => <div data-testid="header-component">Header Mock</div>
}));

vi.mock('../../src/components/Footer', () => ({
  Footer: () => <div data-testid="footer-component">Footer Mock</div>
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Outlet: () => <div data-testid="outlet-component">Outlet Mock</div>
  };
});

describe('Components - Layout', () => {
  it('should render Layout with Header and Footer', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('header-component')).toBeInTheDocument();
    expect(screen.getByTestId('outlet-component')).toBeInTheDocument();
    expect(screen.getByTestId('footer-component')).toBeInTheDocument();
  });
});