import { useState } from 'react';
import { CiImageOn } from 'react-icons/ci';
import { GoTrash } from 'react-icons/go';
import { Link } from 'react-router-dom';

interface CardProps {
  id: string;
  image: string;
  title: string;
  date: string;
  client: string;
  price: string;
  handleDeleteProject: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function HomeCard({
  id,
  image,
  title,
  date,
  client,
  price,
  handleDeleteProject,
}: CardProps) {
  const [skeleton, setSkeleton] = useState<boolean>(true);

  const handleSkeleton = () => {
    setSkeleton(false);
  };

  return (
    <>
      <div className='group relative h-64 grid grid-rows-2 shadow-md shadow-geraldine rounded-xl'>
        <button
          className='absolute right-0 p-1 bg-geraldine hidden group-hover:block'
          onClick={handleDeleteProject}
        >
          <GoTrash size={18} />
        </button>

        <div className='flex'>
          <div className={`center h-full min-w-full ${!skeleton && 'hidden'}`}>
            <CiImageOn size={32} className='text-geraldine' />
          </div>
          <img
            src={image}
            alt={title}
            className={`w-full object-cover transition-all opacity-1 ${
              skeleton && 'opacity-0'
            }`}
            onLoad={handleSkeleton}
          />
        </div>

        <Link to={`project/${id}`}>
          <div>
            <h4 className='p-2 uppercase font-bold tracking-tight break-words line-clamp-2'>
              {title}
            </h4>
            <p className='px-2 italic pb-2'>{date}</p>
          </div>
          <div className='p-2'>
            <p>
              cliente: <span className='font-semibold uppercase'>{client}</span>
            </p>
            <p>
              valor: <span className='font-semibold'>{price}</span>
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}
