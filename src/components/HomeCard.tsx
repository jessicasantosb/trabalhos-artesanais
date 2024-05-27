import { Link } from 'react-router-dom';

interface ProjectProps {
  id: number;
  image: string;
  name: string;
  date: string;
  client: string;
  price: number;
}

export default function HomeCard(project: ProjectProps) {
  return (
    <>
      <Link to={`project/${project.id}`}>
        <div className='h-64 flex flex-col justify-between shadow-md shadow-geraldine rounded-xl'>
          <img src={project.image} alt={project.name} className='pb-2 h-28' />
          <div>
            <h4 className='px-2 uppercase font-bold tracking-tight break-words line-clamp-2'>
              {project.name}
            </h4>
            <p className='px-2 italic pb-2'>{project.date}</p>
          </div>
          <div className='p-2'>
            <p>
              cliente:{' '}
              <span className='font-semibold uppercase'>{project.client}</span>
            </p>
            <p>
              valor:{' '}
              <span className='font-semibold'>
                {project.price.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}
