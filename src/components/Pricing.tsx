import { useNavigate } from 'react-router-dom'

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <section className="py-28 px-6 bg-[#FAFAFA] relative overflow-hidden border-t border-slate-100">
      <div className="container mx-auto max-w-5xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-semibold uppercase tracking-widest mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Limited Time Community Offer
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight leading-tight">
            Pro Access, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Zero Cost.</span>
          </h2>
          <p className="text-slate-500 font-medium text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            We're opening up our deep neural analysis tools to the community for free. No credit card, no gatekeeping.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* --- BASIC TIER --- */}
          <div className="flex flex-col justify-between p-8 bg-white border border-slate-200/80 rounded-[2.5rem] shadow-sm transition-all duration-300 hover:shadow-md">
            <div>
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Standard</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-semibold text-slate-900">$0</span>
                  <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-widest">/ forever</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {['3 Resume Scans / week', 'Standard ATS Analysis', 'Essential Templates', 'Basic AI Feedback'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                    <div className="p-1 rounded-full bg-slate-50 border border-slate-200/60 text-slate-400">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button 
              onClick={() => navigate('/ResumeBuilder')}
              className="cursor-pointer w-full py-3.5 bg-slate-50 border border-slate-200/80 text-slate-900 font-semibold text-sm rounded-2xl hover:bg-slate-100 transition-all active:scale-95"
            >
              Start Basic
            </button>
          </div>

          {/* --- PRO TIER (NOW FREE) --- */}
          <div className="relative flex flex-col justify-between p-8 bg-white border border-blue-200 rounded-[2.5rem] shadow-xl shadow-blue-500/5 group overflow-hidden">
            {/* Soft Ambient Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50 rounded-full blur-3xl pointer-events-none -z-0" />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[9px] font-semibold uppercase tracking-widest mb-3 inline-block">
                    Neural Full Access
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Pro Edition</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-semibold text-slate-900">$0</span>
                    <div className="flex flex-col">
                        <span className="text-slate-400 font-medium line-through text-xs">$6.99</span>
                        <span className="text-blue-600 font-semibold uppercase text-[9px] tracking-wider leading-none mt-0.5">Community Gift</span>
                    </div>
                  </div>
                </div>
              </div>

              <ul className="grid grid-cols-1 gap-3.5 mb-8">
                {[
                  'Unlimited AI Scans',
                  'Deep Neural Feedback',
                  'All NexaCV Pro Templates',
                  'Unlimited AI Generations',
                  'Keyword Injection Engine',
                  'Priority Parsing Support'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                    <div className="p-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative z-10">
              <button 
                onClick={() => navigate('/AIResumeBuilder')}
                className="cursor-pointer w-full py-3.5 bg-blue-600 text-white font-semibold text-xs uppercase tracking-wider rounded-2xl shadow-sm hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-2 group/btn"
              >
                Claim Free Pro Access
                <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
              </button>
            </div>
          </div>

        </div>

        {/* Support Footer */}
        <div className="mt-12 text-center">
            <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-[0.2em]">
                Powering the next generation of builders
            </p>
        </div>
      </div>
    </section>
  )
}

export default Pricing