import  { useState } from 'react'

const KeywordInjector = () => {
  const [injected, setInjected] = useState<string[]>([]);

  const missingKeywords = [
    { name: "Docker", impact: "High" },
    { name: "GraphQL", impact: "Medium" },
    { name: "TypeScript", impact: "Critical" },
    { name: "Unit Testing", impact: "High" },
    { name: "CI/CD", impact: "Medium" },
  ];

  const handleAdd = (name: string) => {
    if (!injected.includes(name)) {
      setInjected([...injected, name]);
    }
  };

  return (
    <section className="py-32 px-6 bg-white overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Content Side */}
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100">
               <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest text-amber-700">Optimization Engine</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-none">
              Beat the <br />
              <span className="text-blue-600 underline decoration-blue-100 underline-offset-8">ATS Algorithms.</span>
            </h2>

            <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl">
              Most resumes are rejected because they lack specific "Power Keywords." 
              NexaHub identifies these gaps instantly and helps you inject them naturally into your experience.
            </p>

            <div className="pt-4">
              <button className="px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 active:scale-95">
                Explore Keyword Intelligence
              </button>
            </div>
          </div>

          {/* Visual Interactive Side */}
          <div className="flex-1 w-full relative">
            <div className="bg-slate-50 rounded-[3rem] p-10 border border-slate-100 shadow-inner">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Missing Industry Keywords</h4>
              
              <div className="flex flex-wrap gap-3">
                {missingKeywords.map((kw, i) => (
                  <button
                    key={i}
                    onClick={() => handleAdd(kw.name)}
                    className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center gap-3
                      ${injected.includes(kw.name) 
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200 scale-95' 
                        : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-400 hover:text-blue-600 shadow-sm'
                      }`}
                  >
                    {kw.name}
                    {injected.includes(kw.name) ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    ) : (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-black
                        ${kw.impact === 'Critical' ? 'bg-red-100 text-red-600' : 
                          kw.impact === 'High' ? 'bg-amber-100 text-amber-600' : 
                          'bg-blue-100 text-blue-600'}`}
                      >
                        {kw.impact}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Progress Bar Display */}
              <div className="mt-12 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-black text-slate-900">ATS Compatibility</span>
                  <span className="text-sm font-black text-blue-600">{60 + (injected.length * 8)}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                    style={{ width: `${60 + (injected.length * 8)}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 font-bold mt-4 italic">
                  *Adding "Critical" keywords increases interview probability by 40%.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default KeywordInjector