import React, { useState, useEffect } from 'react';
import {
  Code,
  Cpu,
  FileCode2,
  RefreshCw,
  Server,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import StatusBadge from '../components/ui/StatusBadge';
import MedicalDisclaimerBanner from '../components/MedicalDisclaimerBanner';
import { getModelStatus } from '../services/api';

export default function AboutPage() {
  const [modelStatus, setModelStatus] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(true);

  const fetchStatus = async () => {
    setLoadingStatus(true);
    const data = await getModelStatus();
    setModelStatus(data);
    setLoadingStatus(false);
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const technologies = [
    {
      category: 'Machine Learning',
      items: [
        { name: 'scikit-learn', desc: 'Soft Voting, Random Forest, Linear SVM, and StandardScaler' },
        { name: 'pandas & numpy', desc: 'Vectorized data cleaning and feature engineering' },
        { name: 'joblib', desc: 'Serialized model artifact serialization and runtime loading' },
      ],
    },
    {
      category: 'Backend Architecture',
      items: [
        { name: 'FastAPI', desc: 'High-performance asynchronous Python REST framework' },
        { name: 'Pydantic v2', desc: 'Strict runtime data validation and schema serialization' },
        { name: 'Uvicorn', desc: 'Lightweight ASGI production server implementation' },
      ],
    },
    {
      category: 'Frontend & UI',
      items: [
        { name: 'React & Vite', desc: 'Component architecture and rapid development tooling' },
        { name: 'Tailwind CSS', desc: 'Clinical design system with restrained palette tokens' },
        { name: 'Recharts', desc: 'Accessible, responsive SVG data visualization' },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Page Header */}
      <PageHeader
        eyebrow="System Overview"
        title="About CardioSense AI"
        description="A portfolio-grade healthcare machine learning platform designed to bridge research notebooks with a transparent, clinical-grade user interface."
      />

      {/* Project Objective */}
      <Card className="p-6 border-slate-200 space-y-3">
        <h3 className="text-base font-semibold text-navy-900">
          Project Objective
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          CardioSense AI demonstrates how machine learning models trained in exploratory Google Colab notebooks can be deployed into transparent, trustworthy healthcare applications. Rather than presenting opaque black-box scores, the application exposes derived hemodynamic variables (Mean Arterial Pressure, Pulse Pressure, Body Mass Index), quantitative algorithm benchmarks, and calibrated probability estimates.
        </p>
      </Card>

      {/* Machine Learning Methodology */}
      <Card className="p-6 border-slate-200 space-y-3">
        <h3 className="text-base font-semibold text-navy-900">
          Machine Learning Methodology
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Trained on a cohort of 70,000 patient records, the pipeline engineers continuous hemodynamic features to capture arterial stiffness and organ perfusion pressure. Ten non-collinear features are scaled using a fitted <code className="bg-slate-100 px-1 rounded text-navy-900 font-mono text-xs">StandardScaler</code> and evaluated with a <code className="bg-slate-100 px-1 rounded text-navy-900 font-mono text-xs">Soft Voting Ensemble</code> combining Random Forest, Linear SVM, and Logistic Regression.
        </p>
      </Card>

      {/* Simplified Model Artifact Tracker */}
      <Card className="p-6 border-slate-200 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-semibold text-navy-900">
              Model Artifacts & Backend Status
            </h3>
            <p className="text-xs text-slate-500">
              Live status of serialized artifacts loaded from <code className="font-mono text-slate-700">backend/model/</code>
            </p>
          </div>

          <button
            onClick={fetchStatus}
            disabled={loadingStatus}
            className="text-xs font-medium text-slate-700 hover:text-navy-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${loadingStatus ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* 3 Artifact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              file: 'soft_voting_model.pkl',
              role: 'Ensemble Classifier',
              exists: modelStatus?.files?.['soft_voting_model.pkl']?.exists,
              size: modelStatus?.files?.['soft_voting_model.pkl']?.size_bytes,
            },
            {
              file: 'ensemble_scaler.pkl',
              role: 'StandardScaler Preprocessor',
              exists: modelStatus?.files?.['ensemble_scaler.pkl']?.exists,
              size: modelStatus?.files?.['ensemble_scaler.pkl']?.size_bytes,
            },
            {
              file: 'selected_features.pkl',
              role: '10 Selected Features Vector',
              exists: modelStatus?.files?.['selected_features.pkl']?.exists,
              size: modelStatus?.files?.['selected_features.pkl']?.size_bytes,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-lg border bg-slate-50 border-slate-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <FileCode2 className="w-4 h-4 text-slate-500" />
                  <StatusBadge variant={item.exists ? 'success' : 'warning'}>
                    {item.exists ? 'Loaded' : 'Pending'}
                  </StatusBadge>
                </div>
                <div className="font-mono font-semibold text-xs text-navy-900 truncate" title={item.file}>
                  {item.file}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {item.role}
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-200 text-[10px] text-slate-500 font-mono">
                {item.exists && item.size ? `${(item.size / 1024).toFixed(1)} KB` : 'Demo Fallback'}
              </div>
            </div>
          ))}
        </div>

        {/* Export Reference */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-xs text-slate-600">
          <span className="font-semibold text-navy-900 block mb-1">
            Exact Feature Vector Order:
          </span>
          <code className="font-mono text-[11px] text-slate-800 break-all block">
            ["BMI", "MAP", "PP", "active", "age_years", "ap_hi", "ap_lo", "cholesterol", "weight", "gluc"]
          </code>
        </div>
      </Card>

      {/* Technology Stack Grid */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-navy-900">
            Technology Stack
          </h3>
          <p className="text-xs text-slate-500">
            Modular architecture separating scientific modeling, REST transport, and frontend presentation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {technologies.map((group, idx) => (
            <Card key={idx} className="p-4 border-slate-200 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-1.5">
                {group.category}
              </h4>
              <ul className="space-y-2.5">
                {group.items.map((item, i) => (
                  <li key={i} className="text-xs">
                    <span className="font-semibold text-navy-900 block">{item.name}</span>
                    <span className="text-slate-500 text-[11px] leading-snug">{item.desc}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>

      {/* Medical Disclaimer Banner */}
      <MedicalDisclaimerBanner compact />

    </div>
  );
}
