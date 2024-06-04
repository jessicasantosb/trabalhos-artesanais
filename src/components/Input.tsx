import { RegisterOptions, UseFormRegister } from 'react-hook-form';

interface InputProps {
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  type: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
}

export default function Input({
  label,
  placeholder,
  defaultValue,
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
          defaultValue={defaultValue}
          {...register(name, rules)}
          id={name}
          className='w-full h-10 p-2 shadow rounded-sm'
        />
      </label>

      {error && <p className='my-1 text-red text-sm'>{error}</p>}
    </div>
  );
}
