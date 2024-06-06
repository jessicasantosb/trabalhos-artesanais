import { Link } from 'react-router-dom';

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
  return (
    <>
      <Link to={`project/${id}`}>
        <div className='h-64 flex flex-col justify-between shadow-md shadow-geraldine rounded-xl'>
          <img src={image} alt={title} className='pb-2 h-28 object-cover' />
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
