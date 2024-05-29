import { RegisterOptions, UseFormRegister } from 'react-hook-form';

interface InputProps {
  label: string,
  type: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
}

export default function Input({
  label,
  type,
  name,
  register,
  error,
  rules,
}: InputProps) {
  return (
    <>
      <label className='pt-2'>
        {label}
        <input
          type={type}
          {...register(name, rules)}
          id={name}
          className='w-full h-10 p-2 rounded-lg'
        />
      </label>

      {error && <p className=' my-1 text-red text-sm'>{error}</p>}
    </>
  );
}
