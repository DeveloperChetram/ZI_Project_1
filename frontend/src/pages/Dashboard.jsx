import FileUpload from '../components/FileUpload';
import UploadHistory from '../components/UploadHistory';

const Dashboard = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-white mb-6">Dashboard</h2>
      <FileUpload />
      <UploadHistory />
    </div>
  );
};

export default Dashboard;