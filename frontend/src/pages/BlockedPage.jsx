import React from 'react';
import { FiLock } from 'react-icons/fi';

const BlockedPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black text-white p-4">
      <div className="text-center">
        <FiLock className="mx-auto h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-4xl font-bold mb-2">Account Blocked</h1>
        <p className="text-lg text-gray-400">
          Your account has been suspended by an administrator.
        </p>
        <p className="text-md text-gray-500 mt-4">
          Please contact support if you believe this is a mistake.
        </p>
      </div>
    </div>
  );
};

export default BlockedPage;