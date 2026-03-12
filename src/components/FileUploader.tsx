import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "../lib/utils";

interface FileUploaderProps {
  file: File | null;
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ file, onFileSelect }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selected = acceptedFiles[0] || null;
      onFileSelect?.(selected);
    },
    [onFileSelect]
  );

  const maxFileSize = 20 * 1024 * 1024;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [".pdf"] },
    maxSize: maxFileSize,
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`transition-all duration-300 rounded-[2rem] p-4 text-center cursor-pointer
          ${isDragActive 
            ? "border-2 border-dashed border-blue-500 bg-blue-50" 
            : "border-2 border-dashed border-slate-200 bg-white hover:border-blue-400 hover:bg-slate-50"
          } ${file ? "border-solid border-slate-100 bg-slate-50/30" : ""}`}
      >
        <input {...getInputProps()} />

        <div className="space-y-4">
          {file ? (
            <div 
              className="relative group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Success Indicator Badge */}
              <div className="absolute -top-3 -right-3 bg-green-500 text-white rounded-full p-1.5 shadow-lg border-2 border-white">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div className="flex flex-col items-center space-y-4">
                {/* Centered Large Icon */}
                <div className="relative">
                  <div className="bg-red-50 p-4 rounded-2xl transition-transform group-hover:scale-105 duration-300">
                    <img src="/images/pdf.png" alt="pdf" className="w-12 h-12 object-contain" />
                  </div>
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-red-200/20 blur-xl rounded-full -z-10" />
                </div>

                <div className="text-center w-full px-4">
                  <p className="text-sm font-bold text-slate-900 truncate mx-auto max-w-[200px]">
                    {file.name}
                  </p>
                  <div className="flex items-center justify-center space-x-2 mt-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                      {formatSize(file.size)}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                      Ready to Analyze
                    </span>
                  </div>
                </div>

                <div className="w-full pt-2">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 group/btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onFileSelect?.(null);
                    }}
                  >
                    <svg className="w-4 h-4 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span className="text-[11px] font-bold uppercase tracking-widest">Remove File</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center py-4">
              {/* Cloud Upload Icon */}
              <div className="mb-4 p-4 bg-blue-50 rounded-full text-blue-500">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>

              <div className="space-y-1">
                <p className="text-base text-slate-700">
                  <span className="font-bold text-blue-600">Select your CV</span> or drag & drop
                </p>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.15em]">
                  PDF format (Max {formatSize(maxFileSize)})
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
