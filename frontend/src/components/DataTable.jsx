import React from 'react';

const DataTable = ({ data, fileName }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-400">No data available to display.</p>;
  }

  const headers = Object.keys(data[0]);

  return (
    <div className="bg-[#111] p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-white">
        Data View: {fileName}
      </h3>
      <div className="overflow-x-auto relative" style={{ maxHeight: '600px' }}>
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-gray-100 uppercase bg-gray-700 sticky top-0">
            <tr>
              {headers.map(header => (
                <th key={header} scope="col" className="py-3 px-6">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="bg-black border-b border-gray-700 hover:bg-gray-800">
                {headers.map(header => (
                  <td key={`${rowIndex}-${header}`} className="py-4 px-6">
                    {row[header] !== null && typeof row[header] === 'object' 
                      ? JSON.stringify(row[header]) 
                      : String(row[header])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;