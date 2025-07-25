import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // GitHub Dark Theme Palette
  const activeLinkClass = "bg-[#238636] text-white px-3 py-1 rounded-md text-sm font-medium";
  const inactiveLinkClass = "text-gray-300 hover:bg-[#21262d] hover:text-white px-3 py-1 rounded-md text-sm font-medium";
  const logoutButtonClass = "bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm font-medium";

  return (
    <div className='w-full bg-[#0d1117] border-b border-[#30363d] mb-8'>
        <div className='flex w-[80%] mx-auto h-16 items-center justify-around text-white'>
            <div className="flex items-center space-x-4">
                <NavLink className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass} to='/'>Home</NavLink>
            </div>
            
            <div className="flex items-center space-x-4">
            {isAuthenticated ? (
                <>
                <NavLink className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass} to='/dashboard'>Dashboard</NavLink>
                {user?.role === 'admin' && (
                    <NavLink className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass} to='/admin-dashboard'>Admin</NavLink>
                )}
                <NavLink className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass} to='/profile'>Profile</NavLink>
                <button onClick={handleLogout} className={logoutButtonClass}>Logout</button>
                </>
            ) : (
                <>
                <NavLink className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass} to='/login'>Login</NavLink>
                <NavLink className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass} to='/sign-up'>Sign Up</NavLink>
                </>
            )}
            </div>
        </div>
    </div>
  );
};

export default Navbar;