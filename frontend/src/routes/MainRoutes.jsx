import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AdminDashboard from '../components/AdminDashboard';
import Dashboard from '../pages/Dashboard';
import ProfilePage from '../pages/ProfilePage';
import BlockedPage from '../pages/BlockedPage';

// --- This component protects routes from unauthenticated OR blocked users ---
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && user.isBlocked) {
    return <Navigate to="/blocked" replace />;
  }

  return children;
};

// --- This component handles the logic for both Login and Sign Up pages ---
const PublicRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    // If the logged-in user is blocked, redirect them to the blocked page
    if (user && user.isBlocked) {
      return <Navigate to="/blocked" replace />;
    }
    // If they are logged in and not blocked, send them to the dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // If not authenticated, show the child component (Login or Register page)
  return children;
};


const MainRoutes = () => {
  return (
    <Routes>
      {/* --- Public Routes --- */}
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/blocked' element={<BlockedPage />} />

      {/* Both routes are wrapped, so the same logic applies */}
      <Route 
        path='/login' 
        element={<PublicRoute><Login /></PublicRoute>} 
      />
      <Route 
        path='/sign-up' 
        element={<PublicRoute><Register /></PublicRoute>} 
      />
      
      {/* --- Protected Routes --- */}
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/admin-dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
    </Routes>
  );
};

export default MainRoutes;