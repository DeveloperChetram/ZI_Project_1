import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { uploadExcelFile, fetchHistory } from '../redux/fileSlice';

const FileUpload = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.file);

  const onSubmit = async (data) => {
    if (data.file[0]) {
      await dispatch(uploadExcelFile(data.file[0]));
      dispatch(fetchHistory()); // Refresh history after upload
      reset();
    }
  };

  return (
    <div className="bg-[#111] p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-white">Upload Excel File</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('file')}
          type="file"
          accept=".xlsx, .xls"
          className="w-full p-2 rounded-md bg-black border border-gray-700 text-white"
        />
        <button
          type="submit"
          className="mt-4 w-full bg-[#02b576] text-white py-2 rounded-md shadow hover:shadow-[0_0_15px_#02b576] transition-all"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Uploading...' : 'Upload'}
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default FileUpload;