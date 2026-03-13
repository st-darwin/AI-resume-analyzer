import  { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CareerMap, { type CareerStep } from '../components/CareerMap';



const Dashboard = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [careerPath, setCareerPath] = useState<CareerStep[]>([]);

  // The Mock AI Engine
  const analyzeExperience = () => {
    setLoading(true);
    
    // Simulate AI "Thinking"
    setTimeout(() => {
      const results: CareerStep[] = [
        {
          stage: "Entry Point",
          role: "Junior Software Developer",
          status: "completed",
          skills: ["HTML", "CSS", "React", "JavaScript"],
          salary: "₦400k/mo"
        },
        {
          stage: "Current Trajectory",
          role: "Creative Frontend Engineer",
          status: "current",
          skills: ["GSAP", "Three.js", "System Design", "UI/UX"],
          salary: "₦1.2M/mo",
          requirement: "Master high-performance animations"
        },
        {
          stage: "The North Star",
          role: "Lead Creative Technologist",
          status: "upcoming",
          skills: ["Architecture", "Team Leadership", "AI Dev"],
          salary: "$140k/yr",
          requirement: "Scale enterprise-level visual systems"
        }
      ];
      setCareerPath(results);
      setLoading(false);
    }, 3000);
  };

  // Auto-start if we came from the "Unlock Insights" button
  useEffect(() => {
    if (location.state?.triggerAnalysis) {
      analyzeExperience();
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-12">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Interaction Header */}
        {!careerPath.length && !loading && (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-slate-200">
            <h1 className="text-4xl font-black text-slate-900 mb-4">No Roadmap Found</h1>
            <p className="text-slate-500 mb-8">Upload your resume to generate your path.</p>
            <button 
              onClick={analyzeExperience}
              className="px-10 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all"
            >
              Start New Analysis
            </button>
          </div>
        )}

        {/* The Map */}
        {(loading || careerPath.length > 0) && (
          <CareerMap data={careerPath} isLoading={loading} />
        )}
        
      </div>
    </div>
  );
};

export default Dashboard;
