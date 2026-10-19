import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Activity,
  Heart,
  Scale,
  RefreshCw,
  BarChart3,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Database,
  Layers,
} from 'lucide-react';
import CircularGauge from '../components/CircularGauge';
import MetricCard from '../components/MetricCard';
import MedicalDisclaimerBanner from '../components/MedicalDisclaimerBanner';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import StatusBadge from '../components/ui/StatusBadge';
import { getModelStatus, predictRisk } from '../services/api';

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [result, setResult] = useState(null);
  const [inputs, setInputs] = useState(null);
  const [modelStatus, setModelStatus] = useState(null);

  useEffect(() => {
    let active = true;

    // Load live model status from backend
    getModelStatus().then((status) => {
      if (!active) return;
      setModelStatus(status);

      // If existing cached result was marked demo, but backend model is loaded, re-predict with trained model
      const cachedInputsStr = sessionStorage.getItem('cardiosense_last_inputs');
      if (status.model_loaded && cachedInputsStr) {
        try {
          const parsedInputs = JSON.parse(cachedInputsStr);
          predictRisk(parsedInputs).then((freshResult) => {
            if (!active) return;
            if (freshResult && !freshResult.is_demo) {
              setResult(freshResult);
              sessionStorage.setItem('cardiosense_last_result', JSON.stringify(freshResult));
            }
          });
        } catch (e) {
          console.error('Auto-refresh prediction error:', e);
        }
      }
    });

    // 1. Check if passed via React Router navigation state
    if (location.state?.result) {
      setResult(location.state.result);
      setInputs(location.state.inputs);
    } else {
      // 2. Fall back to sessionStorage if reloaded
      const cachedResult = sessionStorage.getItem('cardiosense_last_result');
      const cachedInputs = sessionStorage.getItem('cardiosense_last_inputs');
      if (cachedResult) {
        try {
          setResult(JSON.parse(cachedResult));
          if (cachedInputs) setInputs(JSON.parse(cachedInputs));
        } catch (e) {
          console.error(e);
        }
      }
    }

    return () => {
      active = false;
    };
  }, [location.state]);

  // If no assessment has been run yet
  if (!result) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-5">
        <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-700">
          <Activity className="w-6 h-6 text-navy-900" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-navy-900">
          No Recent Risk Assessment Found
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto">
          Please complete the 5-step risk assessment intake to evaluate clinical and hemodynamic indicators with our ensemble model.
        </p>
        <div className="pt-2">
          <Link
            to="/assess"
            className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-semibold px-5 py-2.5 rounded-lg shadow-xs transition-all text-xs sm:text-sm"
          >
            <span>Start Risk Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const isElevated = result.prediction === 1 || result.risk_probability >= 0.50;
  const probPercentage = Math.round(result.risk_probability * 100);

  return (
    <div className="container-app max-w-4xl py-8 sm:py-12 space-y-8">
      
      {/* Page Header & Minimal System Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <PageHeader
          eyebrow="Assessment Report"
          title="Cardiovascular Risk Evaluation"
          description="Machine learning prediction derived from 10 hemodynamic and clinical features."
        />
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
              !result.is_demo
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                !result.is_demo ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            />
            <span>
              {!result.is_demo ? 'Trained Soft Voting Ensemble' : 'Educational Demo Mode'}
            </span>
          </span>
        </div>
      </div>

      {/* Primary Analytical Report Card */}
      <Card className="overflow-hidden border-slate-200 shadow-sm">
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left: Risk Probability Gauge */}
          <div className="md:col-span-5 flex justify-center md:border-r md:border-slate-200 pb-6 md:pb-0 md:pr-8">
            <CircularGauge
              probability={result.risk_probability}
              label={isElevated ? 'Elevated Risk' : 'Lower Risk'}
              size={240}
            />
          </div>

          {/* Right: Classification + Clinical Rationale */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
                Model Classification
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-navy-900 mt-0.5">
                {isElevated ? 'Elevated Cardiovascular Risk' : 'Lower Cardiovascular Risk'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                The Soft Voting ensemble calculated an estimated probability of{' '}
                <strong className="text-navy-900 font-semibold">{probPercentage}%</strong> based on your standardized biometric and hemodynamic measurements.
              </p>
            </div>

            {/* Model Interpretation Statement */}
            <div className={`p-4 rounded-lg border text-xs leading-relaxed ${
              isElevated
                ? 'bg-red-50 border-red-200 text-red-900'
                : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}>
              <div className="flex items-start gap-2.5">
                {isElevated ? (
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <strong>Model-Estimated Finding: </strong>
                  {isElevated ? (
                    <span>
                      Hemodynamic parameters (such as elevated blood pressure, pulse pressure, or metabolic indices) place this profile in a higher statistical risk percentile compared to benchmark patient cohorts.
                    </span>
                  ) : (
                    <span>
                      Primary hemodynamic indices and baseline biomarkers are within favorable statistical thresholds based on the 70,000 patient benchmark dataset.
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Retake Quick Action */}
            <div className="pt-1 flex items-center justify-between text-xs text-slate-500">
              <span>Model estimate only — not a clinical diagnosis.</span>
              <Link
                to="/assess"
                className="font-medium text-navy-900 hover:text-blue-600 inline-flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Adjust Inputs</span>
              </Link>
            </div>

          </div>

        </div>
      </Card>

      {/* Key Hemodynamic & Biometric Indicators */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-navy-900">Key Indicators</h3>
            <p className="text-xs text-slate-500">
              Engineered physiological metrics provided to the scikit-learn ensemble.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">3 Derived Features</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* BMI Card */}
          <MetricCard
            title="Body Mass Index"
            subtitle="weight / (height/100)²"
            value={result.bmi}
            unit="kg/m²"
            statusLabel={result.bmi >= 30 ? 'Obese' : result.bmi >= 25 ? 'Overweight' : 'Normal'}
            statusVariant={result.bmi >= 30 ? 'risk' : result.bmi >= 25 ? 'warning' : 'success'}
            referenceRange="18.5 – 24.9 kg/m²"
            description="Normalized anthropometric ratio. Elevated values place additional workload on the vascular system."
            icon={Scale}
          />

          {/* Pulse Pressure Card */}
          <MetricCard
            title="Pulse Pressure"
            subtitle="Systolic - Diastolic"
            value={result.pulse_pressure}
            unit="mmHg"
            statusLabel={result.pulse_pressure > 60 ? 'Elevated (>60)' : 'Normal (≤60)'}
            statusVariant={result.pulse_pressure > 60 ? 'risk' : 'success'}
            referenceRange="30 – 50 mmHg"
            description="Pulsatile force exerted on arterial walls with each cardiac cycle. Values above 60 indicate arterial stiffness."
            icon={Activity}
          />

          {/* Mean Arterial Pressure Card */}
          <MetricCard
            title="Mean Arterial Pressure"
            subtitle="(SBP + 2·DBP) / 3"
            value={result.map}
            unit="mmHg"
            statusLabel={result.map > 105 ? 'Elevated (>105)' : result.map < 70 ? 'Low (<70)' : 'Optimal'}
            statusVariant={result.map > 105 ? 'risk' : result.map < 70 ? 'warning' : 'success'}
            referenceRange="70 – 105 mmHg"
            description="Average perfusion pressure across full cardiac cycle, reflecting continuous vascular resistance."
            icon={Heart}
          />
        </div>
      </div>

      {/* Contributing Factors Section */}
      <Card className="p-6 border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-navy-900">
              Contributing Factors
            </h3>
            <p className="text-xs text-slate-500">
              Specific physiological indicators that influenced the model's prediction.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {result.key_factors?.length || 0} Identified
          </span>
        </div>

        <div className="space-y-2.5">
          {result.key_factors && result.key_factors.length > 0 ? (
            result.key_factors.map((factor, i) => (
              <div
                key={i}
                className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-start gap-3 text-xs sm:text-sm text-slate-800"
              >
                <span className="font-mono text-xs font-bold text-navy-900 bg-white border border-slate-200 rounded px-1.5 py-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="leading-snug">{factor}</span>
              </div>
            ))
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-500">
              No adverse risk factors identified for this profile.
            </div>
          )}
        </div>
      </Card>

      {/* Model Information Box */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-3">
          <Cpu className="w-4 h-4 text-slate-500 shrink-0" />
          <span>
            <strong>Ensemble Architecture:</strong> Soft Voting classifier combining Random Forest, Logistic Regression, and SVM across 10 selected features.
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px] text-slate-500 shrink-0">
          <span>N = 70,000</span>
          <span>•</span>
          <span>10 Features</span>
        </div>
      </div>

      {/* Single Contextual Medical Disclaimer */}
      <MedicalDisclaimerBanner compact />

      {/* Action Footer Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <Link
          to="/assess"
          className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
        >
          <RefreshCw className="w-4 h-4 text-slate-500" />
          <span>Retake Assessment</span>
        </Link>

        <div className="w-full sm:w-auto flex items-center gap-3">
          <Link
            to="/analytics"
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <BarChart3 className="w-4 h-4 text-slate-500" />
            <span>Cohort Analytics</span>
          </Link>
          <Link
            to="/model-performance"
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <span>Model Benchmarks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

    </div>
  );
}
