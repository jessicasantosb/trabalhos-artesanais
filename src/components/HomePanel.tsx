import { IoMdCreate } from 'react-icons/io';
import { Link } from 'react-router-dom';

export default function HomePanel() {
  return (
    <section className='my-6 p-4 shadow-md shadow-geraldine rounded-xl center flex-col gap-4'>
      <Link to={'create'} className='center gap-2 underline'>
        Criar um novo trabalho
        <IoMdCreate />
      </Link>
      <div className='center flex-col gap-2'>
        <h3>Filtros</h3>
        <div className='center flex-wrap gap-4'>
          <input type='text' placeholder='cor principal' />
          <select>
            <option value='ano' disabled>
              ano
            </option>
            <option value='2024'> 2024</option>
          </select>
          <input type='range' name='price' />
        </div>
      </div>
    </section>
  );
}
