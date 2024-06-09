import {
  IoMdArrowDropdown,
  IoMdArrowDropup,
  IoMdCreate,
  IoMdSearch,
} from 'react-icons/io';
import { Link } from 'react-router-dom';

interface HomePanelProps {
  inputTitle: string;
  setInputTitle: (event: string) => void;
  handleSearchTitle: (event: React.MouseEvent<HTMLElement>) => void;
  inputColor: string;
  setInputColor: (event: string) => void;
  handleSearchColor: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function HomePanel({
  inputTitle,
  setInputTitle,
  handleSearchTitle,
  inputColor,
  setInputColor,
  handleSearchColor,
}: HomePanelProps) {
  return (
    <section className='my-6 p-4 shadow-md shadow-geraldine rounded-xl center flex-col gap-4'>
      <Link to={'create'} className='center gap-2 underline'>
        Criar um novo trabalho
        <IoMdCreate />
      </Link>

      <h3 className='py-4 text-xl flex items-end gap-2'>
        Filtros <IoMdArrowDropdown />
        <IoMdArrowDropup />
      </h3>

      <div className='w-full max-w-96 center'>
        <input
          type='text'
          placeholder='pesquise pelo título'
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
          className='w-full'
        />
        <button onClick={handleSearchTitle}>
          <IoMdSearch size={20} />
        </button>
      </div>

      <div className='w-full max-w-96 center'>
        <input
          type='text'
          placeholder='pesquise pela cor'
          value={inputColor}
          onChange={(e) => setInputColor(e.target.value)}
          className='w-full'
        />
        <button onClick={handleSearchColor}>
          <IoMdSearch size={20} />
        </button>
      </div>

      <div className='w-full center justify-between'>
        <select>
          <option value='ano' disabled>
            ano
          </option>
          <option value='2024'> 2024</option>
        </select>
        <input type='range' name='price' />
      </div>
    </section>
  );
}
