import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { usePuterStore } from '../lib/puter';
import Navbar from '../components/Navbar';
import {  FileText, Download, Zap, User, Mail, Briefcase } from 'lucide-react';

const NexaCV = () => {
  const puter = usePuterStore();
  const [formData, setFormData] = useState({ fullName: '', email: '', role: '', experience: '' });
  const [aiResult, setAiResult] = useState<{summary: string, bullets: string[]} | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => { puter.init(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    if (!formData.experience || !formData.role) return;
    setIsGenerating(true);
    setAiResult(null); // Clear previous to show skeleton

   const sophisticatedPrompt = `
      Act as a Tier-1 Executive Resume Strategist. 
      Analyze the following raw data for a ${formData.role} role:
      
      RAW CONTEXT: 
      ${formData.experience}

      TASK:
      1. Write a 8-8 sentence "Strategic Profile" (summary) that is punchy, high-level, and uses industry-specific power verbs. Focus on "Value Add" rather than just tasks.
      2. Write 7-8 detailed "Professional Milestones" (bullets). Each bullet should reflect a significant achievement or responsibility, emphasizing impact, scale, and technical complexity.
         - Use the Google X-Y-Z formula: "Accomplished [X] as measured by [Y], by doing [Z]".
         - Ensure each bullet is at least 25-35 words long.
         - Focus on quantifiable metrics, scale, and technical complexity.

      Return ONLY a valid JSON object:
      {
        "summary": "Detailed, multi-sentence executive summary...",
        "bullets": ["Lengthy milestone 1...", "Lengthy milestone 2...", "etc"]
      }
    `;; // (Keep your existing prompt here)

    try {
      const response = await puter.ai.chat(sophisticatedPrompt);
      if (response) {
        const result = JSON.parse(response.toString());
        setAiResult(result);
      }
    } catch (e) { 
      console.error("Synthesis Error:", e); 
    } finally { 
      setIsGenerating(false); 
    }
  };

  const exportPDF = () => {
    if (!aiResult) return;
    const doc = new jsPDF();
    
    // Minimalist Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(17, 24, 39); // Slate 900
    doc.text(formData.fullName.toUpperCase(), 20, 30);
    
    doc.setFontSize(10);
    doc.setTextColor(79, 70, 229); // Indigo 600
    doc.text(formData.role.toUpperCase(), 20, 38);
    
    doc.setTextColor(107, 114, 128); // Slate 400
    doc.text(formData.email.toLowerCase(), 190, 38, { align: 'right' });
    
    doc.setDrawColor(243, 244, 246);
    doc.line(20, 45, 190, 45);

    // Sections
    const drawSection = (title: string, content: string | string[], y: number) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(156, 163, 175);
      doc.text(title, 20, y);
      
      doc.setTextColor(31, 41, 55);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      
      if (typeof content === 'string') {
        const lines = doc.splitTextToSize(content, 170);
        doc.text(lines, 20, y + 7);
        return y + 7 + (lines.length * 5) + 15;
      } else {
        let currentY = y + 7;
        content.forEach(bullet => {
          const lines = doc.splitTextToSize(bullet, 163);
          doc.setFillColor(79, 70, 229);
          doc.circle(22, currentY - 1, 0.5, 'F');
          doc.text(lines, 26, currentY);
          currentY += (lines.length * 5) + 4;
        });
        return currentY + 10;
      }
    };

    const nextY = drawSection("STRATEGIC SUMMARY", aiResult.summary, 60);
    drawSection("PROFESSIONAL IMPACT", aiResult.bullets, nextY);

    doc.save(`${formData.fullName}_NexaCV.pdf`);
  };

  return (
    <div className="  min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
       
       

       
      
      <Navbar />
      
      {/* Soft Background Accents */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-50/50 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-blue-50/50 rounded-full blur-[100px]" />
      </div>

      <main className="max-w-7xl mx-auto  pt-32 px-6 lg:px-8 pb-24 relative">
        <header className="mb-16 mt-25">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-indigo-600"></div>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-indigo-600">AI Resume Architect</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-slate-900 leading-[0.9]">
            The Future of <br />
            <span className="text-slate-400">Career Assets.</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* --- INPUT PANEL --- */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm">
              <div className="space-y-5">
                {[
                  { label: 'Full Name', name: 'fullName', icon: <User className="w-4 h-4"/> },
                  { label: 'Target Role', name: 'role', icon: <Briefcase className="w-4 h-4"/> },
                  { label: 'Email Address', name: 'email', icon: <Mail className="w-4 h-4"/> },
                ].map((f) => (
                  <div key={f.name} className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{f.label}</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors">
                        {f.icon}
                      </div>
                      <input 
                        name={f.name} onChange={handleChange}
                        className="w-full bg-slate-50 border-none rounded-2xl pl-11 pr-5 py-4 text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
                      />
                    </div>
                  </div>
                ))}
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Core Achievements</label>
                  <textarea 
                    name="experience" onChange={handleChange} rows={5}
                    className="w-full bg-slate-50 border-none rounded-2xl p-5 text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none resize-none"
                    placeholder="Describe your wins..."
                  />
                </div>

                <button 
                  onClick={handleGenerate} disabled={isGenerating}
                  className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 text-xs tracking-widest uppercase mt-4 shadow-lg shadow-indigo-200"
                >
                  {isGenerating ? 'Synthesizing...' : <><Zap className="w-4 h-4 fill-current"/> Generate Profile</>}
                </button>
              </div>
            </div>
          </div>

          {/* --- PREVIEW PANEL --- */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-xl overflow-hidden min-h-[700px]">
              {/* Top Toolbar */}
              <div className="px-8 py-4 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Document Preview</span>
              </div>

              <div className="p-10 md:p-16">
                {isGenerating ? (
                  <div className="animate-pulse space-y-10">
                    <div className="space-y-4">
                      <div className="h-12 w-2/3 bg-slate-100 rounded-xl" />
                      <div className="h-4 w-1/3 bg-slate-50 rounded-lg" />
                    </div>
                    <div className="space-y-4">
                      <div className="h-3 w-20 bg-slate-100 rounded" />
                      <div className="space-y-2">
                        <div className="h-4 w-full bg-slate-50 rounded" />
                        <div className="h-4 w-full bg-slate-50 rounded" />
                        <div className="h-4 w-4/5 bg-slate-50 rounded" />
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="h-3 w-24 bg-slate-100 rounded" />
                      {[1,2,3].map(i => <div key={i} className="h-16 w-full bg-slate-50 rounded-2xl" />)}
                    </div>
                  </div>
                ) : aiResult ? (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <header className="mb-12">
                      <h2 className="text-5xl font-bold text-slate-900 mb-2">{formData.fullName}</h2>
                      <div className="flex items-center gap-3 text-indigo-600 font-bold text-xs uppercase tracking-widest">
                        {formData.role} <span className="text-slate-200">|</span> <span className="text-slate-400 normal-case font-medium">{formData.email}</span>
                      </div>
                    </header>

                    <div className="space-y-12">
                      <section className="space-y-4">
                        <h4 className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em]">The Strategy</h4>
                        <p className="text-lg text-slate-600 leading-relaxed font-medium">{aiResult.summary}</p>
                      </section>

                      <section className="space-y-6">
                        <h4 className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em]">Key Milestones</h4>
                        <div className="space-y-6">
                          {aiResult.bullets.map((b, i) => (
                            <div key={i} className="group flex gap-6 p-4 -ml-4 rounded-2xl hover:bg-slate-50 transition-colors">
                              <span className="text-indigo-600 font-bold text-sm">0{i+1}</span>
                              <p className="text-slate-600 text-sm md:text-base leading-relaxed">{b}</p>
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>
                  </div>
                ) : (
                  <div className="h-[500px] flex flex-col items-center justify-center opacity-20">
                    <FileText className="w-12 h-12 mb-4" />
                    <p className="text-xs font-bold uppercase tracking-widest">Input your data to begin</p>
                  </div>
                )}
              </div>
            </div>

            {aiResult && (
              <button 
                onClick={exportPDF}
                className="w-full mt-6 bg-white border border-slate-200 text-slate-900 font-bold py-5 rounded-2xl hover:border-indigo-500 transition-all flex items-center justify-center gap-3 text-xs tracking-widest uppercase group"
              >
                <Download className="w-4 h-4 text-indigo-500 group-hover:-translate-y-1 transition-transform" />
                Download PDF Asset
              </button>
            )}
          </div>
        </div>
      </main>

    </div>
  );
};

export default NexaCV;