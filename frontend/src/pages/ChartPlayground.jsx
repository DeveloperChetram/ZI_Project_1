import React, { useState } from 'react';
import { Bar, Line, Pie, Doughnut, PolarArea, Radar, Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register all necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

const ChartPlayground = () => {
  const [chartType, setChartType] = useState('bar');

  // Sample data that works for most chart types
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1 (Sales)',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(2, 181, 118, 0.6)',
        borderColor: 'rgba(2, 181, 118, 1)',
        borderWidth: 1,
      },
      {
        label: 'Dataset 2 (Expenses)',
        data: [28, 48, 40, 19, 86, 27, 90],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
            color: 'white' // White labels for legend
        }
      },
      title: {
        display: true,
        text: `${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart`,
        color: 'white' // White title
      },
    },
    scales: {
        x: {
            ticks: {
                color: 'white' // White labels for x-axis
            },
            grid: {
                color: 'rgba(255, 255, 255, 0.1)' // Lighter grid lines
            }
        },
        y: {
            ticks: {
                color: 'white' // White labels for y-axis
            },
            grid: {
                color: 'rgba(255, 255, 255, 0.1)' // Lighter grid lines
            }
        }
    }
  };
  
    // Specific options for radial charts (PolarArea, Radar)
    const radialOptions = {
        ...options,
        scales: {
            r: {
                angleLines: {
                    color: 'rgba(255, 255, 255, 0.2)'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)'
                },
                pointLabels: {
                    color: 'white'
                },
                ticks: {
                    color: 'white',
                    backdropColor: 'transparent'
                }
            }
        }
    };


  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <Bar data={data} options={options} />;
      case 'line':
        return <Line data={data} options={options} />;
      case 'pie':
        return <Pie data={data} options={options} />;
      case 'doughnut':
        return <Doughnut data={data} options={options} />;
      case 'polarArea':
        return <PolarArea data={data} options={radialOptions} />;
      case 'radar':
        return <Radar data={data} options={radialOptions} />;
      case 'scatter':
        return <Scatter data={data} options={options} />;
      default:
        return <p>Invalid chart type selected</p>;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 text-white">
      <h2 className="text-3xl font-bold text-center mb-6">Chart Playground</h2>
      <div className="bg-[#111] p-6 rounded-lg shadow-lg mb-6">
        <label htmlFor="chartType" className="block mb-2 text-sm font-medium text-gray-400">
          Select Chart Type
        </label>
        <select
          id="chartType"
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="w-full p-2 rounded-md bg-black border border-gray-700 text-white"
        >
          <option value="bar">Bar Chart</option>
          <option value="line">Line Chart</option>
          <option value="pie">Pie Chart</option>
          <option value="doughnut">Doughnut Chart</option>
          <option value="polarArea">Polar Area Chart</option>
          <option value="radar">Radar Chart</option>
          <option value="scatter">Scatter Chart</option>
        </select>
      </div>

      <div className="bg-[#111] p-6 rounded-lg shadow-lg">
        {renderChart()}
      </div>
    </div>
  );
};

export default ChartPlayground;