import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CareerMap, { type CareerStep } from '../components/CareerMap';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [careerPath, setCareerPath] = useState<CareerStep[]>([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Expanded Professional Form input states
  const [name, setName] = useState('');
  const [currentRole, setCurrentRole] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Mid-Level (2-4 Years)');
  const [industry, setIndustry] = useState('Fintech & Banking');
  const [skills, setSkills] = useState('');

  // Instant responsive roadmap generation engine
  const analyzeExperience = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);

    // Simulate crisp professional calculation delay for premium feel
    await new Promise((resolve) => setTimeout(resolve, 800));

    const userSkillsArray = skills ? skills.split(',').map((s) => s.trim()) : ['React', 'TypeScript', 'Tailwind'];
    const formattedName = name || 'Professional';

    setCareerPath([
      {
        stage: 'Entry Point',
        role: `Junior ${currentRole || 'Developer'}`,
        status: 'completed',
        skills: userSkillsArray.slice(0, 2),
        salary: industry.includes('Fintech') ? '₦350k/mo' : '$45k/yr',
      },
      {
        stage: 'Current Trajectory',
        role: currentRole || 'Frontend Engineer',
        status: 'current',
        skills: userSkillsArray,
        salary: industry.includes('Fintech') ? '₦1.2M/mo' : '$95k/yr',
        requirement: `Master high-performance design patterns in ${industry}`,
      },
      {
        stage: 'The North Star',
        role: targetRole || 'Lead Technical Architect',
        status: 'upcoming',
        skills: [...userSkillsArray, 'System Architecture', 'Team Leadership'],
        salary: industry.includes('Fintech') ? '₦3.5M/mo' : '$160k/yr',
        requirement: 'Scale enterprise applications and mentor engineering teams globally',
      },
    ]);

    setLoading(false);
  };

  useEffect(() => {
    if (location.state?.triggerAnalysis && (currentRole || skills)) {
      analyzeExperience();
    }
  }, [location.state]);

  const handleCopySummary = () => {
    const summaryText =
      `🚀 My AI Career Roadmap (${name || 'Developer'} - ${industry}):\n` +
      careerPath.map((step) => `- [${step.stage}] ${step.role} | Compensation: ${step.salary}`).join('\n');
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-6 px-4 sm:px-6 md:py-12 relative flex flex-col justify-between">
     

     <div className="mb-15"> 
       <Navbar />
     </div>
      <div className="max-w-4xl mx-auto w-full space-y-8">
        
        {/* Input Form Section - Optimized for Mobile Padding & Touch Targets */}
        {!careerPath.length && !loading && (
          <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 border border-slate-200/80 shadow-xl shadow-slate-900/5">
            <div className="text-center mb-6 sm:mb-8">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full inline-block">
                Career Architect
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 tracking-tight">
                Design Your Professional Trajectory
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Enter your details below to map your growth milestones and salary benchmarks.
              </p>
            </div>

            <form onSubmit={analyzeExperience} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Uzoma Solomon"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-600 font-medium text-slate-900 text-sm transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Experience Level</label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-600 font-medium text-slate-900 text-sm transition-all cursor-pointer"
                  >
                    <option>Junior (0-2 Years)</option>
                    <option>Mid-Level (2-4 Years)</option>
                    <option>Senior (4-7 Years)</option>
                    <option>Staff / Lead (7+ Years)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Current Job Role</label>
                  <input
                    type="text"
                    placeholder="e.g. Frontend Engineer"
                    value={currentRole}
                    onChange={(e) => setCurrentRole(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-600 font-medium text-slate-900 text-sm transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Target Goal / Dream Role</label>
                  <input
                    type="text"
                    placeholder="e.g. Lead Technologist"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-600 font-medium text-slate-900 text-sm transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Industry Sector</label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-600 font-medium text-slate-900 text-sm transition-all cursor-pointer"
                  >
                    <option>Fintech & Banking</option>
                    <option>SaaS & Enterprise Cloud</option>
                    <option>AI & Machine Learning</option>
                    <option>Web3 & Decentralized Infra</option>
                    <option>E-commerce & Retail Tech</option>
                    <option>HealthTech & Bioinformatics</option>
                    <option>Cybersecurity & Infrastructure</option>
                    <option>Creative Tech & Animation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Core Tech Stack</label>
                  <input
                    type="text"
                    placeholder="e.g. React, TypeScript, Tailwind"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-600 font-medium text-slate-900 text-sm transition-all"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-indigo-600 transition-all duration-300 shadow-lg shadow-slate-900/10 cursor-pointer active:scale-95 text-sm sm:text-base flex items-center justify-center gap-2"
              >
               View Insights
              </button>
            </form>
          </div>
        )}

        {/* The Map or Loading State */}
        {(loading || careerPath.length > 0) && (
          <div className="space-y-6">
            {!loading && careerPath.length > 0 && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/90 backdrop-blur-md px-5 sm:px-6 py-4 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                  <h2 className="text-sm sm:text-base font-black text-slate-900">Roadmap for {name || 'Professional'}</h2>
                  <p className="text-xs text-slate-500">
                    Targeting: <span className="font-semibold text-slate-700">{targetRole || 'Next Milestone'}</span> in <span className="font-semibold text-indigo-600">{industry}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setCareerPath([])}
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-100 text-slate-600 hover:bg-slate-200 font-bold text-xs rounded-xl transition-all cursor-pointer text-center"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-indigo-600 text-white hover:bg-indigo-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-600/20"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share
                  </button>
                </div>
              </div>
            )}

            <CareerMap data={careerPath} isLoading={loading} />
          </div>
        )}

      </div>

      {/* Share Modal Popup */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-black text-slate-900">Share Your Career Roadmap</h3>
              <button 
                onClick={() => setShowShareModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Copy your professional career trajectory details and salary benchmarks to share with peers or mentors.
            </p>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 font-mono text-[11px] text-slate-600 space-y-1 overflow-x-auto">
              <p className="font-bold text-slate-900">🚀 Career Path: {name} ({industry})</p>
              {careerPath.map((s, i) => (
                <p key={i}>• {s.stage}: {s.role} ({s.salary})</p>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCopySummary}
                className="w-full py-2 bg-indigo-600 text-white font-bold rounded-2xl text-xs hover:bg-indigo-700 transition-all cursor-pointer shadow-lg shadow-indigo-600/20"
              >
                {copied ? 'Copied to Clipboard! 🎉' : 'Copy Summary'}
              </button>
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-5 py-3.5 bg-slate-100 text-slate-700 font-bold rounded-2xl text-xs hover:bg-slate-200 transition-all cursor-pointer text-center"
              >
                Export
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;