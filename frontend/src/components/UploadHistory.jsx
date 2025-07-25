import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistory } from '../redux/fileSlice';

// Accept onSelect prop
const UploadHistory = ({ onSelect }) => {
  const dispatch = useDispatch();
  const { history, status, error } = useSelector((state) => state.file);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);
  
  const handleSelect = (item) => {
    setSelectedId(item._id);
    onSelect(item);
  };

  if (status === 'loading') {
    return <p>Loading history...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error fetching history: {error}</p>;
  }

  return (
    <div className="bg-[#111] p-6 rounded-lg shadow-lg mt-6">
      <h3 className="text-xl font-semibold mb-4 text-white">Upload History (Click to load)</h3>
      {history.length === 0 ? (
        <p className="text-gray-400">No files uploaded yet.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((item) => (
            <li 
              key={item._id} 
              onClick={() => handleSelect(item)}
              className={`bg-black p-4 rounded-md border cursor-pointer transition-all ${
                selectedId === item._id 
                ? 'border-green-500 shadow-[0_0_10px_#02b576]' 
                : 'border-gray-700 hover:border-green-600'
              }`}
            >
              <p className="font-semibold text-white">{item.filename}</p>
              <p className="text-sm text-gray-400">
                Uploaded on: {new Date(item.uploadedAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UploadHistory;