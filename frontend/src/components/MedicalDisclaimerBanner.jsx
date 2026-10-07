import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function MedicalDisclaimerBanner({ compact = false, className = '' }) {
  if (compact) {
    return (
      <div className={`text-xs text-clinical-muted flex items-center gap-2 bg-slate-50 border border-clinical-border px-3.5 py-2 rounded-button ${className}`}>
        <AlertCircle className="w-3.5 h-3.5 text-slate-500 shrink-0" />
        <span>
          <strong className="text-slate-700">Educational Research Project:</strong> This application does not provide medical diagnoses or replace clinical consultation.
        </span>
      </div>
    );
  }

  return (
    <div className={`bg-slate-50 border border-clinical-border p-4 rounded-card text-xs text-clinical-muted leading-relaxed flex items-start gap-3 ${className}`}>
      <AlertCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
      <div>
        <span className="font-semibold text-slate-800 block mb-0.5">
          Educational Machine Learning Project — Medical Disclaimer
        </span>
        <p>
          This application is an educational machine-learning project and is not intended to diagnose, treat, or prevent any medical condition. Risk assessments represent statistical probabilities derived from experimental datasets. Consult a licensed physician for clinical evaluations.
        </p>
      </div>
    </div>
  );
}
