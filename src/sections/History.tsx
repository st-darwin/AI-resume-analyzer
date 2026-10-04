import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePuterStore } from "../lib/puter";
import Navbar from "../components/Navbar";
import { FileText, Trash2, ArrowRight, Clock, PenBox } from "lucide-react";

const History = () => {
  const { kv } = usePuterStore();
  const navigate = useNavigate();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      const raw = await kv.get("nexa_cv_history");
      if (raw) setHistory(JSON.parse(raw as string));
      setTimeout(() => setLoading(false), 500);
    };
    loadHistory();
  }, [kv]);

  const deleteItem = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
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
      <main className="min-h-screen bg-slate-50/50 pt-28">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12">
          <div className="mb-12 animate-pulse space-y-3">
            <div className="h-5 w-24 bg-slate-200 rounded-full" />
            <div className="h-10 w-48 bg-slate-200 rounded-xl" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200/60 p-6 flex items-center justify-between animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100" />
                  <div className="space-y-2">
                    <div className="h-4 w-40 bg-slate-200 rounded" />
                    <div className="h-3 w-24 bg-slate-100 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (history.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50/50 pt-28">
        <Navbar />
        <div className="max-w-md mx-auto px-4 text-center pt-24">
          <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-center mx-auto mb-6 text-slate-400">
            <Clock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">No Scan History</h1>
          <p className="text-slate-500 text-sm mb-8">Your analyzed resumes will appear here once you complete your first scan.</p>
          <button
            onClick={() => navigate('/Upload')}
            className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-semibold text-xs tracking-wider uppercase rounded-xl hover:bg-indigo-600 transition-all shadow-sm active:scale-[0.99]"
          >
            Upload Resume
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/50 pt-28 pb-20 selection:bg-indigo-100">
     <div className="mb-12">
       <Navbar />
     </div>

     {/* Ambient Glows */}
     <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-indigo-50/40 rounded-full blur-3xl pointer-events-none" />
     
     <div className="max-w-4xl mx-auto px-4 sm:px-6">
       
       {/* Header */}
       <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pt-6">
         <div className="space-y-1">
           <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100/60 mb-2">
             <PenBox className="w-3 h-3 text-indigo-600" />
             <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">Storage Active</span>
           </div>
           <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Scan History</h1>
           <p className="text-slate-500 text-sm">Review, track, and manage your analyzed resumes.</p>
         </div>

         <div className="flex items-center gap-3">
           <div className="bg-white border border-slate-200/80 rounded-2xl px-4 py-2.5 shadow-sm flex items-center gap-3">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</span>
             <span className="text-lg font-bold text-slate-900">{history.length}</span>
           </div>
           <button
             onClick={clearAllHistory}
             className="cursor-pointer px-4 py-3 bg-white hover:bg-red-50 text-slate-500 hover:text-red-600 rounded-2xl border border-slate-200/80 hover:border-red-200 transition-all text-xs font-semibold shadow-sm"
           >
             Clear All
           </button>
         </div>
       </div>

       {/* History List */}
       <div className="space-y-3">
         {history.map((item, index) => {
           const scoreColor = 
             item.score >= 70 ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 
             item.score >= 50 ? 'text-amber-600 bg-amber-50 border-amber-100' : 
             'text-rose-600 bg-rose-50 border-rose-100';

           return (
             <div
               key={item.id}
               onClick={() => navigate(`/resume/${item.id}`)}
               className="cursor-pointer group bg-white border border-slate-200/80 hover:border-indigo-500/50 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in"
               style={{ animationDelay: `${index * 40}ms` }}
             >
               <div className="flex items-center gap-4 min-w-0">
                 <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                   <FileText className="w-5 h-5 text-indigo-600" />
                 </div>
                 <div className="min-w-0 space-y-1">
                   <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                     {item.fileName}
                   </h3>
                   <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                     <span>{new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                     <span>•</span>
                     <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                   </div>
                 </div>
               </div>

               <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                 <div className={`px-3 py-1 rounded-xl border text-xs font-bold tracking-tight ${scoreColor}`}>
                   {item.score}% ATS Score
                 </div>

                 <div className="flex items-center gap-1">
                   <button
                     onClick={(e) => deleteItem(item.id, e)}
                     title="Delete scan"
                     className="cursor-pointer p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                   >
                     <Trash2 className="w-4 h-4" />
                   </button>
                   <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                     <ArrowRight className="w-4 h-4" />
                   </div>
                 </div>
               </div>
             </div>
           );
         })}
       </div>

       <div className="mt-12 text-center">
         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white border border-slate-200/80 px-4 py-2 rounded-full shadow-xs">
           End of history • {history.length} records saved
         </span>
       </div>

     </div>
    </main>
  );
};

export default History;