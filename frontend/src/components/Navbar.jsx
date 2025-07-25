import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth); // Get user object
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const activeLinkClass = "text-white border-[#02b567] bg-[#02b567] px-3 rounded-lg py-1 border-2";
  const inactiveLinkClass = "text-white border-[#02b567] px-3 rounded-lg py-1 border-2";

  return (
    <div className='flex w-[80%] h-[50px] items-center justify-around text-white'>
      <NavLink className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass} to='/'>Home</NavLink>
      
      {isAuthenticated ? (
        <>
          <NavLink className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass} to='/dashboard'>Dashboard</NavLink>
          {/* Add Admin link if user is an admin */}
          {user?.role === 'admin' && (
            <NavLink className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass} to='/admin-dashboard'>Admin</NavLink>
          )}
          <button onClick={handleLogout} className={inactiveLinkClass}>Logout</button>
        </>
      ) : (
        <>
          <NavLink className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass} to='/login'>Login</NavLink>
          <NavLink className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass} to='/sign-up'>Sign Up</NavLink>
        </>
      )}
    </div>
  );
};

export default Navbar;