import React from "react";
import { Chart } from "react-google-charts";
import styles from "./Candlebars.module.css";

const Candlebars = ({symbol}) => {
    const data = [
        ["Day", "", "", "", ""],
        ["1", 20, 28, 38, 45],
        ["2", 31, 38, 55, 66],
        ["3", 50, 55, 77, 80],
        ["4", 77, 77, 66, 50],
        ["5", 68, 66, 22, 15],
        ["6", 58, 68, 78, 95],
        ["7", 55, 60, 65, 69],
        ["8", 49, 69, 66, 70],
        ["9", 50, 63, 66, 66],
        ["10", 49, 59, 51, 70],
        ["11", 62, 65, 70, 75],
        ["12", 68, 73, 75, 80],
        ["13", 69, 69, 72, 75],
        ["14", 68, 69, 72, 70],
        ["15", 70, 70, 78, 80],
        ["16", 73, 75, 80, 82],
        ["17", 75, 84, 71, 85],
        ["18", 80, 85, 87, 89],
        ["19", 80, 86, 82, 87],
        ["20", 86, 89, 92, 95],
        ["21", 89, 92, 95, 96],
        ["22", 88, 93, 89, 96],
        ["23", 92, 92, 93, 93],
        ["24", 91, 92, 93, 94],
        ["25", 78, 91, 79, 95],
        ["26", 55, 62, 78, 81],
        ["27", 49, 63, 50, 81],
        ["28", 44, 59, 45, 65],
        ["29", 49, 60, 50, 64],
        ["30", 73, 74, 76, 79],
        ["31", 70, 72, 75, 77]
      ];

  const options = {
    legend: "none",
    bar: { groupWidth: "100%" }, // Remove space between bars.
    candlestick: {
      fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
      risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
    },
    backgroundColor: "#111111",
  };

  return (
    <div className={styles.candlestick}>
        <Chart className={styles.chart}
        chartType="CandlestickChart"
        width="100%"
        height="100%"
        data={data}
        options={options}
    />
  </div>
  );
};

export default Candlebars;
