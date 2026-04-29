import { Power, ArrowLeft, Fingerprint } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePuterStore } from '../lib/puter';

const Logout = () => {
    const navigate = useNavigate();
    const { auth } = usePuterStore();

         const logout = async () => {
    try {
      await auth.signOut()
      navigate("/Auth")
    } catch (error) {
      console.error("Login failed", error)
    }
  }
  return (
    <div className="min-h-screen w-full bg-[#030303] text-zinc-400 flex items-center justify-center p-6 selection:bg-white selection:text-black">
      
      {/* Background Depth Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-900/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative w-full max-w-xl">
        
        {/* Main Bento Container */}
        <div className="bg-zinc-900/40 border border-white/[0.05] backdrop-blur-3xl rounded-[3rem] p-10 md:p-14 shadow-2xl transition-all duration-700 hover:shadow-red-900/5">
          
          {/* Header Section */}
          <div className="flex flex-col items-center text-center mb-12">
            <div className="relative mb-8">
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 bg-red-500/10 blur-2xl rounded-full scale-150 animate-pulse" />
              <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-950 border border-white/5 flex items-center justify-center shadow-2xl">
                <Fingerprint className="w-10 h-10 text-zinc-100 opacity-80" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
              Secure <span className="text-zinc-600">Sign-out</span>
            </h1>
            <p className="text-sm md:text-base font-medium text-zinc-500 max-w-xs mx-auto leading-relaxed">
              Confirm your deactivation to clear local session artifacts and secure your workspace.
            </p>
          </div>

          {/* Action Grid */}
          <div className="grid grid-cols-1 gap-4">
            {/* Primary Action */}
            <button 
              className="group relative w-full py-5 rounded-2xl bg-white hover:bg-red-600 transition-all duration-500 active:scale-[0.98] overflow-hidden"
              onClick={() => {  alert("You have successfully logged out") ; logout() }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative z-10 flex items-center justify-center gap-2 text-black group-hover:text-white font-bold text-sm tracking-tight">
                <Power className="w-4 h-4" />
                Terminate Session
              </span>
            </button>

            {/* Secondary Action */}
            <button 
              className="w-full py-5 rounded-2xl bg-zinc-800/30 border border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-sm"
              onClick={() => { navigate('/') }}
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Dashboard
            </button>
          </div>

          {/* Minimalist Footer Grid */}
          <div className="mt-14 pt-8 border-t border-white/[0.03] grid grid-cols-3 gap-4 items-center">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-mono uppercase text-zinc-700 tracking-widest">Developer</span>
              <span className="text-[11px] font-medium text-zinc-500">Darwin_10x</span>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <span className="text-[9px] font-mono uppercase text-zinc-700 tracking-widest">Status</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-[10px] font-mono text-emerald-500/80 uppercase italic">Encrypted</span>
              </div>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <span className="text-[9px] font-mono uppercase text-zinc-700 tracking-widest">Node</span>
              <span className="text-[11px] font-medium text-zinc-500 italic text-right">Nexa Resume</span>
            </div>
          </div>
        </div>

        {/* Floating Detail */}
        <p className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-[10px] font-mono text-zinc-800 uppercase tracking-[0.5em] w-full text-center">
          NexaCV // Intelligent Resume Analysis
        </p>
      </div>
    </div>
  );
};

export default Logout;
