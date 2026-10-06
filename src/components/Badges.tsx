const Badges = () => {
  const badgeData = [
    {
      label: "Advanced Logic",
      title: "Brilliant ATS Analysis",
      description: "Deep-scans syntax, layout matrices, and recruiter keywords to beat automated gates.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bg: "bg-blue-50/60",
      text: "text-blue-600",
      border: "hover:border-blue-200"
    },
    {
      label: "Neural Engine",
      title: "AI Powered Feedback",
      description: "Actionable critique trained on top-tier hiring standards to polish your impact.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      bg: "bg-indigo-50/60",
      text: "text-indigo-600",
      border: "hover:border-indigo-200"
    },
    {
      label: "Instant",
      title: "Lightning Fast Scan",
      description: "Get comprehensive optimization reports and match scores in under five seconds.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bg: "bg-emerald-50/60",
      text: "text-emerald-600",
      border: "hover:border-emerald-200"
    },
    {
      label: "Secure",
      title: "Total Data Privacy",
      description: "Your career documents are encrypted end-to-end and never sold or shared.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      bg: "bg-amber-50/60",
      text: "text-amber-600",
      border: "hover:border-amber-200"
    }
  ];

  return (
    <section className="py-20 px-6 relative">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badgeData.map((badge, index) => (
            <div
              key={index}
              className={`group p-6 bg-white/70 backdrop-blur-sm border border-slate-200/60 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-slate-900/5 ${badge.border}`}
            >
              <div className="flex flex-col items-start gap-4">
                {/* Icon Box */}
                <div className={`w-12 h-12 rounded-2xl ${badge.bg} flex items-center justify-center ${badge.text} transition-transform duration-300 group-hover:scale-105`}>
                  {badge.icon}
                </div>

                <div className="space-y-1.5">
                  <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${badge.text}`}>
                    {badge.label}
                  </p>
                  <h3 className="text-lg font-semibold text-slate-900 tracking-tight">
                    {badge.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium pt-0.5 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Badges;