import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosColorPalette,
  IoIosImages,
  IoIosPricetags,
} from 'react-icons/io';
import { MdDateRange, MdPhotoSizeSelectLarge } from 'react-icons/md';

import { ProjectDetailProps } from './types';

export function ProjectDetail({
  project,
  carousel,
  imageSkeleton,
}: ProjectDetailProps) {
  const { contentRef, imagePosition, previewImage, nextImage } = carousel;
  const { skeleton, handleSkeleton } = imageSkeleton;

  return (
    <>
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
          {project?.price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
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
    </>
  );
}
