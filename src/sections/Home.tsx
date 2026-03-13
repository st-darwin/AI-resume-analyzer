import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePuterStore } from "../lib/puter";
import Navbar from "../components/Navbar";
import Badges from "../components/Badges";// Import the badges we made
import Reviews from "../components/Reviews";
import Showcase from "../components/Showcase";
import Pricing from "../components/Pricing";

import DemoModal from "../components/Demo";
import Process from "../components/Process";
import AIBuilderFeature from "../components/AIBuilder";
import CareerIntelligence from "../components/Extra";

const Home = () => {
  const { auth } = usePuterStore();
  const navigate = useNavigate();
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated, navigate]);

  return (
    <main className="min-h-screen bg-[#FDFDFD] overflow-x-hidden selection:bg-blue-100">
      <Navbar />

      {/* --- BACKGROUND DECOR --- */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-50/50 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-50/40 rounded-full blur-[100px] -z-10" />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left Column: Content */}
            <div className="flex-1 text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm animate-in fade-in slide-in-from-top-4 duration-700">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Nexacv Resume Intelligence</span>
              </div>

              <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight leading-[0.9] animate-in fade-in slide-in-from-left-8 duration-1000">
                Stop guessing. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">
                  Start Landing.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-in fade-in slide-in-from-left-12 duration-1000 delay-200">
                NexaCV uses advanced AI to score your resume against real-world ATS algorithms. 
                Get deep insights, fix hidden errors, and double your interview rate in seconds.
              </p>

              {/* THE DOPE BUTTON */}
              <div className="flex flex-col sm:flex-row items-center gap-5 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                <button
                  onClick={() => navigate('/Upload')}
                  className="group relative px-10 py-5 bg-slate-900 text-white font-black rounded-[2rem] transition-all duration-500 shadow-[0_20px_40px_-10px_rgba(15,23,42,0.3)] hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:bg-blue-600 active:scale-95 w-full sm:w-auto overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="relative flex items-center justify-center gap-3 text-lg">
                    Get Started Free
                    <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>

                <button
                  onClick={() => navigate('/History')}
                  className="px-10 py-5 bg-white text-slate-900 font-bold rounded-[2rem] border-2 border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-300 w-full sm:w-auto"
                >
                  View History
                </button>
              </div>
            </div>

            {/* Right Column: Visual Element */}
            <div className="flex-1 relative w-full max-w-xl animate-in fade-in zoom-in duration-1000 delay-300">
              <div className="relative z-10 bg-white/70 backdrop-blur-2xl rounded-[3rem] border border-white p-2 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
                <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100">
                  {/* Mock UI Elements */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="h-4 w-32 bg-slate-200 rounded-full animate-pulse" />
                    <div className="h-8 w-8 bg-blue-100 rounded-full" />
                  </div>
                  <div className="space-y-4">
                    <div className="h-12 w-full bg-white rounded-2xl shadow-sm border border-slate-100" />
                    <div className="h-12 w-[80%] bg-white rounded-2xl shadow-sm border border-slate-100" />
                    <div className="h-40 w-full bg-blue-600 rounded-[2rem] mt-6 flex items-center justify-center">
                       <span className="text-white text-4xl font-black">89%</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating Decorative Card */}
              <div className="absolute -bottom-10 -left-10 z-20 bg-white p-6 rounded-3xl shadow-xl border border-slate-100 -rotate-6 animate-bounce [animation-duration:4s]">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase">ATS Ready</p>
                       <p className="font-bold text-slate-900">Resume Optimized</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- THE BADGES SECTION --- */}
      <Badges />
      <Showcase/>
      <Process onOpenDemo={() => setIsDemoOpen(true)} />
      <DemoModal 
        isOpen={isDemoOpen} 
        onClose={() => setIsDemoOpen(false)} 
      />
      <AIBuilderFeature/>
      <Reviews/>
      <Pricing/>
      <CareerIntelligence/>



      {/* --- FOOTER CTA --- */}
      <section className="py-32 bg-[#F8FAFC] border-t border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Ready to beat the bots?</h2>
          <p className="text-slate-500 font-medium mb-10">Join 1,000+ developers tracking their success on NexaCV.</p>
          <button 
             onClick={() => navigate('/Upload')}
             className="px-12  cursor-pointer py-5 bg-blue-600 text-white font-black rounded-[2rem] shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
          >
            Upload Now
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
