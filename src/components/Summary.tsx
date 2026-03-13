import ScoreGauge from './ScoreGauge'
import ScoreBadge from './ScoreBadge'

const Category = ({ title, score }: { score: number, title: string }) => {
  const isHigh = score > 70;
  const isMid = score > 49;
  
  const accentColor = isHigh ? "bg-emerald-500" 
    : isMid ? "bg-amber-500" : "bg-rose-500";
    
  const textColor = isHigh ? "text-emerald-600" 
    : isMid ? "text-amber-600" : "text-rose-600";

  return (
    <div className='group relative bg-slate-50/50 border border-slate-200/60 rounded-2xl p-4 transition-all duration-300 hover:bg-white hover:shadow-md hover:border-slate-300'>
      <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-between'>
          <p className='text-[11px] font-black uppercase tracking-[0.15em] text-slate-400'>{title}</p>
          <ScoreBadge score={score} />
        </div>
        
        <div className='flex items-end justify-between gap-4'>
          <div className='flex flex-col gap-1 w-full'>
            <span className={`text-xl font-black tabular-nums tracking-tight ${textColor}`}>
              {score}<span className='text-[10px] ml-0.5 opacity-70'>%</span>
            </span>
            {/* Minimalist Progress Bar */}
            <div className='h-1 w-full bg-slate-200 rounded-full overflow-hidden'>
              <div 
                className={`h-full ${accentColor} transition-all duration-1000 ease-out`} 
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className='w-full'>
      {/* Top Section: Hero Score */}
      <div className='flex flex-col items-center mb-10'>
        <div className='relative p-4 mb-4'>
            {/* Decorative background rings for the Gauge */}
            <div className="absolute inset-0 rounded-full border border-dashed border-slate-200 animate-[spin_20s_linear_infinite]" />
            <div className="relative z-10">
                <ScoreGauge score={feedback.overallScore} />
            </div>
        </div>

        <div className='text-center space-y-1'>
          <h2 className='text-xl font-black text-slate-900 tracking-tight'>Neural Quality Index</h2>
          <p className='text-[11px] font-bold text-slate-400 uppercase tracking-widest'>
            Aggregated from 4 core metadata nodes
          </p>
        </div>
      </div>

      {/* Grid Section: Category Modules */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        <Category title='Tone & Style' score={feedback.toneAndStyle.score} />
        <Category title='Content Integrity' score={feedback.content.score} />
        <Category title='Data Structure' score={feedback.structure.score} />
        <Category title='Skill Density' score={feedback.skills.score} />
      </div>
      
      {/* Bottom Footer Info */}
      <div className='mt-6 pt-6 border-t border-slate-100 flex items-center justify-center gap-2'>
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
        <span className='text-[10px] font-bold text-slate-400 uppercase tracking-tighter'>
          Analysis calibrated to modern tech standards
        </span>
      </div>
    </div>
  )
}

export default Summary
