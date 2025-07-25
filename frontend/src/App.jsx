import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import MainRoutes from "./routes/MainRoutes";
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserProfile } from './api/api';
import { setUser, logout } from './redux/authSlice';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);

  const showNavbar = location.pathname !== '/blocked';

  useEffect(() => {
    // This effect runs once on app load to verify the token
    const fetchUserProfile = async () => {
      if (token) {
        try {
          const res = await getUserProfile();
          dispatch(setUser(res.data)); // Load user data into Redux
        } catch (error) {
          console.error("Token is invalid or expired. Logging out.", error);
          if (error.response?.data?.error === 'Your account has been blocked by an administrator.') {
            // Don't logout, so the blocked state is preserved
          } else {
            dispatch(logout()); // Clear invalid token
          }
        }
      }
    };

    fetchUserProfile();
  }, [dispatch, token]); // Depends on token to re-run if it changes

  return (
    <div className="min-h-screen bg-black flex flex-col items-center w-full">
      {showNavbar && <Navbar />}
      <MainRoutes />
     <ToastContainer
  position="top-center"
  autoClose={3000}
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