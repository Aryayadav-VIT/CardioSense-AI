import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) {
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-3.5 py-2 gap-2',
    lg: 'text-sm sm:text-base px-5 py-2.5 gap-2.5 font-medium',
  };

  const variantClasses = {
    primary: 'bg-navy-900 text-white hover:bg-navy-800 border-transparent shadow-sm',
    secondary: 'bg-white text-clinical-text hover:text-clinical-heading hover:bg-slate-50 border-clinical-border shadow-sm',
    ghost: 'bg-transparent text-clinical-muted hover:text-clinical-heading hover:bg-slate-100 border-transparent',
    danger: 'bg-semantic-risk text-white hover:bg-red-700 border-transparent shadow-sm',
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;
  const currentVariant = variantClasses[variant] || variantClasses.primary;

  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center font-medium rounded-button border transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary-action focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${currentSize} ${currentVariant} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : Icon && iconPosition === 'left' ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}

      <span>{children}</span>

      {!loading && Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 shrink-0" />
      )}
    </button>
  );
}
