import styles from './donut.module.css';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJs, ArcElement, Tooltip, Title } from 'chart.js';

ChartJs.register(ArcElement, Tooltip, Title);

function Donut({price, percent}) {
    const data = {
        labels: ['Empty', 'Filled'],    
        datasets: [
            {
                label: 'Center Text',
                data: [100 - percent, percent],
                backgroundColor: [
                    'rgb(17, 17, 17)',
                    'rgb(11, 218, 81)'
                ],
                hoverOffset: 2,
                borderWidth: 0,
            }
        ]
    }

    const options = {
        cutout: 60, // Adjust the cutoutPercentage to make the donut thinner
        plugins: {
            title: {
                display: false
            }
        }
    };

    const centerTextPlugin = {
        afterDraw: chart => {
            const ctx = chart.ctx;
            const canvas = chart.canvas;
            const chartArea = chart.chartArea;

            // Center text settings
            const centerText = `${price}`;
            const fontSize = 2;
            const fontStyle = 'bold';
            const fontFamily = 'Arial';
            const fontColor = '#FFFFFF';
            const centerX = (chartArea.left + chartArea.right) / 2;
            const centerY = (chartArea.top + chartArea.bottom) / 2;

            // Set font settings
            ctx.font = `${fontStyle} ${fontSize}rem ${fontFamily}`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = fontColor;

            // Draw text at center
            ctx.fillText(centerText, centerX, centerY);
        }
    };

    return (
        <div className={styles.container}>
            <Doughnut data={data} options={options} plugins={[centerTextPlugin]} className={styles.donut}/>
        </div>
    );
};

export default Donut;
