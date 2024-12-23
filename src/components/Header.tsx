import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose, MdLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.png';
import { useAuthContext } from '../hooks';
import { auth } from '../services';

export function Header() {
  const [isDropdown, setIsDropdown] = useState(false);
  const { isSigned, loadingAuth, user } = useAuthContext();

  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const handleSignOut = () => {
    signOut(auth);
    setIsDropdown(!isDropdown);
  };

  return (
    <header className='w-full shadow-lg'>
      <nav className='container m-auto px-4 h-[60px] center justify-between'>
        <Link to={'/'}>
          <img src={logo} alt='logo' className='h-10' data-testid='logo' />
        </Link>

        <div>
          <div
            className={`w-full bg-white absolute top-[60px] right-0 px-2 py-8 center flex-col gap-4 rounded shadow-lg transition-all md:relative md:top-0 md:p-0 md:flex-row md:gap-6 md:shadow-none z-50 ${
              !isDropdown && 'hidden md:flex'
            }`}>
            <Link to={'/cores'}>Paleta de cores</Link>

            {!loadingAuth && isSigned && (
              <>
                <p className='center gap-1'>
                  Olá,
                  <span className='max-w-32 tracking-tight break-words line-clamp-1'>
                    {user?.name}!
                  </span>
                </p>
                <Link
                  onClick={handleDropdown}
                  to={'/criar'}
                  className='headerBtn bg-geraldine hover:text-black'>
                  Novo
                </Link>
                <Link
                  onClick={handleDropdown}
                  to={'/grafico'}
                  className='headerBtn bg-blue hover:text-black'>
                  Gráfico
                </Link>

                <button
                  onClick={handleSignOut}
                  className='headerBtn border-black text-black'>
                  Sair
                  <MdLogout size={24} />
                </button>
              </>
            )}
          </div>

          <button onClick={handleDropdown} className='md:hidden'>
            {isDropdown ? <MdClose size={20} /> : <GiHamburgerMenu size={20} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
