import { useState, useEffect  } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Zap, History, FileUp, 
  LogOut, ChevronRight, Sparkles, LayoutTemplate, 
  PenTool, ChevronDown 
} from 'lucide-react';




interface DropdownProps {
  to: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  theme: 'dark' | 'light';
}
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProOpen, setIsProOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  


  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const freeLinks = [
    { name: 'Upload', path: '/Upload', icon: <FileUp className="w-4 h-4"/> },
    { name: 'Build', path: '/ResumeBuilder', icon: <PenTool className="w-4 h-4"/> },
    { name: 'History', path: '/History', icon: <History className="w-4 h-4"/> },
     
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 px-4 md:px-8 ${
      scrolled ? 'pt-4' : 'pt-6'
    }`}>
      <div className={`max-w-7xl mx-auto rounded-[2.5rem] border transition-all duration-500 ease-in-out ${
        scrolled 
        ? 'bg-white/80 backdrop-blur-2xl border-slate-200/50 shadow-[0_20px_40px_rgba(0,0,0,0.03)] px-6 py-2' 
        : 'bg-transparent border-transparent px-4 py-4'
      }`}>
        <div className="flex items-center justify-between">
          
          {/* --- LOGO --- */}
          <Link to="/" className="group flex items-center gap-2.5 z-[110]">
            <div className="w-9 h-9 bg-indigo-600 rounded-[12px] flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:rotate-[10deg] transition-all duration-500">
              <Sparkles className="w-5 h-5 text-white fill-white/20" />
            </div>
            <p className="text-xl font-black text-slate-900 tracking-tighter uppercase">
              Nexa<span className="text-indigo-600">CV</span>
            </p>
          </Link>

          {/* --- DESKTOP NAVIGATION --- */}
          <div className="hidden md:flex items-center gap-1">
            <div className="flex items-center bg-slate-100/50 rounded-full p-1 border border-slate-200/40 mr-2">
                {freeLinks.map((link) => (
                <Link
                    key={link.path}
                    to={link.path}
                    className={`px-5 py-2 rounded-full text-[12px] font-black uppercase tracking-widest transition-all duration-300 ${
                    location.pathname === link.path 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-900'
                    }`}
                >
                    {link.name}
                </Link>
                ))}
            </div>
            
            {/* PRO DROPDOWN TRIGGER */}
            <div 
              className="relative z-[110]"
              onClick={() => setIsProOpen((prev) => !prev)}
            >
              <button className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[13px] font-black tracking-wide transition-all duration-500 shadow-sm border ${
                isProOpen 
                ? 'bg-slate-900 border-slate-900 text-white translate-y-[-2px] shadow-xl shadow-slate-200' 
                : 'bg-white border-slate-200 text-indigo-600 hover:border-indigo-200'
              }`}>
                Expert Suite
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-500 ${isProOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* DROPDOWN MENU */}
              <div className={`absolute top-full right-0 mt-3 w-80 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_30px_60px_rgba(0,0,0,0.12)] p-5 transition-all duration-500 origin-top-right ${
                isProOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
              }`}>
                <div className="space-y-2">
                  <DropdownLink 
                    to="/AIResumeBuilder" 
                    icon={<Zap className="w-5 h-5 fill-current" />}
                    title="AI Strategist"
                    desc="Neural Content Engine"
                    theme="dark"
                  />
                  <DropdownLink 
                    to="/ResumeBuilder" 
                    icon={<LayoutTemplate className="w-5 h-5" />}
                    title="Pro Templates"
                    desc="Executive Grade Layouts"
                    theme="light"
                  />
                </div>
                <div className="mt-4 pt-4 border-t border-slate-50 text-center">
                   <span className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.2em] bg-indigo-50 px-4 py-1.5 rounded-full">Pro Member Access</span>
                </div>
              </div>
            </div>
            
            <Link to="/logout"
         className="ml-2 p-2.5 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all">
              <LogOut className="w-4 h-4" />
            </Link>
          </div>

          {/* --- MOBILE TOGGLE --- */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden relative z-[110] w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-500 ${
              isOpen ? 'bg-slate-900 text-white rotate-90 shadow-2xl' : 'bg-white border border-slate-200 text-slate-900 shadow-sm'
            }`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div className={`
        fixed inset-0 bg-white/60 backdrop-blur-3xl z-[100] flex flex-col pt-32 px-6 transition-all duration-700 ease-in-out md:hidden
        ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}
      `}>
        <div className="max-w-md mx-auto w-full space-y-10">
          <div className="space-y-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] px-4">Core Systems</p>
            {freeLinks.map(item => (
              <Link key={item.name} to={item.path} onClick={() => setIsOpen(false)} className="flex items-center justify-between p-5 rounded-[2rem] bg-white border border-slate-100 shadow-sm active:scale-95 transition-transform">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">{item.icon}</div>
                  <span className="text-base font-black text-slate-800 tracking-tight">{item.name}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </Link>
            ))}
          </div>
          
          <div className="space-y-4">
            <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] px-4">Expert Suite</p>
            <Link to="/AIResumeBuilder" onClick={() => setIsOpen(false)} className="flex items-center gap-5 p-6 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl shadow-indigo-100">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-indigo-400">
                  <Zap className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <p className="text-lg font-black tracking-tight leading-none mb-1">AI Strategist</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Neural Analysis</p>
                </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

const DropdownLink = ({ to, icon, title, desc, theme }: DropdownProps) => (
  <Link to={to} className="flex items-center gap-4 p-4 rounded-[2rem] hover:bg-slate-50 transition-all group">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-sm ${
      theme === 'dark' ? 'bg-slate-900 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
    }`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-black text-slate-900 tracking-tight">{title}</p>
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{desc}</p>
    </div>
  </Link>
);

export default Navbar;
