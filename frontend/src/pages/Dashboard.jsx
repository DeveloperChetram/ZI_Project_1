import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FileUpload from '../components/FileUpload';
import UploadHistory from '../components/UploadHistory';
import ChartDisplay from '../components/ChartDisplay';

const Dashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [chartType, setChartType] = useState('bar');
  const [headers, setHeaders] = useState([]);
  const { history } = useSelector((state) => state.file);

  useEffect(() => {
    if (history.length > 0) {
      const latestFile = history[0];
      if (latestFile.data.length > 0) {
        setHeaders(Object.keys(latestFile.data[0]));
      }
    }
  }, [history]);

  const handleGenerateChart = () => {
    if (xAxis && yAxis && history.length > 0) {
      const latestFile = history[0];
      const labels = latestFile.data.map((row) => row[xAxis]);
      const data = latestFile.data.map((row) => row[yAxis]);

      setChartData({
        labels,
        datasets: [
          {
            label: `${yAxis} by ${xAxis}`,
            data,
            backgroundColor: 'rgba(2, 181, 118, 0.6)',
            borderColor: 'rgba(2, 181, 118, 1)',
            borderWidth: 1,
          },
        ],
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-white mb-6">Dashboard</h2>
      <FileUpload />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <UploadHistory />
        <div>
          <div className="bg-[#111] p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-white">Generate Chart</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2 text-sm text-gray-400">X-Axis</label>
                <select onChange={(e) => setXAxis(e.target.value)} className="w-full p-2 rounded-md bg-black border border-gray-700 text-white">
                  <option value="">Select X-Axis</option>
                  {headers.map((header) => (
                    <option key={header} value={header}>{header}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-400">Y-Axis</label>
                <select onChange={(e) => setYAxis(e.target.value)} className="w-full p-2 rounded-md bg-black border border-gray-700 text-white">
                  <option value="">Select Y-Axis</option>
                  {headers.map((header) => (
                    <option key={header} value={header}>{header}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm text-gray-400">Chart Type</label>
              <select onChange={(e) => setChartType(e.target.value)} className="w-full p-2 rounded-md bg-black border border-gray-700 text-white">
                <option value="bar">Bar</option>
                <option value="line">Line</option>
                <option value="pie">Pie</option>
                <option value="scatter">Scatter</option>
              </select>
            </div>
            <button
              onClick={handleGenerateChart}
              className="w-full bg-[#02b576] text-white py-2 rounded-md shadow hover:shadow-[0_0_15px_#02b576] transition-all"
            >
              Generate Chart
            </button>
          </div>
          {chartData && (
            <div className="mt-6">
              <ChartDisplay
                chartType={chartType}
                chartData={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: 'Chart' },
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;