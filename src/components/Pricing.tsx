import { useNavigate } from 'react-router-dom'

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <section className="py-32 px-6 bg-[#FDFDFD] relative overflow-hidden">
      {/* Subtle Background Text */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[15rem] font-black text-slate-50 select-none -z-10 tracking-tighter">
        FREE
      </div>

      <div className="container mx-auto max-w-5xl">
        
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            Limited Time Community Offer
          </div>
          <h2 className="text-5xl md:text-7xl font-[1000] text-slate-900 tracking-tight leading-none">
            Pro Access, <span className="text-blue-600">Zero Cost.</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
            We're opening up our deep neural analysis tools to the community for free. No credit card, no gatekeeping.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* --- BASIC TIER --- */}
          <div className="group p-10 bg-white border border-slate-200/60 rounded-[3rem] transition-all duration-500 hover:border-slate-300">
            <div className="mb-8">
              <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest mb-2">Standard</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-slate-900">$0</span>
                <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">/ forever</span>
              </div>
            </div>

            <ul className="space-y-5 mb-10">
              {['3 Resume Scans / week', 'Standard ATS Analysis', 'Essential Templates', 'Basic AI Feedback'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-500 text-sm font-bold">
                  <div className="p-1 rounded-full bg-slate-100 text-slate-400">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <button 
              onClick={() => navigate('/ResumeBuilder')}
              className="w-full py-5 border-2 border-slate-100 text-slate-900 font-black rounded-2xl hover:bg-slate-50 transition-all active:scale-95"
            >
              Start Basic
            </button>
          </div>

          {/* --- PRO TIER (NOW FREE) --- */}
          <div className="relative p-10 bg-slate-900 rounded-[3.5rem] shadow-2xl shadow-blue-200/50 group overflow-hidden border border-slate-800">
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-30 group-hover:opacity-50 transition-opacity" />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="px-3 py-1 rounded-full bg-blue-600 text-white text-[9px] font-black uppercase tracking-[0.2em] mb-4 inline-block shadow-lg shadow-blue-500/20">
                    Neural Full Access
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">Pro Edition</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-5xl font-black text-white">$0</span>
                    <div className="flex flex-col">
                        <span className="text-slate-500 font-bold line-through text-xs">$6.99</span>
                        <span className="text-blue-400 font-bold uppercase text-[10px] tracking-tighter leading-none">Community Gift</span>
                    </div>
                  </div>
                </div>
              </div>

              <ul className="grid grid-cols-1 gap-4 mb-10">
                {[
                  'Unlimited AI Scans',
                  'Deep Neural Feedback',
                  'All NexaCV Pro Templates',
                  'Unlimited AI Generations',
                  'Keyword Injection Engine',
                  'Priority Parsing Support'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300 text-sm font-bold">
                    <div className="p-1 rounded-full bg-blue-500/20 text-blue-400">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => navigate('/AIResumeBuilder')}
                className="w-full py-5 bg-blue-600 text-white font-[1000] uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-blue-900/40 hover:bg-blue-500 transition-all active:scale-95 flex items-center justify-center gap-3 group/btn"
              >
                Claim Free Pro Access
                <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
              </button>
            </div>
          </div>

        </div>

        {/* Support Footer */}
        <div className="mt-16 text-center">
            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.3em]">
                Powering the next generation of builders
            </p>
        </div>
      </div>
    </section>
  )
}

export default Pricing
