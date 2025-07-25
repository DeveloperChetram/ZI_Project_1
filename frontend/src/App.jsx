import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainRoutes from "./routes/MainRoutes";
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserProfile } from './api/api';
import { setUser, logout } from './redux/authSlice';

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    // This effect runs once on app load to verify the token
    const fetchUserProfile = async () => {
      if (token) {
        try {
          const res = await getUserProfile();
          dispatch(setUser(res.data)); // Load user data into Redux
        } catch (error) {
          console.error("Token is invalid or expired. Logging out.", error);
          dispatch(logout()); // Clear invalid token
        }
      }
    };

    fetchUserProfile();
  }, [dispatch, token]); // Depends on token to re-run if it changes

  return (
    <div className="min-h-screen bg-black flex flex-col items-center w-full">
      <Navbar />
      <MainRoutes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />
    </div>
  );
};

export default App;