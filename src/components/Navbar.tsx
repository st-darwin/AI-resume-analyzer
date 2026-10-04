import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Zap, History, FileUp, 
  LogOut, PenTool
} from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Upload', path: '/Upload', icon: <FileUp className="w-4 h-4"/> },
    { name: 'Build', path: '/ResumeBuilder', icon: <PenTool className="w-4 h-4"/> },
    { name: 'AI Suite', path: '/AIResumeBuilder', icon: <Zap className="w-4 h-4"/> },
    { name: 'History', path: '/History', icon: <History className="w-4 h-4"/> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-4 sm:px-6 pt-5">
      <div className={`max-w-5xl mx-auto transition-all duration-500 ease-out rounded-full border ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-xl border-slate-200/60 shadow-lg shadow-slate-900/5 px-5 py-2.5' 
          : 'bg-white/50 backdrop-blur-md border-slate-200/40 px-6 py-3.5'
      }`}>
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <img src={logo} alt="NexaCV Logo" className='rounded-xl' />
            </div>
            <span className="text-base font-bold tracking-tight text-slate-900">
              NexaCV
            </span>
          </Link>

          {/* Desktop Links Pill */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1 rounded-full border border-slate-200/50">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                    isActive 
                      ? 'bg-white text-indigo-600 shadow-sm shadow-slate-900/5' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/40'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Link 
              to="/logout"
              className="p-2 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-[110] w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200 transition-all"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`
        fixed inset-0 bg-white/90 backdrop-blur-2xl z-[100] flex flex-col pt-28 px-6 transition-all duration-300 ease-in-out md:hidden
        ${isOpen ? 'opacity-150 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}
      `}>
        <div className="max-w-sm mx-auto w-full space-y-6">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2">Navigation</p>
            {navLinks.map(item => (
              <Link 
                key={item.name} 
                to={item.path} 
                onClick={() => setIsOpen(false)} 
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-800 font-semibold text-sm active:scale-95 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">{item.icon}</div>
                  {item.name}
                </div>
              </Link>
            ))}

            {/* Close Menu Button */}
            <button 
              onClick={() => setIsOpen(false)} 
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-red-50/50 border border-red-100 text-red-600 font-semibold text-sm active:scale-95 transition-all mt-2"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-red-100 text-red-600"><X className="w-4 h-4"/></div>
                Close Menu
              </div>
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Link 
              to="/logout" 
              onClick={() => setIsOpen(false)} 
              className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 text-red-600 font-semibold text-sm transition-all"
            >
              <div className="p-2 rounded-xl bg-white text-red-600 shadow-sm"><LogOut className="w-4 h-4"/></div>
              Logout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;