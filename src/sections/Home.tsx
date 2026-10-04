import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePuterStore } from "../lib/puter";
import Navbar from "../components/Navbar";
import Badges from "../components/Badges";
import Reviews from "../components/Reviews";
import Showcase from "../components/Showcase";
import Pricing from "../components/Pricing";
import DemoModal from "../components/Demo";
import Process from "../components/Process";
import AIBuilderFeature from "../components/AIBuilder";
import CareerIntelligence from "../components/Extra";
import Footer from "../components/Footer";
import ResumeCard from "../components/ResumeCard";
import { resumes } from "../constants";
import { PenTool } from "lucide-react";

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
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-50/50 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-50/40 rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* --- HERO SECTION --- */}
   <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
  <div className="container mx-auto max-w-7xl">
    <div className="flex flex-col lg:flex-row items-center gap-16">
      
      {/* Left Column: Content */}
      <div className="flex-1 text-center lg:text-left space-y-8">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-sm">
          <PenTool className="w-4 h-4 text-blue-600" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Nexacv Resume Intelligence</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-slate-900 tracking-tight leading-[0.9]">
          Stop guessing. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">
            Start Landing.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
          NexaCV uses advanced AI to score your resume against real-world ATS algorithms. 
          Get deep insights, fix hidden errors, and double your interview rate in seconds.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
          <button
            onClick={() => navigate('/Upload')}
            className="group relative px-8 py-4 bg-slate-900 text-white font-black rounded-2xl transition-all duration-300 shadow-xl shadow-slate-900/10 hover:bg-blue-600 active:scale-95 w-full sm:w-auto overflow-hidden cursor-pointer"
          >
            <span className="relative flex items-center justify-center gap-3 text-base">
              Get Started Free
              <svg className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>

          <button
            onClick={() => navigate('/History')}
            className="px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl border border-slate-200/80 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300 w-full sm:w-auto cursor-pointer shadow-sm"
          >
            View History
          </button>
        </div>
      </div>

      {/* Right Column: Cool, Light & Soft Abstract UI */}
      <div className="flex-1 relative w-full max-w-xl">
        <div className="relative z-10 bg-white/60 backdrop-blur-2xl rounded-[3rem] border border-white p-3 shadow-[0_30px_70px_rgba(37,99,235,0.08)]">
          <div className="bg-gradient-to-br from-slate-50/80 to-blue-50/40 rounded-[2.5rem] p-8 border border-slate-100/80">
            
            {/* Soft Header Lines */}
            <div className="flex items-center justify-between mb-8">
              <div className="h-3.5 w-28 bg-slate-200/80 rounded-full" />
              <div className="h-8 w-8 bg-blue-100/70 rounded-full flex items-center justify-center">
                <div className="h-2 w-2 bg-blue-600 rounded-full animate-pulse" />
              </div>
            </div>

            {/* Glowing Soft Cards */}
            <div className="space-y-4">
              <div className="h-12 w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-100/80 flex items-center px-5">
                <div className="h-2.5 w-36 bg-slate-100 rounded-full" />
              </div>
              <div className="h-12 w-[85%] bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-100/80 flex items-center px-5">
                <div className="h-2.5 w-24 bg-slate-100 rounded-full" />
              </div>
              
              {/* Vibrant Soft Score Box */}
              <div className="h-40 w-full bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[2rem] mt-6 flex flex-col items-center justify-center shadow-xl shadow-blue-500/25 relative overflow-hidden">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)]" />
                 <span className="relative text-white text-5xl font-black tracking-tight">89%</span>
                 <span className="relative text-blue-100 text-xs font-semibold tracking-wider uppercase mt-1">AI Match Score</span>
              </div>
            </div>

          </div>
        </div>
        
        {/* Soft Floating Badge */}
        <div className="absolute -bottom-6 -left-6 z-20 bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-100">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">ATS Ready</p>
                 <p className="text-sm font-bold text-slate-900">Resume Optimized</p>
              </div>
           </div>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* --- CORE SECTIONS --- */}
      <Badges />
      <Showcase />
      <Process onOpenDemo={() => setIsDemoOpen(true)} />
      
      <DemoModal 
        isOpen={isDemoOpen} 
        onClose={() => setIsDemoOpen(false)} 
      />

      <AIBuilderFeature />
      <Reviews />

      {/* --- RESUME TEMPLATES SHOWCASE (Dark Obsidian Section) --- */}
    <section className="py-24 bg-gradient-to-b from-white via-slate-50/50 to-white text-slate-900 my-12 rounded-[2.5rem] max-w-7xl mx-auto px-6 border border-slate-100 shadow-sm">
  <div className="max-w-3xl mx-auto text-center mb-16">
    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-semibold uppercase tracking-widest text-emerald-600 mb-6">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      Precision Grading Engine Active
    </span>
    
    <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4 leading-tight">
      Elite Feedback, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Perfect Scores.</span>
    </h2>
    
    <p className="text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto text-sm md:text-base">
      We’ve engineered a deep neural grading system to provide instant, actionable 
      feedback on your resumes. No more guessing—just data-driven insights.
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {resumes.map((resume) => (
      <ResumeCard key={resume.id} resume={resume} />
    ))}
  </div>
</section>
      <Pricing />
      <CareerIntelligence />

      {/* --- FINAL CTA SECTION --- */}
      <section className="py-24 bg-[#F8FAFC] border-t border-slate-100">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Ready to beat the bots?</h2>
          <p className="text-slate-500 font-medium mb-8">Join 1,000+ developers tracking their success on NexaCV.</p>
          <button 
             onClick={() => navigate('/Upload')}
             className="px-10 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95 cursor-pointer"
          >
            Upload Now
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Home;