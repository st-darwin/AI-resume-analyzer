
import Navbar from '../components/Navbar'
import ResumeCard from '../components/ResumeCard'
import { resumes } from '../constants'
import { usePuterStore } from '../lib/puter'

import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const Home = () => {
const {auth} = usePuterStore()
const navigate = useNavigate()

  useEffect(()=>{
   if(!auth.isAuthenticated) navigate("/auth?next=/")

  } , [auth.isAuthenticated])

  return (
  

      <main className='bg-[url("/images/bg-main.svg")] bg-cover'>
        <Navbar/>
        <section className='main-section' >
            <div className='page-heading py-4'>
                <h1>Track Your Appplications & Resume Ratings.</h1>
                <h2>Review your submissions and Check AI-powered Feedback.</h2>
            </div>

             
       
         {resumes.length > 0 && (
            <div className='resumes-section'>
                    {resumes.map((resume) =>(
                        <ResumeCard key={resume.id} resume={resume}/>
                    ))}
            </div>
         )}
           </section>
       
      </main>
  )
}

export default Home
