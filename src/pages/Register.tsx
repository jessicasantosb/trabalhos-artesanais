import { Form, Link } from 'react-router-dom';

export default function Register() {
  return (
    <section className='w-full pt-12 px-4 center flex-col'>
      <h1 className='pb-4 font-medium text-4xl text-center'>Cadastre-se!</h1>

      <main className='bg-ligthblue my-8 p-4 '>
        <Form method='post' replace className='flex flex-col m-auto'>
          <label htmlFor='email'>Email:</label>
          <input type='email' name='email' />

          <label htmlFor='password' className='pt-4'>
            Senha:
          </label>
          <input type='password' name='password' />

          <label htmlFor='password' className='pt-4'>
            Confirme a senha:
          </label>
          <input type='password' name='password' />

          <button className='button'>Cadastrar</button>
        </Form>

        <p>Já possui uma conta? </p>
        <Link to={'/login'} className='underline hover:text-geraldine'>
          Entrar
        </Link>
      </main>
    </section>
  );
}
