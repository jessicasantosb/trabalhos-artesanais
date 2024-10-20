import { InputProps } from './types';

export function Input({
  label,
  placeholder,
  type,
  name,
  register,
  error,
  rules,
}: InputProps) {
  return (
    <div className='flex flex-col'>
      <label className='pt-2'>
        {label}
        <input
          placeholder={placeholder}
          type={type}
          {...register(name, rules)}
          id={name}
          className='w-full h-10 p-2 shadow rounded-sm'
        />
      </label>

      {error && <p className='my-1 text-red text-sm'>{error}</p>}
    </div>
  );
}
