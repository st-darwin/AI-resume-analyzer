
import { useNavigate } from 'react-router-dom'


const CareerIntelligence = () => {
  const navigate = useNavigate();
    
  const matches = [
    { role: "Senior Frontend Engineer", match: 94, salary: "$120k - $160k", trend: "up" },
    { role: "Creative Developer", match: 88, salary: "$110k - $150k", trend: "up" },
    { role: "Product Designer", match: 82, salary: "$100k - $140k", trend: "stable" },
  ];

  return (
    <section className="py-32 px-6 bg-white overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* --- VISUAL DASHBOARD SIDE --- */}
          <div className="flex-1 w-full order-2 lg:order-1">
            <div className="bg-slate-900 rounded-[3.5rem] p-8 md:p-12 shadow-2xl relative border border-slate-800">
              {/* Background Glows */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/20 blur-[80px]" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/10 blur-[80px]" />
              
              <div className="relative z-10 space-y-10">
                <div className="flex justify-between items-center border-b border-white/5 pb-6">
                   <div className="space-y-1">
                     <h4 className="text-white font-black tracking-tight text-xl">Market Positioning</h4>
                     <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Neural Analysis v4.2</p>
                   </div>
                   <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                     <span className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">Live Engine</span>
                   </div>
                </div>

                {/* Unblurred, Interactive Data */}
                <div className="space-y-8">
                  {matches.map((item, i) => (
                    <div key={i} className="group cursor-default relative">
                      <div className="flex justify-between items-end mb-3">
                        <div className="space-y-1">
                          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{item.role}</p>
                          <div className="flex items-center gap-3">
                            <p className="text-white font-black text-2xl tracking-tighter">{item.salary}</p>
                            {item.trend === "up" && (
                                <span className="text-emerald-500 text-[10px] font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">↑ 12%</span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                            <p className="text-blue-400 font-black text-lg leading-none">{item.match}%</p>
                            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Match</p>
                        </div>
                      </div>
                      
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-1000 ease-out" 
                            style={{ width: `${item.match}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <div className="p-6 bg-blue-600/5 rounded-3xl border border-blue-500/20 relative overflow-hidden backdrop-blur-sm">
                    <div className="flex gap-4 items-start">
                        <div className="p-2 rounded-xl bg-blue-500 text-white shrink-0">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <p className="text-slate-300 text-sm font-medium leading-relaxed italic">
                          "Your <span className="text-blue-400 font-black">React + Node.js </span> architecture puts you in the <span className="text-white font-black underline decoration-blue-500 underline-offset-4">Top 5%</span> of visual engineers in Nigeria."
                        </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- CONTENT SIDE --- */}
          <div className="flex-1 space-y-8 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100">
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Career Intelligence</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-[1000] text-slate-900 tracking-tight leading-[0.95]">
              Know your worth. <br />
              <span className="text-blue-600">Predict</span> your path.
            </h2>

            <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl">
              NexaCV doesn't just scan words; it decodes your technical DNA. 
              We map your specific stack against global hiring trends to show you exactly where you'll dominate.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 pb-4">
              {[
                "Global Salary Benchmarking", 
                "Stack-to-Role Compatibility", 
                "Skill Demand Heatmaps", 
                "Neural Career Mapping"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="w-5 h-5 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <svg className="w-3 h-3 text-blue-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-700 font-bold text-sm tracking-tight">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <button 
                onClick={() => navigate('/Dashboard', { state: { triggerAnalysis: true } })}
                className="group px-10 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-blue-600 transition-all active:scale-95 shadow-2xl shadow-slate-200 flex items-center gap-4"
              >
                Explore Your Career Map
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
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