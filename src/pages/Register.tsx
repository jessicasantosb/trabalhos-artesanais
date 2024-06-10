import { zodResolver } from '@hookform/resolvers/zod';
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import Input from '../components/Input';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../services/firebaseConnection';
import toast from 'react-hot-toast';

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
  const navigate = useNavigate();
  const { handleUserInfo } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({ resolver: zodResolver(schema), mode: 'onChange' });

  useEffect(() => {
    const logout = async () => {
      signOut(auth);
    };

    logout();
  }, []);

  const onSubmit = (data: formData) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (user) => {
        await updateProfile(user.user, {
          displayName: data.name,
        });

        handleUserInfo({
          uid: user.user.uid,
          name: data.name,
          email: data.email,
        });
        
        toast.success('Registrado com sucesso!');
        navigate('/login', { replace: true });
      })
      .catch((error) => {
        console.error(error);
      });
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
