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
import Input from '../components/Input';
import { useAuthContext } from '../hooks/useAuthContext';
import { auth } from '../services/firebaseConnection';

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
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { handleUserInfo } = useAuthContext();

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
        if (error.code === 'auth/weak-password') {
          setError('Senha fraca');
        } else if (error.code === 'auth/email-already-in-use') {
          setError('Este email já está em uso');
        }
      });
  };

  return (
    <section className='authSection'>
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
          <Link to={'/login'} className='authLink'>
            Entrar
          </Link>
        </div>
      </main>
    </section>
  );
}
