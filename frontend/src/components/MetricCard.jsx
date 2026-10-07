import React from 'react';
import StatusBadge from './ui/StatusBadge';

export default function MetricCard({
  title,
  subtitle,
  value,
  unit = '',
  statusLabel,
  statusVariant = 'neutral', // 'success', 'warning', 'risk', 'info', 'neutral'
  statusColor,
  icon: Icon,
  referenceRange,
  description,
  className = '',
}) {
  // Normalize statusColor alias if provided
  let normalizedVariant = statusVariant;
  const colorProp = statusColor || statusVariant;
  if (colorProp === 'emerald') normalizedVariant = 'success';
  else if (colorProp === 'amber') normalizedVariant = 'warning';
  else if (colorProp === 'risk' || colorProp === 'red') normalizedVariant = 'risk';
  else if (colorProp === 'blue') normalizedVariant = 'info';
  else if (colorProp === 'success' || colorProp === 'warning' || colorProp === 'info' || colorProp === 'neutral') {
    normalizedVariant = colorProp;
  }

  return (
    <div className={`card-clinical p-5 flex flex-col justify-between ${className}`}>
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2.5">
            {Icon && (
              <div className="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-center text-navy-900 shrink-0">
                <Icon className="w-3.5 h-3.5" />
              </div>
            )}
            <div>
              <h4 className="text-sm font-semibold text-navy-900 leading-tight">{title}</h4>
              {subtitle && <p className="text-xs text-clinical-muted mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {statusLabel && (
            <StatusBadge variant={normalizedVariant} dot={true}>
              {statusLabel}
            </StatusBadge>
          )}
        </div>

        <div className="my-3 flex items-baseline gap-1.5">
          <span className="text-2xl sm:text-3xl font-bold text-navy-900 font-mono tracking-tight">
            {value}
          </span>
          {unit && <span className="text-xs font-medium text-clinical-muted">{unit}</span>}
        </div>

        {referenceRange && (
          <div className="text-xs text-clinical-muted bg-slate-50 px-2.5 py-1.5 rounded border border-slate-100 flex items-center justify-between mb-2">
            <span className="text-slate-500">Normal Reference:</span>
            <span className="font-semibold text-slate-700 font-mono">{referenceRange}</span>
          </div>
        )}
      </div>

      {description && (
        <p className="text-xs text-clinical-muted border-t border-slate-100 pt-2.5 mt-1 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
