import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AdminDashboard from '../components/AdminDashboard';
import Dashboard from '../pages/Dashboard';
import ProfilePage from '../pages/ProfilePage';
import BlockedPage from '../pages/BlockedPage'; // Import the new BlockedPage

const PrivateRoute = ({ children }) => {
  const { token, user } = useSelector((state) => state.auth);
  const hasToken = token || localStorage.getItem('token');

  if (!hasToken) {
    return <Navigate to="/login" replace />;
  }

  if (user && user.isBlocked) {
    return <Navigate to="/blocked" replace />;
  }

  return children;
};

const MainRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/sign-up' element={<Register />} />
      <Route path='/blocked' element={<BlockedPage />} />
      
      {/* --- Protected Routes --- */}
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/admin-dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
    </Routes>
  );
};

export default MainRoutes;