import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

const DonutChart = () => {
  const data = {
    labels: ['Correct Answer', 'Wrong Answer'],
    datasets: [
      {
        label: 'Answers',
        data: [2, 3],
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)', // Green for correct answer
          'rgba(255, 99, 132, 0.5)', // Red for wrong answer
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: '83%',
    aspectRatio: 0.57,
  };

  return <Doughnut data={data} options={options} />;
};

export default DonutChart;
