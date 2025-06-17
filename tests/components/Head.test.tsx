import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Head } from '../../src/components';
import { vi } from 'vitest';

describe('Components - Head', () => {
  const originalTitle = document.title;
  const metaElement = document.createElement('meta');
  metaElement.setAttribute('name', 'description');
  document.head.appendChild(metaElement);

  const setAttributeSpy = vi.spyOn(metaElement, 'setAttribute');

  afterEach(() => {
    document.title = originalTitle;
    vi.clearAllMocks();
  });

  it('should update document title and meta description', () => {
    render(
      <MemoryRouter>
        <Head title='Test Title' description='Test Description' />
      </MemoryRouter>
    );

    expect(document.title).toBe('Test Title | Trabalhos Artesanais');
    
    expect(setAttributeSpy).toHaveBeenCalledWith(
      'content',
      'Transforme a maneira como você gerencia seus projetos com esse aplicativo de organização de trabalhos. Test Description'
    );
  });

  it('should update title and description when props change', () => {
    const { rerender } = render(
      <MemoryRouter>
        <Head title='Initial Title' description='Initial Description' />
      </MemoryRouter>
    );

    expect(document.title).toBe('Initial Title | Trabalhos Artesanais');

    rerender(
      <MemoryRouter>
        <Head title='Updated Title' description='Updated Description' />
      </MemoryRouter>
    );

    expect(document.title).toBe('Updated Title | Trabalhos Artesanais');
    
    expect(setAttributeSpy).toHaveBeenCalledWith(
      'content',
      'Transforme a maneira como você gerencia seus projetos com esse aplicativo de organização de trabalhos. Updated Description'
    );
  });
});