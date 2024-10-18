import { FilterByYearProps } from '../types';

export function FilterByYear({ years, handleSearchYear }: FilterByYearProps) {
  return (
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
  );
}
