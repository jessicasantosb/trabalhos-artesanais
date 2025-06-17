import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from '../../src/components';

describe('Components - Footer', () => {
  it('should render Footer with correct headings', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText('ALGUMAS IDEIAS')).toBeInTheDocument();
    expect(screen.getByText('SOBRE NÓS')).toBeInTheDocument();
  });

  it('should render logo with correct attributes', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const logoImage = screen.getByAltText('logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src');
    expect(logoImage).toHaveClass('h-12');
  });

  it('should render external links with correct attributes', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const youtubeLink = screen.getByText('YOUTUBE');
    expect(youtubeLink).toBeInTheDocument();
    expect(youtubeLink.closest('a')).toHaveAttribute('href', 'https://www.youtube.com/results?search_query=trabalhos+artesanais');
    expect(youtubeLink.closest('a')).toHaveAttribute('target', '_blank');
    expect(youtubeLink.closest('a')).toHaveAttribute('rel', 'noopener noreferrer');

    const pinterestLink = screen.getByText('PINTEREST');
    expect(pinterestLink).toBeInTheDocument();
    expect(pinterestLink.closest('a')).toHaveAttribute('href', 'https://www.pinterest.com/search/pins/?q=trabalhos%20artesanais&rs=typed');
    expect(pinterestLink.closest('a')).toHaveAttribute('target', '_blank');
    expect(pinterestLink.closest('a')).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should render copyright information with author link', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText(/© 2024 - Criado por/)).toBeInTheDocument();
    
    const authorLink = screen.getByText('Jessica Bandeira');
    expect(authorLink).toBeInTheDocument();
    expect(authorLink.closest('a')).toHaveAttribute('href', 'https://jessicasantosb.vercel.app/');
    expect(authorLink.closest('a')).toHaveAttribute('target', '_blank');
  });
});