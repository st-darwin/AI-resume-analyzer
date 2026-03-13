import  { useEffect, useRef, useState } from 'react'

export interface CareerStep {
  stage: string;
  role: string;
  status: 'completed' | 'current' | 'upcoming';
  skills: string[];
  salary: string;
  requirement?: string;
}

interface CareerMapProps {
  data: CareerStep[];
  isLoading: boolean;
}

const CareerMap = ({ data, isLoading }: CareerMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [data]);

  if (isLoading) {
    return (
      <div className="w-full h-[500px] flex flex-col items-center justify-center bg-slate-900/5 rounded-[3rem] border-2 border-dashed border-slate-200">
        <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <div className="absolute inset-0 bg-indigo-500/10 blur-xl rounded-full animate-pulse" />
        </div>
        <p className="mt-6 font-black text-slate-900 animate-pulse uppercase tracking-[0.3em] text-[10px]">Neural Path Calculation...</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full bg-white rounded-[3rem] p-8 md:p-16 border border-slate-200 relative overflow-hidden">
      <div className="relative z-10 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Trajectory Mapping</span>
        </div>
        <h2 className="text-5xl font-[1000] text-slate-900 tracking-tighter leading-none">Your Predicted Path</h2>
      </div>

      <div className="relative">
        {/* The Connection Line */}
        <svg className="absolute top-0 left-6 md:left-1/2 -translate-x-1/2 w-full h-full pointer-events-none" viewBox="0 0 100 600" preserveAspectRatio="none">
          <path 
            d="M50 0 V600" 
            stroke="#6366f1" 
            strokeWidth="2" 
            strokeDasharray="1000"
            strokeDashoffset={isVisible ? "0" : "1000"}
            className="transition-all duration-[2500ms] ease-in-out opacity-20"
          />
        </svg>

        <div className="space-y-32 relative z-10">
          {data.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col md:flex-row items-center gap-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: `${index * 300}ms` }}
            >
              {/* Left / Right Alternating Logic */}
              <div className={`flex-1 w-full md:text-right ${index % 2 !== 0 ? 'md:order-last md:text-left' : ''}`}>
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:border-indigo-500 transition-all group">
                  <span className="text-[9px] font-black uppercase tracking-widest text-indigo-500">{step.stage}</span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1 mb-4">{step.role}</h3>
                  <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                    {step.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-slate-50 text-slate-500 rounded-lg text-[10px] font-bold border border-slate-100 uppercase">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Central Orb */}
              <div className="relative shrink-0 w-12 h-12 flex items-center justify-center">
                <div className={`absolute inset-0 rounded-full blur-lg opacity-30 ${step.status === 'completed' ? 'bg-emerald-400' : 'bg-indigo-500'}`} />
                <div className={`w-4 h-4 rounded-full border-4 border-white z-10 shadow-lg ${step.status === 'completed' ? 'bg-emerald-500' : 'bg-indigo-500 animate-pulse'}`} />
              </div>

              <div className="flex-1 hidden md:block" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerMap;