import React from 'react'

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  const isHigh = score > 69;
  const isMid = score > 49;

  const statusColor = isHigh ? 'text-emerald-500' : isMid ? 'text-amber-500' : 'text-rose-500';
  const statusBg = isHigh ? 'bg-emerald-500' : isMid ? 'bg-amber-500' : 'bg-rose-500';
  const statusLabel = isHigh ? 'Optimal' : isMid ? 'Moderate' : 'Critical';

  return (
    <div className="w-full space-y-8">
      {/* Top ATS Scorecard */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 sm:p-8 transition-all duration-300 hover:shadow-md hover:bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${statusBg} animate-pulse`} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">System Compatibility</span>
            </div>
            <h2 className="text-4xl font-[1000] text-slate-900 tracking-tight">
              {score}<span className="text-lg font-bold text-slate-400">/100</span>
            </h2>
          </div>

          <div className="w-full sm:w-72">
            <div className="flex justify-between items-end mb-2">
              <span className={`text-xs font-black uppercase tracking-widest ${statusColor}`}>
                {statusLabel}
              </span>
              <span className="text-[10px] font-bold text-slate-400">Parsing Accuracy</span>
            </div>
            <div className="h-2.5 w-full bg-slate-200/80 rounded-full overflow-hidden">
              <div 
                className={`h-full ${statusBg} transition-all duration-1000 ease-out`} 
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Suggestion list */}
      <div className="grid grid-cols-1 gap-3">
        {suggestions.map((suggestion, index) => (
          <div 
            key={index} 
            className={`group flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 ${
              suggestion.type === "good" 
                ? "bg-emerald-50/20 border-emerald-100 hover:border-emerald-200" 
                : "bg-amber-50/20 border-amber-100 hover:border-amber-200"
            }`}
          >
            <div className={`mt-0.5 p-2 rounded-xl shrink-0 ${
              suggestion.type === "good" ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
            }`}>
              {suggestion.type === "good" ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              )}
            </div>
            
            <div className="space-y-1">
              <p className={`text-xs font-black uppercase tracking-wider ${
                suggestion.type === "good" ? "text-emerald-900" : "text-amber-900"
              }`}>
                {suggestion.type === "good" ? "Optimization Verified" : "Refinement Recommended"}
              </p>
              <p className={`text-sm leading-relaxed font-medium ${
                suggestion.type === "good" ? "text-emerald-700/90" : "text-amber-700/90"
              }`}>
                {suggestion.tip}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ATS