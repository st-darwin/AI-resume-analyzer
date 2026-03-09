import { useEffect, useRef, useState } from "react";

const ScoreGauge = ({ score = 75 }: { score: number }) => {
    const [pathLength, setPathLength] = useState(0);
    const pathRef = useRef<SVGPathElement>(null);

    const normalizedScore = Math.min(Math.max(score, 0), 100);
    const percentage = normalizedScore / 100;
    
    // Dynamic Color Engine: Red (0) -> Amber (50) -> Emerald (100)
    const getThemeColor = () => {
        if (normalizedScore < 45) return "#ef4444"; // Red-500
        if (normalizedScore < 75) return "#f59e0b"; // Amber-500
        return "#10b981"; // Emerald-500
    };

    useEffect(() => {
        if (pathRef.current) {
            setPathLength(pathRef.current.getTotalLength());
        }
    }, [score]);

    return (
        <div className="flex flex-col items-center select-none">
            <div className="relative w-40 h-20 group">
                
                {/* 1. Dynamic Ambient Glow (Glassmorphism) */}
                <div 
                    className="absolute inset-0 blur-[30px] rounded-full opacity-20 transition-colors duration-1000"
                    style={{ backgroundColor: getThemeColor() }}
                />
                
                <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                    <defs>
                        {/* 2. Complex Shadow for Depth */}
                        <filter id="innerGlow">
                            <feGaussianBlur stdDeviation="1.5" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        
                        {/* 3. Shine Gradient */}
                        <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="white" stopOpacity="0.4" />
                            <stop offset="50%" stopColor="white" stopOpacity="0" />
                            <stop offset="100%" stopColor="white" stopOpacity="0.4" />
                        </linearGradient>
                    </defs>

                    {/* Background Track - The "Glass" Pipe */}
                    <path
                        d="M10,50 A40,40 0 0,1 90,50"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="10"
                        strokeLinecap="round"
                        className="text-gray-100/80 dark:text-gray-800/30"
                    />

                    {/* Main Progress Path - Animated with physics */}
                    <path
                        ref={pathRef}
                        d="M10,50 A40,40 0 0,1 90,50"
                        fill="none"
                        stroke={getThemeColor()}
                        strokeWidth="10"
                        strokeLinecap="round"
                        filter="url(#innerGlow)"
                        style={{
                            strokeDasharray: pathLength,
                            strokeDashoffset: pathLength * (1 - percentage),
                            transition: "stroke-dashoffset 2.5s cubic-bezier(0.16, 1, 0.3, 1), stroke 1s ease"
                        }}
                    />

                    {/* 4. The "Shimmer" Layer - Makes it look 3D */}
                    <path
                        d="M12,48 A38,38 0 0,1 88,48"
                        fill="none"
                        stroke="url(#shine)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="opacity-60"
                    />

                    {/* 5. Magnetic Hub Point */}
                    <circle 
                        cx="50" cy="50" r="4" 
                        fill="white" 
                        className="shadow-xl"
                        style={{
                            filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.2))'
                        }}
                    />
                </svg>

                {/* 6. Centered Typography - The "Impact" Style */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
                    <div className="flex items-start">
                        <span 
                            className="text-3xl font-black tracking-tighter transition-colors duration-1000 italic"
                            style={{ color: getThemeColor(), filter: 'brightness(0.8)' }}
                        >
                            {score}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 mt-1 ml-0.5">%</span>
                    </div>
                    <div 
                        className="text-[8px] font-bold uppercase tracking-[0.2em] transition-all duration-700"
                        style={{ color: getThemeColor() }}
                    >
                        {normalizedScore > 75 ? 'Optimal' : normalizedScore > 45 ? 'Fair' : 'Weak'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScoreGauge;