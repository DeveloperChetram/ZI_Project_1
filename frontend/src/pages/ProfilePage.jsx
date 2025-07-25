import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUserProfile, changePassword } from '../api/api';
import { setUser } from '../redux/authSlice'; // We'll add this action next

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { register: registerProfile, handleSubmit: handleProfileSubmit } = useForm({
    defaultValues: {
      username: user?.username,
      email: user?.email,
    },
  });
  const { register: registerPassword, handleSubmit: handlePasswordSubmit, reset: resetPasswordForm } = useForm();

  const onProfileSubmit = async (data) => {
    try {
      const res = await updateUserProfile(data);
      dispatch(setUser(res.data)); // Update user in Redux store
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update profile.');
    }
  };

  const onPasswordSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      return toast.error('New passwords do not match.');
    }
    try {
      const res = await changePassword({ oldPassword: data.oldPassword, newPassword: data.newPassword });
      toast.success(res.data.message);
      resetPasswordForm();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to change password.');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 text-white">
      <h2 className="text-3xl font-bold mb-6">Profile & Settings</h2>

      {/* Edit Profile Section */}
      <div className="bg-[#111] p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
        <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm text-gray-400">Username</label>
            <input {...registerProfile('username')} className="w-full p-2 bg-black border border-gray-700 rounded" />
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-400">Email</label>
            <input {...registerProfile('email')} type="email" className="w-full p-2 bg-black border border-gray-700 rounded" />
          </div>
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Save Profile
          </button>
        </form>
      </div>

      {/* Change Password Section */}
      <div className="bg-[#111] p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Change Password</h3>
        <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm text-gray-400">Old Password</label>
            <input {...registerPassword('oldPassword')} type="password" className="w-full p-2 bg-black border border-gray-700 rounded" />
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-400">New Password</label>
            <input {...registerPassword('newPassword')} type="password" className="w-full p-2 bg-black border border-gray-700 rounded" />
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-400">Confirm New Password</label>
            <input {...registerPassword('confirmPassword')} type="password" className="w-full p-2 bg-black border border-gray-700 rounded" />
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;