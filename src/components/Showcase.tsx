
import { useNavigate } from 'react-router-dom'

const Showcase = () => {
  const navigate = useNavigate();

  return (
    <section className="py-32 px-6 bg-[#FDFDFD] overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        
        {/* --- HEADER SECTION --- */}
        <div className="max-w-4xl mb-20">
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1]">
            Build with <span className="text-blue-600">Free</span> Minimalist Layouts.
          </h2>
          <p className="mt-6 text-xl text-slate-500 font-medium max-w-2xl">
            Our free tier offers clean, essential designs that pass every ATS check. 
            Upgrade to Pro for dope, high-performance templates engineered for top-tier roles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* --- FREE TIER CARD --- */}
          <div className="group relative p-1 bg-slate-50 rounded-[3rem] border border-slate-100 overflow-hidden">
            <div className="p-10 space-y-8">
              <div className="flex justify-between items-start">
                <div>
                  <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-4 inline-block">
                    Free Forever
                  </div>
                  <h3 className="text-3xl font-black text-slate-900">Minimalist Essentials</h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm text-slate-400 group-hover:text-emerald-500 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                </div>
              </div>

              <p className="text-slate-500 font-medium leading-relaxed">
                Clean, distractions-free templates that focus 100% on your experience. 
                Perfect for developers who let their code do the talking.
              </p>

              {/* Mockup Preview */}
              <div className="relative h-64 bg-white rounded-[2rem] border border-slate-100 shadow-inner overflow-hidden flex flex-col p-6 gap-3 group-hover:translate-y-[-8px] transition-transform duration-500">
                <div className="h-4 w-1/3 bg-slate-100 rounded-full" />
                <div className="h-2 w-full bg-slate-50 rounded-full" />
                <div className="h-2 w-[90%] bg-slate-50 rounded-full" />
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="h-20 bg-slate-50 rounded-xl" />
                  <div className="h-20 bg-slate-50 rounded-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* --- PRO TIER CARD --- */}
          <div className="group relative p-1 bg-slate-900 rounded-[3rem] border border-slate-800 overflow-hidden shadow-2xl shadow-indigo-200/50">
            {/* Animated Glow Overlay */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] -z-0 group-hover:bg-blue-600/40 transition-all" />
            
            <div className="relative z-10 p-10 space-y-8">
              <div className="flex justify-between items-start">
                <div>
                  <div className="px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest mb-4 inline-block shadow-lg shadow-blue-500/30">
                    Pro Version
                  </div>
                  <h3 className="text-3xl font-black text-white">Dope Minimalist Designs</h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shadow-sm text-white group-hover:bg-blue-600 transition-all">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </div>
              </div>

              <p className="text-slate-400 font-medium leading-relaxed">
                Elevate your presence with "The Silicon Valley" and "Executive Elite". 
                Premium typography, custom spacing, and AI-optimized reading flow.
              </p>

              {/* Mockup Preview (Dark/Dope Version) */}
              <div className="relative h-64 bg-white/5 rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col p-6 gap-3 group-hover:scale-[1.02] transition-transform duration-500">
                <div className="h-4 w-1/4 bg-blue-500/50 rounded-full" />
                <div className="h-2 w-full bg-white/10 rounded-full" />
                <div className="h-2 w-[95%] bg-white/10 rounded-full" />
                <div className="mt-4 h-32 w-full bg-gradient-to-br from-blue-600/20 to-transparent rounded-[1.5rem] border border-white/5 flex items-center justify-center">
                   <span className="text-blue-400 font-black text-xs uppercase tracking-widest opacity-60">Elite Blueprint v2</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Global CTA */}
        <div className="mt-20 text-center">
           <button 
             onClick={() => navigate('/ResumeBuilder')}
             className="px-12 py-5 bg-slate-900 text-white font-black rounded-[2rem] hover:bg-blue-600 transition-all duration-300 shadow-xl shadow-slate-200 active:scale-95"
           >
             Browse All Templates
           </button>
        </div>
      </div>
    </section>
  )
}

export default Showcase