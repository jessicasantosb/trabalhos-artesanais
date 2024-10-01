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

export function HomeCard({
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
      <div className='group relative shadow-md shadow-geraldine rounded-xl'>
        <button
          className='absolute right-0 p-1 bg-geraldine hidden group-hover:block'
          onClick={handleDeleteProject}
        >
          <GoTrash size={18} />
        </button>

        <div className='h-40 flex'>
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
            <h4 className='h-14 p-2 font-bold tracking-tight break-words line-clamp-2'>
              {title}
            </h4>
            <p className='p-2 italic'>{date}</p>
          </div>
          <div className='p-2'>
            <p className='flex gap-1'>
              cliente:
              <span className='font-semibold uppercase break-words line-clamp-1'>
                {client}
              </span>
            </p>
            <p className='flex gap-1'>
              valor:
              <span className='font-semibold  break-words line-clamp-1'>
                {price}
              </span>
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}
