import { forwardRef, InputHTMLAttributes, useEffect, useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    const [isPassword, setIsPassword] = useState(false);
    const [type, setType] = useState<'password' | 'text'>();

    const handleShowHidePassword = () => {
      setType(type === 'password' ? 'text' : 'password');
    };

    useEffect(() => {
      if (label?.toLowerCase().includes('senha')) {
        setIsPassword(true);
        setType('password');
      }
    }, []);

    return (
      <div className='w-full flex flex-col'>
        <label className='pt-2'>
          {label}
          <div className='group flex shadow shadow-geraldine  focus-within:shadow-blue focus-within:outline outline-blue outline-1  bg-white [&>*]:bg-white'>
            <input
              {...props}
              ref={ref}
              type={type}
              className='w-full h-10 p-2 outline-none'
            />
            {isPassword && (
              <button
                type='button'
                className='p-2 outline-none'
                onClick={handleShowHidePassword}>
                {type === 'password' ? <IoEye /> : <IoEyeOff />}
              </button>
            )}
          </div>
        </label>

        {error && <p className='my-1 text-red text-sm'>{error}</p>}
      </div>
    );
  },
);
