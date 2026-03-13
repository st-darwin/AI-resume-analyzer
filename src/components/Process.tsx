

const Process = ({ onOpenDemo } : { onOpenDemo: () => void }) => {
  const steps = [
    {
      number: "01",
      title: "Upload & Scan",
      description: "Drop your PDF or Doc. Our AI dissects your resume structure just like a top-tier ATS would.",
      color: "from-blue-600 to-blue-400"
    },
    {
      number: "02",
      title: "Get Intelligence",
      description: "Receive a detailed score and a breakdown of missing keywords, formatting errors, and impact gaps.",
      color: "from-indigo-600 to-indigo-400"
    },
    {
      number: "03",
      title: "Optimize & Land",
      description: "Apply the fixes, choose a dope minimalist template, and start sending out resumes that actually get read.",
      color: "from-slate-900 to-slate-700"
    }
  ];

  return (
    <section className="py-32 px-6 bg-[#FDFDFD]">
      <div className="container mx-auto max-w-7xl">
        
        {/* --- HEADER --- */}
        <div className="mb-24">
          <p className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4">The Blueprint</p>
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight">
            Three steps to <br /> 
            <span className="italic font-medium text-slate-400">career lift-off.</span>
          </h2>
        </div>

        {/* --- STEPS GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
          
          {/* Decorative Connector Line (Visible on Desktop) */}
          <div className="hidden lg:block absolute top-10 left-0 w-full h-px bg-slate-100 -z-0" />

          {steps.map((step, index) => (
            <div key={index} className="group relative z-10">
              {/* Step Number Circle */}
              <div className={`w-20 h-20 rounded-[2rem] bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-2xl font-black shadow-2xl shadow-blue-200 mb-8 group-hover:-translate-y-2 transition-transform duration-500`}>
                {step.number}
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed max-w-sm">
                  {step.description}
                </p>
              </div>

              {/* Subtle Pulse Accent */}
              <div className="absolute top-10 left-10 w-4 h-4 bg-white/20 rounded-full animate-ping pointer-events-none" />
            </div>
          ))}
        </div>

        {/* --- BOTTOM CALLOUT (CTA BAR) --- */}
        <div className="mt-24 p-12 bg-slate-50 rounded-[3rem] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-6">
              <div className="flex -space-x-4">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-50 bg-slate-200 flex items-center justify-center font-black text-[10px] text-slate-500 overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" className="w-full h-full object-cover grayscale" />
                   </div>
                 ))}
              </div>
              <div>
                <p className="font-black text-slate-900 leading-none">Join 500+ professionals</p>
                <p className="text-sm font-medium text-slate-500 mt-1">Already optimizing their reach.</p>
              </div>
           </div>

           <button 
              onClick={onOpenDemo}
              className="group flex items-center gap-4 px-8 py-4 bg-white border border-slate-200 rounded-2xl font-black hover:border-blue-600 hover:text-blue-600 transition-all active:scale-95 shadow-sm"
           >
              See Live Demo
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                 </svg>
              </div>
           </button>
        </div>
      </div>
    </section>
  )
}

export default Process