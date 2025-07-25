import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex w-[80%] h-[50px] items-center justify-around text-white'>
      <NavLink className={(e)=>e.isActive ?"text-white border-[#02b567] bg-[#02b567]  px-3 rounded-lg  py-1 border-2" +"text-white border-[#02b567] bg-[#02b567]  px-3 rounded-lg  py-1 border-2 " : "text-white border-[#02b567] px-3 rounded-lg  py-1 border-2 "} to='/'>Home</NavLink>
      {/* The /charts NavLink has been removed */}
      <NavLink className={(e)=>e.isActive ? "text-white border-[#02b567] bg-[#02b567]  px-3 rounded-lg  py-1 border-2 " : "text-white border-[#02b567] px-3 rounded-lg  py-1 border-2 "}  to='/login'>Login</NavLink>
    </div>
  )
}

export default Navbar