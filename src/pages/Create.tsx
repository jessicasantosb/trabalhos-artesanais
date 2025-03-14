import { zodResolver } from '@hookform/resolvers/zod';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Head, Input, UploadImage } from '../components';
import { Heading } from '../components/heading';
import { useAuthContext } from '../hooks';
import { createSchema } from '../schemas';
import { db } from '../services';
import { ImagesProps } from '../types';

type FormData = z.infer<typeof createSchema>;

export function Create() {
  const [projectImage, setProjectImage] = useState<ImagesProps[]>([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(createSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    if (projectImage.length === 0) {
      toast.error('Envie ao menos uma imagem.');
      return;
    }

    const projectImagesList = projectImage.map((item) => {
      return {
        uid: item.uid,
        name: item.name,
        url: item.url,
      };
    });

    addDoc(collection(db, 'trabalhos'), {
      title: data.title.toUpperCase(),
      date: data.date,
      client: data.client,
      price: data.price,
      color: data.color.toUpperCase(),
      size: data.size,
      description: data.description,
      created: new Date(),
      owner: user?.name,
      uid: user?.uid,
      images: projectImagesList,
    })
      .then(() => {
        reset();
        setProjectImage([]);
        toast.success('Criado com sucesso!');
        navigate('/', { replace: true });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <section className='container m-auto p-4 center flex-col'>
      <Head
        title='Criar'
        description='Registre os dados do seu novo trabalho!'
      />
      <Heading
        title='Novo Cadastro'
        subtitle='adicione nos campos abaixo os dados do seu novo trabalho e não se
        esqueça de clicar em salvar'
      />

      <div>
        <UploadImage
          projectImage={projectImage}
          setProjectImage={setProjectImage}
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-2'>
          <Input
            type='text'
            label='Título: *'
            placeholder='ex: Tapete em crochê'
            id='title'
            errors={errors}
            {...register('title')}
          />
          <Input
            type='text'
            label='Cliente:'
            placeholder='ex: Maria'
            id='client'
            errors={errors}
            {...register('client')}
          />
          <div className='flex flex-col justify-between sm:flex-row gap-4'>
            <Input
              type='text'
              label='Data:'
              placeholder='ex: DD/MM/AAAA'
              id='date'
              errors={errors}
              {...register('date')}
            />
            <Input
              type='string'
              label='Preço:'
              placeholder='R$ 50,99'
              id='price'
              errors={errors}
              {...register('price')}
            />
          </div>
          <Input
            type='text'
            label='Cor Principal:'
            placeholder='ex: Marrom'
            id='color'
            errors={errors}
            {...register('color')}
          />
          <Input
            type='text'
            label='Tamanho:'
            placeholder='ex: 100cm x 40cm'
            id='size'
            errors={errors}
            {...register('size')}
          />
          <label className='flex flex-col pt-2'>
            Descrição:
            <textarea
              className='p-2 shadow rounded-sm'
              placeholder='ex: youtube.com/watch?v=TRPBY_lxJfE&t=248s'
              {...register('description')}
              name='description'
            />
            <p className='my-1 text-red text-sm'>
              {errors.description?.message}
            </p>
          </label>
          <button className='bg-geraldine w-full my-4 py-2 text-medium text-white font-bold shadow-lg hover:scale-95'>
            SALVAR
          </button>
        </form>
      </div>
    </section>
  );
}
