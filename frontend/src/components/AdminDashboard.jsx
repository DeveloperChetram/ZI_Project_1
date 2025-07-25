import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FiUsers, FiUpload, FiPlus, FiTrash2, FiLock, FiUnlock, FiMoreVertical, FiEye } from 'react-icons/fi';
import { getAllUsers, addUser, toggleBlockUser, deleteUserById, getAllUploads, resetUserPassword, getUserUploads } from '../api/api';

const AdminDashboard = () => {
  const [view, setView] = useState('users');
  const [users, setUsers] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [activeUserMenu, setActiveUserMenu] = useState(null);
  const [resetPasswordModal, setResetPasswordModal] = useState(null);
  const [viewHistoryModal, setViewHistoryModal] = useState(null);
  const [userHistory, setUserHistory] = useState([]);
  const menuRef = useRef(null);

  const { register, handleSubmit, reset } = useForm();
  const { register: registerPassword, handleSubmit: handlePasswordSubmit, reset: resetPasswordForm } = useForm();

  const fetchData = async () => {
    try {
      const usersRes = await getAllUsers();
      setUsers(usersRes.data);
      if (view === 'history') {
        const uploadsRes = await getAllUploads();
        setUploads(uploadsRes.data);
      }
    } catch (error) {
      toast.error('Failed to fetch admin data.');
    }
  };

  // Effect to close the dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveUserMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, [view]);

  const handleAddUser = async (data) => {
    try {
      await addUser(data);
      toast.success('User added successfully!');
      reset();
      setShowAddUserForm(false);
      await fetchData();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to add user.');
    }
  };

  const handleToggleBlock = async (id) => {
    try {
      const res = await toggleBlockUser(id);
      toast.success(res.data.message);
      await fetchData();
    } catch (error) {
      toast.error('Failed to update user.');
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user and all their data? This action cannot be undone.')) {
      try {
        await deleteUserById(id);
        toast.success('User deleted successfully.');
        await fetchData();
      } catch (error) {
        toast.error('Failed to delete user.');
      }
    }
  };

  const handleResetPassword = async (data) => {
    if (!data.newPassword) {
        toast.error("Password cannot be empty.");
        return;
    }
    try {
      await resetUserPassword(resetPasswordModal._id, data.newPassword);
      toast.success("Password reset successfully!");
      setResetPasswordModal(null);
      resetPasswordForm();
    } catch (error) {
      toast.error("Failed to reset password.");
    }
  };

  const handleViewHistory = async (user) => {
    try {
      const res = await getUserUploads(user._id);
      setUserHistory(res.data);
      setViewHistoryModal(user);
    } catch (error) {
      toast.error("Failed to fetch user's history.");
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
              <input {...register('username', { required: true })} placeholder="Username" className="p-2 bg-black border border-gray-700 rounded" />
              <input {...register('email', { required: true })} type="email" placeholder="Email" className="p-2 bg-black border border-gray-700 rounded" />
              <input {...register('password', { required: true })} type="password" placeholder="Password" className="p-2 bg-black border border-gray-700 rounded" />
              <select {...register('role')} className="p-2 bg-black border border-gray-700 rounded">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <button type="submit" className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create User</button>
            </form>
          )}

 <div className="bg-[#111] p-4 rounded-lg shadow-lg overflow-x-auto min-h-[50vh]">


            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="p-2">Username</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Role</th>
                  <th className="p-2">Status</th>
                  <th className="p-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id} className="border-b border-gray-800">
                    <td className="p-2">{user.username}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2 capitalize">{user.role}</td>
                    <td className={`p-2 font-semibold ${user.isBlocked ? 'text-red-500' : 'text-green-500'}`}>{user.isBlocked ? 'Blocked' : 'Active'}</td>
                    <td className="p-2 text-right">
                      <div className="relative inline-block" ref={activeUserMenu === user._id ? menuRef : null}>
                        <button onClick={() => setActiveUserMenu(activeUserMenu === user._id ? null : user._id)}>
                          <FiMoreVertical />
                        </button>
                        {activeUserMenu === user._id && (
                          <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-md shadow-lg z-10 text-left">
                            <button onClick={() => handleToggleBlock(user._id)} className="w-full text-left block px-4 py-2 text-sm text-white hover:bg-gray-800">{user.isBlocked ? <><FiUnlock className="inline mr-2" />Unblock</> : <><FiLock className="inline mr-2" />Block</>}</button>
                            <button onClick={() => { setResetPasswordModal(user); setActiveUserMenu(null); }} className="w-full text-left block px-4 py-2 text-sm text-white hover:bg-gray-800">Reset Password</button>
                            <button onClick={() => { handleViewHistory(user); setActiveUserMenu(null); }} className="w-full text-left block px-4 py-2 text-sm text-white hover:bg-gray-800"><FiEye className="inline mr-2" />View History</button>
                            <button onClick={() => handleDeleteUser(user._id)} className="w-full text-left block px-4 py-2 text-sm text-red-500 hover:bg-gray-800"><FiTrash2 className="inline mr-2" />Delete</button>
                          </div>
                        )}
                      </div>
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

      {resetPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-20">
          <div className="bg-[#111] p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Reset Password for {resetPasswordModal.username}</h3>
            <form onSubmit={handlePasswordSubmit(handleResetPassword)}>
              <input {...registerPassword('newPassword')} type="password" placeholder="Enter new password" className="w-full p-2 bg-black border border-gray-700 rounded" />
              <div className="flex justify-end space-x-4 mt-4">
                <button type="button" onClick={() => setResetPasswordModal(null)} className="bg-gray-600 hover:bg-gray-700 py-2 px-4 rounded">Cancel</button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded">Reset</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewHistoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-20">
          <div className="bg-[#111] p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <h3 className="text-xl font-semibold mb-4">Upload History for {viewHistoryModal.username}</h3>
            <div className="overflow-y-auto max-h-96">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-2">Filename</th>
                    <th className="p-2">Upload Date</th>
                  </tr>
                </thead>
                <tbody>
                  {userHistory.length > 0 ? userHistory.map(upload => (
                    <tr key={upload._id} className="border-b border-gray-800">
                      <td className="p-2">{upload.filename}</td>
                      <td className="p-2">{new Date(upload.uploadedAt).toLocaleString()}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="2" className="text-center p-4">No uploads found for this user.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4">
              <button onClick={() => setViewHistoryModal(null)} className="bg-gray-600 hover:bg-gray-700 py-2 px-4 rounded">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;