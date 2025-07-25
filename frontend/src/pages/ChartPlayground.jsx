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
  Filler, // Import Filler for line chart area fill
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
  Legend,
  Filler // Register Filler
);

const ChartPlayground = () => {
  const [chartType, setChartType] = useState('bar');

  // More visually appealing data
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Revenue (USD)',
        data: [1200, 1900, 3000, 5000, 2300, 3100, 4000],
        backgroundColor: 'rgba(2, 181, 118, 0.5)',
        borderColor: '#02b576',
        borderWidth: 2,
        fill: true, // For line charts
        tension: 0.4 // Makes line charts smoother
      },
      {
        label: 'Expenses (USD)',
        data: [800, 1200, 1400, 2000, 1500, 1700, 1800],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: '#ff6384',
        borderWidth: 2,
        fill: true, // For line charts
        tension: 0.4 // Makes line charts smoother
      },
    ],
  };
  
    // Common options for all charts
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ffffff',
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: `Interactive ${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart`,
        color: '#ffffff',
        font: {
          size: 18,
          weight: 'bold',
        },
      },
      tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleFont: {
              size: 16,
          },
          bodyFont: {
              size: 14
          },
          callbacks: {
              label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                      label += ': ';
                  }
                  if (context.parsed.y !== null) {
                      label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                  }
                  return label;
              }
          }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#cccccc',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: '#cccccc',
          callback: function(value) {
            return '$' + value;
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  const pieDoughnutOptions = { ...commonOptions, scales: {} };
  
  const radialOptions = {
      ...commonOptions,
      scales: {
          r: {
              angleLines: { color: 'rgba(255, 255, 255, 0.2)' },
              grid: { color: 'rgba(255, 255, 255, 0.2)' },
              pointLabels: { color: 'white', font: { size: 12 } },
              ticks: { color: 'white', backdropColor: 'transparent' },
          },
      },
  };


  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <Bar data={data} options={commonOptions} />;
      case 'line':
        return <Line data={data} options={commonOptions} />;
      case 'pie':
        return <Pie data={data} options={pieDoughnutOptions} />;
      case 'doughnut':
        return <Doughnut data={data} options={pieDoughnutOptions} />;
      case 'polarArea':
        return <PolarArea data={data} options={radialOptions} />;
      case 'radar':
        return <Radar data={data} options={radialOptions} />;
      case 'scatter':
        return <Scatter data={data} options={commonOptions} />;
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

      <div className="bg-[#111] p-6 rounded-lg shadow-lg" style={{ height: '500px' }}>
        {renderChart()}
      </div>
    </div>
  );
};

export default ChartPlayground;