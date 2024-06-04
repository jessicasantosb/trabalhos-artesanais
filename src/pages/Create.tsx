import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { GoUpload } from 'react-icons/go';
import { z } from 'zod';
import Input from '../components/Input';

export interface ProjectProps {
  id: number;
  image: string;
  title: string;
  date: string;
  client: string;
  price: string;
  color: string;
  size: string;
  description: string;
}

const schema = z.object({
  title: z.string().nonempty('O título é obrigatório'),
  date: z.coerce.date(),
  client: z.string().nonempty('O nome do cliente é obrigatório'),
  price: z.string().nonempty('O preço é obrigatório'),
  color: z.string().nonempty('A cor é obrigatória'),
  size: z.string().nonempty('O tamanho é obrigatório'),
  description: z.string(),
});

type FormData = z.infer<typeof schema>;

export default function Create() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <section className='container m-auto p-4 center flex-col'>
      <h1 className='pt-14 pb-2 font-medium text-4xl'>Novo Cadastro</h1>
      <p className='pb-14'>
        adicione nos campos abaixo os dados do seu novo trabalho e não se
        esqueça de clicar em salvar
      </p>
      <div className='w-full max-w-xl m-auto flex flex-col gap-4 '>
        <div className='h-16'>
          <button className='h-full w-16 center bg-geraldine'>
            <GoUpload
              size={30}
              className='absolute text-white pointer-events-none'
            />
            <label className='h-full w-full cursor-pointer' arial-hidden="true">
              <input
                type='file'
                accept='image/*'
                className='opacity-0 hidden'
              />
            </label>
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-2'
        >
          <Input
            name='title'
            type='text'
            label='Título: *'
            placeholder='ex: Tapete em crochê'
            register={register}
            error={errors.title?.message}
          />
          <Input
            name='client'
            type='text'
            label='Cliente:'
            placeholder='ex: Maria'
            register={register}
            error={errors.client?.message}
          />
          <div className='flex flex-col justify-between sm:flex-row'>
            <Input
              name='date'
              type='text'
              label='Data:'
              placeholder='ex: 00/00/0000'
              register={register}
              error={errors.date?.message}
            />
            <Input
              name='price'
              type='text'
              label='Preço:'
              defaultValue='R$ '
              register={register}
              error={errors.price?.message}
            />
          </div>
          <Input
            name='color'
            type='text'
            label='Cores Principais:'
            placeholder='ex: Marrom'
            register={register}
            error={errors.color?.message}
          />
          <Input
            name='size'
            type='text'
            label='Tamanho:'
            placeholder='ex: 100cm x 40cm'
            register={register}
            error={errors.size?.message}
          />
          <label className='flex flex-col pt-2'>
            Descrição:
            <textarea
              className='p-2 shadow rounded-sm'
              placeholder='ex: youtube.com/watch?v=TRPBY_lxJfE&t=248s'
              {...register('description')}
              name='description'
            />
          </label>
          <button className='bg-geraldine w-full my-4 py-2 text-medium text-white font-bold shadow-lg hover:scale-95'>
            SALVAR
          </button>
        </form>
      </div>
    </section>
  );
}
