import { useEffect, useState } from 'react';
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory';
import { Head } from '../components';
import { useAuthContext } from '../hooks';

export function Chart() {
  const [graph, setGraph] = useState([]);
  const { projects, loadProjects } = useAuthContext();

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    const graphData: any = projects.map((item) => {
      return {
        x: item.client,
        y: item.price.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
      };
    });

    setGraph(graphData);
  }, [projects]);

  return (
    <section className='container m-auto p-4 center flex-col'>
      <Head
        title='Gráfico'
        description='Acompanhe os valores de suas vendas por gráficos!'
      />

      <h1 className='pt-14 pb-2 font-medium text-4xl'>Gráfico</h1>
      <p className='pb-14 text-center'>
        acompanhe os nomes dos clientes com os valores de suas vendas realizadas
        no gráfico abaixo
      </p>

      <div>
        <VictoryChart
          domainPadding={20}
          animate={{ duration: 2000, easing: 'bounce' }}
        >
          <VictoryAxis dependentAxis />
          <VictoryBar
            horizontal
            style={{ data: { fill: '#FF8F94' } }}
            data={graph}
            labels={({ datum }) => datum.x}
          ></VictoryBar>
        </VictoryChart>
      </div>
    </section>
  );
}
