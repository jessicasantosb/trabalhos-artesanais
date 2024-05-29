import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import Input from '../components/Input';

const schema = z.object({
  email: z
    .string()
    .email('Insira um email válido')
    .nonempty('O campo email é obrigatório'),
  password: z.string().nonempty('O campo senha é obrigatório'),
});

type formData = z.infer<typeof schema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({ resolver: zodResolver(schema), mode: 'onChange' });

  const onSubmit = (data: formData) => {
    console.log(data);
  }

  return (
    <section className='w-full pt-12 px-4 center flex-col'>
      <h1 className='pb-4 font-medium text-4xl text-center'>Bem vindo!</h1>

      <main className='bg-ligthblue my-8 p-4 w-full max-w-md'>
        <form className='flex flex-col m-auto' onSubmit={handleSubmit(onSubmit)}>
          <Input
            label='Email:'
            type='email'
            name='email'
            error={errors.email?.message}
            register={register}
          />

          <Input
            label='Password:'
            type='password'
            name='password'
            error={errors.password?.message}
            register={register}
          />

          <button className='button'>Entrar</button>
        </form>

        <p>Ainda não possui uma conta? </p>
        <Link to={'/register'} className='underline hover:text-geraldine'>
          Cadastrar
        </Link>
      </main>
    </section>
  );
}
