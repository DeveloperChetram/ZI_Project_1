import MainRoutes from "./routes/MainRoutes";
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center w-full">
      <Navbar />
      <MainRoutes />
    </div>
  );
};

export default App;