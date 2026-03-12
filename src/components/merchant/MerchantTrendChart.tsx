"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

type MerchantTrendChartProps = {
  labels: string[];
  values: number[];
};

export function MerchantTrendChart({ labels, values }: MerchantTrendChartProps) {
  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            data: values,
            borderColor: "#B85D33",
            backgroundColor: "rgba(184, 93, 51, 0.16)",
            fill: true,
            borderWidth: 3,
            tension: 0.35,
            pointRadius: 4,
            pointHoverRadius: 5,
            pointBackgroundColor: "#fff",
            pointBorderColor: "#B85D33",
            pointBorderWidth: 2,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label(context) {
                return `核銷金額 NT$ ${context.formattedValue}`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#78716c" },
          },
          y: {
            beginAtZero: true,
            ticks: { color: "#78716c" },
            grid: { color: "rgba(120,113,108,0.14)" },
          },
        },
      }}
    />
  );
}
