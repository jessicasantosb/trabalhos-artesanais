import { Head } from '../components';
import { Heading } from '../components/heading';
import { palettes } from '../data/colors-palette';

export function ColorPalette() {
  return (
    <section className='container m-auto p-4 center flex-col'>
      <Head title='Cores' description='Escolha uma paleta de cores!' />
      <Heading
        title='Paleta de Cores'
        subtitle='confira algumas paletas de cores que podem te inspirar na sua escolha'
      />

      {palettes.map(({ title, palette }) => {
        return (
          <table key={title} className='w-full max-w-xl mb-6'>
            <thead>
              <tr className='text-2xl text-geraldine'>{title}</tr>
            </thead>

            {palette.map(({ name, color }) => (
              <tbody key={name}>
                <tr className='border'>
                  <td className='p-2'>{name}</td>
                  <td className='text-right pr-2'>{color}</td>
                  <td
                    style={{ backgroundColor: color }}
                    className='text-right p-2 w-24'></td>
                </tr>
              </tbody>
            ))}
          </table>
        );
      })}
    </section>
  );
}
