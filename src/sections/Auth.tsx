import { useEffect } from "react"
import { usePuterStore } from "../lib/puter"
import { useLocation, useNavigate } from "react-router-dom"
import logo from "../assets/logo.png"

const Auth = () => {
  const { isLoading, auth } = usePuterStore()
  const location = useLocation()
  const next = new URLSearchParams(location.search).get("next") || "/"
  const navigate = useNavigate()

  const login = async () => {
    try {
      await auth.signIn()
      navigate(next)
    } catch (error) {
      console.error("Login failed", error)
    }
  }

  useEffect(() => {
    if (auth.isAuthenticated) navigate(next)
  }, [auth.isAuthenticated, navigate, next])

  return (
    <main className="min-h-screen bg-slate-50/80 relative flex items-center justify-center p-6 overflow-hidden">
      {/* SEO & Meta */}
      <title>NexaCV | Secure Login</title>

      {/* Subtle Soft Ambient Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-sm">
        <section className="bg-white/70 backdrop-blur-xl border border-blue-100/60 shadow-xl shadow-blue-900/5 rounded-3xl p-8 transition-all">
          
          <div className="flex flex-col items-center text-center mb-8">
            <div className="mb-3">
              <img src={logo} alt="NexaCV Logo" className="w-12 h-12 rounded-2xl object-cover shadow-sm shadow-blue-500/20" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">
              Craft Your Future with the amazing NexaCV
            </h2>
            <p className="text-slate-400 text-xs mt-1.5 leading-relaxed max-w-[260px]">
              Sign in to build, optimize, and manage your professional career portfolio with AI.
            </p>
          </div>

          <div className="space-y-3">
            {isLoading ? (
              <button disabled className="w-full flex items-center justify-center gap-2.5 bg-slate-100 text-slate-400 py-3.5 rounded-xl text-sm font-medium cursor-not-allowed">
                <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                Signing you in...
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <div className="space-y-2.5">
                    <button 
                      onClick={() => navigate(next)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl text-sm font-medium shadow-md shadow-blue-600/20 transition-all active:scale-[0.98]"
                    >
                      Continue to Dashboard
                    </button>
                    <button 
                      onClick={() => { auth.signOut(); alert("Logged out"); }}
                      className="w-full bg-transparent hover:bg-slate-50 border border-slate-200 text-slate-600 py-3 rounded-xl text-xs font-medium transition-all"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={login} 
                    className="group relative w-full bg-slate-900 hover:bg-blue-600 text-white py-3.5 rounded-xl text-sm font-medium shadow-lg shadow-slate-900/10 hover:shadow-blue-600/20 transition-all duration-300 active:scale-[0.98] overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Get Started 
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                )}
              </>
            )}
          </div>

          <footer className="mt-6 text-center">
            <p className="text-[11px] text-slate-400">
              By continuing, you agree to our Terms.
            </p>
          </footer>
        </section>
      </div>
    </main>
  )
}

export default Auth