import { useEffect, useState } from 'react';
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory';

import { Head } from '../components';
import { Heading } from '../components/heading';
import { useAuthContext } from '../hooks';
import { formatPrice } from '../utils';

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
        y: formatPrice(item.price),
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
      <Heading
        title='Gráfico'
        subtitle='acompanhe os nomes dos clientes com os valores de suas vendas realizadas
        no gráfico abaixo'
      />

      <div className='w-full'>
        <VictoryChart
          domainPadding={20}
          animate={{ duration: 2000, easing: 'bounce' }}>
          <VictoryAxis
            style={{
              tickLabels: { fontSize: 6 },
            }}
            dependentAxis
          />
          <VictoryBar
            horizontal
            style={{ data: { fill: '#FF8F94' } }}
            data={graph}
            labels={({ datum }) => datum.x}></VictoryBar>
        </VictoryChart>
      </div>
    </section>
  );
}
