import { useEffect, useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';

import { InputProps } from './types';

export function Input({
  label,
  placeholder,
  defaultValue,
  type,
  name,
  register,
  error,
  rules,
}: InputProps) {
  const [isPassword, setIsPassword] = useState(false);
  const [inputType, setInputType] = useState(type);

  const handleInputType = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  useEffect(() => {
    if (inputType === 'password') setIsPassword(true);
  }, []);

  return (
    <div className='w-full flex flex-col'>
      <label className='pt-2'>
        {label}
        <div className='group flex shadow shadow-geraldine  focus-within:shadow-blue focus-within:outline outline-blue outline-1  bg-white [&>*]:bg-white'>
          <input
            placeholder={placeholder}
            defaultValue={defaultValue}
            type={inputType}
            {...register(name, rules)}
            id={name}
            className='w-full h-10 p-2 outline-none'
          />
          {isPassword && (
            <button
              type='button'
              className='p-2 outline-none'
              onClick={handleInputType}>
              {inputType === 'password' ? <IoEye /> : <IoEyeOff />}
            </button>
          )}
        </div>
      </label>

      {error && <p className='my-1 text-red text-sm'>{error}</p>}
    </div>
  );
}
