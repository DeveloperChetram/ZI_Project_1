import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AdminDashboard from '../components/AdminDashboard';
import Dashboard from '../pages/Dashboard';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const MainRoutes = () => {
  return (
    <Routes>
<<<<<<< HEAD
     <Route path='/' element={<Home/>}  />
     <Route path='/login' element={<Login/>}  />
     <Route path='/sign-up' element={<Register/>}  />
     <Route path='/admin-dashboard' element={<AdminDashboard/>}  />
     {/* <Route path='/' element={<Welcome/>}  /> */}
         
=======
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/sign-up' element={<Register />} />
      <Route path='/admin-dashboard' element={<AdminDashboard />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
>>>>>>> main
    </Routes>
  );
};

export default MainRoutes;