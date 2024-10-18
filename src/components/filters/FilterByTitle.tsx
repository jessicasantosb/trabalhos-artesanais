import { IoMdSearch } from 'react-icons/io';
import { FilterByTitleProps } from '../types';

export function FilterByTitle({
  inputTitle,
  setInputTitle,
  handleSearchTitle,
}: FilterByTitleProps) {
  return (
    <div className='filterBtnDiv'>
      <input
        type='text'
        placeholder='pesquise pelo título'
        value={inputTitle}
        onChange={(e) => setInputTitle(e.target.value)}
        className='filterBtnInput'
      />

      <button onClick={handleSearchTitle} className='filterBtn'>
        <IoMdSearch size={20} />
      </button>
    </div>
  );
}
