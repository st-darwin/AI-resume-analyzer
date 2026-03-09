
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
     <nav className='navbar w-[93%]'>
    <Link to="/" > <p className='text-2xl font-bold text-gradient'>NexaCV</p></Link>
    <Link to="upload" className='primary-button w-fit '>Upload Resume</Link>
     </nav>
  )
}

export default Navbar
