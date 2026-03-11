import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <nav className="flex m-auto rounded-full items-center justify-between px-6 py-3 w-[95%] z-[100]">
      {/* Logo */}
      <Link to="/" className="z-[110]">
        <p className="text-2xl font-bold text-gradient tracking-tighter">NexaCV</p>
      </Link>

  {/* Desktop Links */}
<div className="hidden md:flex items-center gap-10">
  {[
    { name: 'Upload Resume ❤️', path: '/Upload' },
    { name: 'History', path: '/History' },
     {name: 'Build Resume 🚀' , path : '/ResumeBuilder'},
    {name : 'Log Out ' , path : '/Auth'},
   
  ].map((link) => (
    <Link
      key={link.path}
      to={link.path}
      className="group relative py-2 text-sm font-semibold tracking-wide text-gray-600 transition-all duration-300 hover:-translate-y-0.5 "
    >
     
    {link.name}
     
     
      
      {/* The Dope Underline */}
      <span className="absolute bottom-0 left-0 h-[2px] w-full origin-center scale-x-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-transform duration-300 ease-out group-hover:scale-x-100 shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
    </Link>
  ))}
</div>

      {/* Mobile Toggle Button (The Hamburger) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex flex-col gap-1.5 z-[110] p-3 rounded-xl hover:scale-105 transition-all duration-300 group"
        aria-label="Toggle Menu"
      >
        <span className={`w-7 h-1 bg-black rounded-full transition-all duration-500 origin-center group-hover:shadow-md ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
        <span className={`w-7 h-1 bg-black rounded-full transition-all duration-500 origin-center group-hover:shadow-md ${isOpen ? 'opacity-0 scale-0' : ''}`} />
        <span className={`w-7 h-1 bg-black rounded-full transition-all duration-500 origin-center group-hover:shadow-md ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
      </button>

      {/* Mobile Menu Overlay */}
       <div className={`
       z-[100]  fixed inset-0  backdrop-blur-[12px] flex flex-col items-center justify-center gap-10 transition-all duration-500 ease-in-out md:hidden
        ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      `}>
        <Link 
          to="/Upload" 
          onClick={() => setIsOpen(false)}
          className="text-2xl text-gray-300 hover:text-white font-semibold"
        >
          <h1>Upload Resume 🔥</h1>
        </Link>
        <Link 
          to="/History" 
          onClick={() => setIsOpen(false)}
          className="text-2xl text-gray-300 hover:text-white font-semibold"
        >
         <h1>History🚀</h1>
        </Link>

             <Link 
          to="/ResumeBuilder" 
          onClick={() => setIsOpen(false)}
          className="text-2xl text-gray-300 hover:text-white font-semibold"
        >
         <h1>Build a Resume..🚀</h1>
        </Link>
         
          <Link 
          to="/Auth" 
          onClick={() => setIsOpen(false)}
          className="text-2xl text-gray-300 hover:text-white font-semibold"
        >
         <h1>Log Out..</h1>
        </Link>

   

      </div>
    </nav>
  );
};

export default Navbar;
