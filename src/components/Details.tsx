import { cn } from "../lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";

const ScoreBadge = ({ score }: { score: number }) => {
  const isHigh = score > 69;
  const isMid = score > 39;

  return (
    <div
      className={cn(
        "flex flex-row gap-1.5 items-center px-2.5 py-1 rounded-full border transition-colors duration-300",
        isHigh
          ? "bg-emerald-50 border-emerald-100 text-emerald-600"
          : isMid
            ? "bg-amber-50 border-amber-100 text-amber-600"
            : "bg-rose-50 border-rose-100 text-rose-600"
      )}
    >
      {isHigh ? (
        <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )}
      <p className="text-[10px] font-black tracking-tight">{score}/100</p>
    </div>
  );
};

const CategoryHeader = ({ title, categoryScore }: { title: string; categoryScore: number; }) => {
  return (
    <div className="flex flex-row items-center justify-between w-full py-4 px-2 group">
      <div className="flex items-center gap-3">
        <div className="w-1 h-6 bg-slate-200 group-hover:bg-indigo-500 rounded-full transition-colors duration-300" />
        <p className="text-lg font-black text-slate-800 tracking-tight">{title}</p>
      </div>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

const CategoryContent = ({ tips }: { tips: { type: "good" | "improve"; tip: string; explanation: string }[]; }) => {
  return (
    <div className="flex flex-col gap-6 pb-6 pt-2">
      {/* Quick Scan Summary Grid */}
      <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tips.map((tip, index) => (
          <div className="flex flex-row gap-2.5 items-center bg-white p-2 rounded-xl border border-slate-200/50 shadow-sm" key={index}>
            <div className={cn(
              "p-1 rounded-md shrink-0",
              tip.type === "good" ? "text-emerald-500 bg-emerald-50" : "text-amber-500 bg-amber-50"
            )}>
              <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                {tip.type === "good" 
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                }
              </svg>
            </div>
            <p className="text-[11px] font-bold text-slate-600 truncate">{tip.tip}</p>
          </div>
        ))}
      </div>

      {/* Detailed Analysis Nodes */}
      <div className="flex flex-col gap-4">
        {tips.map((tip, index) => (
          <div
            key={index + tip.tip}
            className={cn(
              "relative flex flex-col gap-2 rounded-[1.5rem] p-5 transition-all duration-300 border-l-4",
              tip.type === "good"
                ? "bg-white border-emerald-500/50 shadow-[0_4px_20px_-10px_rgba(16,185,129,0.1)]"
                : "bg-white border-amber-500/50 shadow-[0_4px_20px_-10px_rgba(245,158,11,0.1)]"
            )}
          >
            <div className="flex flex-row gap-3 items-center mb-1">
              <span className={cn(
                "text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-md",
                tip.type === "good" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
              )}>
                {tip.type === "good" ? "Passed" : "Action Required"}
              </span>
              <p className="text-sm font-black text-slate-900 tracking-tight">{tip.tip}</p>
            </div>
            <p className="text-[13px] text-slate-500 leading-relaxed font-medium pl-1">
              {tip.explanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  const categories = [
    { id: "tone-style", title: "Tone & Style", data: feedback.toneAndStyle },
    { id: "content", title: "Content integrity", data: feedback.content },
    { id: "structure", title: "Data Structure", data: feedback.structure },
    { id: "skills", title: "Skill Density", data: feedback.skills },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Deep Diagnostic Logs</h3>
      </div>

      <Accordion className="space-y-3">
        {categories.map((cat) => (
          <AccordionItem 
            id={cat.id} 
            key={cat.id}
            className="border border-slate-200/60 rounded-[1.5rem] bg-white overflow-hidden transition-all duration-300 hover:border-indigo-200"
          >
            <AccordionHeader itemId={cat.id} className="px-4 hover:bg-slate-50/50 transition-colors">
              <CategoryHeader title={cat.title} categoryScore={cat.data.score} />
            </AccordionHeader>
            <AccordionContent itemId={cat.id} className="px-6">
              <CategoryContent tips={cat.data.tips} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Details;
