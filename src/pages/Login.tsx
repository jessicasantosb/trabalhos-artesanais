import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import image from '../assets/login-img.jpg';
import { Input } from '../components';
import { auth } from '../services';

const schema = z.object({
  email: z
    .string()
    .email('Insira um email válido')
    .nonempty('O campo email é obrigatório'),
  password: z.string().nonempty('O campo senha é obrigatório'),
});

type formData = z.infer<typeof schema>;

export function Login() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        toast.success('Logado com sucesso!');
        navigate('/', { replace: true });
      })
      .catch((error) => {
        console.error(error);
        if (error.code === 'auth/invalid-credential') {
          setError('Confira seus dados');
        } else if (error.code === 'auth/invalid-email') {
          setError('Confira seu email');
        }
      });
  };

  return (
    <section className='authSection'>
      <main className='authContainer'>
        <img
          src={image}
          alt='crochet image'
          className='authImg saturate-200 contrast-125'
        />
        <div className='authDiv'>
          <h1 className='authTitle md:pt-14 md:before:top-[107px]'>
            Bem vindo!
          </h1>
          <form className='authForm' onSubmit={handleSubmit(onSubmit)}>
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

            {error && <p className='error'>{error}</p>}
            <button className='authBtn'>Entrar</button>
          </form>

          <p>Ainda não possui image conta? </p>
          <Link to={'/register'} className='authLink'>
            Cadastrar
          </Link>
        </div>
      </main>
    </section>
  );
}
