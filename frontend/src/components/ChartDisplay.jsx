import React, { useRef } from 'react';
import { Bar, Line, Pie, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const ChartDisplay = ({ chartType, chartData, options }) => {
  const chartRef = useRef(null);

  const downloadAsPNG = () => {
    if (chartRef.current) {
      html2canvas(chartRef.current).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'chart.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  const downloadAsPDF = () => {
    if (chartRef.current) {
      html2canvas(chartRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save('chart.pdf');
      });
    }
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <Bar data={chartData} options={options} />;
      case 'line':
        return <Line data={chartData} options={options} />;
      case 'pie':
        return <Pie data={chartData} options={options} />;
      case 'scatter':
        return <Scatter data={chartData} options={options} />;
      default:
        return <p>Select a chart type</p>;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div ref={chartRef}>{renderChart()}</div>
      <div className="flex justify-end mt-4 space-x-2">
        <button onClick={downloadAsPNG} className="bg-blue-500 text-white px-4 py-2 rounded-md">Download PNG</button>
        <button onClick={downloadAsPDF} className="bg-red-500 text-white px-4 py-2 rounded-md">Download PDF</button>
      </div>
    </div>
  );
};

export default ChartDisplay;