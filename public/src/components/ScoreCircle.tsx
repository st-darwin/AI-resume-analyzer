const ScoreCircle = ({ score = 75 }: { score: number }) => {
  const radius = 40;
  const stroke = 6; // Thinner is more premium
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference * (1 - score / 100);

  return (
    <div className="relative w-[90px] h-[90px] flex items-center justify-center group/score">
      {/* Outer Ring Shadow (Depth) */}
      <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] bg-gray-50/50" />

      <svg
        height="100%"
        width="100%"
        viewBox="0 0 100 100"
        className="transform -rotate-90 drop-shadow-[0_0_8px_rgba(96,107,235,0.3)]"
      >
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8E97C5" />
            <stop offset="50%" stopColor="#606BEB" />
            <stop offset="100%" stopColor="#AB8C95" />
          </linearGradient>
          {/* Subtle glow filter */}
          <filter id="blurGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background Track */}
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke="white"
          strokeWidth={stroke + 2}
          fill="transparent"
          className="opacity-50"
        />

        {/* The Animated Progress Path */}
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke="url(#scoreGradient)"
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeLinecap="round"
          filter="url(#blurGlow)"
          style={{
            strokeDashoffset,
            transition: "stroke-dashoffset 2s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
      </svg>

      {/* The "Glass" Center Piece */}
      <div className="absolute inset-[12%] rounded-full bg-white/80 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center border border-white">
        <span className="text-xl font-black text-gray-900 leading-none tracking-tighter">
          {score}
        </span>
        <span className="text-[8px] font-bold text-[#606BEB] uppercase tracking-[0.1em]">
          Rating
        </span>
      </div>
    </div>
  );
};
export default ScoreCircle