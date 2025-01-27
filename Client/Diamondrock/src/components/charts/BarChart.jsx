import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 10,
        },
      },
    },
    y: {
      display: false,
    },
  },
  elements: {
    bar: {
      borderWidth: 0,
      borderRadius: 0,
    },
  },
};

export function BarChart({ data, labels }) {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: data.map((value) =>
          value < 0 ? "#ef4444" : "#22c55e"
        ),
        barThickness: 8,
      },
    ],
  };

  return <Bar options={options} data={chartData} />;
}

