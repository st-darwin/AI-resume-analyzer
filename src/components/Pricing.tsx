
import { useNavigate } from 'react-router-dom'

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <section className="py-32 px-6 bg-[#FDFDFD] relative">
      <div className="container mx-auto max-w-5xl">
        
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight">
            Simple, <span className="text-blue-600">Transparent</span> Pricing.
          </h2>
          <p className="text-slate-500 font-medium text-lg italic">
            Start for free, upgrade when you're ready to dominate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* --- FREE TIER --- */}
          <div className="p-10 bg-white border border-slate-100 rounded-[3rem] shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="mb-8">
              <h3 className="text-2xl font-black text-slate-900 mb-2">Basic</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-slate-900">$0</span>
                <span className="text-slate-400 font-bold uppercase text-xs tracking-widest">/ month</span>
              </div>
            </div>

            <ul className="space-y-5 mb-10">
              {['3 Resume Scans / week', 'Standard ATS Analysis', 'Minimalist Free Templates', 'Basic AI Feedback'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                  {feature}
                </li>
              ))}
            </ul>

            <button 
              onClick={() => navigate('/auth')}
              className="w-full py-5 border-2 border-slate-100 text-slate-900 font-black rounded-2xl hover:bg-slate-50 transition-all active:scale-95"
            >
              Get Started
            </button>
          </div>

          {/* --- PRO TIER (THE DOPE ONE) --- */}
          <div className="relative p-10 bg-slate-900 rounded-[3.5rem] shadow-2xl shadow-blue-200 group overflow-hidden">
            {/* Background Accent */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity" />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest mb-4 inline-block shadow-lg shadow-blue-500/40">
                    Most Popular
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">Pro</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black text-white">$12</span>
                    <span className="text-slate-400 font-bold uppercase text-xs tracking-widest">/ month</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-5 mb-10">
                {[
                  'Unlimited AI Scans',
                  'Deep Neural Feedback',
                  'All Dope Pro Templates',
                  'Priority AI Processing',
                  'Advanced Keyword Injection'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => navigate('/upgrade')}
                className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-900/20 hover:bg-blue-500 transition-all active:scale-95 flex items-center justify-center gap-2 group/btn"
              >
                Go Pro Now
                <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Pricing
