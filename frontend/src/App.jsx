import MainRoutes from "./routes/MainRoutes";
import Navbar from './components/Navbar';
<<<<<<< HEAD
import UserProfile from "./components/UserProfile";
import AdminDashboard from "./components/AdminDashboard";
// import UserProfile from "./components/userProfile";
const App = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center w-full">
      <Navbar/>
        <MainRoutes />
        <UserProfile/>
        <AdminDashboard/>

=======

const App = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center w-full">
      <Navbar />
      <MainRoutes />
>>>>>>> main
    </div>
  );
};

export default App;