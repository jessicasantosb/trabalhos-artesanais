import { Form, Link } from 'react-router-dom';

export default function Login() {
  return (
    <section className='w-full pt-12 px-4 center flex-col'>
      <h1 className='pb-4 font-medium text-4xl text-center'>Bem vindo!</h1>

      <main className='bg-ligthblue my-8 p-4 '>
        <Form method='post' replace className='flex flex-col m-auto'>
          <label htmlFor='email'>Email:</label>
          <input type='email' name='email' />

          <label htmlFor='password' className='pt-4'>
            Senha:
          </label>
          <input type='password' name='password' />

          <button className='button'>Entrar</button>
        </Form>

        <p>Ainda não possui uma conta? </p>
        <Link to={'/register'} className='underline hover:text-geraldine'>
          Cadastrar
        </Link>
      </main>
    </section>
  );
}
