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

// Pass the generated UUID into the history entry
const saveToHistory = async (id: string, fileName: string, score: number, feedback: Feedback) => {
  try {
    const raw = await kv.get('nexa_cv_history');
    const history = raw ? JSON.parse(raw as string) : [];
    const newEntry = {
      id, // Use the real resume UUID here instead of crypto.randomUUID()
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

      const finalScore = data.feedback?.ATS?.score ?? data.feedback?.score ?? 0;
      await saveToHistory(UUID, file.name, finalScore, data.feedback);

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
    <main className="min-h-screen bg-slate-50/50 text-slate-900 selection:bg-indigo-500/10 selection:text-indigo-900">
      <div className="sticky top-0 z-50 mb-6">
        <Navbar />
      </div>

      <section className="relative max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-20">
        {/* Soft Ambient Background Elements */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-200/30 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10">
          <header className="text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200/80 shadow-xs">

              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Upload and Be Amazed</p>
            </div>
            <h1 className="text-4xl sm:text-5xl font-[1000] tracking-tight text-slate-900 leading-tight">
              Get your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Resume</span> Recruiter-Ready.
            </h1>
            <p className="text-base text-slate-500 max-w-md mx-auto font-medium">
              {isProcessing 
                ? "Dissecting your career history to find the perfect match..." 
                : "Drop your CV below to receive an instant ATS compatibility score."
              }
            </p>
          </header>

          <div className="bg-white rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-200/60 overflow-hidden transition-all duration-300">
            {isProcessing ? (
              <div className="p-16 sm:p-24 flex flex-col items-center justify-center text-center">
                <div className="relative mb-8">
                  <div className="absolute inset-[-12px] rounded-full bg-indigo-50 animate-ping opacity-75" />
                  <div className="relative bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                    <img src="/images/resume-scan.gif" className="w-16 h-16 object-contain" alt="Processing" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">{statusText}</h2>
                <p className="text-slate-400 text-sm font-medium">Sit tight, this won't take long.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 sm:p-10 lg:p-12 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Target Company</label>
                    <input
                      type="text"
                      name="company-name"
                      placeholder="e.g. Google, Stripe"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm placeholder:text-slate-300 font-medium text-slate-800"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Desired Role</label>
                    <input
                      type="text"
                      name="job-title"
                      placeholder="e.g. Frontend Engineer"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm placeholder:text-slate-300 font-medium text-slate-800"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Job Description</label>
                  <textarea
                    rows={4}
                    name="job-description"
                    placeholder="Paste job requirements here..."
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm resize-none placeholder:text-slate-300 font-medium text-slate-800 leading-relaxed"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Your Resume (PDF)</label>
                  <div className="p-1 bg-slate-50/55 rounded-2xl border border-dashed border-slate-200 hover:border-indigo-300 transition-colors">
                    <FileUploader file={file} onFileSelect={handleFileSelect} />
                  </div>
                </div>

                <button
                  type="submit"
                  className="group relative w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg shadow-slate-900/10 hover:bg-slate-800 active:scale-[0.99] transition-all duration-200 overflow-hidden cursor-pointer"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 text-sm tracking-wide">
                    Generate Analysis
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </form>
            )}
          </div>
          
          <p className="text-center text-slate-400 text-xs mt-6 font-medium">
            Your data is processed securely via Nexa AI.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Upload;