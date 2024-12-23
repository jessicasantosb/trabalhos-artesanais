import { Head } from '../components';
import { palettes } from '../data/colors-palette';

export function ColorPalette() {
  return (
    <section className='container m-auto p-4 center flex-col'>
      <Head title='Cores' description='Escolha uma paleta de cores!' />
      <h1 className='pt-14 pb-2 font-medium text-4xl'>Paleta de Cores</h1>
      <p className='pb-14 text-center'>
        confira algumas paletas de cores para ajudar com seu trabalho
      </p>

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
                    className='text-right p-2 w-24'>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        );
      })}
    </section>
  );
}
