import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

interface Resume {
    name: string;
    email: string;
    phone: string;
    experience: string;
    education: string;
    skills: string;
    projects: string;
}

const Template1 = ({ resume }: { resume: Resume }) => {
    return (
        <div className="bg-white min-h-full w-full md:aspect-[1/1.41] shadow-2xl relative overflow-hidden text-slate-800 transition-all duration-500">
            <div className="absolute top-0 left-0 w-1 md:w-2 h-full bg-[#606beb]" />
            <div className="p-6 md:p-12">
                <header className="relative z-10 border-b-2 border-slate-100 pb-6 md:pb-8 mb-8 md:mb-10">
                    <h1 className="text-3xl md:text-5xl font-[900] tracking-tighter text-slate-900 uppercase break-words">
                        {resume.name || "Your Name"}
                    </h1>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mt-4 text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                        <div className="flex items-center gap-2">
                            <span className="text-[#606beb]">EMAIL //</span> 
                            <span className="text-slate-600 truncate">{resume.email || "email@example.com"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[#606beb]">PHONE //</span> 
                            <span className="text-slate-600">{resume.phone || "+000 000 000"}</span>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 relative z-10">
                    <div className="md:col-span-8 space-y-8 md:order-1">
                        <section>
                            <h3 className="text-[10px] md:text-xs font-black text-[#606beb] uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                                Work_Experience
                                <span className="h-[1px] flex-grow bg-slate-100" />
                            </h3>
                            <div className="whitespace-pre-line text-sm leading-relaxed text-slate-600 font-medium">
                                {resume.experience || "Experience logs go here..."}
                            </div>
                        </section>
                        <section>
                            <h3 className="text-[10px] md:text-xs font-black text-[#606beb] uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                                Featured_Projects
                                <span className="h-[1px] flex-grow bg-slate-100" />
                            </h3>
                            <div className="whitespace-pre-line text-sm leading-relaxed  text-slate-600">
                                {resume.projects || "Projects you've built..."}
                            </div>
                        </section>
                    </div>

                    <div className="md:col-span-4 space-y-8 md:order-2">
                        <section>
                            <h3 className="text-[10px] md:text-xs font-black text-slate-900 uppercase tracking-[0.3em] mb-4">Education</h3>
                            <div className="text-sm font-bold text-slate-600 leading-tight">
                                {resume.education || "University info..."}
                            </div>
                        </section>
                        <section className="bg-slate-50 p-5 md:p-6 rounded-2xl border border-slate-100">
                            <h3 className="text-[10px] md:text-xs font-black text-slate-900 uppercase tracking-[0.3em] mb-4">Expertise</h3>
                            <div className="text-[11px] font-bold text-slate-500 leading-loose uppercase tracking-wider whitespace-pre-line">
                                {resume.skills || "Tech stacks..."}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};
const Template2 = ({ resume }: { resume: Resume }) => {
    return (
        <div className="bg-white min-h-full w-full md:aspect-[1/1.41] shadow-2xl overflow-hidden font-sans text-slate-900 border border-slate-100">
            <div className="p-10 md:p-16">
                {/* Header: Name and Contact on one line for a clean start */}
                <header className="flex flex-col md:flex-row justify-between items-baseline border-b border-slate-100 pb-10 mb-12">
                    <div>
                        <h1 className="text-4xl font-light tracking-tight text-slate-950 uppercase">
                            {resume.name.split(' ')[0] || "NAME"} <span className="font-bold">{resume.name.split(' ').slice(1).join(' ')}</span>
                        </h1>
                    </div>
                    <div className="flex flex-col text-right mt-4 md:mt-0">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{resume.email || "email@address.com"}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">{resume.phone || "000.000.0000"}</span>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    {/* Left Column (30%): Education and Skills */}
                    <div className="md:col-span-4 space-y-12">
                        <section>
                            <h3 className="text-[10px] font-black text-[#606beb] uppercase tracking-[0.3em] mb-4">Core_Stack</h3>
                            <div className="flex flex-col gap-3">
                                {(resume.skills || "React, Tailwind, Node").split(',').map((s, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">{s.trim()}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] mb-4">Education</h3>
                            <div className="text-[11px] leading-relaxed text-slate-500 font-medium">
                                {resume.education || "Institutional Details"}
                            </div>
                        </section>
                    </div>

                    {/* Right Column (70%): Experience and Projects */}
                    <div className="md:col-span-8 space-y-14">
                        <section>
                            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                                Experience
                                <div className="h-px flex-grow bg-slate-50" />
                            </h3>
                            <div className="whitespace-pre-line text-[13px] leading-relaxed text-slate-600 font-medium">
                                {resume.experience || "Your professional narrative..."}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                                Projects
                                <div className="h-px flex-grow bg-slate-50" />
                            </h3>
                            <div className="whitespace-pre-line text-[13px] leading-relaxed text-slate-600 font-medium">
                                {resume.projects || "Selected works and contributions..."}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};
const Template3 = ({ resume }: { resume: Resume }) => {
    return (
        <div className="bg-white min-h-full w-full md:aspect-[1/1.41] shadow-2xl overflow-hidden font-sans text-slate-800">
            {/* Top Decorative Bar */}
            <div className="h-2 w-full flex">
                <div className="h-full w-1/3 bg-slate-900" />
                <div className="h-full w-1/3 bg-[#606beb]" />
                <div className="h-full w-1/3 bg-slate-100" />
            </div>

            <div className="p-10 md:p-14">
                {/* Header: Centered & Sophisticated */}
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-black text-slate-900 tracking-tight uppercase mb-4">
                        {resume.name || "Your Name"}
                    </h1>
                    <div className="flex justify-center items-center gap-6">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{resume.email}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#606beb]" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{resume.phone}</span>
                    </div>
                </header>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    
                    {/* Left Side: The "Core" (Skills & Education) */}
                    <div className="md:col-span-4 space-y-10">
                        <section className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                            <h3 className="text-[10px] font-black text-[#606beb] uppercase tracking-[0.2em] mb-5">Tech_Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {(resume.skills || "React, Tailwind, Node").split(',').map((s, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-[9px] font-black rounded-lg shadow-sm uppercase">
                                        {s.trim()}
                                    </span>
                                ))}
                            </div>
                        </section>

                        <section className="px-2">
                            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-4">Academic</h3>
                            <div className="text-xs leading-relaxed text-slate-500 font-medium whitespace-pre-line">
                                {resume.education || "Education details..."}
                            </div>
                        </section>
                    </div>

                    {/* Right Side: The "Story" (Experience & Projects) */}
                    <div className="md:col-span-8 space-y-10">
                        <section>
                            <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                                <span className="text-[#606beb]">/</span> Experience
                            </h2>
                            <div className="whitespace-pre-line text-[13px] leading-[1.8] text-slate-600 font-medium pl-4 border-l border-slate-100">
                                {resume.experience || "Your professional impact..."}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                                <span className="text-[#606beb]">/</span> Projects
                            </h2>
                            <div className="space-y-4">
                                <div className="p-6 bg-slate-900 text-white rounded-[2rem] shadow-xl shadow-[#606beb]/10">
                                    <div className="whitespace-pre-line text-[12px] leading-relaxed opacity-90 font-light">
                                        {resume.projects || "What have you built?"}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Subtle Watermark */}
                <div className="mt-16 text-center">
                    <p className="text-[8px] font-bold text-slate-200 uppercase tracking-[0.5em]">System Verified // NexaCV Protocol</p>
                </div>
            </div>
        </div>
    );
};
const Template4 = ({ resume }: { resume: Resume }) => {
    return (
        <div className="bg-white min-h-full w-full md:aspect-[1/1.41] shadow-2xl overflow-hidden font-sans text-slate-900 border-x-[16px] border-slate-50">
            <div className="p-10 md:p-16">
                {/* Clean Left-Aligned Header */}
                <header className="mb-16">
                    <div className="inline-block bg-[#606beb] text-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                        Professional Profile
                    </div>
                    <h1 className="text-5xl md:text-6xl font-[1000] text-slate-900 tracking-tighter uppercase leading-none">
                        {resume.name || "YOUR NAME"}
                    </h1>
                    <div className="mt-6 flex flex-wrap gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <span>{resume.email}</span>
                        <span className="text-slate-200">|</span>
                        <span>{resume.phone}</span>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    {/* Sidebar: Skills & Education */}
                    <div className="md:col-span-4 space-y-12">
                        <section>
                            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 pb-2 border-b-2 border-slate-900 w-fit">
                                Capabilities
                            </h3>
                            <div className="flex flex-col gap-2">
                                {(resume.skills || "React, Tailwind, GSAP").split(',').map((s, i) => (
                                    <span key={i} className="text-xs font-bold text-slate-600 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-[#606beb]" />
                                        {s.trim()}
                                    </span>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 pb-2 border-b-2 border-slate-900 w-fit">
                                Academic
                            </h3>
                            <div className="text-[11px] leading-relaxed text-slate-500 font-bold italic whitespace-pre-line">
                                {resume.education}
                            </div>
                        </section>
                    </div>

                    {/* Main: Experience & Projects with Timeline Border */}
                    <div className="md:col-span-8 space-y-12 border-l border-slate-100 pl-8 relative">
                        <section className="relative">
                            {/* Decorative Node */}
                            <div className="absolute -left-[36.5px] top-1 w-4 h-4 rounded-full border-4 border-white bg-[#606beb]" />
                            <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] mb-6">
                                Experience_History
                            </h3>
                            <div className="whitespace-pre-line text-[13px] leading-[1.8] text-slate-600 font-medium">
                                {resume.experience || "Your career path..."}
                            </div>
                        </section>

                        <section className="relative">
                            {/* Decorative Node */}
                            <div className="absolute -left-[36.5px] top-1 w-4 h-4 rounded-full border-4 border-white bg-slate-900" />
                            <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] mb-6">
                                Build_Portfolio
                            </h3>
                            <div className="whitespace-pre-line text-[13px] leading-[1.8] text-slate-600 font-medium bg-slate-50 p-6 rounded-lg border border-slate-100">
                                {resume.projects || "Key deployments..."}
                            </div>
                        </section>
                    </div>
                </div>

                {/* Vertical Branding */}
                <div className="absolute right-6 bottom-20 rotate-90 origin-right">
                    <p className="text-[10px] font-black text-slate-100 uppercase tracking-[1em]">NEXACV_OS</p>
                </div>
            </div>
        </div>
    );
};
const Template5 = ({ resume }: { resume: Resume }) => {
    return (
        <div className="bg-[#fff] min-h-full w-full md:aspect-[1/1.41] shadow-2xl overflow-hidden font-sans text-slate-900 border-[1px] border-slate-100">
            {/* Split Background Effect */}
            <div className="flex h-full min-h-full">
                {/* Left: 60% Content */}
                <div className="w-[65%] p-10 md:p-14 border-r border-slate-100">
                    <header className="mb-16">
                        <h1 className="text-6xl font-black tracking-tighter text-slate-900 uppercase leading-[0.8] mb-6">
                            {resume.name.split(' ')[0] || "FIRST"}<br/>
                            <span className="text-[#606beb]">{resume.name.split(' ').slice(1).join(' ') || "LAST"}</span>
                        </h1>
                        <div className="h-1 w-20 bg-slate-900" />
                    </header>

                    <div className="space-y-12">
                        <section>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 mb-6 italic">History.log</h3>
                            <div className="whitespace-pre-line text-sm leading-[1.8] text-slate-700 font-medium">
                                {resume.experience}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 mb-6 italic">Projects.v1</h3>
                            <div className="whitespace-pre-line text-sm leading-[1.8] text-slate-700 font-medium p-8 bg-slate-50 rounded-tl-[3rem] border-t border-l border-slate-200">
                                {resume.projects}
                            </div>
                        </section>
                    </div>
                </div>

                {/* Right: 35% Information Panel */}
                <div className="w-[35%] bg-slate-50 p-10 flex flex-col justify-between">
                    <div className="space-y-12">
                        <section>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#606beb] mb-4">Channels</h4>
                            <div className="text-[11px] font-bold text-slate-600 space-y-2">
                                <p className="truncate">{resume.email}</p>
                                <p>{resume.phone}</p>
                            </div>
                        </section>

                        <section>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#606beb] mb-4">Stack_Index</h4>
                            <div className="flex flex-wrap gap-1.5">
                                {(resume.skills || "React, Tailwind").split(',').map((s, i) => (
                                    <span key={i} className="text-[9px] font-black bg-white border border-slate-200 px-2 py-1 rounded shadow-sm text-slate-500 uppercase">
                                        {s.trim()}
                                    </span>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#606beb] mb-4">Academic</h4>
                            <div className="text-[11px] leading-relaxed text-slate-600 font-bold whitespace-pre-line">
                                {resume.education}
                            </div>
                        </section>
                    </div>

                    <div className="rotate-[-90deg] origin-bottom-left translate-x-4 opacity-10">
                        <p className="text-4xl font-black uppercase tracking-tighter">NEXACV_2026</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
const Template6 = ({ resume }: { resume: Resume }) => {
    return (
        <div className="bg-white min-h-full w-full md:aspect-[1/1.41] shadow-2xl overflow-hidden font-mono text-slate-800 relative bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
            {/* Header: Centered Grid Box */}
            <div className="p-10">
                <header className="border-4 border-slate-900 p-8 bg-white shadow-[8px_8px_0px_0px_#606beb]">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                        <div>
                            <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900">
                                {resume.name || "USER_ID: NULL"}
                            </h1>
                            <p className="text-[10px] font-bold text-[#606beb] mt-1 tracking-widest uppercase">/ Software_Engineering_System</p>
                        </div>
                        <div className="text-[10px] font-black text-slate-400 space-y-1 uppercase">
                            <p>LOC: Nigeria // REMOTE</p>
                            <p>NET: {resume.email}</p>
                        </div>
                    </div>
                </header>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Left: Main Logs */}
                    <div className="md:col-span-8 space-y-8">
                        <section className="relative">
                            <h3 className="text-xs bg-slate-900 text-white w-fit px-3 py-1 font-bold mb-6 italic uppercase tracking-widest">
                                01_Career_Path
                            </h3>
                            <div className="whitespace-pre-line text-[12px] leading-relaxed text-slate-700 bg-white/80 backdrop-blur-sm border-2 border-slate-100 p-6 rounded-br-3xl">
                                {resume.experience}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xs bg-slate-900 text-white w-fit px-3 py-1 font-bold mb-6 italic uppercase tracking-widest">
                                02_Project_Repository
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="p-6 border-2 border-dashed border-slate-200 hover:border-[#606beb] transition-colors">
                                    <div className="whitespace-pre-line text-[12px] leading-relaxed text-slate-600">
                                        {resume.projects}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right: Modules */}
                    <div className="md:col-span-4 space-y-8">
                        <section className="border-2 border-slate-900 p-6 bg-white">
                            <h3 className="text-[10px] font-black uppercase mb-4 text-[#606beb]">System_Core</h3>
                            <div className="flex flex-col gap-2">
                                {(resume.skills || "JavaScript, React").split(',').map((s, i) => (
                                    <div key={i} className="flex justify-between items-center text-[10px] font-bold border-b border-slate-50 pb-1">
                                        <span>{s.trim()}</span>
                                        <span className="text-[#606beb]">100%</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="border-2 border-slate-900 p-6 bg-slate-900 text-white">
                            <h3 className="text-[10px] font-black uppercase mb-4 text-[#606beb]">Education</h3>
                            <div className="text-[10px] leading-relaxed font-medium opacity-80 whitespace-pre-line">
                                {resume.education}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};


const ResumeBuilder = () => {
    // 1. LAZY INITIALIZER: Loads data BEFORE the first render
    const [selectedTemplate, setSelectedTemplate] = useState<string>("template1")
    const [resume, setResume] = useState<Resume>(() => {
        // if no saved data, return empty fields
        const savedData = localStorage.getItem("resumeData");
        if (savedData) {
            try {
                return JSON.parse(savedData);
            } catch {
                console.error("Failed to parse resumeData");
            }
        }
        return {
            name: "",
            email: "",
            phone: "",
            experience: "",
            education: "",
            skills: "",
            projects: "",
        };
    });

    // 2. DEBOUNCED PERSISTENCE: Saves 800ms after you STOP typing
    useEffect(() => {
        const handler = setTimeout(() => {
            localStorage.setItem("resumeData", JSON.stringify(resume));
        }, 800);

        // Cleanup function: Kills the timer if user types again quickly
        return () => clearTimeout(handler);
    }, [resume]);

    const inputStyle = "w-full bg-white/60 backdrop-blur-sm border border-slate-200 p-4 rounded-2xl outline-none focus:ring-2 ring-[#606beb] focus:bg-white transition-all text-slate-800 placeholder-slate-400 font-medium shadow-sm";

   return (
        <div className='bg-[#f8fafc] bg-[url("/images/bg-light-mesh.svg")] bg-fixed bg-cover min-h-screen p-4 md:p-6'> 
            <Navbar />
            
            {/* Changed flex-col to flex-col-reverse or kept as col, 
                but ensured items don't overlap */}
            <div className='max-w-7xl mx-auto flex flex-col mt-8 md:flex-col xl:flex-row  gap-10 items-start'>
                
                {/* 1. INPUT SECTION */}
                {/* Removed 'sticky' for mobile, only added 'md:sticky' */}
                <section className='w-full md:w-full xl:w-[45%] xl:sticky md:top-6 order-2 md:order-1'>
                    <div className="mb-8 px-2">
                        <h1 className='text-3xl md:text-4xl font-black text-slate-900 tracking-tighter'>RESUME_BUILDER</h1>
                        <p className="text-[#606beb] text-xs font-bold tracking-widest uppercase mt-3 italic"> Powered by NexaCV </p>
                    </div>

                    {/* Adjusted padding for mobile (p-6) vs desktop (p-8) */}
                    <div className="bg-white/70 backdrop-blur-2xl p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)]">
                        <h2 className='text-slate-800 font-bold mb-6 flex items-center gap-2'>
                           <span className="w-2 h-2 rounded-full bg-[#606beb]" />
                           Personal Information
                        </h2>
                        
                        <form className='flex flex-col gap-4' onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input className={inputStyle} type="text" placeholder='Name' value={resume.name} onChange={(e) => setResume({...resume, name: e.target.value})} />
                                <input className={inputStyle} type="email" placeholder='Email' value={resume.email} onChange={(e) => setResume({...resume, email: e.target.value})} />
                            </div>
                            <input className={inputStyle} type="text" placeholder='Phone Number' value={resume.phone} onChange={(e) => setResume({...resume, phone: e.target.value})} />
                            
                            <h2 className='text-slate-800 font-bold mt-4 mb-2 flex items-center gap-2'>
                                <span className="w-2 h-2 rounded-full bg-[#606beb]" />
                                Detailed Content
                            </h2>
                            <textarea className={inputStyle} placeholder='Experience' rows={4} value={resume.experience} onChange={(e) => setResume({...resume, experience: e.target.value})} />
                            <textarea className={inputStyle} placeholder='Education' rows={3} value={resume.education} onChange={(e) => setResume({...resume, education: e.target.value})} />
                            <textarea className={inputStyle} placeholder='Skills' rows={3} value={resume.skills} onChange={(e) => setResume({...resume, skills: e.target.value})} />
                            <textarea className={inputStyle} placeholder='Projects' rows={4} value={resume.projects} onChange={(e) => setResume({...resume, projects: e.target.value})} />
                             <div className="mb-8 bg-white/70 backdrop-blur-2xl p-6 rounded-[2rem] border border-white shadow-sm">
    <h2 className='text-slate-800 font-bold mb-4 flex items-center gap-2'>
        <span className="w-2 h-2 rounded-full bg-[#606beb]" />
        Select Template.....
    </h2>
    
    <div className="grid grid-cols-4  gap-3">
        {["template1", "template2", "template3", "template4", "template5", "template6"].map((t, index) => (
            <label key={t} className="cursor-pointer">
                <input 
                    type="radio" 
                    name="template" 
                    value={t} 
                    className="hidden peer" 
                    checked={selectedTemplate === t}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                />
                <div className="peer-checked:bg-slate-900 peer-checked:text-white peer-checked:border-slate-900 bg-white border border-slate-200 text-slate-500 py-3 rounded-xl text-center text-[10px] font-black uppercase tracking-widest transition-all hover:border-[#606beb]">
                    {`T-0${index + 1}`}
                </div>
            </label>
        ))}
    </div>
</div>
                            

                        </form>
                    </div>
                </section>

                {/* 2. PREVIEW SECTION */}
                <section className='w-full md:mt-10 xl:w-[55%] flex flex-col order-1 md:order-2 mb-10 md:mb-0'>
                    <div className="flex justify-around items-center mb-6 md:mb-10">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Live System View</span>
                        <h1 className='text-slate-200 text-xl md:text-4xl font-black text-right uppercase'>Preview</h1>
                    </div>
                    {/* Added overflow-x-auto so the resume doesn't break the screen on small phones */}
                    <div className="md:sticky md:top-6 flex justify-center w-full overflow-hidden rounded-xl shadow-lg md:shadow-none">
                        <div className="w-full scale-[0.95] md:scale-100 origin-top">
                            {selectedTemplate === "template1" && <Template1 resume={resume} />}
                            {selectedTemplate === "template2" && <Template2 resume={resume} />}
                            {selectedTemplate === "template3" && <Template3 resume={resume} />}
                            {selectedTemplate === "template4" && <Template4 resume={resume} />}
                            {selectedTemplate === "template5" && <Template5 resume={resume} />}
                            {selectedTemplate === "template6" && <Template6 resume={resume} />}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default ResumeBuilder;
