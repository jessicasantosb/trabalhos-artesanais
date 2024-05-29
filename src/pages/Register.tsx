import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import Input from '../components/Input';

const schema = z
  .object({
    name: z.string().nonempty('O campo nome é obrigatório'),
    email: z
      .string()
      .email('Insira um email válido')
      .nonempty('O campo email é obrigatório'),
    password: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .nonempty('O campo senha é obrigatório'),
    confirmPassword: z
      .string()
      .nonempty('O campo confirmação de senha é obrigatório'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas devem ser iguais',
    path: ['confirmPassword'],
  });

type formData = z.infer<typeof schema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({ resolver: zodResolver(schema), mode: 'onChange' });

  const onSubmit = (data: formData) => {
    console.log(data);
  };

  return (
    <section className='w-full pt-12 px-4 center flex-col'>
      <h1 className='pb-4 font-medium text-4xl text-center'>Cadastre-se!</h1>

      <main className='bg-ligthblue my-8 p-4 w-full max-w-md'>
        <form
          className='flex flex-col m-auto'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label='Nome:'
            type='text'
            name='name'
            error={errors.name?.message}
            register={register}
          />

          <Input
            label='Email:'
            type='email'
            name='email'
            error={errors.email?.message}
            register={register}
          />

          <Input
            label='Senha:'
            type='password'
            name='password'
            error={errors.password?.message}
            register={register}
          />

          <Input
            label='Confirme a senha:'
            type='password'
            name='confirmPassword'
            error={errors.confirmPassword?.message}
            register={register}
          />

          <button className='button'>Cadastrar</button>
        </form>

        <p>Já possui uma conta? </p>
        <Link to={'/login'} className='underline hover:text-geraldine'>
          Entrar
        </Link>
      </main>
    </section>
  );
}
