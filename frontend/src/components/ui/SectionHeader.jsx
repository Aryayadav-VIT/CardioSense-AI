import React from 'react';

export default function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className = '',
}) {
  return (
    <div className={`space-y-1 ${className}`}>
      {eyebrow && (
        <span className="text-[10px] font-semibold uppercase tracking-wider text-clinical-muted block">
          {eyebrow}
        </span>
      )}
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg sm:text-xl font-bold text-navy-900 tracking-tight">
          {title}
        </h2>
        {action && <div>{action}</div>}
      </div>
      {description && (
        <p className="text-xs sm:text-sm text-clinical-muted leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
