import React from 'react';

export default function StatCard({
  value,
  label,
  description,
  detail,
  icon: Icon,
  className = '',
}) {
  const subtitle = description || detail;

  return (
    <div className={`card-clinical p-4 sm:p-5 flex flex-col justify-between ${className}`}>
      <div className="flex items-center justify-between text-clinical-muted mb-2">
        <span className="text-xs font-medium text-slate-500">{label}</span>
        {Icon && <Icon className="w-4 h-4 text-slate-400" />}
      </div>
      <div>
        <div className="text-2xl sm:text-3xl font-bold text-navy-900 font-mono tracking-tight">
          {value}
        </div>
        {subtitle && (
          <p className="text-xs text-clinical-muted mt-1">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
