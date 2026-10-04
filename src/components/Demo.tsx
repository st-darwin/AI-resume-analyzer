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
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white/95 backdrop-blur-xl w-full max-w-xl rounded-[2.5rem] border border-slate-200/60 shadow-2xl shadow-slate-900/10 overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 tracking-tight">NexaCV Live Preview</h3>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">See the AI in action</p>
          </div>
          <button 
            onClick={onClose} 
            className="w-9 h-9 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="p-8 sm:p-10 min-h-[380px] flex flex-col items-center justify-center text-center">
          
          {/* STEP 1: INITIAL UPLOAD VIEW */}
          {step === 'upload' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300 w-full">
              <div className="w-16 h-16 bg-blue-50/80 border border-blue-100/60 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
              </div>
              <div className="space-y-1.5">
                <h4 className="text-xl font-semibold text-slate-900 tracking-tight">Experience the Scan</h4>
                <p className="text-slate-500 text-sm font-medium max-w-sm mx-auto leading-relaxed">Click below to simulate a high-speed ATS analysis of a sample developer resume.</p>
              </div>
              <button 
                onClick={() => setStep('scanning')}
                className="cursor-pointer w-full py-3.5 bg-slate-900 text-white text-sm rounded-2xl hover:bg-blue-600 transition-all duration-300 shadow-sm shadow-slate-900/10 active:scale-95"
              >
                Start Demo Scan
              </button>
            </div>
          )}

          {/* STEP 2: SCANNING ANIMATION */}
          {step === 'scanning' && (
            <div className="w-full space-y-6 animate-in fade-in duration-300">
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mx-auto animate-pulse">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <p className="text-blue-600 font-semibold uppercase tracking-widest text-[10px] animate-pulse">Analyzing Structure...</p>
                <h4 className="text-lg font-semibold text-slate-900">AI is dissecting keywords & formatting</h4>
              </div>

              {/* Minimal Progress Bar */}
              <div className="relative w-full h-1.5 bg-slate-100 rounded-full overflow-hidden max-w-xs mx-auto">
                <div className="absolute top-0 left-0 h-full bg-blue-600 rounded-full w-full animate-[shimmer_2s_infinite]" />
              </div>

              {/* Fake Code Lines */}
              <div className="space-y-2 opacity-25 max-w-[200px] mx-auto">
                <div className="h-1.5 w-full bg-slate-300 rounded-full" />
                <div className="h-1.5 w-3/4 bg-slate-300 rounded-full mx-auto" />
                <div className="h-1.5 w-5/6 bg-slate-300 rounded-full mx-auto" />
              </div>
            </div>
          )}

          {/* STEP 3: RESULT PREVIEW */}
          {step === 'result' && (
            <div className="w-full space-y-6 animate-in zoom-in-95 duration-300">
              <div className="flex flex-col sm:flex-row gap-5 items-center bg-slate-50/80 border border-slate-100 p-5 rounded-3xl text-left">
                {/* Score Pill */}
                <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200/60 shadow-sm flex flex-col items-center justify-center shrink-0">
                   <span className="text-2xl font-semibold text-slate-900 leading-none">88%</span>
                   <span className="text-[9px] font-semibold text-emerald-600 uppercase tracking-widest mt-1">Great Score</span>
                </div>

                {/* Quick Insights */}
                <div className="flex-1 space-y-2">
                   <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                      <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                      Strong Technical Keywords
                   </div>
                   <div className="flex items-center gap-2 text-xs font-semibold text-amber-500">
                      <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"/></svg>
                      Improve Action Verbs
                   </div>
                   <button 
                     onClick={() => setStep('upload')}
                     className="text-[11px] font-semibold text-slate-400 hover:text-slate-600 transition-colors pt-1 block cursor-pointer"
                   >
                     Reset Demo
                   </button>
                </div>
              </div>

              <div className="p-5 bg-blue-50/60 rounded-2xl border border-blue-100/60 space-y-3">
                <p className="text-xs font-semibold text-blue-900">Ready to scan your own resume?</p>
                <button 
                   onClick={() => window.location.href = '/Upload'}
                   className="cursor-pointer w-full py-3.5 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-600/10 active:scale-95"
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