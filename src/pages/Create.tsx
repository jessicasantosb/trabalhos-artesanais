import { zodResolver } from '@hookform/resolvers/zod';
import { addDoc, collection } from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { GoTrash, GoUpload } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import { z } from 'zod';

import { Head, Input } from '../components';
import { useAuthContext } from '../hooks';
import { db, storage } from '../services';

interface ImageItemProps {
  uid: string;
  name: string;
  previewUrl: string;
  url: string;
}

const schema = z.object({
  title: z
    .string()
    .min(1, { message: 'O título é obrigatório' })
    .max(30, { message: 'O título pode ter no máximo 30 caracteres' }),
  date: z
    .string()
    .min(1, { message: 'A data é obrigatória' })
    .regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/[12][0-9]{3}$/, {
      message: 'Insira uma data válida',
    }),
  client: z.string().min(1, { message: 'O nome do cliente é obrigatório' }),
  price: z
    .union([
      z
        .string()
        .min(1, { message: 'O preço é obrigatório' })
        .transform((x) => {
          const numStr = x
            .replace(/\./g, '')
            .replace(',', '.')
            .replace(/[^0-9.-]+/g, '');
          return parseFloat(numStr);
        }),
      z.number(),
    ])
    .pipe(
      z.coerce
        .number({ invalid_type_error: 'Insira um número válido' })
        .min(0.0001)
        .max(999999999)
    ),
  color: z.string().min(1, { message: 'A cor é obrigatória' }),
  size: z.string().min(1, { message: 'O tamanho é obrigatório' }),
  description: z.string(),
});

type FormData = z.infer<typeof schema>;

export function Create() {
  const [projectImage, setProjectImage] = useState<ImageItemProps[]>([]);
  const { user } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });
  const navigate = useNavigate();

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === 'image/jpeg' || image.type === 'image/png') {
        handleUpload(image);
      } else {
        alert('Envie apenas imagem jpeg ou png.');
        return;
      }
    }
  };

  const handleUpload = async (image: File) => {
    if (!user?.uid) {
      return;
    }

    const currentUid = user?.uid;
    const uidImage = uuidV4();

    const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`);

    if (projectImage.length < 5) {
      uploadBytes(uploadRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadUrl) => {
          const imageItem = {
            name: uidImage,
            uid: currentUid,
            previewUrl: URL.createObjectURL(image),
            url: downloadUrl,
          };

          setProjectImage((images) => [...images, imageItem]);
        });
      });
    } else {
      alert('Quantidade máxima de imagens atingida');
    }
  };

  const handleDeleteImage = async (item: ImageItemProps) => {
    const imagePath = `images/${item.uid}/${item.name}`;
    const imageRef = ref(storage, imagePath);

    try {
      await deleteObject(imageRef);
      setProjectImage(projectImage.filter((image) => image.url !== item.url));
    } catch (error) {
      console.error(error);
    }
  };

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

      <h1 className='pt-14 pb-2 font-medium text-4xl'>Novo Cadastro</h1>
      <p className='pb-14 text-center'>
        adicione nos campos abaixo os dados do seu novo trabalho e não se
        esqueça de clicar em salvar
      </p>
      <div>
        <div className='flex flex-wrap gap-2 mb-4'>
          <button className='h-24 w-full max-w-24 center bg-geraldine'>
            <GoUpload
              size={30}
              className='absolute text-white pointer-events-none'
            />
            <label className='h-full w-full cursor-pointer' arial-hidden='true'>
              <input
                type='file'
                accept='image/*'
                className='opacity-0 hidden'
                onChange={handleFile}
              />
            </label>
          </button>
          {projectImage.map((image) => {
            return (
              <div key={image.name} className='group h-24 center basis-24 grow'>
                <button>
                  <GoTrash
                    size={32}
                    className='absolute bottom-0 right-0 hidden group-hover:block bg-geraldine text-white p-1'
                    onClick={() => handleDeleteImage(image)}
                  />
                </button>
                <img
                  src={image.url}
                  alt={image.name}
                  className='w-full h-full object-cover'
                />
              </div>
            );
          })}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-2'
        >
          <Input
            name='title'
            type='text'
            label='Título: *'
            placeholder='ex: Tapete em crochê'
            register={register}
            error={errors.title?.message}
          />
          <Input
            name='client'
            type='text'
            label='Cliente:'
            placeholder='ex: Maria'
            register={register}
            error={errors.client?.message}
          />
          <div className='flex flex-col justify-between sm:flex-row gap-4'>
            <Input
              name='date'
              type='text'
              label='Data:'
              placeholder='ex: DD/MM/AAAA'
              register={register}
              error={errors.date?.message}
            />
            <Input
              name='price'
              type='string'
              label='Preço:'
              placeholder='R$ 50,99'
              register={register}
              error={errors.price?.message}
            />
          </div>
          <Input
            name='color'
            type='text'
            label='Cor Principal:'
            placeholder='ex: Marrom'
            register={register}
            error={errors.color?.message}
          />
          <Input
            name='size'
            type='text'
            label='Tamanho:'
            placeholder='ex: 100cm x 40cm'
            register={register}
            error={errors.size?.message}
          />
          <label className='flex flex-col pt-2'>
            Descrição:
            <textarea
              className='p-2 shadow rounded-sm'
              placeholder='ex: youtube.com/watch?v=TRPBY_lxJfE&t=248s'
              {...register('description')}
              name='description'
            />
          </label>
          <button className='bg-geraldine w-full my-4 py-2 text-medium text-white font-bold shadow-lg hover:scale-95'>
            SALVAR
          </button>
        </form>
      </div>
    </section>
  );
}
