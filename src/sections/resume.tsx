import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { usePuterStore } from '../lib/puter'
import Summary from '../components/Summary'
import ATS from '../components/ATS'
import Details from '../components/Details'
import Navbar from '../components/Navbar'

const Resume = () => {
  const { id } = useParams()
  const { isLoading, auth, kv } = usePuterStore()
  const [resumeUrl, setResumeUrl] = useState<string | undefined>()
  const [feedback, setFeedback] = useState<Feedback | null>(null) // Typed as 'any' or your Feedback type
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate(`/auth?next=/resume/${id}`)
    }
  }, [isLoading, auth.isAuthenticated, id, navigate])

  useEffect(() => {
    if (isLoading || !auth.isAuthenticated || !id) return;

    const loadResume = async () => {
      try {
        const resumeDataString = await kv.get(`resume:${id}`);
        if (!resumeDataString) return;
        
        const data = JSON.parse(resumeDataString);

        if (data.resumePath && typeof data.resumePath === 'string') {
          // If you still need the resume blob for downloading or external links, 
          // you can keep fs.read if fs is imported from usePuterStore, 
          // otherwise remove fs if unused.
        }

        setFeedback(data.feedback);
      } catch (err) {
        console.error("Resume Load Error:", err);
      }
    }

    loadResume();

    return () => {
      if (resumeUrl) URL.revokeObjectURL(resumeUrl);
    }
  }, [id, auth.isAuthenticated, isLoading, resumeUrl, kv]);

  return (
    <main className='bg-slate-50 min-h-screen selection:bg-indigo-500/30 selection:text-indigo-950'>
      <div className='sticky top-0 z-50'>
        <Navbar />
      </div>

      <div className='flex flex-col w-full min-h-screen pt-24 lg:pt-20'>
        
        {/* FULL WIDTH: Feedback Control Panel */}
        <section className='w-full p-6 lg:p-12 xl:p-16 z-10'>
          <div className='max-w-4xl mx-auto'>
            
            {/* Header */}
            <div className='mb-12'>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-[2px] w-6 bg-indigo-600 rounded-full" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600">Scan Complete</span>
              </div>
              <h2 className='text-3xl lg:text-4xl font-[1000] tracking-tight text-slate-900 mb-2'>
                Resume Analysis
              </h2>
              <p className='text-slate-500 font-medium'>Neural feedback generated for your document.</p>
            </div>

            {feedback ? (
              <div className='flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700'>
                
                {/* Summary Section */}
                <div className='group relative overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white p-8 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:border-indigo-200/80 transition-all duration-500'>
                  <div className='flex items-center gap-5 mb-8'>
                    <div className='w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-inner'>
                      <svg className='w-6 h-6 fill-current' viewBox='0 0 24 24'>
                        <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                      </svg>
                    </div>
                    <div>
                        <h3 className='text-lg font-black text-slate-900 tracking-tight leading-none mb-1'>Executive Summary</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Overview Data</p>
                    </div>
                  </div>
                  <div className="text-slate-600 leading-relaxed">
                    <Summary feedback={feedback}/>
                  </div>
                </div>

                {/* ATS Score Section */}
                <div className='group relative overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white p-8 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:border-emerald-200/80 transition-all duration-500'>
                  <div className='flex items-center gap-5 mb-8'>
                    <div className='w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-inner'>
                      <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                      </svg>
                    </div>
                    <div>
                        <h3 className='text-lg font-black text-slate-900 tracking-tight leading-none mb-1'>ATS Compatibility</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Parsing Metrics</p>
                    </div>
                  </div>
                  <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                </div>

                {/* Details Section */}
                <div className='group relative overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white p-8 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:border-purple-200/80 transition-all duration-500'>
                  <div className='flex items-center gap-5 mb-8'>
                    <div className='w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-inner'>
                      <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                      </svg>
                    </div>
                    <div>
                        <h3 className='text-lg font-black text-slate-900 tracking-tight leading-none mb-1'>Optimization Details</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Actionable Tips</p>
                    </div>
                  </div>
                  <Details feedback={feedback}/>
                </div>

              </div>
            ) : (
              /* Loading State */
              <div className='flex flex-col items-center justify-center py-20 rounded-[2rem] border border-slate-200/50 bg-slate-50/50 relative overflow-hidden'>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent -translate-y-full animate-[shimmer_2s_infinite]" />
                
                <div className="relative z-10 flex flex-col items-center">
                    <img src="/images/resume-scan-2.gif" alt="Analyzing..." className='w-32 h-32 object-contain mb-8 mix-blend-multiply opacity-80' />
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        <p className="text-base font-black text-slate-900 tracking-tight">Extracting Metrics...</p>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Please stand by</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateY(100%); }
        }
      `}</style>
    </main>
  )
}

export default Resume