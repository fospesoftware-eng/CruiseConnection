import React from 'react';

export default function CruiseLogo({ className = "h-8", showSubtext = true }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Wave Icon Mark */}
      <svg className="h-full w-auto shrink-0" viewBox="0 0 280 130" fill="none">
        <defs>
          <linearGradient id="waveHeaderGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#38bdf8" />
            <stop offset="50%" stop-color="#e2e8f0" />
            <stop offset="100%" stop-color="#38bdf8" />
          </linearGradient>
        </defs>
        <g stroke="url(#waveHeaderGlow)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 25 102 C 60 102, 70 82, 85 58 C 102 30, 125 22, 142 42 C 156 58, 150 92, 125 100 C 105 106, 92 88, 102 68 C 110 52, 128 50, 142 66 C 160 86, 175 104, 202 102 C 220 100, 232 78, 240 68 C 248 58, 258 64, 252 82 C 248 94, 238 100, 230 98" />
        </g>
      </svg>

      {/* Typography */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center gap-1">
          <span className="font-extrabold text-sm tracking-[0.2em] text-slate-100 uppercase">CRUISE</span>
          <span className="font-extrabold text-sm tracking-[0.2em] text-cyan-400 uppercase">CONNECTOR</span>
        </div>
        {showSubtext && (
          <span className="text-[9px] font-semibold tracking-[0.35em] text-cyan-300/80 uppercase mt-0.5">
            CONNECT ONBOARD
          </span>
        )}
      </div>
    </div>
  );
}
