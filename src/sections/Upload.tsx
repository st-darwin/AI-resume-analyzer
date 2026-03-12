import { type FormEvent, useState } from "react";
import Navbar from "../components/Navbar";
import FileUploader from "../components/FileUploader";
import { usePuterStore } from "../lib/puter";
import { useNavigate } from "react-router-dom";
import { generateUUID } from "../lib/utils";
import { prepareInstructions } from "../constants";
import { convertPdfToImage } from "../lib/pdf2img";

const Upload = () => {
  const { fs, kv, ai } = usePuterStore();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const saveToHistory = async (fileName: string, score: number, feedback: any) => {
    try {
      const raw = await kv.get('nexa_cv_history');
      const history = raw ? JSON.parse(raw as string) : [];
      const newEntry = {
        id: crypto.randomUUID(), 
        fileName,
        score,
        feedback,
        timestamp: Date.now()
      };
      const updated = [newEntry, ...history].slice(0, 10);
      await kv.set('nexa_cv_history', JSON.stringify(updated));
    } catch (e) {
      console.error("Save failed:", e);
    }
  };

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file only.");
      return;
    }

    try {
      setIsProcessing(true);
      setStatusText("Uploading the PDF...");
      const uploadResult = await fs.upload([file]);
      const uploadedFile = Array.isArray(uploadResult) ? uploadResult[0] : uploadResult;

      if (!uploadedFile || !uploadedFile.path) {
        throw new Error("Failed to upload PDF: No path returned.");
      }

      setStatusText("Converting PDF to image...");
      const imagePath = await convertPdfToImage(uploadedFile.path); 

      setStatusText("Preparing data...");
      const UUID = generateUUID();

      const data = {
        id: UUID,
        resumePath: uploadedFile.path,
        imagePath,
        jobTitle,
        jobDescription,
        companyName,
        feedback: {} as any,
      };

      setStatusText("Analyzing resume...");
      const feedback = await ai.feedback(
        uploadedFile.path,
        prepareInstructions({ jobTitle, jobDescription })
      );

      const feedbackText =
        typeof feedback?.message?.content === "string"
          ? feedback.message.content
          : (Array.isArray(feedback?.message?.content) 
              ? feedback.message.content[0] 
              : JSON.stringify(feedback));

      try {
        const cleanedJson = feedbackText.replace(/```json|```/g, "").trim();
        data.feedback = JSON.parse(cleanedJson);
      } catch {
        data.feedback = { raw: feedbackText };
      }

      await kv.set(`resume:${UUID}`, JSON.stringify(data));
      const finalScore = data.feedback.score || 0;
      await saveToHistory(file.name, finalScore, data.feedback);

      setStatusText("Analysis complete! Redirecting...");
      navigate(`/resume/${UUID}`);
    } catch (err) {
      console.error("Upload/Analysis Error:", err);
      setStatusText((err as Error).message || "An unexpected error occurred.");
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a PDF file.");
      return;
    }
    const formData = new FormData(e.currentTarget);
    handleAnalyze({ 
      companyName: formData.get("company-name") as string, 
      jobTitle: formData.get("job-title") as string, 
      jobDescription: formData.get("job-description") as string, 
      file 
    });
  };

  return (
    <main className="min-h-screen bg-[#FDFDFD] text-slate-900 selection:bg-blue-100">
      <Navbar />

      <section className="relative max-w-5xl mx-auto px-6 py-20 lg:py-28">
        {/* Soft Ambient Background Elements */}
        <div className="absolute top-10 left-10 w-80 h-80 bg-blue-100/50 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-100/50 rounded-full blur-[100px]" />

        <div className="relative z-10">
          <header className="text-center mb-16 space-y-4">
            <div className="inline-block px-4 py-1.5 mb-2 rounded-full bg-blue-50 border border-blue-100 shadow-sm">
              <p className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.2em]">Nexa AI Powered</p>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
              Get your <span className="text-blue-600">Resume</span> <br /> 
              Recruiter-Ready.
            </h1>
            <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
              {isProcessing 
                ? "Dissecting your career history to find the perfect match..." 
                : "Drop your CV below to get an instant ATS score and data-driven feedback."
              }
            </p>
          </header>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden transition-all duration-500">
              {isProcessing ? (
                <div className="p-16 flex flex-col items-center justify-center text-center">
                  <div className="relative mb-10">
                    <div className="absolute inset-[-10px] rounded-full bg-blue-50 animate-ping opacity-75"></div>
                    <div className="relative bg-white p-6 rounded-full shadow-lg border border-slate-50">
                      <img src="/images/resume-scan.gif" className="w-24 h-24 object-cover" alt="Processing" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">{statusText}</h2>
                  <p className="text-slate-400 font-medium">Sit tight, this won't take long.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-10 md:p-14 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Target Company</label>
                      <input
                        type="text"
                        name="company-name"
                        placeholder="Google, Stripe, etc."
                        className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/40 transition-all placeholder:text-slate-300"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Desired Role</label>
                      <input
                        type="text"
                        name="job-title"
                        placeholder="Frontend Engineer"
                        className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/40 transition-all placeholder:text-slate-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Job Description</label>
                    <textarea
                      rows={3}
                      name="job-description"
                      placeholder="Paste requirements here to match your CV skills..."
                      className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/40 transition-all resize-none placeholder:text-slate-300"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Your Resume</label>
                    <div className="p-1.5 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-300 transition-colors">
                      <FileUploader file={file} onFileSelect={handleFileSelect} />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="group relative w-full bg-slate-900 text-white font-bold py-5 rounded-2xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.2)] hover:scale-103 duration-1000 active:scale-80 transition-all duration-300 active:scale-[0.98] overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 tracking-wide">
                      Generate Analysis
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                </form>
              )}
            </div>
            
            <p className="text-center text-slate-400 text-xs mt-8 font-medium">
              Your data is processed securely via Nexa AI.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Upload;
