import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePuterStore } from "../lib/puter";
import Navbar from "../components/Navbar";

const History = () => {
  const { kv } = usePuterStore();
  const navigate = useNavigate();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      const raw = await kv.get("nexa_cv_history");
      if (raw) setHistory(JSON.parse(raw as string));
      // Artificial delay to appreciate the smooth loader (optional)
      setTimeout(() => setLoading(false), 800);
    };
    loadHistory();
  }, [kv]);

  const deleteItem = async (id: string) => {
    const updatedHistory = history.filter((item) => item.id !== id);
    setHistory(updatedHistory);
    await kv.set("nexa_cv_history", JSON.stringify(updatedHistory));
  };

  const clearAllHistory = async () => {
    if (window.confirm("Are you sure you want to clear all history?")) {
      setHistory([]);
      await kv.set("nexa_cv_history", JSON.stringify([]));
    }
  };

  if (loading) {
    return (
      <main className="bg-[#FDFDFD] min-h-screen pt-28">
        <Navbar />
        <div className="container mt-30 mx-auto px-6 md:px-8 max-w-5xl">
          {/* Header Skeleton */}
          <div className="mb-16 animate-pulse">
            <div className="h-6 w-32 bg-slate-100 rounded-full mb-4" />
            <div className="h-12 w-64 bg-slate-200 rounded-2xl mb-2" />
            <div className="h-4 w-80 bg-slate-100 rounded-lg" />
          </div>

          {/* List Skeleton Items */}
          <div className="space-y-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-[2rem] border border-slate-100 p-6 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 animate-pulse" />
                  <div className="space-y-3">
                    <div className="h-5 w-48 bg-slate-200 rounded-lg animate-pulse" />
                    <div className="h-3 w-32 bg-slate-100 rounded-md animate-pulse" />
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-8">
                  <div className="space-y-2">
                    <div className="h-8 w-12 bg-slate-100 rounded-lg animate-pulse ml-auto" />
                    <div className="h-2 w-16 bg-slate-50 rounded-full animate-pulse" />
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 animate-pulse" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (history.length === 0) {
    return (
      <main className="bg-[#FDFDFD] min-h-screen pt-32 selection:bg-blue-100">
        <Navbar />

        <div className="container mx-auto px-6 mt-20">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-slate-50 border border-slate-100 shadow-sm">
              <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-black text-slate-900 mb-3">No History Yet</h1>
            <p className="text-slate-500 mb-10 font-medium leading-relaxed">Your analyzed resumes will appear here once you've completed your first scan.</p>
            <button
              onClick={() => navigate('/Upload')}
              className="cursor-pointer inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-blue-600 shadow-xl shadow-blue-500/10 transition-all duration-300 active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Upload Resume
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDFDFD] pt-28 pb-12 selection:bg-blue-100">
      <Navbar />

      {/* Background Decorative Glows */}
      <div className="  fixed top-20  left-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] -z-10" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-indigo-50/30 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6 md:px-8 max-w-5xl">
        {/* Header Section */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="space-y-2">
              <div className=" mt-20 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100  mt-7 mb-7">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                <span className="text-[10px] font-black  uppercase tracking-[0.2em] text-blue-700">Storage Active</span>
              </div>
              <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">Scan History</h1>
              <p className="text-slate-500 text-lg font-medium">Review and manage your analyzed resumes</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white border border-slate-200 rounded-2xl px-6 py-3 shadow-sm flex flex-col items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Total</span>
                <span className="text-2xl font-black text-slate-900 leading-none">{history.length}</span>
              </div>
              {history.length > 0 && (
                <button
                  onClick={clearAllHistory}
                  className="cursor-pointer h-full px-5 py-3 bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-2xl transition-all duration-300 text-sm font-bold border border-slate-200 hover:border-red-100 shadow-sm"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-5">
          {history.map((item, index) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-[2rem] border border-slate-200/60 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="relative p-2 flex flex-col sm:flex-row items-center justify-between gap-6">
                
                {/* Left: Info Section */}
                <div 
                  onClick={() => navigate(`/history`)}
                  className="flex-1 cursor-pointer flex items-center gap-6 w-full p-4"
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:scale-105 transition-transform duration-300">
                      <img src="/images/pdf.png" alt="pdf" className="w-8 h-8 object-contain" />
                    </div>
                    <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                      item.score >= 70 ? 'bg-emerald-500' : item.score >= 50 ? 'bg-amber-500' : 'bg-red-500'
                    }`} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300 truncate">
                      {item.fileName}
                    </h3>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                      <span className="text-xs font-semibold text-slate-400">
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Score & Actions */}
                <div className="flex items-center gap-8 px-6 pb-6 sm:pb-0 w-full sm:w-auto border-t sm:border-t-0 border-slate-50 pt-4 sm:pt-0">
                  <div className="text-right">
                     <div className="flex items-baseline justify-end gap-0.5">
                        <span className={`text-3xl font-black tracking-tight ${
                          item.score >= 70 ? 'text-emerald-600' : item.score >= 50 ? 'text-amber-600' : 'text-red-600'
                        }`}>
                          {item.score}
                        </span>
                        <span className="text-sm font-bold text-slate-300">%</span>
                     </div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">ATS Score</p>
                  </div>

                  <div className="h-10 w-px bg-slate-100 hidden sm:block" />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm(`Delete "${item.fileName}"?`)) deleteItem(item.id);
                    }}
                    className="cursor-pointer p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300 border border-transparent hover:border-red-100"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100/50 rounded-full border border-slate-200/60">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
               End of history • {history.length} records
             </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default History;
