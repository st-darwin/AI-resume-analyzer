import ScoreGauge from './ScoreGauge'
import ScoreBadge from './ScoreBadge'

const Category = ({ title, score }: { score: number, title: string }) => {
  const isHigh = score > 70;
  const isMid = score > 49;
  
  const accentColor = isHigh ? "bg-emerald-500" : isMid ? "bg-amber-500" : "bg-rose-500";
  const textColor = isHigh ? "text-emerald-600" : isMid ? "text-amber-600" : "text-rose-600";

  return (
    <div className='group relative bg-slate-50/70 border border-slate-200/60 rounded-2xl p-5 transition-all duration-300 hover:bg-white hover:shadow-md hover:border-slate-300'>
      <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-between'>
          <p className='text-xs font-black uppercase tracking-wider text-slate-400'>{title}</p>
          <ScoreBadge score={score} />
        </div>
        
        <div className='flex items-end justify-between gap-4'>
          <div className='flex flex-col gap-1.5 w-full'>
            <span className={`text-2xl font-black tabular-nums tracking-tight ${textColor}`}>
              {score}<span className='text-xs ml-0.5 opacity-70'>%</span>
            </span>
            <div className='h-1.5 w-full bg-slate-200/80 rounded-full overflow-hidden'>
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
      {/* Hero Score Showcase */}
      <div className='flex flex-col items-center mb-10 pb-10 border-b border-slate-100'>
        <div className='relative p-4 mb-4'>
            <div className="absolute inset-0 rounded-full border border-dashed border-slate-200 animate-[spin_25s_linear_infinite]" />
            <div className="relative z-10">
                <ScoreGauge score={feedback.overallScore} />
            </div>
        </div>

        <div className='text-center space-y-1'>
          <h2 className='text-2xl font-black text-slate-900 tracking-tight'>Neural Quality Index</h2>
          <p className='text-xs font-bold text-slate-400 uppercase tracking-widest'>
            Aggregated from 4 core metadata analysis nodes
          </p>
        </div>
      </div>

      {/* Grid Categories */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <Category title='Tone & Style' score={feedback.toneAndStyle.score} />
        <Category title='Content Integrity' score={feedback.content.score} />
        <Category title='Data Structure' score={feedback.structure.score} />
        <Category title='Skill Density' score={feedback.skills.score} />
      </div>
      
      <div className='mt-8 pt-4 flex items-center justify-center gap-2 text-slate-400'>
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
        <span className='text-[10px] font-bold uppercase tracking-widest'>
          Analysis calibrated to modern tech & ATS standards
        </span>
      </div>
    </div>
  )
}

export default Summary