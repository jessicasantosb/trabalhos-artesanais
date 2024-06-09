import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { IoIosColorPalette, IoIosPricetags } from 'react-icons/io';
import { MdDateRange, MdPhotoSizeSelectLarge } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../services/firebaseConnection';

interface ImagesProps {
  name: string;
  uid: string;
  url: string;
}

interface ProjectProps {
  id: string;
  images: ImagesProps[];
  title: string;
  date: string;
  client: string;
  price: string;
  color: string;
  size: string;
  description: string;
  created: string;
  owner: string;
  uid: string;
}

export default function Project() {
  const [project, setProject] = useState<ProjectProps>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProject = async () => {
      if (!id) return;

      const docRef = doc(db, 'trabalhos', id);

      getDoc(docRef)
        .then((snapshot) => {
          if (!snapshot.data()) navigate('/', { replace: true });

          setProject({
            id: snapshot.id,
            title: snapshot.data()?.title,
            date: snapshot.data()?.date,
            client: snapshot.data()?.client,
            price: snapshot.data()?.price,
            color: snapshot.data()?.color,
            size: snapshot.data()?.size,
            description: snapshot.data()?.description,
            created: snapshot.data()?.created,
            owner: snapshot.data()?.owner,
            uid: snapshot.data()?.uid,
            images: snapshot.data()?.images,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };

    loadProject();
  }, [id]);

  return (
    <section className='min-h-screen container m-auto'>
      <div className='relative my-10'>
        <h1 className='text-3xl before:content-[""] before:block before:w-6 before:h-6 before:absolute before:-bottom-3 before:-left-3 before:bg-geraldine before:-z-10'>
          {project?.title}
        </h1>
      </div>

      <div className='flex'>
        {project?.images.map((image) => {
          return <img key={image.name} src={image.url} alt={image.name} />;
        })}
      </div>

      <p className='pt-6 '>
        Cliente:{' '}
        <span className='capitalize font-medium'>{project?.client}</span>
      </p>

      <div className='my-6 center flex-col items-start gap-2 [&>*]:center [&>*]:gap-2'>
        <p>
          <IoIosColorPalette size={20} className='text-geraldine' />
          {project?.color}
        </p>
        <p>
          <MdDateRange size={20} className='text-geraldine' />
          {project?.date}
        </p>
        <p>
          <IoIosPricetags size={20} className='text-geraldine' />
          {project?.price}
        </p>
        <p>
          <MdPhotoSizeSelectLarge size={20} className='text-geraldine' />
          {project?.size}
        </p>

        <p className='relative w-full mt-12 px-4 py-6 italic text-[#808080] bg-blue bg-opacity-30'>
          <span className='absolute -top-4 left-6 bg-geraldine text-white p-1 '>
            Descrição:
          </span>
          {project?.description
            ? project?.description
            : 'Este trabalho ainda não possui uma descrição.'}
        </p>
      </div>
    </section>
  );
}
