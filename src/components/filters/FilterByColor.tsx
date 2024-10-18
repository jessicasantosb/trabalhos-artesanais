import { IoMdSearch } from 'react-icons/io';
import { FilterByColorProps } from '../types';

export function FilterByColor({
  inputColor,
  setInputColor,
  handleSearchColor,
}: FilterByColorProps) {
  return (
    <div className='filterBtnDiv'>
      <input
        type='text'
        placeholder='pesquise pela cor'
        value={inputColor}
        onChange={(e) => setInputColor(e.target.value)}
        className='filterBtnInput'
      />
      <button onClick={handleSearchColor} className='filterBtn'>
        <IoMdSearch size={20} />
      </button>
    </div>
  );
}
