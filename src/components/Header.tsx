import { signOut } from 'firebase/auth';
import { useContext, useState } from 'react';
import { MdLogout, MdClose } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../services/firebaseConnection';

export default function Header() {
  const { isSigned, loadingAuth, user } = useContext(AuthContext);
  const [isDropdown, setIsDropdown] = useState(false);

  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  return (
    <header className='w-full shadow-lg'>
      <nav className='container m-auto px-4 h-[60px] center justify-between'>
        <Link to={'/'}>
          <img src={logo} alt='logo' className='h-10' />
        </Link>

        {!loadingAuth && isSigned && (
          <div>
            <div
              className={`w-full bg-white absolute top-[60px] right-0 px-2 py-8 center flex-col gap-4 rounded shadow-lg transition-all md:relative md:top-0 md:p-0 md:flex-row md:gap-6 md:shadow-none z-50 ${
                !isDropdown && 'hidden md:flex'
              }`}
            >
              <p className='center gap-1'>
                Olá,
                <span className='max-w-32 tracking-tight break-words line-clamp-1'>
                  {user?.name}!
                </span>
              </p>
              <Link to={"/create"} className='headerBtn bg-geraldine hover:text-black'>
              Novo</Link>

              <button
                onClick={() => signOut(auth)}
                className='headerBtn border-black text-black'
              >
                Sair
                <MdLogout size={24} />
              </button>
            </div>

            <button onClick={handleDropdown} className='md:hidden'>
              {isDropdown ? <MdClose size={20} /> : <GiHamburgerMenu size={20} />}
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
