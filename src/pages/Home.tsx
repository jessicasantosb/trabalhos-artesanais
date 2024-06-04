import HomePanel from '../components/HomePanel';

export default function Home() {
  return (
    <section className='min-h-screen container m-auto p-4'>
      <HomePanel />
      <main className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'></main>
    </section>
  );
}
