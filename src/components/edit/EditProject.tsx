import { zodResolver } from '@hookform/resolvers/zod';
import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks';
import { createSchema } from '../../schemas';
import { db } from '../../services';
import { ImagesProps } from '../../types';
import { UploadImage } from '../UploadImage';
import { EditProjectProps } from '../types';
import { EditForm } from './EditForm';

type FormData = z.infer<typeof createSchema>;

export function EditProject({ project, setEditFormIsOpen }: EditProjectProps) {
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

      <EditForm
        project={project}
        setEditFormIsOpen={setEditFormIsOpen}
        formHook={{ handleSubmit, handleEditProject, register, errors }}
      />
    </div>
  );
}
