import {  useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className=" text-white font-sans">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Transform Your <span className="text-[#02b576]">Excel Data</span>
        </h1>
        <p className="text-gray-300 text-lg max-w-xl mb-8">
          Powerful web-based analytics platform — no coding required.
        </p>
        <button onClick={()=>navigate('/login')} className=" cursor-pointer bg-[#02b576] text-white px-6 py-3 rounded-md text-lg font-medium shadow-md hover:shadow-[0_0_15px_#02b576] transition-all">
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-[#111] p-8 rounded-lg shadow hover:shadow-[0_0_20px_#02b57640] transition-all">
            <div className="mb-4">
              <i className="ri-upload-cloud-line text-[#02b576] text-3xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Data Import</h3>
            <p className="text-gray-400">
              Drag and drop Excel files with full format support.
            </p>
          </div>

          <div className="bg-[#111] p-8 rounded-lg shadow hover:shadow-[0_0_20px_#02b57640] transition-all">
            <div className="mb-4">
              <i className="ri-line-chart-line text-[#02b576] text-3xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Analytics</h3>
            <p className="text-gray-400">
              Discover trends and patterns instantly with smart tools.
            </p>
          </div>

          <div className="bg-[#111] p-8 rounded-lg shadow hover:shadow-[0_0_20px_#02b57640] transition-all">
            <div className="mb-4">
              <i className="ri-bar-chart-grouped-line text-[#02b576] text-3xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Visualization</h3>
            <p className="text-gray-400">
              Create interactive charts and dashboards in seconds.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-[#0a0a0a] border-t border-[#1a1a1a] text-center">
        <p className="text-gray-500 mb-2">Contact: support@excelanalytics.com</p>
        <p className="text-gray-600 text-sm">© 2025 Excel Analytics Platform. All rights reserved.</p>
      </footer>
    </div>
        </>
    );
};

export default Home;
