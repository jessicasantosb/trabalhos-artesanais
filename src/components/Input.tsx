import { useEffect, useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';

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
  const [isPassword, setIsPassword] = useState(false);
  const [inputType, setInputType] = useState(type);

  const handleInputType = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  useEffect(() => {
    if (inputType === 'password') setIsPassword(true);
  }, []);

  return (
    <div className='flex flex-col'>
      <label className='pt-2'>
        {label}
        <div
          dir='ltr'
          className='group flex shadow rounded-s-xl rounded-e-lg focus-within:outline bg-white [&>*]:bg-white'
        >
          <input
            placeholder={placeholder}
            type={inputType}
            {...register(name, rules)}
            id={name}
            className={`w-full h-10 p-2 rounded-s-lg outline-none ${
              !isPassword && 'rounded-e-lg'
            }`}
          />
          {isPassword && (
            <button
              type='button'
              className='p-2 outline-none rounded-e-lg'
              onClick={handleInputType}
            >
              {inputType === 'password' ? <IoEye /> : <IoEyeOff />}
            </button>
          )}
        </div>
      </label>

      {error && <p className='my-1 text-red text-sm'>{error}</p>}
    </div>
  );
}
