import { Link } from 'react-router-dom'
import ScoreCircle from './ScoreCircle'

const ResumeCard = ({ resume }: { resume: Resume }) => {
  return (
    <Link 
      className="resume-card group animate-in fade-in slide-in-from-bottom-6 duration-1000 my-1" 
      to={`/resume/${resume.id}`}
    >
      {/* Header Area */}
      <div className="flex flex-row justify-between items-start gap-4 min-h-[90px]">
        <div className="flex flex-col gap-1 overflow-hidden">
          <h2 className="!text-black font-extrabold text-2xl md:text-3xl tracking-tight truncate group-hover:text-[#606beb] transition-colors duration-300">
            {resume.companyName}
          </h2>
          <h3 className="text-base md:text-lg font-medium text-gray-400 truncate uppercase tracking-wider">
            {resume.jobTitle}
          </h3>
        </div>
        
        {/* Score Pop Effect */}
        <div className="flex-shrink-0 transform transition-all duration-500 group-hover:scale-103 group-hover:rotate-2">
          <ScoreCircle score={resume.feedback.overallScore} />
        </div>
      </div>

      {/* Main Content Area (The Image) */}
      <div className="gradient-border flex-grow shadow-inner">
        <div className="h-full w-full rounded-[1.4rem] overflow-hidden bg-white">
          <img 
            src={resume.imagePath} 
            alt="Resume Preview" 
            className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          
          {/* Subtle light overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>
      
      {/* Interactive Footer (Dope Detail) */}
      <div className="flex items-center justify-between pt-2">
        <p className="text-[10px] font-mono text-gray-300 uppercase">Analysis Complete</p>
        <span className="text-sm font-bold text-[#8E97C5] translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
          DETAILS →
        </span>
      </div>
    </Link>
  )
}

export default ResumeCard