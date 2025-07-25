
const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#00ED64]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ArrowRightIcon = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`${className} text-[#A0A0A0]`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
);

const AnalyticsGraphic = () => (
  <div className="p-6 bg-[#181818] border border-[#2a2a2a] rounded-xl shadow-2xl shadow-black/50">
    <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-[#A0A0A0]">Platform Activity</span>
        <div className="flex space-x-1">
            <span className="w-3 h-3 bg-[#333] rounded-full"></span>
            <span className="w-3 h-3 bg-[#333] rounded-full"></span>
            <span className="w-3 h-3 bg-[#333] rounded-full"></span>
        </div>
    </div>
    <div className="relative p-4 bg-black/20 rounded-lg">
      <div className="flex justify-between items-end h-32 space-x-2.5">
        <div className="w-5 bg-[#00ED64]/50 rounded-t-md hover:bg-[#00ED64] transition-all" style={{ height: '30%' }}></div>
        <div className="w-5 bg-[#00ED64]/50 rounded-t-md hover:bg-[#00ED64] transition-all" style={{ height: '50%' }}></div>
        <div className="w-5 bg-[#00ED64] rounded-t-md shadow-[0_0_12px_rgba(0,237,100,0.6)]" style={{ height: '75%' }}></div>
        <div className="w-5 bg-[#00ED64]/50 rounded-t-md hover:bg-[#00ED64] transition-all" style={{ height: '60%' }}></div>
        <div className="w-5 bg-[#00ED64]/50 rounded-t-md hover:bg-[#00ED64] transition-all" style={{ height: '90%' }}></div>
        <div className="w-5 bg-[#00ED64]/50 rounded-t-md hover:bg-[#00ED64] transition-all" style={{ height: '40%' }}></div>
        <div className="w-5 bg-[#00ED64]/50 rounded-t-md hover:bg-[#00ED64] transition-all" style={{ height: '65%' }}></div>
        <div className="w-5 bg-[#00ED64]/50 rounded-t-md hover:bg-[#00ED64] transition-all" style={{ height: '80%' }}></div>
      </div>
      <div className="mt-3 border-t border-dashed border-[#00ED64]/30"></div>
    </div>
  </div>
);

const Home = () => {

  const introFeatures = [
    {
      title: "Secure JWT Login",
      description: "Role-based authentication for users and admins ensures your data and platform access are protected.",
    },
    {
      title: "Effortless Excel Uploads",
      description: "Utilizes Multer to seamlessly handle .xls and .xlsx file uploads with backend validation.",
    },
    {
      title: "Interactive Chart Generation",
      description: "Leverages Chart.js to create dynamic and interactive 2D charts like Bar, Line, and Pie.",
    },
  ];

  const coreFeatures = [
    { name: 'Parse and Read Data using SheetJS' },
    { name: 'Interactive 2D Charting' },
    { name: 'Select Columns for X and Y Axes' },
    { name: 'Fast Chart & Report Downloads' },
    { name: 'Maintain Upload & Analysis History' },
    { name: 'Comprehensive Admin Dashboard' },
  ];

  const flowSteps = [
    { name: 'Secure Login', description: 'JWT-based access' },
    { name: 'Upload .xlsx', description: 'Via Multer' },
    { name: 'Select Columns', description: 'For X & Y Axes' },
    { name: 'Generate Chart', description: 'Using Chart.js' },
  ];

  return (
    <div className="bg-[#0D0D0D] text-white font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =================================== */}
        {/* Hero Section */}
        {/* =================================== */}
        <section className="py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter">
                Excel Analytics Platform
              </h1>
              <p className="mt-4 text-lg text-[#A0A0A0] max-w-lg mx-auto md:mx-0">
                Transform your raw Excel data into stunning, interactive visualizations. Securely upload, analyze, and share insights in just a few clicks.
              </p>
              <a 
                href="#get-started"
                className="mt-8 inline-block bg-[#00ED64] text-[#0D0D0D] font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition-all shadow-[0_0_20px_rgba(0,237,100,0.4)]"
              >
                Get Started for Free
              </a>
            </div>
            <div className="hidden md:block">
              <AnalyticsGraphic />
            </div>
          </div>
        </section>

        <hr className="border-t border-[#2a2a2a]" />

        {/* =================================== */}
        {/* Intro Features Section */}
        {/* =================================== */}
        <section className="py-20">
          <h2 className="text-3xl font-bold text-center mb-4">
            Keep your systems up and running
          </h2>
          <p className="text-center text-lg text-[#A0A0A0] mb-12">and your customers happy.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {introFeatures.map((feature) => (
              <article key={feature.title} className="bg-[#181818] p-6 rounded-lg border border-transparent hover:border-[#00ED64]/50 transition-colors duration-300">
                <CheckCircleIcon />
                <h3 className="mt-4 text-xl font-semibold text-[#E0E0E0]">{feature.title}</h3>
                <p className="mt-2 text-[#A0A0A0]">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* =================================== */}
        {/* Process Flow Section */}
        {/* =================================== */}
        <section className="py-16">
            <div className="flex flex-col md:flex-row items-stretch justify-between gap-px bg-[#2a2a2a] rounded-xl border border-[#2a2a2a] overflow-hidden">
                {flowSteps.map((step, index) => (
                    <div key={index} className="flex-1 flex items-center gap-4 p-4 bg-[#181818]">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black/50 border border-[#2a2a2a] text-[#00ED64] font-bold text-lg">
                            {index + 1}
                        </div>
                        <div>
                            <p className="font-semibold text-white">{step.name}</p>
                            <p className="text-sm text-[#A0A0A0]">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>


        {/* =================================== */}
        {/* Testimonial Section */}
        {/* =================================== */}
        <section className="py-20">
           <div className="relative max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                  <img
                    src="https://i.pravatar.cc/150?u=data-analyst"
                    alt="Data Analyst"
                    className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-[#2a2a2a] shadow-lg"
                  />
                  <blockquote className="text-center md:text-left">
                      <p className="text-xl italic text-[#E0E0E0]">
                          "This platform has become indispensable for our team. The ease of converting complex spreadsheets into clear, interactive charts has accelerated our decision-making process tenfold. A truly powerful tool for anyone working with data."
                      </p>
                      <footer className="mt-6">
                          <p className="text-lg font-bold text-white">Chloe Salinas</p>
                          <p className="text-[#A0A0A0]">Lead Data Strategist, QuantumLeap Analytics</p>
                      </footer>
                  </blockquote>
              </div>
           </div>
        </section>
        
        <hr className="border-t border-[#2a2a2a]" />

        {/* =================================== */}
        {/* Core Features Section */}
        {/* =✅================================== */}
        <section className="py-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            See how Edge Delta can help you
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 max-w-4xl mx-auto">
            {coreFeatures.map((feature) => (
               <div key={feature.name} className="flex items-center space-x-4">
                  <span className="text-xl text-[#00ED64]">✅</span>
                  <p className="text-lg text-[#E0E0E0]">{feature.name}</p>
               </div>
            ))}
          </div>
        </section>

        {/* =================================== */}
        {/* Final CTA Section */}
        {/* =================================== */}
        <section id="get-started" className="py-24 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
                Let's get you started with a free trial.
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-[#A0A0A0]">
                No credit card required. Start analyzing your Excel data and building powerful dashboards in just a few clicks.
            </p>
            <a 
                href="#get-started"
                className="mt-8 inline-block bg-[#00ED64] text-[#0D0D0D] font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition-all shadow-[0_0_20px_rgba(0,237,100,0.4)]"
              >
                Start a Free Trial
            </a>
            <div className="mt-16 w-full max-w-2xl mx-auto">
                <div className="flex items-center justify-between space-x-2 p-2 bg-[#181818] border border-[#2a2a2a] rounded-lg">
                    <div className="flex-1 text-center bg-[#0d0d0d] text-sm py-2 rounded-md">Upload</div>
                    <ArrowRightIcon className="w-5 h-5" />
                    <div className="flex-1 text-center bg-[#0d0d0d] text-sm py-2 rounded-md">Analyze</div>
                    <ArrowRightIcon className="w-5 h-5" />
                    <div className="flex-1 text-center bg-[#0d0d0d] text-sm py-2 rounded-md">Visualize</div>
                    <ArrowRightIcon className="w-5 h-5" />
                    <div className="flex-1 text-center bg-[#00ED64] text-[#0D0D0D] text-sm font-bold py-2 rounded-md">Export</div>
                </div>
            </div>
        </section>

      </div>
    </div>
  );
};

export default Home;