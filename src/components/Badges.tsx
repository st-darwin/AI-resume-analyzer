

const Badges = () => {
  const badgeData = [
    {
      label: "Advanced Logic",
      title: "Brilliant ATS Analysis",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "blue",
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "hover:border-blue-300",
      shadow: "hover:shadow-blue-500/10",
      iconBg: "group-hover:bg-blue-600"
    },
    {
      label: "Neural Engine",
      title: "AI Powered Feedback",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: "indigo",
      bg: "bg-indigo-50",
      text: "text-indigo-600",
      border: "hover:border-indigo-300",
      shadow: "hover:shadow-indigo-500/10",
      iconBg: "group-hover:bg-indigo-600"
    },
    {
      label: "Instant",
      title: "Lightning Fast Scan",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "emerald",
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      border: "hover:border-emerald-300",
      shadow: "hover:shadow-emerald-500/10",
      iconBg: "group-hover:bg-emerald-600"
    },
    {
      label: "Secure",
      title: "Total Data Privacy",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      color: "amber",
      bg: "bg-amber-50",
      text: "text-amber-600",
      border: "hover:border-amber-300",
      shadow: "hover:shadow-amber-500/10",
      iconBg: "group-hover:bg-amber-600"
    }
  ];

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badgeData.map((badge, index) => (
            <div
              key={index}
              className={`group relative p-8 bg-white border border-slate-200/60 rounded-[2.5rem] transition-all duration-500 cursor-default hover:-translate-y-2 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.03)] ${badge.border} ${badge.shadow} hover:shadow-2xl`}
            >
              {/* Background Glow Effect on Hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 rounded-[2.5rem] ${badge.bg}`} />

              <div className="relative flex flex-col items-start gap-6">
                {/* Bigger Icon Container */}
                <div className={`w-16 h-16 rounded-[1.25rem] ${badge.bg} flex items-center justify-center ${badge.text} ${badge.iconBg} group-hover:text-white group-hover:rotate-[10deg] transition-all duration-500 shadow-sm`}>
                  {badge.icon}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${badge.text.replace('text', 'bg')}`} />
                    <p className={`text-[11px] font-black uppercase tracking-[0.2em] ${badge.text}`}>
                      {badge.label}
                    </p>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 leading-tight">
                    {badge.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-500 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    Propelling your career with precision tech.
                  </p>
                </div>
              </div>

              {/* Decorative Corner Accent */}
              <div className={`absolute top-6 right-6 w-2 h-2 rounded-full opacity-20 group-hover:scale-[3] transition-transform duration-700 ${badge.text.replace('text', 'bg')}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


export default Badges
