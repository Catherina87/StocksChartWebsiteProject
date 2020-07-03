import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

export const Chart = () => {

  // I might not even need state for the chart. All data about stocks will be passed via props.
  // For now it's hardcoded.
  const [chartData, setChartData] = useState({
    labels: ['Finance', 'Tech', 'Energy', 'Bonds'],
    datasets: [
      {
        label: 'Prices',
        data: [
          100,
          300,
          340,
          600
        ],
        backgroundColor: [
          'rgba(255, 99, 143, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(213, 184, 255, 0.6)'
        ]
      }
    ]
  })

  return (
    <div className="chart">
      <Doughnut
        data={chartData}
        width={100}
        height={500}
        options={{ maintainAspectRatio: false }}
      />
    </div>

  );
}