import { zodResolver } from '@hookform/resolvers/zod';
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import image from '../assets/register-img.jpg';
import { Head, Input } from '../components';
import { useAuthContext } from '../hooks';
import { registerSchema } from '../schemas';
import { auth } from '../services';

type formData = z.infer<typeof registerSchema>;

export function Register() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { handleUserInfo } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

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
        navigate('/entrar', { replace: true });
      })
      .catch((error) => {
        console.error(error);
        if (error.code === 'auth/weak-password') {
          setError('Senha fraca');
        } else if (error.code === 'auth/email-already-in-use') {
          setError('Este email já está em uso');
        }
      });
  };

  return (
    <section className='authSection'>
      <Head title='Cadastrar' description='Registre-se agora!' />

      <main className='authContainer'>
        <img
          src={image}
          alt='crochet image'
          className='authImg hue-rotate-180'
        />
        <div className='authDiv'>
          <h1 className='authTitle'>Cadastre-se!</h1>
          <form className='authForm' onSubmit={handleSubmit(onSubmit)}>
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

            {error && <p className='error'>{error}</p>}
            <button className='authBtn'>Cadastrar</button>
          </form>

          <p>Já possui uma conta? </p>
          <Link to={'/entrar'} className='authLink'>
            Entrar
          </Link>
        </div>
      </main>
    </section>
  );
}
