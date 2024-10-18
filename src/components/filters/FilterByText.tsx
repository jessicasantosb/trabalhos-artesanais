import { FilterByTextProps } from '../types';

export function FilterByText({
  placeholder,
  onSearch,
}: FilterByTextProps) {
  return (
    <input
      type='text'
      placeholder={placeholder}
      onChange={onSearch}
      className='filterBtnInput'
    />
  );
}
