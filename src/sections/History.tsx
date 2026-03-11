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
      // if the data exsit in the kw, parse it and set it to the state, otherwise set history to an empty array
      if (raw) setHistory(JSON.parse(raw as string));
      
      setLoading(false);
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
      <main className='bg-[url("/images/bg-main.svg")] bg-cover min-h-screen flex items-center justify-center'>
        <div className="text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500/20 border-t-blue-500"></div>
            </div>
          </div>
          <p className="text-gray-400 text-lg">Loading your history...</p>
        </div>
      </main>
    );
  }

  if (history.length === 0) {
    return (
      <main className='bg-[url("/images/bg-main.svg")] bg-cover min-h-screen  pt-32'>
        <div className="container mx-auto items-center justify-center mt-40 xl:mt-0 sm:mt-0  px-4 md:px-8">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20">
              <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-white mb-2">No History Yet</h1>
            <p className="text-gray-400 mb-8">Your resume scans will appear here once you upload and analyze your first resume.</p>
            <button
              onClick={() => navigate('/Upload')}
              className=" cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-blue-500/30 backdrop-blur-xl border 2px border-blue-400/60 text-white font-semibold rounded-lg hover:bg-blue-500/50 hover:border-blue-300 shadow-lg shadow-blue-500/20 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Upload Your First Resume
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className='bg-[url("/images/bg-main.svg")] bg-cover min-h-screen pt-28 pb-12'>
      <div className="mb-2">
        <Navbar/>
      </div>
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Scan History</h1>
              <p className="text-gray-400 text-lg">Manage and review your resume analysis results</p>
            </div>
            <div className="flex flex-col sm:items-end gap-4">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-2">
                <span className="text-sm text-gray-400">Total Scans:</span>
                <span className="text-2xl font-bold text-blue-400">{history.length}</span>
              </div>
              {history.length > 0 && (
                <button
                  onClick={clearAllHistory}
                  className=" hover:cursor-pointer px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition-all duration-300 text-sm font-semibold border border-red-500/20"
                >
                  Clear All History
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Scan Items Grid */}

        <div className="space-y-4">
          {history.map((item, index) => (
            <div
              key={item.id}
              className=" hover:cursor-pointer  group relative overflow-hidden rounded-2xl transition-all duration-300 animate-in fade-in slide-in-from-top-4"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Background with gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/5 to-transparent backdrop-blur-xl border border-white/10 group-hover:border-blue-500/30 transition-all duration-300"></div>
              
              {/* Hover glow effect */}
              <div className="absolute -inset-px bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
              
              <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                {/* Left content */}
                <div
                  onClick={() => navigate(`/resume/${item.id}`)}
                  className="flex-1 cursor-pointer group/content w-full md:w-auto"
                >
                  <div className="flex items-start gap-4">
                    {/* File Icon */}
                    <div className="hidden sm:flex flex-shrink-0 items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/20 group-hover/content:from-blue-500/50 group-hover/content:to-purple-500/40 transition-all duration-300 border border-blue-500/20">
                      <svg className="w-7 h-7 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    {/* Text content */}
                    <div className="flex-1 min-w-0">
                      <h1 className="font-semibold text-black group-hover/content:text-blue-300 transition-colors duration-300 line-clamp-1 !text-lg">
                        {item.fileName}
                      </h1>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <p className="text-sm text-gray-400">
                          {new Date(item.timestamp).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                        <span className="text-xs text-gray-500">
                          {new Date(item.timestamp).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right content - Score and Delete */}
                <div className="flex items-center gap-4 ml-0 md:ml-4 w-full md:w-auto justify-between md:justify-start">
                  {/* Score Section */}
                  <div className="hidden sm:block text-right">
                    <div className="mb-2">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${
                        item.score >= 70 ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        item.score >= 50 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                        'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        <span>{item.score}%</span>
                      </span>
                    </div>
                    <div className="w-28 h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          item.score >= 70 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                          item.score >= 50 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                          'bg-gradient-to-r from-red-500 to-pink-500'
                        }`}
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Mobile Score */}
                  <div className="sm:hidden">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
                      item.score >= 70 ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      item.score >= 50 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                      'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {item.score}%
                    </span>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm(`Delete "${item.fileName}"?`)) {
                        deleteItem(item.id);
                      }
                    }}
                    className=" hover:cursor-pointer flex-shrink-0 p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all duration-300 group/delete border border-red-500/20 hover:border-red-500/40"
                    title="Delete this scan"
                  >
                    <svg className="w-5 h-5 group-hover/delete:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Showing <span className="text-blue-400 font-semibold">{history.length}</span> resume scan{history.length !== 1 ? 's' : ''}</p>
        </div>
      </div>
    </main>
  );
};

export default History;
