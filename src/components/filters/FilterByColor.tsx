import { IoMdSearch } from 'react-icons/io';

export function FilterByColor({
  inputColor,
  setInputColor,
  handleSearchColor,
}: {
  inputColor: string;
  setInputColor: (event: string) => void;
  handleSearchColor: (event: React.MouseEvent<HTMLElement>) => void;
}) {
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
