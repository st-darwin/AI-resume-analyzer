import  { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { usePuterStore } from '../lib/puter'
import Summary from '../components/Summary'
import ATS from '../components/ATS'
import Details from '../components/Details'
import Navbar from '../components/Navbar'

const Resume = () => {
  const { id } = useParams()
  const { isLoading, auth, fs, kv } = usePuterStore()
  const [imageUrl, setImageUrl] = useState<string | undefined>()
  const [resumeUrl, setResumeUrl] = useState<string | undefined>()
  const [feedback, setFeedback] = useState<Feedback | null>(null) // Typed as 'any' or your Feedback type
  const [imageLoaded, setImageLoaded] = useState(false) // NEW: Image loading state
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
          const resumeBlob = await fs.read(data.resumePath);
          if (resumeBlob) {
            const pdfUrl = URL.createObjectURL(new Blob([resumeBlob], { type: 'application/pdf' }));
            setResumeUrl(pdfUrl);
          }
        }

        if (data.imagePath && typeof data.imagePath === 'string') {
          const imageBlob = await fs.read(data.imagePath);
          if (imageBlob) {
            const imgUrl = URL.createObjectURL(new Blob([imageBlob], { type: 'image/png' }));
            setImageUrl(imgUrl);
          }
        }

        setFeedback(data.feedback);
      } catch (err) {
        console.error("Resume Load Error:", err);
      }
    }

    loadResume();

    return () => {
      if (resumeUrl) URL.revokeObjectURL(resumeUrl);
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    }
  }, [id, auth.isAuthenticated, isLoading, imageUrl, resumeUrl, fs, kv]);

  return (
    <main className='bg-slate-50 min-h-screen selection:bg-indigo-500/30 selection:text-indigo-900'>
      <div className='sticky top-0 z-50'>
        <Navbar />
      </div>

      <div className='flex flex-col lg:flex-row w-full min-h-screen pt-24 lg:pt-20'>
        
        {/* LEFT SIDE: Technical Canvas & Preview */}
        <section className="hidden lg:flex w-1/2 p-8 items-start justify-center pt-12 sticky top-20 h-[calc(100vh-5rem)] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]">
          {imageUrl && resumeUrl ? (
            <a href={resumeUrl} target='_blank' rel="noreferrer" className='w-full max-w-md outline-none group'>
              <div className='relative rounded-[2rem] p-3 bg-white/60 backdrop-blur-md border border-slate-200/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] group-hover:shadow-[0_30px_60px_-15px_rgba(79,70,229,0.15)] transition-all duration-700 ease-out'>
                
                {/* Image Container */}
                <div className='relative rounded-[1.5rem] overflow-hidden bg-white shadow-inner border border-slate-100 min-h-[400px] flex items-center justify-center'>
                  
                  {/* NEW: Smooth Image Loader */}
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-10">
                      <div className="relative w-12 h-12 flex items-center justify-center mb-4">
                        <div className="absolute inset-0 border-2 border-indigo-100 rounded-full animate-[spin_3s_linear_infinite]" />
                        <div className="absolute w-8 h-8 border-t-2 border-indigo-500 rounded-full animate-spin" />
                        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Rendering Canvas</span>
                    </div>
                  )}

                  <img 
                    src={imageUrl} 
                    alt="Resume Preview" 
                    onLoad={() => setImageLoaded(true)}
                    className={`w-full h-auto object-contain transition-all duration-700 ease-out ${
                      imageLoaded ? 'opacity-100 group-hover:scale-[1.02]' : 'opacity-0 scale-95'
                    }`} 
                  />
                  
                  {/* Glassmorphism Hover Overlay */}
                  <div className='absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center z-20'>
                    <div className='bg-white px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out'>
                      <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                      <span className='text-sm font-black tracking-widest uppercase text-slate-900'>Access PDF</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ) : (
            /* Futuristic Loading Skeleton */
            <div className='w-full max-w-md aspect-[1/1.4] rounded-[2rem] bg-white/40 backdrop-blur-sm border border-slate-200/50 shadow-sm p-3 flex flex-col gap-4 relative overflow-hidden'>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent -translate-y-full animate-[shimmer_2s_infinite]" />
              <div className="w-full h-full rounded-[1.5rem] bg-slate-100/50 border border-slate-100 flex items-center justify-center">
                 <div className="flex flex-col items-center gap-3 opacity-50">
                    <svg className='w-8 h-8 text-slate-400 animate-pulse' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z' />
                    </svg>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading Node</span>
                 </div>
              </div>
            </div>
          )}
        </section>

        {/* Mobile Preview Area */}
        <section className="lg:hidden w-full px-4 py-8 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]">
          {imageUrl && resumeUrl ? (
            <a href={resumeUrl} target='_blank' rel="noreferrer" className='block w-full max-w-sm mx-auto group'>
              <div className='relative rounded-3xl p-2 bg-white/60 backdrop-blur-md border border-slate-200/50 shadow-lg'>
                <div className='relative rounded-2xl overflow-hidden bg-white border border-slate-100 min-h-[300px] flex items-center justify-center'>
                  
                  {/* NEW: Mobile Image Loader */}
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-50 z-10">
                       <div className="w-6 h-6 border-t-2 border-indigo-500 rounded-full animate-spin" />
                    </div>
                  )}

                  <img 
                    src={imageUrl} 
                    alt="Preview" 
                    onLoad={() => setImageLoaded(true)}
                    className={`w-full h-auto object-contain transition-opacity duration-500 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`} 
                  />
                </div>
              </div>
            </a>
          ) : (
             <div className='w-full max-w-sm mx-auto aspect-[1/1.4] rounded-3xl bg-slate-200/50 animate-pulse' />
          )}
        </section>

        {/* RIGHT SIDE: Feedback Control Panel */}
        <section className='w-full lg:w-1/2 p-6 lg:p-12 xl:p-16 bg-white border-l border-slate-200/50 shadow-[-20px_0_40px_-15px_rgba(0,0,0,0.02)] z-10'>
          <div className='max-w-2xl mx-auto'>
            
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
              /* Loading State for Right Side */
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
