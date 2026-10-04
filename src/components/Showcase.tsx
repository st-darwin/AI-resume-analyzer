import { useNavigate } from 'react-router-dom'

const Showcase = () => {
  const navigate = useNavigate();

  return (
    <section className="py-28 px-6 bg-[#FAFAFC] overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        
        {/* --- HEADER SECTION --- */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-200/55 border border-slate-200/60 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Curated Blueprints</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.05]">
            Build with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Clean & Minimal</span> Layouts.
          </h2>
          <p className="text-base sm:text-lg text-slate-500 font-medium max-w-2xl leading-relaxed">
            Our free tier offers essential designs engineered to breeze through ATS checks. 
            Step up to Pro for meticulously crafted, high-performance templates built for top-tier roles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* --- FREE TIER CARD --- */}
          <div className="group relative p-8 sm:p-10 bg-white/80 backdrop-blur-md rounded-[2.5rem] border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-500 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-3 inline-block border border-emerald-100/50">
                    Free Forever
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Minimalist Essentials</h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-emerald-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                </div>
              </div>

              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                Clean, distraction-free templates that focus 100% on your experience. 
                Designed for clean readability and total ATS compatibility.
              </p>
            </div>

            {/* Mockup Preview */}
            <div className="mt-8 relative h-52 bg-slate-50/70 rounded-2xl border border-slate-100 p-5 flex flex-col gap-2.5 group-hover:-translate-y-1 transition-transform duration-500">
              <div className="h-3 w-1/3 bg-slate-200/60 rounded-full" />
              <div className="h-2 w-full bg-slate-200/40 rounded-full" />
              <div className="h-2 w-[85%] bg-slate-200/40 rounded-full" />
              <div className="mt-2 grid grid-cols-2 gap-3">
                <div className="h-16 bg-white rounded-xl border border-slate-100" />
                <div className="h-16 bg-white rounded-xl border border-slate-100" />
              </div>
            </div>
          </div>

          {/* --- PRO TIER CARD --- */}
          <div className="group relative p-8 sm:p-10 bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[2.5rem] border border-slate-800 shadow-xl shadow-slate-900/10 text-white flex flex-col justify-between overflow-hidden">
            {/* Subtle light accent */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/15 blur-3xl pointer-events-none group-hover:bg-blue-500/25 transition-all duration-700" />
            
            <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-black uppercase tracking-widest mb-3 inline-block">
                    Pro Version
                  </div>
                  <h3 className="text-2xl font-black text-white">Elite & Modern</h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </div>
              </div>

              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                Elevate your presence with refined layouts and executive styling. 
                Featuring premium spacing and modern information hierarchy.
              </p>
            </div>

            {/* Mockup Preview (Dark Version) */}
            <div className="mt-8 relative z-10 h-52 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5 flex flex-col gap-2.5 group-hover:-translate-y-1 transition-transform duration-500">
              <div className="h-3 w-1/4 bg-blue-400/60 rounded-full" />
              <div className="h-2 w-full bg-white/10 rounded-full" />
              <div className="h-2 w-[90%] bg-white/10 rounded-full" />
              <div className="mt-2 h-20 w-full bg-gradient-to-br from-blue-600/20 to-transparent rounded-xl border border-white/5 flex items-center justify-center">
                 <span className="text-blue-300 font-bold text-[11px] tracking-wider uppercase opacity-80">Elite Blueprint v2</span>
              </div>
            </div>
          </div>

        </div>

        {/* Global CTA */}
        <div className="mt-16 text-center">
           <button 
             onClick={() => navigate('/ResumeBuilder')}
             className="cursor-pointer px-10 py-4 bg-slate-900 text-white text-sm font-black rounded-2xl hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-slate-900/10 active:scale-95"
           >
             Browse All Templates
           </button>
        </div>
      </div>
    </section>
  )
}

export default Showcase