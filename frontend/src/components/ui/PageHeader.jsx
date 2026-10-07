import React from 'react';

export default function PageHeader({
  eyebrow,
  title,
  description,
  action,
  className = '',
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {eyebrow && (
        <span className="text-[11px] font-semibold uppercase tracking-wider text-primary-action block">
          {eyebrow}
        </span>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-navy-900 tracking-tight">
          {title}
        </h1>
        {action && <div>{action}</div>}
      </div>
      {description && (
        <p className="text-sm text-clinical-muted max-w-3xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
