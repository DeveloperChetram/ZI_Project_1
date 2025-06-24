
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
// import Welcome from '../components/Welcome'
import Login from '../pages/Login'
import Register from '../pages/Register'
import AdminDashboard from '../components/AdminDashboard'

const MainRoutes = () => {
  return (
    <Routes>
     <Route path='/' element={<Home/>}  />
     <Route path='/login' element={<Login/>}  />
     <Route path='/sign-up' element={<Register/>}  />
     <Route path='/admin-dashboard' element={<AdminDashboard/>}  />
     {/* <Route path='/' element={<Welcome/>}  /> */}
         
    </Routes>
  )
}

export default MainRoutes
