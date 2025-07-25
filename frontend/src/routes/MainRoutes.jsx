import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AdminDashboard from '../components/AdminDashboard';
import Dashboard from '../pages/Dashboard';
import ProfilePage from '../pages/ProfilePage';

const PrivateRoute = ({ children }) => {
  // We only need the token to decide if the route is accessible.
  const { token } = useSelector((state) => state.auth);

  // Use token from Redux state or local storage as the definitive check
  const hasToken = token || localStorage.getItem('token');

  if (hasToken) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

const MainRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/sign-up' element={<Register />} />
      
      {/* --- Protected Routes --- */}
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/admin-dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
    </Routes>
  );
};

export default MainRoutes;