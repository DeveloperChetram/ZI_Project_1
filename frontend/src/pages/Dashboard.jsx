import React, { useState } from 'react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement,
  LineElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend, Filler
} from 'chart.js';
import FileUpload from '../components/FileUpload';
import UploadHistory from '../components/UploadHistory';
import ChartCard from '../components/ChartCard';
import DataTable from '../components/DataTable'; // 1. Import the new DataTable component

// Register all necessary Chart.js components
ChartJS.register(
  CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement,
  RadialLinearScale, Title, Tooltip, Legend, Filler
);

const CHART_COLORS = [
  '#4dc9f6', '#f67019', '#f53794', '#537bc4', '#acc236',
  '#166a8f', '#00a950', '#58595b', '#8549ba'
];

const Dashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [headers, setHeaders] = useState([]);
  const [viewMode, setViewMode] = useState('charts'); // 2. Add state for view mode ('charts' or 'table')

  const chartTypes = ['bar', 'line', 'pie', 'doughnut', 'polarArea', 'radar', 'scatter'];

  const handleHistorySelect = (file) => {
    setSelectedFile(file);
    if (file && file.data.length > 0) {
      setHeaders(Object.keys(file.data[0]));
      setXAxis('');
      setYAxis('');
      setChartData(null);
    }
  };

  const sanitizeLabel = (value) => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'object') {
      if (value.richText) return value.richText.map(rt => rt.text).join('');
      return JSON.stringify(value);
    }
    return String(value);
  };
  
  const handleGenerate = () => {
    if (xAxis && yAxis && selectedFile) {
      const labels = selectedFile.data.map((row) => sanitizeLabel(row[xAxis]));
      const data = selectedFile.data.map((row) => parseFloat(row[yAxis])).filter(v => !isNaN(v));

      const backgroundColors = labels.map((_, i) => CHART_COLORS[i % CHART_COLORS.length] + '80');
      const borderColors = labels.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]);

      setChartData({
        labels,
        datasets: [{
          label: yAxis,
          data,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: borderColors,
          pointBorderColor: '#fff',
          pointHoverRadius: 7,
        }],
      });
    }
  };

  // Options objects remain the same
  const commonOptions = { /* ... */ };
  const linearOptions = { /* ... */ };
  const pieOptions = { /* ... */ };
  const radialOptions = { /* ... */ };
  const getOptionsForChart = (type) => { /* ... */ };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-white mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <FileUpload />
          <UploadHistory onSelect={handleHistorySelect} />
        </div>
        <div className="md:col-span-2">
          <div className="bg-[#111] p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-white">
              {selectedFile ? `Generate Visualizations for: ${selectedFile.filename}` : 'Select a File to Generate Charts'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2 text-sm text-gray-400">Category (X-Axis)</label>
                <select value={xAxis} onChange={(e) => setXAxis(e.target.value)} className="w-full p-2 rounded-md bg-black border border-gray-700 text-white" disabled={!selectedFile}>
                  <option value="">Select X-Axis</option>
                  {headers.map((h) => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-400">Value (Y-Axis)</label>
                <select value={yAxis} onChange={(e) => setYAxis(e.target.value)} className="w-full p-2 rounded-md bg-black border border-gray-700 text-white" disabled={!selectedFile}>
                  <option value="">Select Y-Axis</option>
                  {headers.map((h) => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
            </div>
            
            {/* 3. Add view mode buttons and a single "Generate" button */}
            <div className="grid grid-cols-2 gap-4">
                <button onClick={() => { setViewMode('charts'); handleGenerate(); }} className="w-full bg-[#02b576] text-white py-2 rounded-md shadow hover:shadow-[0_0_15px_#02b576] transition-all disabled:bg-gray-500" disabled={!selectedFile || !xAxis || !yAxis}>
                    Generate Charts
                </button>
                <button onClick={() => setViewMode('table')} className="w-full bg-blue-600 text-white py-2 rounded-md shadow hover:shadow-[0_0_15px_#2563eb] transition-all disabled:bg-gray-500" disabled={!selectedFile}>
                    Generate Table
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Conditionally render charts or table based on viewMode */}
      <div className="mt-8">
        {viewMode === 'charts' && chartData && (
          <>
            <h3 className="text-2xl font-bold text-white mb-4">Chart Visualizations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {chartTypes.map(type => (
                <ChartCard
                  key={type}
                  title={`${type.charAt(0).toUpperCase() + type.slice(1)} Chart`}
                  chartType={type}
                  chartData={chartData}
                  chartOptions={getOptionsForChart(type)}
                />
              ))}
            </div>
          </>
        )}
        {viewMode === 'table' && selectedFile && (
           <DataTable data={selectedFile.data} fileName={selectedFile.filename} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;