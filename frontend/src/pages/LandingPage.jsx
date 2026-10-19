import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Cpu,
  Database,
  GitMerge,
  BarChart3,
  CheckCircle2,
  Heart,
  Scale,
} from 'lucide-react';
import variant1Heart from '../assets/variant1_heart.jpg';
import CardiovascularVisual from '../components/CardiovascularVisual';
import MedicalDisclaimerBanner from '../components/MedicalDisclaimerBanner';
import PageHeader from '../components/ui/PageHeader';
import SectionHeader from '../components/ui/SectionHeader';
import StatCard from '../components/ui/StatCard';
import Card from '../components/ui/Card';

export default function LandingPage() {
  const stats = [
    { value: '70,000+', label: 'Patient Records', detail: 'Standardized clinical cohort' },
    { value: '10', label: 'Selected Features', detail: 'Hemodynamic & clinical subset' },
    { value: '5', label: 'Models Evaluated', detail: 'SVM, Random Forest, Soft Voting' },
    { value: '73%+', label: 'Model Accuracy', detail: 'Ensemble benchmark (~80% ROC-AUC)' },
  ];

  const features = [
    {
      name: 'Body Mass Index',
      abbr: 'BMI',
      formula: 'weight (kg) / height (m)²',
      normalRange: '18.5 – 24.9 kg/m²',
      description: 'Standardized anthropometric index normalizing body mass to stature, reflecting metabolic workload.',
      icon: Scale,
    },
    {
      name: 'Pulse Pressure',
      abbr: 'PP',
      formula: 'Systolic BP - Diastolic BP',
      normalRange: '30 – 50 mmHg (≤60 normal)',
      description: 'Reflects pulsatile mechanical stress on arterial walls with each beat; elevated values indicate vascular stiffness.',
      icon: Activity,
    },
    {
      name: 'Mean Arterial Pressure',
      abbr: 'MAP',
      formula: '(SBP + 2 · DBP) / 3',
      normalRange: '70 – 105 mmHg',
      description: 'The average perfusion pressure sustaining continuous blood flow to vital organs throughout the cardiac cycle.',
      icon: Heart,
    },
  ];

  const pipelineSteps = [
    {
      num: '01',
      title: 'Clinical Intake',
      desc: 'Collect 10 demographic, biometric, and lifestyle inputs via structured form.',
    },
    {
      num: '02',
      title: 'Feature Derivation',
      desc: 'Compute real-time hemodynamic indices (BMI, Pulse Pressure, MAP).',
    },
    {
      num: '03',
      title: 'Standard Scaling',
      desc: 'Normalize input vector using parameters fit on 70,000 training records.',
    },
    {
      num: '04',
      title: 'Ensemble Inference',
      desc: 'Weighted Soft Voting across Random Forest, SVM, and Logistic Regression.',
    },
  ];

  return (
    <div className="space-y-16 pb-12">
      
      {/* Hero Section */}
      <section className="pt-6 sm:pt-12">
        <div className="container-app">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-primary-action block">
                  Cardiovascular Machine Learning
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-900 tracking-tight leading-tight">
                  Estimate cardiovascular risk with a transparent ML pipeline.
                </h1>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                CardioSense AI processes patient biometrics and engineered hemodynamic indicators through a trained Soft Voting ensemble to calculate calibrated risk estimates.
              </p>

              {/* Primary & Secondary CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  to="/assess"
                  className="bg-navy-900 hover:bg-navy-800 text-white font-semibold px-6 py-3 rounded-lg shadow-xs transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>Assess My Risk</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <Link
                  to="/model-performance"
                  className="bg-white hover:bg-slate-50 text-slate-700 font-semibold px-5 py-3 rounded-lg border border-slate-300 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Cpu className="w-4 h-4 text-slate-500" />
                  <span>Explore Model</span>
                </Link>
              </div>

              {/* Supporting micro copy */}
              <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>No sign-up required • Real-time inference • Educational demonstration</span>
              </div>

            </div>

            {/* Right Hero Column: Prominent Muted Blue-Gray Anatomical Heart */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="card-clinical p-6 sm:p-7 w-full max-w-md flex flex-col items-center justify-center text-center shadow-sm">
                
                {/* Clinical Metadata Header */}
                <div className="w-full flex items-center justify-between border-b border-slate-100 pb-2.5 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span className="text-[11px] font-semibold tracking-wider text-navy-900 uppercase">
                      Cardiac System Model
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                    N = 70,000 Cohort
                  </span>
                </div>

                {/* Prominent Muted Blue-Gray Anatomical Heart Illustration */}
                <div className="relative w-full aspect-square max-w-[300px] sm:max-w-[320px] flex items-center justify-center py-2">
                  <img
                    src={variant1Heart}
                    alt="Muted blue-gray anatomical heart illustration"
                    className="w-full h-full object-contain filter contrast-[1.03] select-none"
                    loading="eager"
                  />
                </div>

                {/* Subdued Clinical Footnote */}
                <div className="w-full mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-mono">Hemodynamic Feature Vector</span>
                  <span className="font-medium text-slate-700">10 Indicators</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Research Statistics Row */}
      <section className="container-app">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, idx) => (
            <StatCard
              key={idx}
              value={s.value}
              label={s.label}
              detail={s.detail}
            />
          ))}
        </div>
      </section>

      {/* Feature Engineering Section */}
      <section className="container-app space-y-6">
        <SectionHeader
          eyebrow="Hemodynamic Physiology"
          title="Engineered Hemodynamic Indicators"
          description="Static systolic and diastolic readings capture isolated endpoints. Our machine learning pipeline derives continuous hemodynamic variables that correlate with vascular resistance and arterial stiffness."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <Card key={feat.abbr} className="p-5 space-y-3.5 border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-navy-900">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-navy-900 leading-tight">
                        {feat.name}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-500">
                        {feat.abbr}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {feat.normalRange}
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 font-mono text-xs text-navy-900">
                  {feat.formula}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {feat.description}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* How the System Works */}
      <section className="container-app space-y-6">
        <SectionHeader
          eyebrow="Pipeline Flow"
          title="How the System Works"
          description="A transparent four-stage pipeline from clinical input collection to calibrated ensemble classification."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pipelineSteps.map((step) => (
            <Card key={step.num} className="p-5 space-y-2 border-slate-200">
              <span className="font-mono text-xs font-bold text-primary-action bg-blue-50 px-2 py-0.5 rounded inline-block">
                {step.num}
              </span>
              <h4 className="text-sm font-semibold text-navy-900">
                {step.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {step.desc}
              </p>
            </Card>
          ))}
        </div>

        {/* Live Architecture Pipeline Preview */}
        <div className="pt-2 flex justify-center">
          <CardiovascularVisual />
        </div>
      </section>

      {/* Single Educational Disclaimer Banner */}
      <section className="container-app">
        <MedicalDisclaimerBanner compact />
      </section>

    </div>
  );
}
