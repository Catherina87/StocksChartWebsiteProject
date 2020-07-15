import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import ColorHash from 'color-hash';
import 'chartjs-plugin-labels';

interface ChartProps {
  labelsPriceMap: { string: number }
};

const ColorGenerator = new ColorHash({saturation: 0.3, lightness: 0.6});

export const Chart: React.FC<ChartProps> = (props) => {

  const datasets = {
    labels: Object.keys(props.labelsPriceMap),
    datasets: [
      {
        label: 'Prices',
        data: Object.values(props.labelsPriceMap),
        backgroundColor: Object.keys(props.labelsPriceMap).map(label => ColorGenerator.hex(label))
      }
    ]
  }

  const chartOptions = { 
    maintainAspectRatio: false,
    plugins: {
      labels: {
        render: 'percentage',
        fontSize: 18,
        fontColor: '#000',
        fontStyle: 'bold',
        precision: 2
      }
    }
  };

  return (
    <div className="chart">
      <Doughnut
        data={datasets}
        width={100}
        height={500}
        options={chartOptions}
      />
    </div>

  );
}
