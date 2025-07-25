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
    // This effect runs when the app loads
    const fetchUserProfile = async () => {
      if (token) {
        try {
          // If there is a token, try to fetch the user profile
          const res = await getUserProfile();
          // If successful, update the user in the Redux store
          dispatch(setUser(res.data));
        } catch (error) {
          // If the token is invalid or expired, log the user out
          console.error("Failed to fetch user profile, logging out.", error);
          dispatch(logout());
        }
      }
    };

    fetchUserProfile();
  }, [token, dispatch]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center w-full">
      <Navbar />
      <MainRoutes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default App;