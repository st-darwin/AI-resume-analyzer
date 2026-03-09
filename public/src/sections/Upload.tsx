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

      // 1. fs.upload returns an array. We need to grab the first item.
      const uploadResult = await fs.upload([file]);
      const uploadedFile = Array.isArray(uploadResult) ? uploadResult[0] : uploadResult;

      if (!uploadedFile || !uploadedFile.path) {
        throw new Error("Failed to upload PDF: No path returned.");
      }

      // 2. Convert PDF to image
      setStatusText("Converting PDF to image...");
      // Using uploadedFile.path ensures we are passing a string path
      const imagePath = await convertPdfToImage(uploadedFile.path); 

      setStatusText("Preparing data...");
      const UUID = generateUUID();

      const data = {
        id: UUID,
        resumePath: uploadedFile.path, // String path (e.g., /AppData/...)
        imagePath,
        jobTitle,
        jobDescription,
        companyName,
        feedback: "",
      };

      // Initial save to ensure KV has the record
      await kv.set(`resume:${UUID}`, JSON.stringify(data));

      // 3. Analyze the resume using AI
      setStatusText("Analyzing resume...");
      const feedback = await ai.feedback(
        uploadedFile.path,
        prepareInstructions({ jobTitle, jobDescription })
      );

      // Robustly extract the text content from the AI response
      const feedbackText =
        typeof feedback?.message?.content === "string"
          ? feedback.message.content
          : (Array.isArray(feedback?.message?.content) 
              ? feedback.message.content[0] 
              : JSON.stringify(feedback));

      try {
        // Attempt to clean the text if the AI wrapped it in markdown code blocks
        const cleanedJson = feedbackText.replace(/```json|```/g, "").trim();
        data.feedback = JSON.parse(cleanedJson);
      } catch {
        data.feedback = feedbackText; // fallback to raw text
      }

      // Final save with feedback included
      await kv.set(`resume:${UUID}`, JSON.stringify(data));

      setStatusText("Analysis complete! Redirecting...");
      navigate(`/resume/${UUID}`);
    } catch (err) {
      console.error("Upload/Analysis Error:", err);
      setStatusText((err as Error).message || "An unexpected error occurred.");
      setIsProcessing(false); // Reset state so user can try again
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a PDF file.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const companyName = (formData.get("company-name") as string) || "";
    const jobTitle = (formData.get("job-title") as string) || "";
    const jobDescription = (formData.get("job-description") as string) || "";

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main className='bg-[url("/images/bg-main.svg")] bg-cover min-h-screen'>
      <Navbar />

      <section className="main-section max-w-3xl mx-auto px-4 py-10">
        <div className="page-heading text-center">
          <h1 className="text-4xl font-bold mb-3">
            Smart Feedback for Your Dream Job
          </h1>

          {isProcessing ? (
            <>
              <h2 className="text-lg mb-5">{statusText}</h2>
              <img
                src="/images/resume-scan.gif"
                className="w-full max-w-md mx-auto"
                alt="Processing"
              />
            </>
          ) : (
            <h2 className="text-lg mb-5">
              Drop your PDF resume for an ATS score and improvement tips
            </h2>
          )}

          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mt-5"
            >
              <div className="form-div flex flex-col">
                <label className="mb-1 font-medium">Company Name</label>
                <input
                  type="text"
                  name="company-name"
                  placeholder="Company name"
                  className="p-2 rounded hover:border"
                  required
                />
              </div>

              <div className="form-div flex flex-col">
                <label className="mb-1 font-medium">Job Title</label>
                <input
                  type="text"
                  name="job-title"
                  placeholder="Job Title"
                  className="p-2 rounded hover:border"
                  required
                />
              </div>

              <div className="form-div flex flex-col">
                <label className="mb-1 font-medium">Job Description</label>
                <textarea
                  rows={5}
                  name="job-description"
                  placeholder="Job Description"
                  className="p-2 rounded hover:border"
                  required
                />
              </div>

              <div className="form-div flex flex-col">
                <label className="mb-1 font-medium">
                  Upload Resume (PDF only)
                </label>
                <FileUploader file={file} onFileSelect={handleFileSelect} />
              </div>

              <button
                className="primary-button bg-blue-600 text-white p-3 rounded-full mt-2 hover:bg-blue-700 transition"
                type="submit"
              >
                Analyze Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;