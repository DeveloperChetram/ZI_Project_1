import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FiUsers, FiUpload, FiPlus, FiTrash2, FiLock, FiUnlock } from 'react-icons/fi';
import { getAllUsers, addUser, toggleBlockUser, deleteUserById, getAllUploads } from '../api/api';

const AdminDashboard = () => {
  const [view, setView] = useState('users'); // 'users' or 'history'
  const [users, setUsers] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const fetchData = async () => {
    try {
      const usersRes = await getAllUsers();
      setUsers(usersRes.data);
      const uploadsRes = await getAllUploads();
      setUploads(uploadsRes.data);
    } catch (error) {
      toast.error('Failed to fetch admin data.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddUser = async (data) => {
    try {
      await addUser(data);
      toast.success('User added successfully!');
      reset();
      setShowAddUserForm(false);
      fetchData(); // Refresh data
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to add user.');
    }
  };

  const handleToggleBlock = async (id) => {
    try {
      const res = await toggleBlockUser(id);
      toast.success(res.data.message);
      fetchData(); // Refresh data
    } catch (error) {
      toast.error('Failed to update user.');
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user and all their data?')) {
      try {
        await deleteUserById(id);
        toast.success('User deleted successfully.');
        fetchData(); // Refresh data
      } catch (error) {
        toast.error('Failed to delete user.');
      }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 text-white">
      <h2 className="text-3xl font-bold mb-6">Admin Controls</h2>
      <div className="flex space-x-4 border-b border-gray-700 mb-6">
        <button onClick={() => setView('users')} className={`py-2 px-4 text-lg ${view === 'users' ? 'border-b-2 border-green-500' : ''}`}>
          <FiUsers className="inline mr-2" /> Manage Users
        </button>
        <button onClick={() => setView('history')} className={`py-2 px-4 text-lg ${view === 'history' ? 'border-b-2 border-green-500' : ''}`}>
          <FiUpload className="inline mr-2" /> All Uploads
        </button>
      </div>

      {view === 'users' && (
        <div>
          <button onClick={() => setShowAddUserForm(!showAddUserForm)} className="mb-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            <FiPlus className="inline mr-2" /> {showAddUserForm ? 'Cancel' : 'Add New User'}
          </button>

          {showAddUserForm && (
            <form onSubmit={handleSubmit(handleAddUser)} className="bg-[#111] p-6 rounded-lg shadow-lg mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input {...register('username')} placeholder="Username" className="p-2 bg-black border border-gray-700 rounded" />
              <input {...register('email')} type="email" placeholder="Email" className="p-2 bg-black border border-gray-700 rounded" />
              <input {...register('password')} type="password" placeholder="Password" className="p-2 bg-black border border-gray-700 rounded" />
              <select {...register('role')} className="p-2 bg-black border border-gray-700 rounded">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <button type="submit" className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create User</button>
            </form>
          )}

          <div className="bg-[#111] p-4 rounded-lg shadow-lg overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="p-2">Username</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Role</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id} className="border-b border-gray-800">
                    <td className="p-2">{user.username}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.role}</td>
                    <td className={`p-2 ${user.isBlocked ? 'text-red-500' : 'text-green-500'}`}>{user.isBlocked ? 'Blocked' : 'Active'}</td>
                    <td className="p-2 flex space-x-2">
                      <button onClick={() => handleToggleBlock(user._id)} title={user.isBlocked ? 'Unblock' : 'Block'}>
                        {user.isBlocked ? <FiUnlock className="text-yellow-500" /> : <FiLock className="text-yellow-500" />}
                      </button>
                      <button onClick={() => handleDeleteUser(user._id)} title="Delete"><FiTrash2 className="text-red-500" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {view === 'history' && (
        <div className="bg-[#111] p-4 rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-2">Filename</th>
                <th className="p-2">User</th>
                <th className="p-2">Upload Date</th>
              </tr>
            </thead>
            <tbody>
              {uploads.map(upload => (
                <tr key={upload._id} className="border-b border-gray-800">
                  <td className="p-2">{upload.filename}</td>
                  <td className="p-2">{upload.user?.username || 'N/A'} ({upload.user?.email || 'N/A'})</td>
                  <td className="p-2">{new Date(upload.uploadedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;