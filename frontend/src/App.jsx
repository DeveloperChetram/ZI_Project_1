// import Welcome from "./components/Welcome"
import MainRoutes from "./routes/MainRoutes"
import Navbar from './components/Navbar';
import UserProfile from "./components/userProfile";
const App = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center w-full">
      <Navbar/>
        <MainRoutes />
        <UserProfile/>

    </div>
  )
}

export default App
