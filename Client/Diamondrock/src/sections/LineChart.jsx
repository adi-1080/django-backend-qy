import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: "index",
      intersect: false,
    },
  },
  interaction: {
    mode: "nearest",
    axis: "x",
    intersect: false,
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        maxRotation: 0,
        font: {
          size: 10,
        },
      },
    },
    y: {
      position: "right",
      grid: {
        color: "#f0f0f0",
      },
      ticks: {
        font: {
          size: 10,
        },
      },
    },
  },
  elements: {
    line: {
      tension: 0.3,
      borderWidth: 1.5,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

export function LineChart({ data, labels }) {
  const chartData = {
    labels,
    datasets: [
      {
        fill: true,
        data,
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
      },
    ],
  };

  return <Line options={options} data={chartData} />;
}
