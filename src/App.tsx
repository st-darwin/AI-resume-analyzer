
import Auth from './sections/Auth'
import Home from './sections/Home'
import Upload from './sections/Upload'
import { Routes, Route } from "react-router-dom"
import { usePuterStore } from './lib/puter'
import { useEffect } from 'react'
import Resume from './sections/resume'
import History from './sections/History'
import ResumeBuilder from './sections/ResumeBuilder'
import AIResumeBuilder from './sections/AIResumeBuilder'
import Dashboard from './sections/Dashboard'
import Logout from './sections/Logout'
//import ProtectedRoute from './components/ProtectedRoute'
//import CareerMap from './components/CareerMap'

const App = () => {
  const init = usePuterStore((state) => state.init)
  useEffect(
    ()=>{
   init()
    } , [init]
  )
  return (
  
<Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<Upload />} />
      <Route path='/Auth' element={<Auth />}/>
      <Route path="/resume/:id" element={<Resume />} />
      <Route path='/History' element={<History /> } />
      <Route path='/ResumeBuilder' element={<ResumeBuilder />} />

      
      <Route path='/AIResumeBuilder' element={<AIResumeBuilder />} />
      <Route path='/Dashboard' element={<Dashboard />} />
      <Route path='/logout' element={<Logout />} />

      
   
    </Routes>
  )
}

export default App

