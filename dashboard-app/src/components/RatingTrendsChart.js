import React, { useEffect, useRef } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OscarChart = ({ labels = [], nominations = [], wins = [], chartType }) => {
  const chartRef = useRef(null);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Average Rating',
        data: nominations,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
        },
      },
      title: {
        display: true,
        text: 'Average Rating Over Time',
        font: {
          size: window.innerWidth < 768 ? 14 : 16,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Release Year',
        },
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Average Rating',
        },
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
        },
      },
    },
  };

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full md:w-2/3 h-64 md:h-96 mx-auto mt-5">
      {chartType === 'line' ? (
        <Line ref={chartRef} data={data} options={options} />
      ) : (
        
        <Bar ref={chartRef} data={data} options={options} />
      )}
    </div>
  );
};

export default OscarChart;