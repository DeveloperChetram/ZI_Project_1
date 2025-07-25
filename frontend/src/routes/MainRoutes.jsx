import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AdminDashboard from '../components/AdminDashboard';
import Dashboard from '../pages/Dashboard';
import ProfilePage from '../pages/ProfilePage'; // This path must match the file location

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const MainRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/sign-up' element={<Register />} />

      {/* --- Private Routes --- */}
      {/* Wrap protected routes in the PrivateRoute component */}
      <Route
        path="/dashboard"
        element={<PrivateRoute><Dashboard /></PrivateRoute>}
      />
      <Route
        path="/admin-dashboard"
        element={<PrivateRoute><AdminDashboard /></PrivateRoute>}
      />
      <Route
        path="/profile"
        element={<PrivateRoute><ProfilePage /></PrivateRoute>}
      />
    </Routes>
  );
};

export default MainRoutes;