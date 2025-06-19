
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex w-[80%] h-[50px] items-center justify-around text-white'>
      <NavLink className={(e)=>e.isActive ? "text-[#02b576]" : "text-white"} to='/home'>Home</NavLink>
      <NavLink className={(e)=>e.isActive ? "text-[#02b576]" : "text-white"} to='/'>Welcome</NavLink>
      <NavLink className={(e)=>e.isActive ? "text-[#02b576]" : "text-white"}  to='/login'>Login</NavLink>
    </div>
  )
}

export default Navbar
