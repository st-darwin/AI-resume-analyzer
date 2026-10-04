import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import jsPDF from 'jspdf';
import { Download, Zap, Terminal, Globe, Award } from 'lucide-react';
import { toPng } from 'html-to-image';

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
            <div className="p-6 sm:p-8 md:p-12">
                <header className="relative z-10 border-b border-slate-100 pb-6 md:pb-8 mb-6 md:mb-10">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-[900] tracking-tighter text-slate-900 uppercase break-words">
                        {resume.name || "Your Name"}
                    </h1>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-4 text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                        <div className="flex items-center gap-2 overflow-hidden">
                            <span className="text-[#606beb] shrink-0">EMAIL //</span> 
                            <span className="text-slate-600 truncate">{resume.email || "email@example.com"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[#606beb] shrink-0">PHONE //</span> 
                            <span className="text-slate-600">{resume.phone || "+000 000 000"}</span>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 relative z-10">
                    <div className="md:col-span-8 space-y-6 md:space-y-8 md:order-1">
                        <section>
                            <h3 className="text-[10px] md:text-xs font-black text-[#606beb] uppercase tracking-[0.4em] mb-3 md:mb-4 flex items-center gap-2">
                                Work_Experience
                                <span className="h-[1px] flex-grow bg-slate-100" />
                            </h3>
                            <div className="whitespace-pre-line text-xs sm:text-sm leading-relaxed text-slate-600 font-medium">
                                {resume.experience || "Experience logs go here..."}
                            </div>
                        </section>
                        <section>
                            <h3 className="text-[10px] md:text-xs font-black text-[#606beb] uppercase tracking-[0.4em] mb-3 md:mb-4 flex items-center gap-2">
                                Featured_Projects
                                <span className="h-[1px] flex-grow bg-slate-100" />
                            </h3>
                            <div className="whitespace-pre-line text-xs sm:text-sm leading-relaxed text-slate-600">
                                {resume.projects || "Projects you've built..."}
                            </div>
                        </section>
                    </div>

                    <div className="md:col-span-4 space-y-6 md:space-y-8 md:order-2">
                        <section>
                            <h3 className="text-[10px] md:text-xs font-black text-slate-900 uppercase tracking-[0.3em] mb-3 md:mb-4">Education</h3>
                            <div className="text-xs sm:text-sm font-bold text-slate-600 leading-tight">
                                {resume.education || "University info..."}
                            </div>
                        </section>
                        <section className="bg-slate-50 p-4 sm:p-5 md:p-6 rounded-2xl border border-slate-100">
                            <h3 className="text-[10px] md:text-xs font-black text-slate-900 uppercase tracking-[0.3em] mb-3 md:mb-4">Expertise</h3>
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
            <div className="p-6 sm:p-10 md:p-16">
                <header className="flex flex-col sm:flex-row justify-between sm:items-baseline border-b border-slate-100 pb-6 sm:pb-10 mb-8 sm:mb-12 gap-2">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-950 uppercase break-words">
                            {resume.name.split(' ')[0] || "NAME"} <span className="font-bold">{resume.name.split(' ').slice(1).join(' ')}</span>
                        </h1>
                    </div>
                    <div className="flex flex-col sm:text-right">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] break-all">{resume.email || "email@address.com"}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">{resume.phone || "000.000.0000"}</span>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                    <div className="md:col-span-4 space-y-8 md:space-y-12">
                        <section>
                            <h3 className="text-[10px] font-black text-[#606beb] uppercase tracking-[0.3em] mb-4">Core_Stack</h3>
                            <div className="flex flex-col gap-3">
                                {(resume.skills || "React, Tailwind, Node").split(',').map((s, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-1 h-1 rounded-full bg-slate-300 shrink-0" />
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

                    <div className="md:col-span-8 space-y-8 md:space-y-14">
                        <section>
                            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] mb-4 md:mb-6 flex items-center gap-4">
                                Experience
                                <div className="h-px flex-grow bg-slate-50" />
                            </h3>
                            <div className="whitespace-pre-line text-xs sm:text-[13px] leading-relaxed text-slate-600 font-medium">
                                {resume.experience || "Your professional narrative..."}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] mb-4 md:mb-6 flex items-center gap-4">
                                Projects
                                <div className="h-px flex-grow bg-slate-50" />
                            </h3>
                            <div className="whitespace-pre-line text-xs sm:text-[13px] leading-relaxed text-slate-600 font-medium">
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
            <div className="h-2 w-full flex">
                <div className="h-full w-1/3 bg-slate-900" />
                <div className="h-full w-1/3 bg-[#606beb]" />
                <div className="h-full w-1/3 bg-slate-100" />
            </div>

            <div className="p-6 sm:p-10 md:p-14">
                <header className="text-center mb-8 md:mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase mb-3 md:mb-4 break-words">
                        {resume.name || "Your Name"}
                    </h1>
                    <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-6">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest break-all">{resume.email}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#606beb] hidden sm:block" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{resume.phone}</span>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                    <div className="md:col-span-4 space-y-8 md:space-y-10">
                        <section className="bg-slate-50 p-5 sm:p-6 rounded-3xl border border-slate-100">
                            <h3 className="text-[10px] font-black text-[#606beb] uppercase tracking-[0.2em] mb-4 sm:mb-5">Tech_Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {(resume.skills || "React, Tailwind, Node").split(',').map((s, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-[9px] font-black rounded-lg shadow-sm uppercase">
                                        {s.trim()}
                                    </span>
                                ))}
                            </div>
                        </section>

                        <section className="px-2">
                            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-3 md:mb-4">Academic</h3>
                            <div className="text-xs leading-relaxed text-slate-500 font-medium whitespace-pre-line">
                                {resume.education || "Education details..."}
                            </div>
                        </section>
                    </div>

                    <div className="md:col-span-8 space-y-8 md:space-y-10">
                        <section>
                            <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.4em] mb-4 md:mb-6 flex items-center gap-3">
                                <span className="text-[#606beb]">/</span> Experience
                            </h2>
                            <div className="whitespace-pre-line text-xs sm:text-[13px] leading-[1.8] text-slate-600 font-medium pl-4 border-l border-slate-100">
                                {resume.experience || "Your professional impact..."}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.4em] mb-4 md:mb-6 flex items-center gap-3">
                                <span className="text-[#606beb]">/</span> Projects
                            </h2>
                            <div className="space-y-4">
                                <div className="p-5 sm:p-6 bg-slate-900 text-white rounded-[2rem] shadow-xl shadow-[#606beb]/10">
                                    <div className="whitespace-pre-line text-xs sm:text-[12px] leading-relaxed opacity-90 font-light">
                                        {resume.projects || "What have you built?"}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                <div className="mt-12 md:mt-16 text-center">
                    <p className="text-[8px] font-bold text-slate-200 uppercase tracking-[0.5em]">System Verified // NexaCV Protocol</p>
                </div>
            </div>
        </div>
    );
};

