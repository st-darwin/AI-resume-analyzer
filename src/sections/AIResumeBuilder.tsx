import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { usePuterStore } from '../lib/puter';
import Navbar from '../components/Navbar';
import { FileText, Download, Zap, User, Mail, Briefcase } from 'lucide-react';
import { parseMarkdownToJson } from '../lib/utils';

const AIResumeBuilder = () => {
  const puter = usePuterStore();
  const [formData, setFormData] = useState({ fullName: '', email: '', role: '', experience: '' });
  const [aiResult, setAiResult] = useState<{ summary: string; bullets: string[] } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    puter.init();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    if (!formData.experience || !formData.role) return;

    setIsGenerating(true);
    setAiResult(null);

    const sophisticatedPrompt = `
      Act as a Tier-1 Executive Resume Strategist. 
      Analyze the following raw data for a ${formData.role} role:
      
      RAW CONTEXT: 
      ${formData.experience}

      TASK:
      1. Write a 8-8 sentence "Strategic Profile" (summary) that is punchy, high-level, and uses industry-specific power verbs.
      2. Write 7-8 detailed "Professional Milestones" (bullets) using the Google X-Y-Z formula.

      Return ONLY a valid JSON object:
      {
        "summary": "...",
        "bullets": ["...", "..."]
      }
    `;

    try {
      const response = await puter.ai.chat([
        {
          role: "system",
          content: "You are a helpful career assistant. Output only valid JSON. No markdown."
        },
        {
          role: "user",
          content: sophisticatedPrompt
        }
      ]);

      if (!response) {
        throw new Error("Received empty response from AI Gateway.");
      }

      let rawText = "";
      if (typeof response === 'string') {
        rawText = response;
      } else if (response.message && response.message.content) {
        rawText = response.message.content;
      } else {
        rawText = JSON.stringify(response);
      }

      let result;
      try {
        result = JSON.parse(rawText);
      } catch {
        result = parseMarkdownToJson(String(rawText));
      }

      setAiResult(result);
    } catch (e) {
      console.error("Synthesis Error:", e);
      alert("Failed to generate resume. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const exportPDF = () => {
    if (!aiResult) return;
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(17, 24, 39);
    doc.text((formData.fullName || 'Resume').toUpperCase(), 20, 25);

    doc.setFontSize(9);
    doc.setTextColor(79, 70, 229);
    doc.text((formData.role || 'Professional Role').toUpperCase(), 20, 32);

    doc.setTextColor(107, 114, 128);
    doc.text((formData.email || '').toLowerCase(), 190, 32, { align: 'right' });

    doc.setDrawColor(243, 244, 246);
    doc.line(20, 38, 190, 38);

    const drawSection = (title: string, content: string | string[], y: number) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(156, 163, 175);
      doc.text(title, 20, y);

      doc.setTextColor(31, 41, 55);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);

      if (typeof content === 'string') {
        const lines = doc.splitTextToSize(content, 170);
        doc.text(lines, 20, y + 6);
        return y + 6 + (lines.length * 5) + 12;
      } else {
        let currentY = y + 6;
        content.forEach(bullet => {
          const lines = doc.splitTextToSize(bullet, 163);
          doc.setFillColor(79, 70, 229);
          doc.circle(22, currentY - 1, 0.4, 'F');
          doc.text(lines, 26, currentY);
          currentY += (lines.length * 5) + 3;
        });
        return currentY + 8;
      }
    };

    const nextY = drawSection("STRATEGIC SUMMARY", aiResult.summary, 48);
    drawSection("PROFESSIONAL IMPACT", aiResult.bullets, nextY);

    doc.save(`${formData.fullName || 'Resume'}_NexaCV.pdf`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      <Navbar />
      <div className="mt-20">
           <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-50/40 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-blue-50/40 rounded-full blur-3xl" />
      </div>
      </div>

      {/* Ambient Background Accents */}
 

      <main className="max-w-7xl mx-auto pt-28 px-4 sm:px-6 lg:px-8 pb-24 relative">
        <header className="mb-12 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100/60 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">AI Resume Architect</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-900">
            The Future of <span className="text-slate-400">Career Assets.</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* --- INPUT PANEL --- */}
          <div className="lg:col-span-5">
            <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-sm space-y-5">
              {[
                { label: 'Full Name', name: 'fullName', placeholder: 'e.g. Alex Morgan', icon: <User className="w-4 h-4" /> },
                { label: 'Target Role', name: 'role', placeholder: 'e.g. Senior Frontend Architect', icon: <Briefcase className="w-4 h-4" /> },
                { label: 'Email Address', name: 'email', placeholder: 'e.g. alex@company.com', icon: <Mail className="w-4 h-4" /> },
              ].map((f) => (
                <div key={f.name} className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">{f.label}</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                      {f.icon}
                    </div>
                    <input 
                      name={f.name} 
                      onChange={handleChange}
                      placeholder={f.placeholder}
                      className="w-full bg-slate-50/80 border border-slate-200/60 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium text-slate-800 placeholder:text-slate-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                    />
                  </div>
                </div>
              ))}
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Core Achievements & Context</label>
                <textarea 
                  name="experience" 
                  onChange={handleChange} 
                  rows={4}
                  className="w-full bg-slate-50/80 border border-slate-200/60 rounded-2xl p-4 text-sm font-medium text-slate-800 placeholder:text-slate-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none resize-none"
                  placeholder="Paste your raw career history, key metrics, or background..."
                />
              </div>

              <button 
                onClick={handleGenerate} 
                disabled={isGenerating}
                className="cursor-pointer w-full bg-slate-900 text-white font-semibold py-4 rounded-2xl hover:scale-[1.01]  duration-300 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 text-xs tracking-wider uppercase shadow-md shadow-slate-900/10 disabled:opacity-50"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Synthesizing...
                  </span>
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5 fill-current text-indigo-400" />
                    Generate Profile
                  </>
                )}
              </button>
            </div>
          </div>

          {/* --- PREVIEW PANEL --- */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden min-h-[600px] flex flex-col">
              
              {/* Window Bar */}
              <div className="px-6 py-3.5 bg-slate-50/80 border-b border-slate-100 flex justify-between items-center">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Document Preview</span>
              </div>

              <div className="p-6 sm:p-10 md:p-12 flex-1 flex flex-col justify-center">
                {isGenerating ? (
                  <div className="animate-pulse space-y-8">
                    <div className="space-y-3">
                      <div className="h-10 w-3/5 bg-slate-100 rounded-xl" />
                      <div className="h-3 w-1/4 bg-slate-50 rounded-lg" />
                    </div>
                    <div className="space-y-3 pt-4">
                      <div className="h-2.5 w-20 bg-slate-100 rounded" />
                      <div className="space-y-2">
                        <div className="h-3.5 w-full bg-slate-50 rounded" />
                        <div className="h-3.5 w-full bg-slate-50 rounded" />
                        <div className="h-3.5 w-4/5 bg-slate-50 rounded" />
                      </div>
                    </div>
                    <div className="space-y-4 pt-4">
                      <div className="h-2.5 w-24 bg-slate-100 rounded" />
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-12 w-full bg-slate-50/60 rounded-xl" />
                      ))}
                    </div>
                  </div>
                ) : aiResult ? (
                  <div className="animate-in fade-in duration-500 space-y-8 my-auto">
                    <header className="border-b border-slate-100 pb-6">
                      <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-1.5 break-words">
                        {formData.fullName || 'Your Name'}
                      </h2>
                      <div className="flex flex-wrap items-center gap-2 text-indigo-600 font-semibold text-xs uppercase tracking-wider">
                        <span>{formData.role || 'Target Role'}</span>
                        {formData.email && (
                          <>
                            <span className="text-slate-300">•</span>
                            <span className="text-slate-400 font-normal lowercase">{formData.email}</span>
                          </>
                        )}
                      </div>
                    </header>

                    <div className="space-y-8">
                      <section className="space-y-2.5">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Strategic Summary</h4>
                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                          {aiResult.summary}
                        </p>
                      </section>

                      <section className="space-y-3">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Professional Milestones</h4>
                        <div className="space-y-3">
                          {aiResult.bullets.map((b, i) => (
                            <div key={i} className="flex items-start gap-3 sm:gap-4 p-3 -mx-3 rounded-xl hover:bg-slate-50/80 transition-colors">
                              <span className="text-indigo-600 font-mono text-xs font-bold pt-0.5">0{i + 1}</span>
                              <p className="text-slate-600 text-sm leading-relaxed">{b}</p>
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>
                  </div>
                ) : (
                  <div className="py-20 flex flex-col items-center justify-center text-slate-300 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-3 border border-slate-100">
                      <FileText className="w-5 h-5 text-slate-400" />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Input your details to render preview</p>
                  </div>
                )}
              </div>
            </div>

            {aiResult && (
              <button 
                onClick={exportPDF}
                className="cursor-pointer w-full bg-white border border-slate-200/80 text-slate-900 font-semibold py-4 rounded-2xl hover:border-indigo-500 hover:shadow-sm active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 text-xs tracking-wider uppercase group"
              >
                <Download className="w-4 h-4 text-indigo-600 group-hover:-translate-y-0.5 transition-transform" />
                Download PDF Asset
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIResumeBuilder;