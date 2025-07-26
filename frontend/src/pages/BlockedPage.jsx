import React from 'react';
import { FiLock } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const BlockedPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black px-4 py-10">
      <div className="w-full max-w-md bg-[#111] border border-red-600 rounded-lg p-8 shadow-lg text-center">
        <FiLock className="mx-auto text-red-500 w-12 h-12 mb-4" />
        <h2 className="text-white text-2xl font-semibold mb-2">Account Blocked</h2>
        <p className="text-sm text-red-300">
          Your account has been suspended by an administrator.
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Please contact support for more information.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700 transition"
          >
            Logout
          </button>
          <Link
            to="/"
            className="bg-gray-700 text-white px-4 py-2 rounded-md shadow hover:bg-gray-600 transition"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlockedPage;