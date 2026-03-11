import { Link } from 'react-router-dom'
import ScoreCircle from './ScoreCircle'

const ResumeCard = ({ resume }: { resume: Resume }) => {
  return (
    <Link 
      to={`/resume/${resume.id}`}
      className="group relative flex flex-col h-[480px] w-full p-5 rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 hover:shadow-[0_30px_60px_-20px_rgba(96,107,235,0.3)] hover:-translate-y-3"
    >
      {/* Background Gradient Glow (Behind Card) */}
      <div className="absolute -inset-1 bg-gradient-to-br from-[#606beb] to-fuchsia-500 rounded-[2.6rem] opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500" />

      {/* 1. Header Area: Clean & Sharp */}
      <div className="relative z-10 flex flex-row justify-between items-start gap-2 mb-4">
        <div className="flex flex-col overflow-hidden">
          <h2 className="text-xl font-black text-slate-900 tracking-tight truncate group-hover:text-[#606beb] transition-colors duration-300">
            {resume.companyName}
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] truncate">
            {resume.jobTitle}
          </p>
        </div>
        
        {/* Score Pop - Smaller for Grid scaling */}
        <div className="relative flex-shrink-0 scale-90 group-hover:scale-100 transition-transform duration-500">
            <div className="absolute inset-0 bg-[#606beb]/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <ScoreCircle score={resume.feedback.overallScore} />
        </div>
      </div>

      {/* 2. Main Image: The "Focus" Piece */}
      <div className="relative z-10 flex-grow rounded-[1.8rem] overflow-hidden bg-slate-50 border border-slate-100 shadow-inner">
        <img 
          src={resume.imagePath} 
          alt="Preview" 
          className="w-full h-full object-cover object-top transition-transform duration-[1.5s] ease-out group-hover:scale-110"
        />
        
        {/* Floating "Quick View" Overlay */}
        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
             <div className="px-5 py-2 bg-white rounded-full text-[11px] font-black text-black transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                OPEN ANALYSIS
             </div>
        </div>
      </div>
      
      {/* 3. Footer: Interaction Details */}
      <div className="relative z-10 flex items-center justify-between pt-4 px-1">
        <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#606beb] animate-pulse" />
                <p className="text-[9px] font-black text-slate-400 tracking-[0.1em] uppercase">Ready</p>
            </div>
            <p className="text-[11px] font-mono font-medium text-slate-500">ID: {resume.id.slice(0, 8)}</p>
        </div>
        
        <div className="h-10 w-10 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-[#606beb] group-hover:border-[#606beb] transition-all duration-300">
            <svg 
              className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
        </div>
      </div>

      {/* Internal Glass Stroke (Adds depth) */}
      <div className="absolute inset-0 rounded-[2.5rem] border border-white opacity-50 pointer-events-none" />
    </Link>
  )
}

export default ResumeCard
