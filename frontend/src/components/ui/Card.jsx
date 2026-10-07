import React from 'react';

export default function Card({ children, className = '', hover = false, ...props }) {
  const hasPadding = /(^|\s)p[xytrbl]?-\d+/.test(className) || className.includes('overflow-hidden');
  const paddingClass = hasPadding ? '' : 'p-5 sm:p-6';

  return (
    <div
      className={`card-clinical ${paddingClass} ${hover ? 'card-clinical-hover' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
