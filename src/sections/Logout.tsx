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
        <div className="min-h-screen w-full bg-[#FAFAFA] text-slate-600 flex items-center justify-center p-6 selection:bg-blue-600 selection:text-white">
          
          {/* Soft Background Accent */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-50/60 rounded-full blur-3xl -z-10" />
          </div>

          <div className="relative w-full max-w-xl">
            
            {/* Main Bento Container */}
            <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-10 md:p-12 shadow-xl shadow-slate-900/5 transition-all duration-300">
              
              {/* Header Section */}
              <div className="flex flex-col items-center text-center mb-10">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full scale-125" />
                  <div className="relative w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shadow-sm text-blue-600">
                    <Fingerprint className="w-8 h-8" />
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-3">
                  Secure <span className="text-slate-400">Sign-out</span>
                </h1>
                <p className="text-sm font-medium text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Confirm your deactivation to clear local session artifacts and secure your workspace.
                </p>
              </div>

              {/* Action Grid */}
              <div className="grid grid-cols-1 gap-3.5">
                {/* Primary Action */}
                <button 
                  className="group relative w-full py-4 rounded-2xl bg-slate-900 hover:bg-rose-600 text-white transition-all duration-300 active:scale-[0.98] shadow-sm cursor-pointer overflow-hidden"
                  onClick={() => { alert("You have successfully logged out"); logout() }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 font-semibold text-xs uppercase tracking-wider">
                    <Power className="w-4 h-4" />
                    Terminate Session
                  </span>
                </button>

                {/* Secondary Action */}
                <button 
                  className="w-full py-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200 flex items-center justify-center gap-2 font-semibold text-xs uppercase tracking-wider cursor-pointer"
                  onClick={() => { navigate('/') }}
                >
                  <ArrowLeft className="w-4 h-4 text-slate-400" />
                  Return to Dashboard
                </button>
              </div>

              {/* Minimalist Footer Grid */}
              <div className="mt-12 pt-6 border-t border-slate-100 grid grid-cols-3 gap-4 items-center">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] font-semibold uppercase text-slate-400 tracking-widest">Developer</span>
                  <span className="text-xs font-semibold text-slate-700">Darwin_10x</span>
                </div>
                <div className="flex flex-col gap-0.5 items-center">
                  <span className="text-[9px] font-semibold uppercase text-slate-400 tracking-widest">Status</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-medium text-emerald-600 uppercase tracking-tight">Protected</span>
                  </div>
                </div>
                <div className="flex flex-col gap-0.5 items-end">
                  <span className="text-[9px] font-semibold uppercase text-slate-400 tracking-widest">Node</span>
                  <span className="text-xs font-semibold text-slate-700 text-right">NexaCV</span>
                </div>
              </div>
            </div>

            {/* Floating Detail */}
            <p className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-slate-400 uppercase tracking-[0.3em] w-full text-center">
              NexaCV // Intelligent Resume Analysis
            </p>
          </div>
        </div>
    );
};

export default Logout;