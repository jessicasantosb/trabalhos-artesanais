import { IoIosColorPalette, IoIosPricetags } from 'react-icons/io';
import { IoPerson, IoSquare } from 'react-icons/io5';
import {
  MdCancel,
  MdDateRange,
  MdDescription,
  MdPhotoSizeSelectLarge,
} from 'react-icons/md';
import { Input } from '../Input';
import { EditFormProps } from '../types';

export function EditForm({
  project,
  setEditFormIsOpen,
  formHook,
}: EditFormProps) {
  const { handleSubmit, handleEditProject, register, errors } = formHook;

  return (
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
          defaultValue={project?.description}
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
  );
}