const Template4 = ({ resume }: { resume: Resume }) => {
    return (
        <div className="bg-white min-h-full w-full md:aspect-[1/1.41] shadow-2xl overflow-hidden font-sans text-slate-900 border-x-4 sm:border-x-[16px] border-slate-50">
            <div className="p-6 sm:p-10 md:p-16">
                <header className="mb-10 sm:mb-16">
                    <div className="inline-block bg-[#606beb] text-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                        Professional Profile
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-[1000] text-slate-900 tracking-tighter uppercase leading-none break-words">
                        {resume.name || "YOUR NAME"}
                    </h1>
                    <div className="mt-4 sm:mt-6 flex flex-wrap gap-3 sm:gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <span className="break-all">{resume.email}</span>
                        <span className="text-slate-200 hidden sm:inline">|</span>
                        <span>{resume.phone}</span>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                    <div className="md:col-span-4 space-y-8 md:space-y-12">
                        <section>
                            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 sm:mb-6 pb-2 border-b-2 border-slate-900 w-fit">
                                Capabilities
                            </h3>
                            <div className="flex flex-col gap-2">
                                {(resume.skills || "React, Tailwind, GSAP").split(',').map((s, i) => (
                                    <span key={i} className="text-xs font-bold text-slate-600 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-[#606beb] shrink-0" />
                                        {s.trim()}
                                    </span>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 sm:mb-6 pb-2 border-b-2 border-slate-900 w-fit">
                                Academic
                            </h3>
                            <div className="text-[11px] leading-relaxed text-slate-500 font-bold italic whitespace-pre-line">
                                {resume.education}
                            </div>
                        </section>
                    </div>

                    <div className="md:col-span-8 space-y-8 md:space-y-12 md:border-l md:border-slate-100 md:pl-8 relative">
                        <section className="relative">
                            <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] mb-4 sm:mb-6">
                                Experience_History
                            </h3>
                            <div className="whitespace-pre-line text-xs sm:text-[13px] leading-[1.8] text-slate-600 font-medium">
                                {resume.experience || "Your career path..."}
                            </div>
                        </section>

                        <section className="relative">
                            <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] mb-4 sm:mb-6">
                                Build_Portfolio
                            </h3>
                            <div className="whitespace-pre-line text-xs sm:text-[13px] leading-[1.8] text-slate-600 font-medium bg-slate-50 p-5 sm:p-6 rounded-lg border border-slate-100">
                                {resume.projects || "Key deployments..."}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Template5 = ({ resume }: { resume: Resume }) => {
    return (
        <div className="bg-[#fff] min-h-full w-full md:aspect-[1/1.41] shadow-2xl overflow-hidden font-sans text-slate-900 border border-slate-100">
            <div className="flex flex-col md:flex-row h-full min-h-full">
                <div className="w-full md:w-[65%] p-6 sm:p-10 md:p-14 border-b md:border-b-0 md:border-r border-slate-100">
                    <header className="mb-10 sm:mb-16">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-slate-900 uppercase leading-[1.1] md:leading-[0.8] mb-4 sm:mb-6 break-words">
                            {resume.name.split(' ')[0] || "FIRST"}<br/>
                            <span className="text-[#606beb]">{resume.name.split(' ').slice(1).join(' ') || "LAST"}</span>
                        </h1>
                        <div className="h-1 w-20 bg-slate-900" />
                    </header>

                    <div className="space-y-8 sm:space-y-12">
                        <section>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 mb-4 sm:mb-6 italic">History.log</h3>
                            <div className="whitespace-pre-line text-xs sm:text-sm leading-[1.8] text-slate-700 font-medium">
                                {resume.experience}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 mb-4 sm:mb-6 italic">Projects.v1</h3>
                            <div className="whitespace-pre-line text-xs sm:text-sm leading-[1.8] text-slate-700 font-medium p-5 sm:p-8 bg-slate-50 rounded-2xl md:rounded-tl-[3rem] border-t border-l border-slate-200">
                                {resume.projects}
                            </div>
                        </section>
                    </div>
                </div>

                <div className="w-full md:w-[35%] bg-slate-50 p-6 sm:p-10 flex flex-col justify-between">
                    <div className="space-y-8 sm:space-y-12">
                        <section>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#606beb] mb-3 sm:mb-4">Channels</h4>
                            <div className="text-[11px] font-bold text-slate-600 space-y-2">
                                <p className="break-all">{resume.email}</p>
                                <p>{resume.phone}</p>
                            </div>
                        </section>

                        <section>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#606beb] mb-3 sm:mb-4">Stack_Index</h4>
                            <div className="flex flex-wrap gap-1.5">
                                {(resume.skills || "React, Tailwind").split(',').map((s, i) => (
                                    <span key={i} className="text-[9px] font-black bg-white border border-slate-200 px-2 py-1 rounded shadow-sm text-slate-500 uppercase">
                                        {s.trim()}
                                    </span>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#606beb] mb-3 sm:mb-4">Academic</h4>
                            <div className="text-[11px] leading-relaxed text-slate-600 font-bold whitespace-pre-line">
                                {resume.education}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Template6 = ({ resume }: { resume: Resume }) => {
    return (
        <div className="bg-white min-h-full w-full md:aspect-[1/1.41] shadow-2xl overflow-hidden font-mono text-slate-800 relative bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
            <div className="p-6 sm:p-10">
                <header className="border-2 sm:border-4 border-slate-900 p-6 sm:p-8 bg-white shadow-[4px_4px_0px_0px_#606beb] sm:shadow-[8px_8px_0px_0px_#606beb]">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                        <div>
                            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter text-slate-900 break-words">
                                {resume.name || "USER_ID: NULL"}
                            </h1>
                            <p className="text-[10px] font-bold text-[#606beb] mt-1 tracking-widest uppercase">/ Software_Engineering_System</p>
                        </div>
                        <div className="text-[10px] font-black text-slate-400 space-y-1 uppercase">
                            <p>LOC: Nigeria // REMOTE</p>
                            <p className="break-all">NET: {resume.email}</p>
                        </div>
                    </div>
                </header>

                <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-8 space-y-8">
                        <section className="relative">
                            <h3 className="text-xs bg-slate-900 text-white w-fit px-3 py-1 font-bold mb-4 sm:mb-6 italic uppercase tracking-widest">
                                01_Career_Path
                            </h3>
                            <div className="whitespace-pre-line text-xs sm:text-[12px] leading-relaxed text-slate-700 bg-white/80 backdrop-blur-sm border-2 border-slate-100 p-5 sm:p-6 rounded-br-3xl">
                                {resume.experience}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xs bg-slate-900 text-white w-fit px-3 py-1 font-bold mb-4 sm:mb-6 italic uppercase tracking-widest">
                                02_Project_Repository
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="p-5 sm:p-6 border-2 border-dashed border-slate-200">
                                    <div className="whitespace-pre-line text-xs sm:text-[12px] leading-relaxed text-slate-600">
                                        {resume.projects}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="md:col-span-4 space-y-8">
                        <section className="border-2 border-slate-900 p-5 sm:p-6 bg-white">
                            <h3 className="text-[10px] font-black uppercase mb-4 text-[#606beb]">System_Core</h3>
                            <div className="flex flex-col gap-2">
                                {(resume.skills || "JavaScript, React").split(',').map((s, i) => (
                                    <div key={i} className="flex justify-between items-center text-[10px] font-black border-b border-slate-50 pb-1">
                                        <span className="truncate pr-2">{s.trim()}</span>
                                        <span className="text-[#606beb] shrink-0">100%</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="border-2 border-slate-900 p-5 sm:p-6 bg-slate-900 text-white">
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

const Template7 = ({ resume }: { resume: Resume }) => (
    <div className="bg-white min-h-full w-full md:aspect-[1/1.41] p-6 sm:p-10 md:p-12 font-mono text-slate-900 border-2 sm:border-4 border-slate-900 shadow-[6px_6px_0px_0px_#606beb] sm:shadow-[12px_12px_0px_0px_#606beb]">
        <header className="border-b-2 sm:border-b-4 border-slate-900 pb-6 sm:pb-8 mb-6 sm:mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter break-words">{resume.name}</h1>
            <p className="mt-2 sm:mt-4 font-bold text-lg sm:text-xl text-[#606beb]">Portfolio // 2026</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4 space-y-6 md:space-y-8">
                <section>
                    <h3 className="bg-slate-900 text-white px-2 py-1 text-xs font-bold uppercase mb-4 w-fit">Contact_Info</h3>
                    <p className="text-[10px] font-bold break-all">{resume.email}</p>
                    <p className="text-[10px] font-bold mt-1">{resume.phone}</p>
                </section>
                <section>
                    <h3 className="bg-[#606beb] text-white px-2 py-1 text-xs font-bold uppercase mb-4 w-fit">Tech_Stack</h3>
                    <div className="flex flex-col gap-1 text-[10px] font-bold">
                        {resume.skills.split(',').map((s, i) => <span key={i}>+ {s.trim()}</span>)}
                    </div>
                </section>
            </div>
            <div className="md:col-span-8 md:border-l-4 md:border-slate-900 md:pl-8 space-y-8 sm:space-y-10 text-xs leading-relaxed font-bold">
                <section>
                    <h3 className="text-base sm:text-lg font-black uppercase mb-4 underline decoration-[#606beb] decoration-4">Experience</h3>
                    <p className="whitespace-pre-line">{resume.experience}</p>
                </section>
                <section>
                    <h3 className="text-base sm:text-lg font-black uppercase mb-4 underline decoration-[#606beb] decoration-4">Projects</h3>
                    <p className="whitespace-pre-line">{resume.projects}</p>
                </section>
            </div>
        </div>
    </div>
);

const Template8 = ({ resume }: { resume: Resume }) => (
    <div className="bg-slate-50 min-h-full w-full md:aspect-[1/1.41] p-6 sm:p-10 md:p-16 font-sans text-slate-800">
        <div className="bg-white rounded-[2rem] sm:rounded-[3rem] h-full shadow-xl border border-white p-6 sm:p-10 md:p-12 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#606beb]/5 rounded-full -mr-20 -mt-20" />
            <header className="mb-8 md:mb-12">
                <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-900 break-words">
                    {resume.name.split(' ')[0]} <span className="font-bold">{resume.name.split(' ').slice(1).join(' ')}</span>
                </h1>
                <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                    <span className="break-all">{resume.email}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{resume.phone}</span>
                </div>
            </header>
            <div className="space-y-8 md:space-y-12">
                <section>
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#606beb] mb-4 sm:mb-6">Professional summary</h2>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-600 italic border-l-2 border-slate-100 pl-4 sm:pl-6">{resume.experience}</p>
                </section>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900 mb-4 sm:mb-6">Expertise</h2>
                        <p className="text-xs leading-loose text-slate-500 font-medium">{resume.skills}</p>
                    </section>
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900 mb-4 sm:mb-6">Education</h2>
                        <p className="text-xs leading-loose text-slate-500 font-medium">{resume.education}</p>
                    </section>
                </div>
            </div>
            <div />
        </div>
    </div>
);

const Template9 = ({ resume }: { resume: Resume }) => (
    <div className="bg-black min-h-full w-full md:aspect-[1/1.41] p-6 sm:p-10 md:p-12 font-mono text-white">
        <div className="border border-zinc-800 p-6 sm:p-8 h-full rounded-lg flex flex-col justify-between">
            <header className="mb-8 md:mb-12">
                <div className="text-[#606beb] mb-2 text-xs opacity-70 break-all">// Root / Portfolio / {resume.name.replace(/\s/g, '_')}</div>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tighter text-white">SELECTED_WORKS_</h1>
                <div className="mt-4 flex flex-wrap gap-4 text-[9px] text-zinc-500 uppercase">
                    <p>Status: Available</p>
                    <p className="break-all">Contact: {resume.email}</p>
                </div>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-7 space-y-8">
                    <section>
                        <h3 className="text-xs font-bold text-zinc-500 mb-4 tracking-widest uppercase">01. Experience</h3>
                        <div className="text-xs leading-relaxed text-zinc-300 whitespace-pre-line">{resume.experience}</div>
                    </section>
                </div>
                <div className="md:col-span-5 space-y-8">
                    <section className="bg-zinc-900 p-5 sm:p-6 rounded-lg border border-zinc-800">
                        <h3 className="text-xs font-bold text-[#606beb] mb-4 uppercase">Capabilities</h3>
                        <p className="text-[10px] leading-loose text-zinc-400">{resume.skills}</p>
                    </section>
                </div>
            </div>
            <div />
        </div>
    </div>
);

const Template10 = ({ resume }: { resume: Resume }) => (
    <div className="bg-white min-h-full w-full md:aspect-[1/1.41] p-6 sm:p-10 md:p-16 font-sans text-black relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="col-span-12 mb-8 md:mb-20">
                <h2 className="text-3xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none break-words">{resume.name}</h2>
                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-between border-t-4 border-black pt-4 font-black uppercase text-xs sm:text-sm gap-2">
                    <span className="break-all">{resume.email}</span>
                    <span>{resume.phone}</span>
                </div>
            </div>
            <div className="md:col-span-4 text-xs font-black uppercase leading-loose space-y-8 md:space-y-0">
                <div className="mb-6 md:mb-12">
                    <p className="text-[#606beb] mb-2">Education</p>
                    <p className="font-normal normal-case text-[11px]">{resume.education}</p>
                </div>
                <div>
                    <p className="text-[#606beb] mb-2">Skills</p>
                    <p className="whitespace-pre-line font-normal normal-case text-[11px]">{resume.skills}</p>
                </div>
            </div>
            <div className="md:col-span-8 text-sm leading-snug font-medium space-y-8 md:space-y-0">
                <div className="mb-8 md:mb-12">
                    <p className="font-black uppercase text-xs mb-4">Experience</p>
                    <p className="whitespace-pre-line text-xs sm:text-sm">{resume.experience}</p>
                </div>
                <div>
                    <p className="font-black uppercase text-xs mb-4">Projects</p>
                    <p className="whitespace-pre-line text-xs sm:text-sm">{resume.projects}</p>
                </div>
            </div>
        </div>
    </div>
);

const Template11 = ({ resume }: { resume: Resume }) => (
    <div className="bg-slate-50 min-h-full w-full md:aspect-[1/1.41] p-6 sm:p-10 font-sans text-slate-900 border-4 sm:border-[12px] border-white shadow-2xl">
        <header className="grid grid-cols-1 md:grid-cols-12 border-b-2 border-slate-900 pb-6 sm:pb-8 mb-6 sm:mb-8 gap-4">
            <div className="md:col-span-8">
                <h1 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase leading-none break-words">{resume.name}</h1>
                <p className="mt-2 sm:mt-4 text-[#606beb] font-bold text-xs tracking-[0.3em] uppercase">Built_with_NexaCV</p>
            </div>
            <div className="md:col-span-4 md:text-right flex flex-col justify-end text-[10px] font-black uppercase text-slate-400">
                <p className="break-all">{resume.email}</p>
                <p>{resume.phone}</p>
            </div>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
            <div className="md:col-span-4 space-y-8">
                <section>
                    <h3 className="text-[10px] font-black bg-slate-900 text-white px-2 py-1 w-fit mb-4">SKILL_MATRIX</h3>
                    <div className="flex flex-wrap gap-2">
                        {resume.skills.split(',').map((s, i) => (
                            <span key={i} className="text-[9px] font-bold border-b border-slate-200 py-1 uppercase">{s.trim()}</span>
                        ))}
                    </div>
                </section>
                <section className="pt-6 border-t border-slate-200">
                    <h3 className="text-[10px] font-black text-slate-400 mb-2 uppercase">Academic</h3>
                    <p className="text-xs font-bold leading-relaxed italic">{resume.education}</p>
                </section>
            </div>
            <div className="md:col-span-8 space-y-8 md:space-y-12">
                <section>
                    <h2 className="text-lg sm:text-xl font-black uppercase mb-4 sm:mb-6 flex items-center gap-4">
                        <span className="w-8 h-[2px] bg-[#606beb]" /> Experience
                    </h2>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-medium whitespace-pre-line md:border-l-2 md:border-slate-100 md:pl-6">{resume.experience}</p>
                </section>
                <section>
                    <h2 className="text-lg sm:text-xl font-black uppercase mb-4 sm:mb-6 flex items-center gap-4">
                        <span className="w-8 h-[2px] bg-slate-900" /> Projects
                    </h2>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-medium whitespace-pre-line md:pl-6">{resume.projects}</p>
                </section>
            </div>
        </div>
    </div>
);

const Template12 = ({ resume }: { resume: Resume }) => (
    <div className="bg-[#0a0a0c] min-h-full w-full md:aspect-[1/1.41] shadow-2xl overflow-hidden font-mono text-white">
        <div className="flex flex-col md:flex-row h-full">
            <div className="hidden md:flex w-16 bg-[#606beb] flex-col justify-center items-center gap-20">
                <p className="rotate-[-90deg] text-[10px] font-black uppercase tracking-[1em] whitespace-nowrap opacity-50">Log_Sequence_072</p>
            </div>
            <div className="flex-1 p-6 sm:p-10 md:p-12">
                <header className="mb-8 md:mb-16">
                    <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white border-b border-zinc-800 pb-4 sm:pb-6 italic break-words">
                        {resume.name.split(' ')[0]}
                    </h1>
                    <div className="flex flex-wrap gap-4 sm:gap-8 mt-4 sm:mt-6 text-[10px] text-zinc-500 font-bold uppercase">
                        <span className="text-[#606beb]">Connect //</span>
                        <span className="break-all">{resume.email}</span>
                        <span>{resume.phone}</span>
                    </div>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                    <section>
                        <h3 className="text-[#606beb] text-xs font-black mb-4 sm:mb-6 uppercase tracking-widest underline decoration-2 underline-offset-8">Experience</h3>
                        <p className="text-[11px] leading-relaxed text-zinc-400 whitespace-pre-line">{resume.experience}</p>
                    </section>
                    <div className="space-y-8 md:space-y-12">
                        <section className="bg-zinc-900/50 p-5 sm:p-6 border border-zinc-800 rounded-bl-[2rem]">
                            <h3 className="text-white text-xs font-black mb-4 uppercase">Core_Modules</h3>
                            <p className="text-[10px] leading-loose text-zinc-400 uppercase tracking-widest">{resume.skills}</p>
                        </section>
                        <section>
                            <h3 className="text-[#606beb] text-xs font-black mb-4 uppercase tracking-widest">Selected_Labs</h3>
                            <p className="text-[11px] leading-relaxed text-zinc-400 italic">{resume.projects}</p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const Template13 = ({ resume }: { resume: Resume }) => (
    <div className="bg-white min-h-full w-full md:aspect-[1/1.41] p-6 sm:p-12 md:p-16 font-serif text-slate-900 border-x-4 sm:border-x-[40px] border-slate-50">
        <header className="text-center mb-10 sm:mb-20">
            <h1 className="text-3xl sm:text-5xl font-light italic tracking-tight mb-3 sm:mb-4 break-words">{resume.name}</h1>
            <div className="font-sans text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 flex flex-wrap justify-center gap-3 sm:gap-6">
                <span className="break-all">{resume.email}</span>
                <span className="text-[#606beb] hidden sm:inline">/</span>
                <span>{resume.phone}</span>
            </div>
        </header>
        <div className="grid grid-cols-1 gap-8 sm:gap-12 max-w-2xl mx-auto">
            <section className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4">
                <h3 className="font-sans text-[10px] font-black uppercase tracking-widest text-[#606beb]">About</h3>
                <div className="sm:col-span-3 text-xs sm:text-sm leading-relaxed text-slate-600 font-medium">{resume.experience}</div>
            </section>
            <section className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4">
                <h3 className="font-sans text-[10px] font-black uppercase tracking-widest text-slate-900">Education</h3>
                <div className="sm:col-span-3 text-xs sm:text-sm leading-relaxed text-slate-600 italic">{resume.education}</div>
            </section>
            <section className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4">
                <h3 className="font-sans text-[10px] font-black uppercase tracking-widest text-slate-900">Skills</h3>
                <div className="sm:col-span-3 font-sans text-[10px] font-bold uppercase flex flex-wrap gap-x-4 gap-y-2">
                    {resume.skills.split(',').map((s, i) => <span key={i} className="text-slate-400 hover:text-[#606beb] transition-colors">{s.trim()}</span>)}
                </div>
            </section>
            <section className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4">
                <h3 className="font-sans text-[10px] font-black uppercase tracking-widest text-slate-900">Works</h3>
                <div className="sm:col-span-3 text-xs sm:text-sm leading-relaxed text-slate-600">{resume.projects}</div>
            </section>
        </div>
    </div>
);

const Template14 = ({ resume }: { resume: Resume }) => (
    <div className="bg-[#1a1c2c] min-h-full w-full md:aspect-[1/1.41] p-6 sm:p-8 font-mono text-[#f4f4f4]">
        <div className="border-2 border-[#606beb] p-5 sm:p-6 h-full relative flex flex-col justify-between">
            <div>
                <header className="mb-8 sm:mb-10">
                    <h1 className="text-2xl sm:text-3xl font-black uppercase text-[#606beb] mb-2 break-words">{'>'} {resume.name}</h1>
                    <p className="text-[10px] opacity-60">Last login: {new Date().toLocaleDateString()} on ttys001</p>
                </header>
                <div className="space-y-6 sm:space-y-8 text-[11px]">
                    <section>
                        <p className="text-[#fbff86] mb-2 font-black tracking-widest uppercase text-xs">--- user_experience ---</p>
                        <div className="leading-relaxed opacity-80 whitespace-pre-line">{resume.experience}</div>
                    </section>
                    <section>
                        <p className="text-[#fbff86] mb-2 font-black tracking-widest uppercase text-xs">--- tech_stack ---</p>
                        <div className="flex flex-wrap gap-2 sm:gap-4">
                            {resume.skills.split(',').map((s, i) => <span key={i} className="bg-white/5 px-2 py-1 text-[#606beb] border border-white/10 uppercase font-black text-[9px]">{s.trim()}</span>)}
                        </div>
                    </section>
                    <section>
                        <p className="text-[#fbff86] mb-2 font-black tracking-widest uppercase text-xs">--- production_logs ---</p>
                        <div className="leading-relaxed opacity-80 italic">{resume.projects}</div>
                    </section>
                </div>
            </div>
            <div className="text-[9px] font-black animate-pulse uppercase mt-4 text-right">_ System Stable</div>
        </div>
    </div>
);

const Template15 = ({ resume }: { resume: Resume }) => (
    <div className="bg-gradient-to-br from-slate-100 to-indigo-50 min-h-full w-full md:aspect-[1/1.41] p-6 sm:p-10 md:p-12 font-sans overflow-hidden relative">
        <div className="absolute top-20 -left-20 w-80 h-80 bg-[#606beb]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-pink-400/10 rounded-full blur-[100px]" />
        <div className="relative z-10 bg-white/60 backdrop-blur-xl rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-12 h-full shadow-[0_30px_100px_-20px_rgba(96,107,235,0.15)] border border-white flex flex-col justify-between">
            <header className="flex flex-col sm:flex-row justify-between items-start mb-8 sm:mb-16 gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-800 uppercase tracking-tighter break-words">{resume.name}</h1>
                    <div className="h-1.5 w-12 bg-[#606beb] mt-2 rounded-full" />
                </div>
                <div className="sm:text-right text-[10px] font-bold text-slate-400 space-y-1 uppercase tracking-widest">
                    <p className="break-all">{resume.email}</p>
                    <p>{resume.phone}</p>
                </div>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
                <div className="md:col-span-8 space-y-8 md:space-y-12">
                    <section>
                        <h3 className="text-xs font-black text-slate-800 uppercase mb-3 tracking-widest">Experience</h3>
                        <p className="text-xs sm:text-sm leading-relaxed text-slate-500 font-medium whitespace-pre-line">{resume.experience}</p>
                    </section>
                    <section>
                        <h3 className="text-xs font-black text-slate-800 uppercase mb-3 tracking-widest">Projects</h3>
                        <p className="text-xs sm:text-sm leading-relaxed text-slate-500 font-medium">{resume.projects}</p>
                    </section>
                </div>
                <div className="md:col-span-4 space-y-6 md:space-y-8">
                    <section className="bg-slate-900 text-white p-5 sm:p-6 rounded-3xl">
                        <h3 className="text-[10px] font-black uppercase mb-4 text-[#606beb]">Tech Specs</h3>
                        <p className="text-[11px] leading-loose opacity-80 uppercase tracking-wider">{resume.skills}</p>
                    </section>
                    <section className="p-4 border border-slate-200 rounded-2xl">
                        <h3 className="text-[10px] font-black uppercase mb-2 text-slate-400">Education</h3>
                        <p className="text-xs font-bold text-slate-600 leading-snug">{resume.education}</p>
                    </section>
                </div>
            </div>
            <div />
        </div>
    </div>
);

const Template16 = ({ resume }: { resume: Resume }) => (
    <div className="bg-white min-h-full w-full md:aspect-[1/1.41] border-4 sm:border-[16px] border-slate-900 p-6 sm:p-10 md:p-12 font-sans text-slate-900">
        <header className="mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] break-words">
                {resume.name.split(' ').map((word, i) => (
                    <span key={i} className={i % 2 !== 0 ? "text-[#606beb]" : ""}>{word} </span>
                ))}
            </h1>
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-4 text-xs font-black uppercase border-y-2 border-slate-900 py-4">
                <span className="break-all">{resume.email}</span>
                <span className="hidden sm:inline">•</span>
                <span>{resume.phone}</span>
                <span className="ml-auto text-[#606beb]">NEXACV_2026</span>
            </div>
        </header>
        <div className="space-y-8 sm:space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8">
                <div className="md:col-span-3 text-[10px] font-black uppercase text-slate-300 tracking-[0.3em]">History</div>
                <div className="md:col-span-9 text-xs sm:text-sm font-bold leading-relaxed">{resume.experience}</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8">
                <div className="md:col-span-3 text-[10px] font-black uppercase text-slate-300 tracking-[0.3em]">Stacks</div>
                <div className="md:col-span-9 flex flex-wrap gap-2">
                    {resume.skills.split(',').map((s, i) => (
                        <span key={i} className="bg-slate-900 text-white px-3 py-1 text-[10px] font-black uppercase">{s.trim()}</span>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8">
                <div className="md:col-span-3 text-[10px] font-black uppercase text-slate-300 tracking-[0.3em]">Labs</div>
                <div className="md:col-span-9 text-xs sm:text-sm font-bold leading-relaxed border-l-4 border-yellow-300 pl-4 sm:pl-6">{resume.projects}</div>
            </div>
        </div>
    </div>
);

const Template17 = ({ resume }: { resume: Resume }) => (
    <div className="bg-[#f8f9fa] min-h-full w-full md:aspect-[1/1.41] p-6 sm:p-12 md:p-16 font-sans text-[#1a1a1a]">
        <div className="max-w-4xl mx-auto border-t-4 sm:border-t-8 border-[#606beb] pt-8 sm:pt-12">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-20 gap-6">
                <div>
                    <h1 className="text-4xl sm:text-6xl font-black tracking-tighter leading-none mb-3 sm:mb-4 uppercase italic break-words">
                        {resume.name}
                    </h1>
                    <p className="text-[#606beb] font-bold tracking-[0.4em] text-xs uppercase">Engineering Collective / 2026</p>
                </div>
                <div className="md:text-right font-medium text-[11px] space-y-1 text-slate-400 uppercase tracking-widest">
                    <p className="flex items-center md:justify-end gap-2 break-all"><Globe size={12} className="shrink-0" /> {resume.email}</p>
                    <p>{resume.phone}</p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
                <div className="md:col-span-4">
                    <section className="mb-8 md:mb-12">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 md:mb-6 border-b border-slate-200 pb-2">Technical_Stack</h3>
                        <div className="flex flex-col gap-3">
                            {resume.skills.split(',').map((s, i) => (
                                <div key={i} className="flex items-center gap-3 group">
                                    <div className="w-1.5 h-1.5 bg-[#606beb] rounded-full shrink-0" />
                                    <span className="text-[11px] font-bold uppercase group-hover:text-[#606beb] transition-colors">{s.trim()}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 text-slate-300">Foundation</h3>
                        <p className="text-xs font-bold leading-relaxed">{resume.education}</p>
                    </section>
                </div>

                <div className="md:col-span-8 space-y-10 md:space-y-16">
                    <section>
                        <div className="flex items-center gap-4 mb-4 sm:mb-6">
                            <Zap className="text-[#606beb] shrink-0" size={20} />
                            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">Professional Focus</h2>
                        </div>
                        <p className="text-xs sm:text-sm leading-[1.8] text-slate-600 font-medium whitespace-pre-line">
                            {resume.experience}
                        </p>
                    </section>
                    <section className="bg-white p-6 sm:p-8 border-l-4 border-[#606beb] shadow-sm">
                        <h3 className="text-xs font-black uppercase mb-4 flex items-center gap-2">
                            <Award size={14} className="text-[#606beb] shrink-0" /> Featured Deployments
                        </h3>
                        <p className="text-xs sm:text-sm leading-relaxed text-slate-600 italic">
                            {resume.projects}
                        </p>
                    </section>
                </div>
            </div>
        </div>
    </div>
);

const Template18 = ({ resume }: { resume: Resume }) => (
    <div className="bg-[#0f1115] min-h-full w-full md:aspect-[1/1.41] p-4 sm:p-8 md:p-10 font-mono text-zinc-300">
        <div className="h-full border border-zinc-800 rounded-xl overflow-hidden flex flex-col">
            <header className="bg-zinc-900/50 border-b border-zinc-800 p-4 sm:p-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                    </div>
                    <span className="ml-2 sm:ml-4 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">profile.exe</span>
                </div>
                <Terminal size={16} className="text-[#606beb]" />
            </header>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
                <aside className="md:col-span-4 border-b md:border-b-0 md:border-r border-zinc-800 p-6 sm:p-8 space-y-6 sm:space-y-10 bg-[#0d0e12]">
                    <section>
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#606beb]/10 border border-[#606beb]/30 rounded-lg mb-4 sm:mb-6 flex items-center justify-center">
                             <span className="text-xl sm:text-2xl font-black text-[#606beb]">{resume.name.charAt(0)}</span>
                        </div>
                        <h1 className="text-lg sm:text-xl font-black text-white leading-tight uppercase tracking-tighter break-words">{resume.name}</h1>
                    </section>
                    <section className="pt-2 sm:pt-6">
                        <h4 className="text-[10px] text-[#606beb] font-black uppercase mb-3 sm:mb-4 tracking-[0.2em]">Contact_Info</h4>
                        <div className="space-y-2 sm:space-y-3 text-[10px] text-zinc-500 break-all">
                            <p className="hover:text-white transition-colors cursor-pointer tracking-wider">EMAIL: {resume.email}</p>
                            <p className="tracking-wider">CELL: {resume.phone}</p>
                        </div>
                    </section>
                    <section>
                        <h4 className="text-[10px] text-zinc-100 font-black uppercase mb-3 sm:mb-4 flex items-center gap-2">
                             <span className="w-2 h-2 bg-[#606beb]" /> Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {resume.skills.split(',').map((s, i) => (
                                <span key={i} className="px-2 py-1 bg-zinc-800/50 border border-zinc-700 rounded text-[9px] uppercase text-zinc-400">
                                    {s.trim()}
                                </span>
                            ))}
                        </div>
                    </section>
                </aside>

                <main className="md:col-span-8 p-6 sm:p-10 space-y-8 sm:space-y-12 overflow-y-auto custom-scrollbar">
                    <section>
                        <h3 className="text-white font-bold text-sm mb-3 sm:mb-4 flex items-center gap-2 italic">
                            experience
                        </h3>
                        <div className="text-xs sm:text-[12px] leading-[1.7] text-zinc-400 md:border-l md:border-zinc-800 md:pl-6">
                            {resume.experience}
                        </div>
                    </section>
                    <section>
                        <h3 className="text-white font-bold text-sm mb-3 sm:mb-4 flex items-center gap-2 italic">
                            projects
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-lg text-xs leading-relaxed italic">
                                {resume.projects}
                            </div>
                        </div>
                    </section>
                    <section className="opacity-50">
                        <h3 className="text-zinc-500 font-bold text-xs mb-2 italic">
                         education
                        </h3>
                        <p className="text-[11px]">{resume.education}</p>
                    </section>
                </main>
            </div>
            <footer className="bg-[#606beb] p-2 flex justify-center">
                <p className="text-[9px] font-black text-slate-900 uppercase tracking-[1em]">System_Online_NexaCV</p>
            </footer>
        </div>
    </div>
);

const ResumeBuilder = () => {
    const handleDownload = async () => {
        const element = document.getElementById('resume-container');
        if (!element) return;

        try {
            const dataUrl = await toPng(element, { 
                quality: 1, 
                pixelRatio: 2 
            });

            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(dataUrl);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('NexaCV-Resume.pdf');
        } catch (error) {
            console.error('Download failed:', error);
            alert('Export failed. Check console.');
        }
    };

    const [selectedTemplate, setSelectedTemplate] = useState<string>("template1")
    const [resume, setResume] = useState<Resume>(() => {
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

    useEffect(() => {
        const handler = setTimeout(() => {
            localStorage.setItem("resumeData", JSON.stringify(resume));
        }, 800);

        return () => clearTimeout(handler);
    }, [resume]);

    const inputStyle = "w-full bg-white/60 backdrop-blur-sm border border-slate-200 p-3 sm:p-4 rounded-2xl outline-none focus:ring-2 ring-[#606beb] focus:bg-white transition-all text-slate-800 placeholder-slate-400 font-medium text-sm shadow-sm";

    return (
        <div className='bg-[#f8fafc] bg-fixed bg-cover min-h-screen p-3 sm:p-4 md:p-6 selection:bg-[#606beb] selection:text-white'> 
            <Navbar />
   
            <div className='max-w-7xl mx-auto flex flex-col mt-24 sm:mt-32 md:mt-40 xl:flex-row gap-6 md:gap-10 items-start'>
                
                <section className='w-full xl:w-[45%] xl:sticky md:top-6 order-2 xl:order-1'>
                    <div className="mb-6 sm:mb-8 px-2">
                        <h1 className='text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tighter'>RESUME_BUILDER</h1>
                        <p className="text-[#606beb] text-xs font-bold tracking-widest uppercase mt-2 sm:mt-3 italic"> Powered by NexaCV </p>
                    </div>

                    <div className="bg-white/70 backdrop-blur-2xl p-4 sm:p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)]">
                        <h2 className='text-slate-800 font-bold mb-4 sm:mb-6 flex items-center gap-2 text-sm sm:text-base'>
                           <span className="w-2 h-2 rounded-full bg-[#606beb]" />
                           Personal Information
                        </h2>
                        
                        <form className='flex flex-col gap-3 sm:gap-4' onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <input className={inputStyle} type="text" placeholder='Name' value={resume.name} onChange={(e) => setResume({...resume, name: e.target.value})} />
                                <input className={inputStyle} type="email" placeholder='Email' value={resume.email} onChange={(e) => setResume({...resume, email: e.target.value})} />
                            </div>
                            <input className={inputStyle} type="text" placeholder='Phone Number' value={resume.phone} onChange={(e) => setResume({...resume, phone: e.target.value})} />
                            
                            <h2 className='text-slate-800 font-bold mt-2 sm:mt-4 mb-2 flex items-center gap-2 text-sm sm:text-base'>
                                <span className="w-2 h-2 rounded-full bg-[#606beb]" />
                                Detailed Content
                            </h2>
                            <textarea className={inputStyle} placeholder='Experience' rows={4} value={resume.experience} onChange={(e) => setResume({...resume, experience: e.target.value})} />
                            <textarea className={inputStyle} placeholder='Education' rows={3} value={resume.education} onChange={(e) => setResume({...resume, education: e.target.value})} />
                            <textarea className={inputStyle} placeholder='Skills' rows={3} value={resume.skills} onChange={(e) => setResume({...resume, skills: e.target.value})} />
                            <textarea className={inputStyle} placeholder='Projects' rows={4} value={resume.projects} onChange={(e) => setResume({...resume, projects: e.target.value})} />
                            
                            <div className="mt-4 sm:mt-6 bg-white/70 backdrop-blur-2xl p-4 sm:p-6 rounded-[2rem] border border-white shadow-sm">
                                <h2 className='text-slate-800 font-bold mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base'>
                                    <span className="w-2 h-2 rounded-full bg-[#606beb]" />
                                    Select Cool Minimalistic Templates
                                </h2>
                                
                                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3">
                                    {["template1", "template2", "template3", "template4", "template5", "template6", "template7", "template8", "template9", "template10", "template11", "template12", "template13", "template14", "template15", "template16", "template17", "template18"].map((t, index) => (
                                        <label key={t} className="cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name="template" 
                                                value={t} 
                                                className="hidden peer" 
                                                checked={selectedTemplate === t}
                                                onChange={(e) => setSelectedTemplate(e.target.value)}
                                            />
                                            <div className="peer-checked:bg-slate-900 peer-checked:text-white peer-checked:border-slate-900 bg-white border border-slate-200 text-slate-500 py-2.5 sm:py-3 rounded-xl text-center text-[10px] font-black uppercase tracking-widest transition-all hover:border-[#606beb]">
                                                {`T-${index + 1 < 10 ? '0' + (index + 1) : index + 1}`}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </form>
                    </div>
                </section>

                <section className='w-full xl:w-[55%] flex flex-col order-1 xl:order-2 mb-10 xl:mb-0'>
                    <div className="flex justify-between items-center mb-4 sm:mb-6 px-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live System View</span>
                        <h1 className='text-slate-400 text-xl md:text-2xl font-black text-right uppercase'>Preview</h1>
                    </div>
                    
                    <div className="w-full overflow-x-auto pb-4 sm:pb-0">
                        <div className="min-w-[320px] w-full flex flex-col justify-center items-center">
                            <div id="resume-container" className="w-full scale-100 origin-top shadow-xl md:shadow-none rounded-2xl overflow-hidden bg-white">
                                {selectedTemplate === "template1" && <Template1 resume={resume} />}
                                {selectedTemplate === "template2" && <Template2 resume={resume} />}
                                {selectedTemplate === "template3" && <Template3 resume={resume} />}
                                {selectedTemplate === "template4" && <Template4 resume={resume} />}
                                {selectedTemplate === "template5" && <Template5 resume={resume} />}
                                {selectedTemplate === "template6" && <Template6 resume={resume} />}
                                {selectedTemplate === "template7" && <Template7 resume={resume} />}
                                {selectedTemplate === "template8" && <Template8 resume={resume} />}
                                {selectedTemplate === "template9" && <Template9 resume={resume} />}
                                {selectedTemplate === "template10" && <Template10 resume={resume} />}
                                {selectedTemplate === "template11" && <Template11 resume={resume} />}
                                {selectedTemplate === "template12" && <Template12 resume={resume} />}
                                {selectedTemplate === "template13" && <Template13 resume={resume} />}
                                {selectedTemplate === "template14" && <Template14 resume={resume} />}
                                {selectedTemplate === "template15" && <Template15 resume={resume} />}
                                {selectedTemplate === "template16" && <Template16 resume={resume} />}
                                {selectedTemplate === "template17" && <Template17 resume={resume} />}
                                {selectedTemplate === "template18" && <Template18 resume={resume} />}
                            </div>
                        </div>
                    </div>

                    <div className='mx-auto my-6'>
                        <button 
                            onClick={handleDownload}
                            className="cursor-pointer flex items-center gap-2 bg-[#606beb] hover:bg-[#4a54c5] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95 text-xs sm:text-sm uppercase tracking-wider"
                        >
                            <Download size={18} />
                            Download PDF
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default ResumeBuilder;