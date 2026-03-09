
import Auth from './sections/auth'
import Home from './sections/Home'
import Upload from './sections/Upload'
import { Routes, Route } from "react-router-dom"
import { usePuterStore } from './lib/puter'
import { useEffect } from 'react'
import Resume from './sections/resume'

const App = () => {
  const init = usePuterStore((state) => state.init)
  useEffect(
    ()=>{
   init()
    } , []
  )
  return (
  
<Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<Upload />} />
      <Route path='/Auth' element={<Auth />}/>
      <Route path="/resume/:id" element={<Resume />} />
      
   
    </Routes>
  )
}

export default App

