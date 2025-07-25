import React, { useRef } from 'react';
import { Bar, Line, Pie, Doughnut, PolarArea, Radar, Scatter } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ChartCard = ({ title, chartType, chartData, chartOptions }) => {
  const chartRef = useRef(null);

  const downloadAsPNG = () => {
    // We pass the backgroundColor to prevent a transparent background on download
    if (chartRef.current) {
      html2canvas(chartRef.current, { backgroundColor: '#111' }).then((canvas) => {
        const link = document.createElement('a');
        link.download = `${title.toLowerCase().replace(' ', '_')}_chart.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  const downloadAsPDF = () => {
    if (chartRef.current) {
      html2canvas(chartRef.current, { backgroundColor: '#111' }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({ orientation: 'landscape' });
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${title.toLowerCase().replace(' ', '_')}_chart.pdf`);
      });
    }
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar': return <Bar data={chartData} options={chartOptions} />;
      case 'line': return <Line data={chartData} options={chartOptions} />;
      case 'pie': return <Pie data={chartData} options={chartOptions} />;
      case 'doughnut': return <Doughnut data={chartData} options={chartOptions} />;
      case 'polarArea': return <PolarArea data={chartData} options={chartOptions} />;
      case 'radar': return <Radar data={chartData} options={chartOptions} />;
      case 'scatter': return <Scatter data={chartData} options={chartOptions} />;
      default: return <p>Invalid chart type</p>;
    }
  };

  return (
    <div className="bg-[#111] p-4 rounded-lg shadow-lg flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-lg font-semibold text-white">{title}</h4>
        <div className="flex space-x-2">
          <button onClick={downloadAsPNG} title="Download as PNG" className="text-gray-400 hover:text-white font-semibold">
            PNG
          </button>
          <span className="text-gray-500">|</span>
          <button onClick={downloadAsPDF} title="Download as PDF" className="text-gray-400 hover:text-white font-semibold">
            PDF
          </button>
        </div>
      </div>
      
      {/* This is the changed line: */}
      <div className="relative h-64 w-full" ref={chartRef}>
        {renderChart()}
      </div>

    </div>
  );
};

export default ChartCard;