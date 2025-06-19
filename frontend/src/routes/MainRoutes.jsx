
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Welcome from '../components/Welcome'
import Login from '../pages/Login'
import Register from '../pages/Register'

const MainRoutes = () => {
  return (
    <Routes>
     <Route path='/home' element={<Home/>}  />
     <Route path='/login' element={<Login/>}  />
     <Route path='/sign-up' element={<Register/>}  />
     <Route path='/' element={<Welcome/>}  />
         
    </Routes>
  )
}

export default MainRoutes
