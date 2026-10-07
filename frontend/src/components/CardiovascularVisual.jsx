import React from 'react';
import { Activity, ArrowRight, Check, Layers, Cpu, ShieldCheck } from 'lucide-react';

export default function CardiovascularVisual() {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl border border-slate-200 shadow-sm p-5 text-left space-y-4">
      
      {/* Top Status Bar */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-semibold text-navy-900 tracking-wide uppercase">
            Inference Pipeline Architecture
          </span>
        </div>
        <span className="text-[11px] font-medium text-slate-500 font-mono">
          N = 70,000 Cohort
        </span>
      </div>

      {/* Pipeline Steps in Miniature */}
      <div className="space-y-2.5 text-xs">
        
        {/* Step 1: Raw Inputs */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 mb-1.5">
            <span>01 Clinical & Demographic Inputs</span>
            <span className="font-mono text-slate-500">10 raw variables</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-[10px] sm:text-[11px] font-mono text-slate-600">
            <div className="bg-white border border-slate-200 rounded px-1.5 sm:px-2 py-1 text-center truncate">Age: 52y</div>
            <div className="bg-white border border-slate-200 rounded px-1.5 sm:px-2 py-1 text-center truncate">SBP: 130</div>
            <div className="bg-white border border-slate-200 rounded px-1.5 sm:px-2 py-1 text-center truncate">DBP: 85</div>
          </div>
        </div>

        {/* Step 2: Feature Engineering */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 mb-1.5">
            <span>02 Hemodynamic Derivations</span>
            <span className="text-emerald-700 font-medium">Standardized</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-[10px] sm:text-[11px] font-mono text-slate-600">
            <div className="bg-white border border-slate-200 rounded px-1.5 sm:px-2 py-1 text-center truncate">
              BMI: <strong className="text-navy-900">26.2</strong>
            </div>
            <div className="bg-white border border-slate-200 rounded px-1.5 sm:px-2 py-1 text-center truncate">
              PP: <strong className="text-navy-900">45</strong>
            </div>
            <div className="bg-white border border-slate-200 rounded px-1.5 sm:px-2 py-1 text-center truncate">
              MAP: <strong className="text-navy-900">100.0</strong>
            </div>
          </div>
        </div>

        {/* Step 3: Ensemble Classification */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 mb-1.5">
            <span>03 Soft Voting Ensemble</span>
            <span className="font-mono text-slate-500">Weights [1, 2, 1]</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-[10px] sm:text-[11px] text-slate-600 text-center">
            <div className="bg-white border border-slate-200 rounded px-1.5 sm:px-2 py-1 font-medium truncate">
              LogReg
            </div>
            <div className="bg-white border border-slate-200 rounded px-1.5 sm:px-2 py-1 font-medium text-navy-900 font-semibold truncate">
              Tuned RF
            </div>
            <div className="bg-white border border-slate-200 rounded px-1.5 sm:px-2 py-1 font-medium truncate">
              LinSVM
            </div>
          </div>
        </div>

      </div>

      {/* Output Result Pill */}
      <div className="bg-navy-900 text-white rounded-lg p-3 flex items-center justify-between text-xs">
        <div>
          <span className="text-[10px] uppercase font-semibold text-slate-300 block">
            Calibrated Risk Probability
          </span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-lg font-bold font-mono">22.4%</span>
            <span className="text-[11px] text-slate-300">P(Y=1)</span>
          </div>
        </div>
        <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-1 rounded text-[11px] font-semibold uppercase tracking-wider">
          Lower Risk
        </div>
      </div>

    </div>
  );
}
