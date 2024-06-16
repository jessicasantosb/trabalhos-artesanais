import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className='container mx-auto mt-8 py-9 px-4 sm:px-8 md:px-24 center flex-col bg-black bg-opacity-5 shadow-sm'>
      <div className='w-full flex justify-between flex-col sm:flex-row gap-4 py-9'>
        <Link to={'/'}>
          <img src={logo} alt='logo' className='h-12' />
        </Link>
        <ul>
          <li className='footerTitle'>ALGUMAS IDEIAS</li>
          <li>
            <a
              href='https://www.youtube.com/results?search_query=trabalhos+artesanais'
              target='_blank'
              rel='noopener noreferrer'
            >
              YOUTUBE
            </a>
          </li>
          <li>
            <a
              href='https://www.pinterest.com/search/pins/?q=trabalhos%20artesanais&rs=typed'
              target='_blank'
              rel='noopener noreferrer'
            >
              PINTEREST
            </a>
          </li>
        </ul>
        <ul>
          <li className='footerTitle'>SOBRE NÓS</li>
          <li>
            <a href='#' rel='noopener noreferrer'>
              TERMO DE USO
            </a>
          </li>
          <li>
            <a href='#' rel='noopener noreferrer'>
              PRIVACIDADE
            </a>
          </li>
          <li>
            <a href='#' rel='noopener noreferrer'>
              COOKIES
            </a>
          </li>
        </ul>
      </div>
      <p className='select-none'>&copy; 2024 - Alguns direitos reservados</p>
    </footer>
  );
}
