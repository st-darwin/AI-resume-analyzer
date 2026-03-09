import  { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { usePuterStore } from '../lib/puter'
import Summary from '../components/Summary'
import ATS from '../components/ATS'
import Details from '../components/Details'

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
    <main className='!pt-0'>
  <nav className='fixed top-0 inset-x-0 z-[100] h-16 bg-white/80 backdrop-blur-2xl border-b border-black/[0.04] flex justify-between items-center px-8 transition-all duration-300'>
  
  {/* nav bar */}
  <Link to="/" className='flex items-center gap-4 group'>
    <div className='w-8 h-8 rounded-full border border-black/10 flex items-center justify-center transition-all duration-500 group-hover:-rotate-45 group-hover:bg-black'>
       <img src="/icons/back.svg" alt="back" className='w-2.5 h-2.5 opacity-60 group-hover:invert group-hover:opacity-100 transition-all duration-500' />
    </div>
    <span className='text-[11px] font-semibold uppercase tracking-[0.2em] text-black'>
      Nexa<span className='text-black/40'>CV</span>
    </span>
  </Link>

  {/* Right Side: Status Indicator */}
  <div className='flex items-center gap-3'>
      <div className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5F5F7] border border-black/[0.02] shadow-sm'>
          <div className='w-1.5 h-1.5 rounded-full bg-black animate-pulse' />
          <span className='text-[10px] font-semibold uppercase tracking-widest text-black/60 mt-[1px]'>System Active</span>
      </div>
  </div>

</nav>
{/* end of nav bar */}



      <div className='flex flex-row w-full max-lg:flex-col-reverse min-h-screen'>
        {/* Left Side: Sticky Preview */}
        <section className="feedback-section w-1/2 p-2 flex items-center justify-center sticky top-0 h-screen max-lg:relative max-lg:h-fit max-lg:w-full">
          {imageUrl && resumeUrl ? (
            <div className='animate-in fade-in zoom-in duration-700 h-[85vh] shadow-2xl rounded-2xl overflow-hidden border border-gray-200'>
              <a href={resumeUrl} target='_blank' rel="noreferrer">
                <img src={imageUrl} alt="Resume Preview" className='w-full h-full object-contain bg-white' title='View PDF' />
              </a>
            </div>
          ) : (
            <div className="animate-pulse bg-gray-200 h-[80vh] w-[60%] rounded-2xl" />
          )}
        </section>

        {/* Right Side: Feedback Content */}
        <section className='w-1/2 p-10 max-lg:w-full bg-white xl:mt-14'>
          <h2 className='text-4xl font-bold text-gray-900 mb-8'>Resume Review</h2>
          {feedback ? (
           <div className='flex flex-col gap-8 animate-in fade-in  duration-1000'>
                Summary ATS Details
                <Summary feedback={feedback}/>
                <ATS score ={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                <Details feedback={feedback}/>
           </div>
          ) : (
            <div className="flex flex-col items-center">
              <img src="/images/resume-scan-2.gif" alt="Analyzing..." className='w-64' />
              <p className="text-gray-500 font-medium">AI is crafting your feedback...</p>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default Resume
