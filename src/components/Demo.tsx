import { useState, useEffect } from 'react'

const DemoModal = ({ isOpen, onClose } : { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState('upload'); // upload -> scanning -> result

  useEffect(() => {
    if (step === 'scanning') {
      const timer = setTimeout(() => setStep('result'), 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-black text-slate-900">NexaCV Live Preview</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">See the AI in action</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="p-10 min-h-[400px] flex flex-col items-center justify-center text-center">
          
          {/* STEP 1: INITIAL UPLOAD VIEW */}
          {step === 'upload' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[1.5rem] flex items-center justify-center mx-auto shadow-inner">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
              </div>
              <h4 className="text-2xl font-black text-slate-900">Experience the Scan</h4>
              <p className="text-slate-500 font-medium max-w-sm mx-auto">Click below to simulate a high-speed ATS analysis of a sample developer resume.</p>
              <button 
                onClick={() => setStep('scanning')}
                className="px-10 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-blue-100 active:scale-95"
              >
                Start Demo Scan
              </button>
            </div>
          )}

          {/* STEP 2: SCANNING ANIMATION */}
          {step === 'scanning' && (
            <div className="w-full space-y-8 animate-in fade-in duration-500">
              <div className="relative w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-blue-600 rounded-full animate-[progress_3s_ease-in-out_infinite]" style={{ width: '100%' }} />
              </div>
              <div className="space-y-2">
                <p className="text-blue-600 font-black uppercase tracking-widest text-xs animate-pulse">Analyzing Structure...</p>
                <h4 className="text-xl font-bold text-slate-900">AI is dissecting keywords & formatting</h4>
              </div>
              {/* Fake Code Lines */}
              <div className="space-y-3 opacity-20">
                <div className="h-2 w-3/4 bg-slate-300 rounded-full mx-auto" />
                <div className="h-2 w-1/2 bg-slate-300 rounded-full mx-auto" />
                <div className="h-2 w-2/3 bg-slate-300 rounded-full mx-auto" />
              </div>
            </div>
          )}

          {/* STEP 3: RESULT PREVIEW */}
          {step === 'result' && (
            <div className="w-full animate-in zoom-in-95 duration-500">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Score Circle */}
                <div className="w-40 h-40 rounded-full border-[12px] border-emerald-50 flex flex-col items-center justify-center shadow-lg bg-white relative">
                   <span className="text-4xl font-black text-slate-900">88%</span>
                   <span className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter">Great Score</span>
                   <div className="absolute inset-0 rounded-full border-[12px] border-emerald-500 border-t-transparent animate-[spin_3s_linear_infinite]" />
                </div>

                {/* Quick Insights */}
                <div className="flex-1 text-left space-y-4">
                  <h4 className="text-xl font-black text-slate-900">Analysis Complete</h4>
                  <div className="space-y-2">
                     <div className="flex items-center gap-2 text-sm font-bold text-emerald-600">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                        Strong Technical Keywords
                     </div>
                     <div className="flex items-center gap-2 text-sm font-bold text-amber-500">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"/></svg>
                        Improve Action Verbs
                     </div>
                  </div>
                  <button 
                    onClick={() => setStep('upload')}
                    className="text-xs font-bold text-blue-600 underline"
                  >
                    Reset Demo
                  </button>
                </div>
              </div>

              <div className="mt-10 p-6 bg-blue-50 rounded-[2rem] border border-blue-100">
                <p className="text-sm font-bold text-blue-900 mb-4">Ready to scan your own resume?</p>
                <button 
                   onClick={() => window.location.href = '/Upload'}
                   className="w-full py-4 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200"
                >
                  Analyze My Resume Now
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default DemoModal