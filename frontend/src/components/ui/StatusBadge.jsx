import React from 'react';

export default function StatusBadge({
  children,
  variant = 'neutral',
  dot = true,
  className = '',
}) {
  const styles = {
    success: {
      badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      dot: 'bg-emerald-600',
    },
    warning: {
      badge: 'bg-amber-50 text-amber-800 border-amber-200',
      dot: 'bg-amber-600',
    },
    risk: {
      badge: 'bg-red-50 text-red-800 border-red-200',
      dot: 'bg-red-600',
    },
    info: {
      badge: 'bg-blue-50 text-blue-800 border-blue-200',
      dot: 'bg-blue-600',
    },
    neutral: {
      badge: 'bg-slate-100 text-slate-700 border-slate-200',
      dot: 'bg-slate-500',
    },
  };

  const current = styles[variant] || styles.neutral;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${current.badge} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${current.dot}`} />}
      <span>{children}</span>
    </span>
  );
}
