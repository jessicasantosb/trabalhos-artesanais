import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosColorPalette,
  IoIosImages,
  IoIosPricetags,
} from 'react-icons/io';
import { MdDateRange, MdPhotoSizeSelectLarge } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';

import { Head } from '../components';
import { db } from '../services';

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

export function Project() {
  const [project, setProject] = useState<ProjectProps>();
  const [skeleton, setSkeleton] = useState<boolean>(true);
  const [imageIsActive, setImageIsActive] = useState<number>(0);
  const [imagePosition, setImagePosition] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSkeleton = () => {
    setSkeleton(false);
  };

  const previewImage = () => {
    if (imageIsActive > 0) setImageIsActive(imageIsActive - 1);
  };

  const nextImage = () => {
    if (project && imageIsActive < project.images.length - 1)
      setImageIsActive(imageIsActive + 1);
  };

  useEffect(() => {
    if (contentRef.current) {
      const { width } = contentRef.current.getBoundingClientRect();
      setImagePosition(-(width * imageIsActive));
    }
  }, [imageIsActive]);

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
  }, [id, navigate]);

  return (
    <section className='container m-auto p-4'>
      {project && <Head title={project.title} description='' />}

      <div className='relative my-10'>
        <h1 className='text-3xl before:w-6 before:h-6 before:absolute before:-bottom-3 before:-left-3 before:bg-geraldine before:-z-10'>
          {project?.title}
        </h1>
      </div>

      <div className='relative h-72 overflow-hidden border-blue border-4 shadow-sm shadow-geraldine'>
        <div
          ref={contentRef}
          className='h-full flex transition-opacity'
          style={{ transform: `translateX(${imagePosition}px)` }}
        >
          <div className={`center h-full min-w-full ${!skeleton && 'hidden'}`}>
            <IoIosImages size={32} className='text-geraldine' />
          </div>
          {project?.images.map((image) => {
            return (
              <img
                key={image.name}
                src={image.url}
                alt={image.name}
                onLoad={handleSkeleton}
                className={`min-w-full object-cover opacity-1 ${
                  skeleton && 'opacity-0'
                }`}
              />
            );
          })}
        </div>
        {project && project?.images.length > 1 && (
          <div className='[&>*]:absolute [&>*]:top-[45%] [&>*]:bg-blue text-white'>
            <button onClick={previewImage} className='group'>
              <IoIosArrowBack size={32} className='group-active:scale-75' />
            </button>
            <button onClick={nextImage} className='group right-0'>
              <IoIosArrowForward size={32} className='group-active:scale-75' />
            </button>
          </div>
        )}
      </div>

      <p className='pt-6 '>
        Cliente:{' '}
        <span className='capitalize font-medium'>{project?.client}</span>
      </p>

      <div className='my-6 center flex-col items-start gap-2 [&>*]:center [&>*]:gap-2'>
        <p>
          <IoIosColorPalette size={20} className='text-geraldine' />
          {project?.color.toLowerCase()}
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
