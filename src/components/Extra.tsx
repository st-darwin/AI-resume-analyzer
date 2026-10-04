import { useNavigate } from 'react-router-dom'

const CareerIntelligence = () => {
  const navigate = useNavigate();
    
  const matches = [
    { role: "Senior Frontend Engineer", match: 94, salary: "$120k - $160k", trend: "up" },
    { role: "Creative Developer", match: 88, salary: "$110k - $150k", trend: "up" },
    { role: "Product Designer", match: 82, salary: "$100k - $140k", trend: "stable" },
  ];

  return (
    <section className="py-28 px-6 bg-white overflow-hidden border-t border-slate-100">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* --- VISUAL DASHBOARD SIDE --- */}
          <div className="flex-1 w-full order-2 lg:order-1">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-10 shadow-xl relative border border-slate-800">
              {/* Soft Ambient Glows */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/10 blur-3xl pointer-events-none" />
              
              <div className="relative z-10 space-y-8">
                <div className="flex justify-between items-center border-b border-white/10 pb-5">
                   <div className="space-y-0.5">
                     <h4 className="text-white font-semibold tracking-tight text-lg">Market Positioning</h4>
                     <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Neural Analysis v4.2</p>
                   </div>
                   <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                     <span className="text-emerald-400 text-[10px] font-semibold uppercase tracking-wider">Live Engine</span>
                   </div>
                </div>

                {/* Interactive Data List */}
                <div className="space-y-6">
                  {matches.map((item, i) => (
                    <div key={i} className="group relative">
                      <div className="flex justify-between items-end mb-2.5">
                        <div className="space-y-0.5">
                          <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">{item.role}</p>
                          <div className="flex items-center gap-2.5">
                            <p className="text-white font-semibold text-xl tracking-tight">{item.salary}</p>
                            {item.trend === "up" && (
                                <span className="text-emerald-400 text-[10px] font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded">↑ 12%</span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                            <p className="text-blue-400 font-semibold text-base leading-none">{item.match}%</p>
                            <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Match</p>
                        </div>
                      </div>
                      
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out" 
                            style={{ width: `${item.match}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Insight Box */}
                <div className="pt-2">
                  <div className="p-5 bg-blue-500/5 rounded-2xl border border-blue-500/15 relative overflow-hidden backdrop-blur-sm">
                    <div className="flex gap-3.5 items-start">
                        <div className="p-2 rounded-xl bg-blue-600 text-white shrink-0">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <p className="text-slate-300 text-xs md:text-sm font-medium leading-relaxed italic">
                          "Your <span className="text-blue-400 font-semibold">React + Node.js</span> architecture puts you in the <span className="text-white font-semibold underline decoration-blue-500 underline-offset-4">Top 5%</span> of visual engineers in Nigeria."
                        </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* --- CONTENT SIDE --- */}
          <div className="flex-1 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100">
               <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600">Career Intelligence</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight leading-tight">
              Know your worth. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Predict</span> your path.
            </h2>

            <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed max-w-xl">
              NexaCV doesn't just scan words; it decodes your technical DNA. 
              We map your specific stack against global hiring trends to show you exactly where you'll dominate.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2">
              {[
                "Global Salary Benchmarking", 
                "Stack-to-Role Compatibility", 
                "Skill Demand Heatmaps", 
                "Neural Career Mapping"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-600 font-medium text-xs md:text-sm tracking-tight">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button 
                onClick={() => navigate('/Dashboard', { state: { triggerAnalysis: true } })}
                className="cursor-pointer px-8 py-3.5 bg-slate-900 text-white font-semibold text-xs uppercase tracking-wider rounded-2xl hover:bg-slate-800 transition-all active:scale-95 shadow-sm flex items-center gap-3 group"
              >
                Explore Your Career Map
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default CareerIntelligence