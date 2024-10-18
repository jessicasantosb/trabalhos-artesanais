import { IoMdSearch } from 'react-icons/io';

export function FilterByTitle({
  inputTitle,
  setInputTitle,
  handleSearchTitle,
}: {
  inputTitle: string;
  setInputTitle: (event: string) => void;
  handleSearchTitle: (event: React.MouseEvent<HTMLElement>) => void;
}) {
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
