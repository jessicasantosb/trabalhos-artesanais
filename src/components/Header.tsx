import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { MdLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../services/firebaseConnection';

export default function Header() {
  const { isSigned, loadingAuth, user } = useContext(AuthContext);

  return (
    <header className='w-full shadow-sm'>
      <nav className='container m-auto px-2 py-4 center justify-between'>
        <Link to={'/'}>Trabalhos Artesanais</Link>

        {!loadingAuth && isSigned && (
          <div className='center gap-6'>
            <p>Olá, {user?.name}!</p>

            <MdLogout
              onClick={() => signOut(auth)}
              size={24}
              className='cursor-pointer hover:text-geraldine'
            />
          </div>
        )}
      </nav>
    </header>
  );
}
