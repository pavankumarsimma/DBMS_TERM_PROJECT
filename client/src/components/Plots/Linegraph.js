import styles from './Linegraph.module.css';
import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

function Linegraph() {
  const data={
    labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
    datasets: [
      {
        label: 'Stock Price',
        data: [33, 53, 55, 15, 44, 65, 55,75,79,95,33,79,71,52,55,65,75,79,51,44,45,25,35,45,55,62,41,125,171,150],
        fill: true,
        borderColor: '#0BDA51',
        pointRadius: 0,  // Set point radius to 0 to remove the points
        pointHoverRadius: 2
      },
    ],
  };

  const options={
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return(
    <div className={styles.lineGraph}>
      <Line className={styles.graph}
      data={data}
      options={options}
      ></Line>
    </div>
  );
};

export default Linegraph;