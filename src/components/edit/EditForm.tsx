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
      className='my-6 flex flex-col items-center gap-2'
    >
      <div className='w-full flex flex-col md:flex-row gap-2 md:gap-12 [&>*]:w-full [&>*]:center [&>*]:flex-col [&>*]:gap-2'>
        <div className='[&>*]:w-full [&>*]:flex [&>*]:items-start [&>*]:gap-2 [&>*]:md:h-16'>
          <label>
            <IoSquare size={20} className='text-geraldine mt-2' />
            <Input
              name='title'
              type='text'
              defaultValue={project?.title}
              register={register}
              error={errors.title?.message}
            />
          </label>
          <label>
            <IoPerson size={20} className='text-geraldine mt-2' />
            <Input
              name='client'
              type='text'
              defaultValue={project?.client}
              register={register}
              error={errors.client?.message}
            />
          </label>
          <label>
            <IoIosColorPalette size={20} className='text-geraldine mt-2' />
            <Input
              name='color'
              type='text'
              defaultValue={project?.color.toLowerCase()}
              register={register}
              error={errors.color?.message}
            />
          </label>
        </div>

        <div className='[&>*]:w-full [&>*]:flex [&>*]:items-start [&>*]:gap-2 [&>*]:md:h-16'>
          <label>
            <MdDateRange size={20} className='text-geraldine mt-2' />
            <Input
              name='date'
              type='text'
              defaultValue={project?.date}
              register={register}
              error={errors.date?.message}
            />
          </label>
          <label>
            <IoIosPricetags size={20} className='text-geraldine mt-2' />
            <Input
              name='price'
              type='text'
              defaultValue={project?.price}
              register={register}
              error={errors.price?.message}
            />
          </label>
          <label>
            <MdPhotoSizeSelectLarge size={20} className='text-geraldine mt-2' />
            <Input
              name='size'
              type='text'
              defaultValue={project?.size}
              register={register}
              error={errors.size?.message}
            />
          </label>
        </div>
      </div>

      <div className='w-full min-h-24 flex items-start gap-2'>
        <MdDescription size={20} className='text-geraldine mt-4' />
        <div className='w-full'>
          <textarea
            className='w-full p-2 shadow shadow-geraldine bg-white outline-geraldine focus:outline-blue focus:shadow-blue'
            {...register('description')}
            name='description'
            defaultValue={project?.description}
          />
          <p className='my-1 text-red text-sm'>{errors.description?.message}</p>
        </div>
      </div>

      <div className='w-full mt-2 flex justify-between'>
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
