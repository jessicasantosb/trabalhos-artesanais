import { zodResolver } from '@hookform/resolvers/zod';
import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoIosColorPalette, IoIosPricetags } from 'react-icons/io';
import { IoPerson, IoSquare } from 'react-icons/io5';
import {
  MdCancel,
  MdDateRange,
  MdDescription,
  MdPhotoSizeSelectLarge,
} from 'react-icons/md';
import { z } from 'zod';

import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks';
import { createSchema } from '../schemas';
import { db } from '../services';
import { ImagesProps } from '../types';
import { Input } from './Input';
import { UploadImage } from './UploadImage';
import { EditFormProps } from './types';

type FormData = z.infer<typeof createSchema>;

export function EditProject({ project, setEditFormIsOpen }: EditFormProps) {
  const [projectImage, setProjectImage] = useState<ImagesProps[]>([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(createSchema),
    mode: 'onChange',
  });

  const handleEditProject = async (data: FormData) => {
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

    const docRef = doc(db, 'trabalhos', project.id);

    try {
      await updateDoc(docRef, {
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
      });

      reset();
      setProjectImage([]);
      toast.success('Editado com sucesso!');
      setEditFormIsOpen(false);
      navigate(location.pathname);
    } catch (error) {
      console.error('error: ', error);
    }
  };

  useEffect(() => {
    setProjectImage(project?.images);
  }, [project?.images]);

  return (
    <div className='my-10'>
      <UploadImage
        projectImage={projectImage}
        setProjectImage={setProjectImage}
      />

      <form
        onSubmit={handleSubmit(handleEditProject)}
        className='my-6 center flex-col items-start gap-2 [&>*]:center [&>*]:gap-2'
      >
        <div>
          <IoSquare size={20} className='text-geraldine' />
          <Input
            name='title'
            type='text'
            defaultValue={project?.title}
            register={register}
            error={errors.title?.message}
          />
        </div>
        <div>
          <IoPerson size={20} className='text-geraldine' />
          <Input
            name='client'
            type='text'
            defaultValue={project?.client}
            register={register}
            error={errors.client?.message}
          />
        </div>
        <div>
          <IoIosColorPalette size={20} className='text-geraldine' />
          <Input
            name='color'
            type='text'
            defaultValue={project?.color.toLowerCase()}
            register={register}
            error={errors.color?.message}
          />
        </div>
        <div>
          <MdDateRange size={20} className='text-geraldine' />
          <Input
            name='date'
            type='text'
            defaultValue={project?.date}
            register={register}
            error={errors.date?.message}
          />
        </div>
        <div>
          <IoIosPricetags size={20} className='text-geraldine' />
          <Input
            name='price'
            type='text'
            defaultValue={project?.price}
            register={register}
            error={errors.price?.message}
          />
        </div>
        <div>
          <MdPhotoSizeSelectLarge size={20} className='text-geraldine' />
          <Input
            name='size'
            type='text'
            defaultValue={project?.size}
            register={register}
            error={errors.size?.message}
          />
        </div>
        <div className='w-full'>
          <MdDescription size={20} className='text-geraldine' />

          <textarea
            className='w-full p-2 shadow rounded-sm'
            {...register('description')}
            name='description'
            value={project?.description}
          />
          <p className='my-1 text-red text-sm'>{errors.description?.message}</p>
        </div>

        <div className='w-full flex justify-between'>
          <button
            type='submit'
            className='w-28 h-10 shadow-md hover:shadow-none hover:scale-95 transition-all bg-geraldine hover:text-black'
          >
            Salvar
          </button>
          <button
            type='button'
            className='flex items-center gap-2 text-black hover:text-red hover:underline underline-offset-2'
            onClick={() => setEditFormIsOpen(false)}
          >
            Cancelar
            <MdCancel size={20} className='text-blue' />
          </button>
        </div>
      </form>
    </div>
  );
}
