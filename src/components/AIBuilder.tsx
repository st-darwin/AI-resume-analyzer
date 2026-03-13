
import { useNavigate } from 'react-router-dom'

const AIBuilderFeature = () => {
  const navigate = useNavigate();

  return (
    <section className="py-32 px-6 bg-slate-900 overflow-hidden relative">
      {/* --- GLOW EFFECTS --- */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-0" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -z-0" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* Visual Side (The "AI" in action) */}
          <div className="flex-1 w-full order-2 lg:order-1">
            <div className="relative p-1 bg-gradient-to-br from-blue-500/30 to-transparent rounded-[3rem]">
              <div className="bg-slate-950 rounded-[2.8rem] p-8 border border-white/5 shadow-2xl">
                {/* Mock AI Terminal */}
                <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/20" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/20" />
                  </div>
                  <div className="ml-4 h-4 w-32 bg-white/5 rounded-full animate-pulse" />
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div className="space-y-2 flex-1">
                      <p className="text-xs font-black text-blue-400 uppercase tracking-widest">Nexa AI</p>
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-slate-300 text-sm italic">
                        "Generating high-impact bullet points for Senior React Developer role..."
                      </div>
                    </div>
                  </div>

                  {/* Typing Animation Effect */}
                  <div className="pl-14 space-y-3">
                    <div className="h-3 w-full bg-gradient-to-r from-blue-500/40 to-transparent rounded-full animate-[shimmer_2s_infinite]" />
                    <div className="h-3 w-[80%] bg-gradient-to-r from-blue-500/40 to-transparent rounded-full animate-[shimmer_2s_infinite_0.5s]" />
                    <div className="h-3 w-[90%] bg-gradient-to-r from-blue-500/40 to-transparent rounded-full animate-[shimmer_2s_infinite_1s]" />
                  </div>
                </div>
              </div>
              
              {/* Floating Stat Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-3xl shadow-2xl animate-bounce [animation-duration:5s]">
                 <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Success Rate</p>
                 <p className="text-2xl font-black text-slate-900">+400%</p>
                 <p className="text-[10px] font-bold text-emerald-600">Interview Invites</p>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="flex-1 space-y-8 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20">
               <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Exclusive Pro Feature</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[0.9]">
              Don't write. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Generate.
              </span>
            </h2>

            <p className="text-lg text-slate-400 font-medium leading-relaxed">
              Struggling with words? Our AI Resume Architect doesn't just check your resume—it <span className="text-white">builds it from scratch.</span> 
              Tell Nexa what job you want, and watch it craft a data-driven, ATS-optimized masterpiece in seconds.
            </p>

            <ul className="space-y-4">
              {[
                "AI-Powered Bullet Point Generation",
                "Automatic Keyword Optimization",
                "Tone & Professionalism Refinement",
                "One-Click Skill Gap Analysis"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 font-bold">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <button 
              onClick={() => navigate('/AIResumeBuilder')}
              className="px-10 py-5 bg-blue-600 text-white font-black rounded-[2rem] hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 active:scale-95"
            >
              Get Free Access
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}

export default AIBuilderFeature