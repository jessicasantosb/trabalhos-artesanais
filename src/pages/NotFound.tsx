import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className='container m-auto center min-h-screen'>
      <div className='p-4 center flex-col'>
        <h1 className='text-9xl text-geraldine font-bold pb-2'>404</h1>
        <p className='text-lg text-center'>ops! parece que essa página não existe!</p>
        <button className='mt-12 p-4 bg-blue bg-opacity-90 shadow-md hover:scale-95 hover:bg-opacity-80 hover:shadow-none '>
          <Link to={'/'}>voltar para página inicial</Link>
        </button>
      </div>
    </section>
  );
}
