import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiImageOn } from 'react-icons/ci';

interface CardProps {
  id: string;
  image: string;
  title: string;
  date: string;
  client: string;
  price: string;
}

export default function HomeCard({
  id,
  image,
  title,
  date,
  client,
  price,
}: CardProps) {
  const [skeleton, setSkeleton] = useState<boolean>(true);

  const handleSkeleton = () => {
    setSkeleton(false);
  };
  return (
    <>
      <Link to={`project/${id}`}>
        <div className='h-64 flex flex-col justify-between shadow-md shadow-geraldine rounded-xl'>
          <div className='flex'>
            <div
              className={`center h-full min-w-full ${
                !skeleton && 'hidden'
              }`}
            >
              <CiImageOn size={32} className='text-geraldine' />
            </div>
            <img
              src={image}
              alt={title}
              className={`w-full mb-2 h-28 object-cover transition-all opacity-1 ${
                skeleton && 'opacity-0'
              }`}
              onLoad={handleSkeleton}
            />
          </div>

          <div>
            <h4 className='px-2 uppercase font-bold tracking-tight break-words line-clamp-2'>
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
        </div>
      </Link>
    </>
  );
}
