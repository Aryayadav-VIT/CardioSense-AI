import React from 'react';
import {
  Database,
  Activity,
  Filter,
  Sliders,
  Cpu,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import MedicalDisclaimerBanner from '../components/MedicalDisclaimerBanner';

export default function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      title: 'Data Preparation & Cleaning',
      icon: Database,
      summary: 'Quality control across 70,000 raw patient records',
      description: 'The raw dataset contains clinical, biometric, and lifestyle observations. Preprocessing converts chronological age from days to years and applies physiological bounds filtering to remove severe measurement anomalies.',
      details: [
        'Age conversion: age_years = round(age_days / 365.25)',
        'Physiological BP validation: 60 ≤ ap_hi ≤ 260 mmHg, 40 ≤ ap_lo ≤ 180 mmHg, and ap_hi > ap_lo',
        'Outlier removal: Extreme biometric readings beyond 3 standard deviations filtered',
      ],
    },
    {
      num: '02',
      title: 'Hemodynamic Feature Engineering',
      icon: Activity,
      summary: 'Deriving vascular resistance and arterial compliance indices',
      description: 'Standard blood pressure numbers provide static systolic and diastolic values. Our feature engineering derives continuous hemodynamic metrics that directly reflect arterial stiffness and continuous vascular resistance.',
      formulas: [
        { name: 'Body Mass Index', expr: 'BMI = weight (kg) / [height (m)]²' },
        { name: 'Pulse Pressure', expr: 'PP = Systolic BP - Diastolic BP' },
        { name: 'Mean Arterial Pressure', expr: 'MAP = (Systolic BP + 2 · Diastolic BP) / 3' },
      ],
    },
    {
      num: '03',
      title: 'Feature Selection',
      icon: Filter,
      summary: 'Isolating the 10 optimal non-collinear features',
      description: 'To prevent overfitting and multicollinearity, correlation matrices and feature importance rankings were analyzed. The final model preserves 10 features capturing demographic, anthropometric, hemodynamic, metabolic, and behavioral dimensions.',
      details: [
        '10 Model Features: BMI, MAP, PP, active, age_years, ap_hi, ap_lo, cholesterol, weight, gluc',
        'Preserved in backend artifact selected_features.pkl for strict inference alignment',
      ],
    },
    {
      num: '04',
      title: 'Standard Scaling',
      icon: Sliders,
      summary: 'Z-score normalization of continuous feature distributions',
      description: 'Features possess vastly different dimensional units (e.g. age in years vs blood pressure in mmHg vs weight in kg). StandardScaler normalizes each variable to zero mean and unit variance: z = (x - μ) / σ.',
      codeSnippet: 'scaler = StandardScaler()\nX_scaled = scaler.fit_transform(X_train[SELECTED_FEATURES])',
    },
    {
      num: '05',
      title: 'Model Training & Exploration',
      icon: Cpu,
      summary: 'Systematic benchmarking across candidate algorithms',
      description: 'Diverse candidate algorithms were independently trained and hyperparameter-tuned on a 5-fold cross-validation split of the 70,000 record dataset.',
      details: [
        'Linear SVM: 73.58% accuracy, 76.46% precision, 78.76% ROC-AUC',
        'Tuned Random Forest: 73.58% accuracy, 75.96% precision, 79.98% ROC-AUC',
        'Logistic Regression: Calibrated linear baseline for probability calibration',
      ],
    },
    {
      num: '06',
      title: 'Soft Voting Ensemble',
      icon: Layers,
      summary: 'Weighted probability averaging across diverse estimators',
      description: 'Rather than discrete majority voting (0 or 1), Soft Voting computes the weighted average of predicted probability distributions across estimators: P(Y=1) = Σ (wᵢ · Pᵢ) / Σ wᵢ. This stabilizes boundary variance and yields smooth, calibrated continuous risk scores.',
      details: [
        'Combined Estimators: Random Forest, SVM, and Logistic Regression',
        'Validation Results: 73.24% accuracy, 75.01% precision, 68.82% recall, 79.47% ROC-AUC',
      ],
    },
    {
      num: '07',
      title: 'Risk Estimation & Report',
      icon: ShieldCheck,
      summary: 'Translating calibrated probabilities into actionable findings',
      description: 'The final continuous probability P(Y=1) is evaluated against a clinical 0.50 threshold to estimate cardiovascular risk tiering alongside key physiological factor attributions.',
      details: [
        'Estimated Probability: Continuous 0% to 100% P(Y=1) readout',
        'Risk Tier: Lower Cardiovascular Risk (<50%) or Elevated Cardiovascular Risk (≥50%)',
        'Factor Attribution: Numbered clinical factors identifying specific out-of-range indicators',
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Page Header */}
      <PageHeader
        eyebrow="Methodology & Architecture"
        title="How CardioSense AI Works"
        description="A step-by-step walkthrough of the machine learning pipeline — from data preparation and hemodynamic feature engineering to soft voting ensemble prediction."
      />

      {/* Sequential 7-Step Pipeline */}
      <div className="space-y-4">
        {steps.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.num} className="p-5 border-slate-200 space-y-3.5">
              
              {/* Step Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-md bg-navy-900 text-white font-mono text-xs font-semibold flex items-center justify-center shrink-0">
                    {s.num}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-navy-900 leading-tight">
                      {s.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">{s.summary}</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-navy-900 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {s.description}
              </p>

              {/* Formulas if present */}
              {s.formulas && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  {s.formulas.map((f, i) => (
                    <div key={i} className="bg-slate-50 border border-slate-200 rounded p-2.5 text-xs">
                      <div className="text-[11px] font-semibold text-slate-500 uppercase">{f.name}</div>
                      <div className="font-mono text-xs font-medium text-navy-900 mt-0.5">{f.expr}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Details list if present */}
              {s.details && (
                <ul className="space-y-1.5 pt-1 text-xs text-slate-600">
                  {s.details.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Code snippet if present */}
              {s.codeSnippet && (
                <div className="bg-slate-900 text-slate-200 rounded-lg p-3 font-mono text-xs overflow-x-auto">
                  <code>{s.codeSnippet}</code>
                </div>
              )}

            </Card>
          );
        })}
      </div>

      {/* Medical Disclaimer Banner */}
      <MedicalDisclaimerBanner compact />

    </div>
  );
}
