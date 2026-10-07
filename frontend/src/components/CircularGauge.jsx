import React from 'react';

export default function CircularGauge({ probability = 0, label = 'LOWER RISK', size = 260 }) {
  const percentage = Math.round(probability * 100);
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Angle arc calculation: 270 degree gauge (from 135 deg to 405 deg)
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (arcLength * Math.min(100, Math.max(0, percentage))) / 100;

  // Determine color scheme based on probability
  const isElevated = probability >= 0.50;
  const isModerate = probability >= 0.35 && probability < 0.50;

  let strokeColor = '#059669'; // Emerald 600
  let badgeBg = 'bg-emerald-50 text-emerald-700 border-emerald-200';

  if (isElevated) {
    strokeColor = '#DC2626'; // Red 600
    badgeBg = 'bg-red-50 text-red-700 border-red-200';
  } else if (isModerate) {
    strokeColor = '#D97706'; // Amber 600
    badgeBg = 'bg-amber-50 text-amber-700 border-amber-200';
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-225"
          style={{ transformOrigin: 'center' }}
        >
          {/* Background Track Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />

          {/* Progress Arc (Clean, no glow filter) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Readout Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
            Estimated Probability
          </span>
          <div className="flex items-baseline justify-center">
            <span className="text-5xl font-extrabold tracking-tight text-navy-900">
              {percentage}
            </span>
            <span className="text-2xl font-semibold text-slate-500 ml-0.5">%</span>
          </div>
          <span className="text-xs text-slate-500 mt-1 font-mono">
            {probability.toFixed(4)} P(Y=1)
          </span>
        </div>
      </div>

      {/* Model-Estimated Status Pill */}
      <div className={`mt-3 px-4 py-1.5 rounded-full border text-xs sm:text-sm font-semibold tracking-wide uppercase ${badgeBg}`}>
        {label}
      </div>
      <p className="text-[11px] text-slate-500 mt-1.5">
        Machine learning model estimate
      </p>
    </div>
  );
}
