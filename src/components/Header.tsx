import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='w-full shadow-sm'>
      <nav className='container m-auto p-2 center justify-between'>
        <Link to={'/'}>Trabalhos Artesanais</Link>
        <p>login/register</p>
      </nav>
    </header>
  );
}
