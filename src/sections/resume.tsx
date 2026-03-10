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
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const navigate = useNavigate()

  // 1. Auth Guard: Don't let the component try to fetch data if not logged in
  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate(`/auth?next=/resume/${id}`)
    }
  }, [isLoading, auth.isAuthenticated, id, navigate])

  useEffect(() => {
    // 2. Prevent execution if Puter isn't ready or ID is missing
    if (isLoading || !auth.isAuthenticated || !id) return;

    const loadResume = async () => {
      try {
        const resumeDataString = await kv.get(`resume:${id}`);
        if (!resumeDataString) return;
        

      

        const data = JSON.parse(resumeDataString);

        // 3. Robust File Reading: Ensure path is a file, not a directory
        if (data.resumePath && typeof data.resumePath === 'string') {
          const resumeBlob = await fs.read(data.resumePath);
          if (resumeBlob) {
            const pdfUrl = URL.createObjectURL(new Blob([resumeBlob], { type: 'application/pdf' }));
            setResumeUrl(pdfUrl);
          }
        }

        // 4. Image Reading with Safety Check
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

    // 5. Cleanup: Revoke URLs to prevent memory leaks
    return () => {
      if (resumeUrl) URL.revokeObjectURL(resumeUrl);
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    }
  }, [id, auth.isAuthenticated, isLoading , imageUrl , resumeUrl , fs , kv]);

  return (
    <main className='bg-white min-h-screen'>
      <div className='sticky top-0 z-50 bg-white border-b border-gray-200/50'>
        <Navbar />
      </div>

      <div className='flex flex-row w-full max-lg:flex-col min-h-screen pt-20'>
        {/* Left Side: Resume Preview - Sticky */}
        <section className="hidden lg:flex w-1/2 p-8 items-start justify-center pt-12 sticky top-20 h-fit">
          {imageUrl && resumeUrl ? (
            <a href={resumeUrl} target='_blank' rel="noreferrer" className='w-full max-w-sm'>
              <div className='relative group rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500 border border-gray-200/50'>
                <div className='relative bg-white'>
                  <img 
                    src={imageUrl} 
                    alt="Resume Preview" 
                    className='w-full h-auto object-contain group-hover:scale-105 transition-transform duration-700' 
                    title='Click to view full PDF' 
                  />
                </div>
                <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <div className='bg-white/95 px-4 py-2 rounded-lg flex items-center gap-2'>
                    <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
                    </svg>
                    <span className='text-sm font-semibold text-gray-800'>View PDF</span>
                  </div>
                </div>
              </div>
            </a>
          ) : (
            <div className='w-full max-w-sm h-96 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 animate-pulse flex items-center justify-center border border-gray-200/50'>
              <svg className='w-12 h-12 text-gray-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z' />
              </svg>
            </div>
          )}
        </section>

        {/* Mobile Resume Preview */}
        <section className="lg:hidden w-full p-6 py-8 bg-gray-50">
          {imageUrl && resumeUrl ? (
            <a href={resumeUrl} target='_blank' rel="noreferrer" className='w-full'>
              <div className='relative group rounded-lg overflow-hidden shadow-sm border border-gray-200'>
                <img 
                  src={imageUrl} 
                  alt="Resume Preview" 
                  className='w-full h-auto object-contain' 
                  title='Click to view full PDF' 
                />
              </div>
            </a>
          ) : (
            <div className='w-full h-64 rounded-lg bg-gray-200 animate-pulse'></div>
          )}
        </section>

        {/* Right Side: Feedback Content */}
        <section className='w-1/2 max-lg:w-full p-8 lg:p-12 bg-white'>
          <div className='max-w-3xl'>
            {/* Header */}
            <div className='mb-12'>
              <h2 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-2'>
                Resume Analysis
              </h2>
              <p className='text-gray-600'>Your comprehensive feedback to improve your resume</p>
            </div>

            {feedback ? (
              <div className='flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700'>
                {/* Summary Section */}
                <div className='  group rounded-lg border border-gray-200/50 p-8 hover:border-blue-300/50 hover:shadow-md transition-all duration-300 bg-white'>
                  <div className='flex items-center gap-3 mb-6'>
                    <div className='w-10 h-10 rounded-lg bg-blue-50'>
                      <svg className='w-6 h-6 text-blue-600 m-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                      </svg>
                    </div>
                    <h3 className='text-lg font-semibold text-gray-900'>Summary</h3>
                  </div>
                  <Summary feedback={feedback}/>
                </div>

                {/* ATS Score Section */}
                <div className='group rounded-lg border border-gray-200/50 p-8 hover:border-green-300/50 hover:shadow-md transition-all duration-300 bg-white'>
                  <div className='flex items-center gap-3 mb-6'>
                    <div className='w-10 h-10 rounded-lg bg-green-50'>
                      <svg className='w-6 h-6 text-green-600 m-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                      </svg>
                    </div>
                    <h3 className='text-lg font-semibold text-gray-900'>ATS Score</h3>
                  </div>
                  <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                </div>

                {/* Details Section */}
                <div className='group rounded-lg border border-gray-200/50 p-8 hover:border-purple-300/50 hover:shadow-md transition-all duration-300 bg-white'>
                  <div className='flex items-center gap-3 mb-6'>
                    <div className='w-10 h-10 rounded-lg bg-purple-50'>
                      <svg className='w-6 h-6 text-purple-600 m-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                      </svg>
                    </div>
                    <h3 className='text-lg font-semibold text-gray-900'>Details & Tips</h3>
                  </div>
                  <Details feedback={feedback}/>
                </div>
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center py-16 rounded-lg border border-gray-200/50 bg-gray-50'>
                <img src="/images/resume-scan-2.gif" alt="Analyzing..." className='w-40 h-40 object-contain mb-6' />
                <p className="text-base font-semibold text-gray-800 mb-1">Analyzing your resume...</p>
                <p className="text-sm text-gray-500">This usually takes a few seconds</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

export default Resume
