import { useEffect } from "react"
import { usePuterStore } from "../lib/puter"
import { useLocation, useNavigate } from "react-router-dom"

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
    <main className="min-h-screen bg-[url('/images/bg-main.svg')] bg-cover bg-center flex items-center justify-center p-6">
      {/* SEO & Meta */}
      <title>NexaCV | Secure Login</title>
      
      <div className="relative w-full max-w-md">
        {/* Decorative Background Blur */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/30 rounded-full blur-3xl" />

        <section className="relative backdrop-blur-md bg-white/80 border border-white/20 shadow-2xl rounded-3xl p-8 md:p-12 transition-all">
          
          <div className="flex flex-col items-center gap-3 text-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg mb-2">
               <span className="text-white text-3xl font-bold">N</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              Login to continue your job journey and manage your professional CVs.
            </p>
          </div>

          <div className="space-y-4">
            {isLoading ? (
              <button disabled className="w-full flex items-center justify-center gap-3 bg-slate-100 text-slate-400 py-4 rounded-xl font-medium cursor-not-allowed">
                <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                Signing you in...
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <div className="space-y-3">
                    <button 
                      onClick={() => navigate(next)}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold shadow-md transition-all active:scale-[0.98]"
                    >
                      Continue to Dashboard
                    </button>
                    <button 
                      onClick={() => { auth.signOut(); alert("Logged out"); }}
                      className="w-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 py-3 rounded-xl text-sm font-medium transition-all"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={login} 
                    className="group relative w-full bg-slate-900 hover:bg-black text-white py-4 rounded-xl font-semibold shadow-xl transition-all active:scale-[0.98] overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Get Started with Puter
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                )}
              </>
            )}
          </div>

          <footer className="mt-8 text-center">
            <p className="text-xs text-slate-400">
              By continuing, you agree to our Terms of Service.
            </p>
          </footer>
        </section>
      </div>
    </main>
  )
}

export default Auth
