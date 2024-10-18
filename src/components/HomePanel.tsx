import { useState } from 'react';
import { IoMdCreate } from 'react-icons/io';
import { MdOutlineFilterList } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FilterByColor } from './filters/FilterByColor';
import { FilterByTitle } from './filters/FilterByTitle';

interface HomePanelProps {
  inputTitle: string;
  setInputTitle: (event: string) => void;
  handleSearchTitle: (event: React.MouseEvent<HTMLElement>) => void;
  inputColor: string;
  setInputColor: (event: string) => void;
  handleSearchColor: (event: React.MouseEvent<HTMLElement>) => void;
  years: number[];
  handleSearchYear: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function HomePanel({
  inputTitle,
  setInputTitle,
  handleSearchTitle,
  inputColor,
  setInputColor,
  handleSearchColor,
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
        <div className='w-full my-4 center flex-col gap-6'>
          <div className='center flex-col md:flex-row gap-4 md:gap-6'>
            <FilterByTitle
              inputTitle={inputTitle}
              setInputTitle={setInputTitle}
              handleSearchTitle={handleSearchTitle}
            />

            <FilterByColor
              inputColor={inputColor}
              setInputColor={setInputColor}
              handleSearchColor={handleSearchColor}
            />
          </div>

          <div className='relative'>
            <label className='pointer-events-none select-none absolute left-2 -top-3 text-[11px] bg-opacity-80 bg-white p-1'>
              selecione um ano
            </label>
            <select
              className='bg-white border border-geraldine px-8 p-2 focus:border-2 focus:outline-0'
              onChange={(e) => handleSearchYear(e)}
            >
              <option value='all'>todos</option>
              {years.map((year, index) => {
                return (
                  <option key={index} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      )}
    </section>
  );
}
