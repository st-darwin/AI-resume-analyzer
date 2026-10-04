import { useNavigate } from 'react-router-dom'

const AIBuilderFeature = () => {
  const navigate = useNavigate();

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-white via-slate-50/50 to-white overflow-hidden relative border-t border-slate-100">
      {/* --- SOFT LIGHT GLOWS --- */}
      <div className="absolute top-1/2 left-10 w-[450px] h-[450px] bg-blue-100/60 rounded-full blur-[100px] -z-0 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-indigo-50/80 rounded-full blur-[100px] -z-0 pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* Visual Side (Light, Clean SaaS Mockup) */}
          <div className="flex-1 w-full order-2 lg:order-1">
            <div className="relative p-2 bg-white rounded-[3rem] border border-slate-200/80 shadow-2xl shadow-slate-900/5">
              <div className="bg-slate-50/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-slate-200/60">
                {/* Mock Header Bar */}
                <div className="flex items-center gap-2 mb-8 border-b border-slate-200/60 pb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-400/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="ml-4 h-3.5 w-32 bg-slate-200/80 rounded-full animate-pulse" />
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/20">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div className="space-y-2 flex-1">
                      <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-widest">Nexa AI</p>
                      <div className="p-4 bg-white rounded-2xl border border-slate-200/60 text-slate-600 text-sm italic font-medium shadow-sm">
                        "Generating high-impact bullet points for Senior React Developer role..."
                      </div>
                    </div>
                  </div>

                  {/* Soft Shimmer Lines */}
                  <div className="pl-14 space-y-3">
                    <div className="h-2.5 w-full bg-blue-100/60 rounded-full animate-[shimmer_2s_infinite]" />
                    <div className="h-2.5 w-[80%] bg-blue-100/60 rounded-full animate-[shimmer_2s_infinite_0.5s]" />
                    <div className="h-2.5 w-[90%] bg-blue-100/60 rounded-full animate-[shimmer_2s_infinite_1s]" />
                  </div>
                </div>
              </div>
              
              {/* Floating Stat Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white px-6 py-5 rounded-3xl border border-slate-100 shadow-xl shadow-slate-900/5 animate-bounce [animation-duration:5s]">
                 <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Success Rate</p>
                 <p className="text-2xl font-semibold text-slate-900 tracking-tight">+400%</p>
                 <p className="text-[10px] font-semibold text-emerald-600 tracking-wide mt-0.5">Interview Invites</p>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="flex-1 space-y-8 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
               <span className="text-[11px] font-semibold uppercase tracking-widest text-blue-600">Exclusive Pro Feature</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight leading-[1.08]">
              Don't write. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Generate.
              </span>
            </h2>

            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              Struggling with words? Our AI Resume Architect doesn't just check your resume—it <span className="text-slate-900 font-semibold">builds it from scratch.</span> 
              Tell Nexa what job you want, and watch it craft a data-driven, ATS-optimized masterpiece in seconds.
            </p>

            <ul className="space-y-3.5">
              {[
                "AI-Powered Bullet Point Generation",
                "Automatic Keyword Optimization",
                "Tone & Professionalism Refinement",
                "One-Click Skill Gap Analysis"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <button 
              onClick={() => navigate('/AIResumeBuilder')}
              className="cursor-pointer px-9 py-4 bg-slate-900 text-white font-semibold text-sm rounded-2xl hover:bg-blue-600 transition-all duration-300 shadow-md shadow-slate-900/10 active:scale-95"
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