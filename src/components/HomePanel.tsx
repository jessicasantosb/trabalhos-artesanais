import { useState } from 'react';
import { IoMdCreate } from 'react-icons/io';
import { MdOutlineFilterList } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { FilterByText } from './filters/FilterByText';
import { FilterByYear } from './filters/FilterByYear';
import { HomePanelProps } from './types';

export function HomePanel({
  onSearch,
  years,
  handleSearchYear,
}: HomePanelProps) {
  const [openedFilter, setOpenedFilter] = useState(false);

  const handleFilterButton = () => {
    if (openedFilter) return setOpenedFilter(false);
    setOpenedFilter(true);
  };

  return (
    <section className='my-6 p-4 shadow-md shadow-geraldine rounded-xl center flex-col gap-4'>
      <div className='w-full center flex-row-reverse flex-wrap justify-between gap-2'>
        <Link to={'criar'} className='center gap-2 md:text-lg hover:text-blue'>
          Criar um novo trabalho
          <IoMdCreate size={18} />
        </Link>

        <button
          onClick={handleFilterButton}
          className='md:text-lg center gap-2 hover:text-blue'
        >
          Filtros
          <MdOutlineFilterList size={18} />
        </button>
      </div>

      {openedFilter && (
        <div className='w-full my-4 center flex-col md:flex-row gap-4 md:gap-'>
          <FilterByText
            onSearch={({ target }) => onSearch(target.value, 'title')}
            placeholder='pesquise pelo título'
          />

          <FilterByText
            onSearch={({ target }) => onSearch(target.value, 'color')}
            placeholder='pesquise pela cor'
          />

          <FilterByYear years={years} handleSearchYear={handleSearchYear} />
        </div>
      )}
    </section>
  );
}
