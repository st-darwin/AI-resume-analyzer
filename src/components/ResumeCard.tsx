import { Link } from 'react-router-dom'
import ScoreCircle from './ScoreCircle'

const ResumeCard = ({ resume }: { resume: Resume }) => {
  return (
    <Link 
      to={`/`}
      className="group relative flex flex-col h-[480px] w-full p-5 rounded-[2.5rem] bg-white border border-slate-200/80 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/5 hover:-translate-y-2"
    >
      {/* 1. Header Area: Clean & Sharp */}
      <div className="relative z-10 flex flex-row justify-between items-start gap-2 mb-4">
        <div className="flex flex-col overflow-hidden">
          <h3 className="text-lg font-semibold text-slate-900 tracking-tight truncate group-hover:text-blue-600 transition-colors duration-300">
            {resume.companyName}
          </h3>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider truncate mt-0.5">
            {resume.jobTitle}
          </p>
        </div>
        
        {/* Score Pop */}
        <div className="relative flex-shrink-0 scale-90 group-hover:scale-100 transition-transform duration-300">
            <ScoreCircle score={resume.feedback.overallScore} />
        </div>
      </div>

      {/* 2. Main Image: The "Focus" Piece */}
      <div className="relative z-10 flex-grow rounded-[1.8rem] overflow-hidden bg-slate-50 border border-slate-100 shadow-inner">
        <img 
          src={resume.imagePath} 
          alt="Preview" 
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Floating "Quick View" Overlay */}
        <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
             <div className="px-4 py-2 bg-white rounded-full text-[11px] font-semibold text-slate-900 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
               Open Analysis
             </div>
        </div>
      </div>
      
      {/* 3. Footer: Interaction Details */}
      <div className="relative z-10 flex items-center justify-between pt-4 px-1">
        <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Ready</span>
            </div>
            <p className="text-[11px] font-mono text-slate-400 mt-0.5">ID: {resume.id.slice(0, 8)}</p>
        </div>
        
        <div className="h-10 w-10 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-200/60 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300">
            <svg 
              className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
        </div>
      </div>
    </Link>
  )
}

export default ResumeCard