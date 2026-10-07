import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import {
  Cpu,
  Layers,
  ArrowDown,
  Check,
  CheckCircle2,
  Database,
  BarChart3,
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import StatusBadge from '../components/ui/StatusBadge';
import MedicalDisclaimerBanner from '../components/MedicalDisclaimerBanner';

export default function ModelPerformancePage() {
  // Numerical benchmarks from Google Colab experiment
  const benchmarks = [
    {
      model: 'SVM (Linear)',
      accuracy: '73.58%',
      precision: '76.46%',
      recall: '67.32%',
      f1: '71.60%',
      rocAuc: '78.76%',
      selected: false,
    },
    {
      model: 'Tuned Random Forest',
      accuracy: '73.58%',
      precision: '75.96%',
      recall: '68.16%',
      f1: '71.85%',
      rocAuc: '79.98%',
      selected: false,
    },
    {
      model: 'Soft Voting Ensemble',
      accuracy: '73.24%',
      precision: '75.01%',
      recall: '68.82%',
      f1: '71.78%',
      rocAuc: '79.47%',
      selected: true,
      note: 'Selected Model',
    },
  ];

  // Grouped bar comparison data
  const metricComparisonData = [
    { metric: 'Accuracy', SVM: 73.58, 'Tuned RF': 73.58, 'Soft Voting': 73.24 },
    { metric: 'Precision', SVM: 76.46, 'Tuned RF': 75.96, 'Soft Voting': 75.01 },
    { metric: 'Recall', SVM: 67.32, 'Tuned RF': 68.16, 'Soft Voting': 68.82 },
    { metric: 'F1 Score', SVM: 71.60, 'Tuned RF': 71.85, 'Soft Voting': 71.78 },
    { metric: 'ROC-AUC', SVM: 78.76, 'Tuned RF': 79.98, 'Soft Voting': 79.47 },
  ];

  // Radar comparison chart
  const radarData = [
    { subject: 'Accuracy', SVM: 73.58, 'Tuned RF': 73.58, 'Soft Voting': 73.24, fullMark: 100 },
    { subject: 'Precision', SVM: 76.46, 'Tuned RF': 75.96, 'Soft Voting': 75.01, fullMark: 100 },
    { subject: 'Recall', SVM: 67.32, 'Tuned RF': 68.16, 'Soft Voting': 68.82, fullMark: 100 },
    { subject: 'F1 Score', SVM: 71.60, 'Tuned RF': 71.85, 'Soft Voting': 71.78, fullMark: 100 },
    { subject: 'ROC-AUC', SVM: 78.76, 'Tuned RF': 79.98, 'Soft Voting': 79.47, fullMark: 100 },
  ];

  // 10 Features matching backend model artifact order exactly
  const featuresList = [
    { name: 'BMI', label: 'Body Mass Index', type: 'Engineered', formula: 'weight / height²', desc: 'Anthropometric weight-to-height ratio' },
    { name: 'MAP', label: 'Mean Arterial Pressure', type: 'Engineered', formula: '(SBP + 2·DBP) / 3', desc: 'Average organ perfusion pressure' },
    { name: 'PP', label: 'Pulse Pressure', type: 'Engineered', formula: 'SBP - DBP', desc: 'Arterial pulsatile compliance indicator' },
    { name: 'active', label: 'Physical Activity', type: 'Lifestyle', formula: 'Binary (0 / 1)', desc: 'Regular cardiovascular exercise participation' },
    { name: 'age_years', label: 'Age (Years)', type: 'Demographic', formula: 'Integer (18–110)', desc: 'Patient chronological age' },
    { name: 'ap_hi', label: 'Systolic Blood Pressure', type: 'Clinical', formula: 'mmHg', desc: 'Peak contraction arterial pressure' },
    { name: 'ap_lo', label: 'Diastolic Blood Pressure', type: 'Clinical', formula: 'mmHg', desc: 'Resting cardiac chamber pressure' },
    { name: 'cholesterol', label: 'Serum Cholesterol', type: 'Biomarker', formula: 'Ordinal (1, 2, 3)', desc: '1: Normal, 2: Above Normal, 3: High' },
    { name: 'weight', label: 'Body Weight', type: 'Biometric', formula: 'kg', desc: 'Patient total mass in kilograms' },
    { name: 'gluc', label: 'Fasting Glucose', type: 'Biomarker', formula: 'Ordinal (1, 2, 3)', desc: '1: Normal, 2: Impaired, 3: Diabetic' },
  ];

  const pipelineBlocks = [
    { step: '01', title: 'Raw Dataset', desc: '70,000 clinical records ingested and cleaned of physical anomalies.' },
    { step: '02', title: 'Feature Engineering', desc: 'Derived hemodynamic markers: BMI, Pulse Pressure (PP), and Mean Arterial Pressure (MAP).' },
    { step: '03', title: 'Feature Selection', desc: 'Filtered to 10 optimal, non-collinear features using correlation and importance ranking.' },
    { step: '04', title: 'Standard Scaling', desc: 'Z-score normalization fit via StandardScaler to eliminate feature scale bias.' },
    { step: '05', title: 'ML Models', desc: 'Independent training and hyperparameter tuning of Random Forest, SVM, and Logistic Regression.' },
    { step: '06', title: 'Soft Voting', desc: 'Ensemble aggregator weighting predicted probability distributions across estimators.' },
    { step: '07', title: 'Risk Probability', desc: 'Calibrated continuous output P(Y=1) mapped to clinical risk classification.' },
  ];

  return (
    <div className="container-app py-8 sm:py-12 space-y-12">
      
      {/* Page Header */}
      <PageHeader
        eyebrow="Empirical Benchmarks"
        title="Model Performance & Benchmarks"
        description="Quantitative evaluation metrics from the Google Colab machine learning experiment across 70,000 patient records. Compares standalone estimators against the final Soft Voting ensemble."
      />

      {/* Professional Benchmark Comparison Table */}
      <Card className="overflow-hidden border-slate-200 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-navy-900">
              Algorithm Benchmark Comparison
            </h3>
            <p className="text-xs text-slate-500">
              Evaluated on 20% held-out test split (N = 14,000 records)
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500">
            5-Fold Cross Validation
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                <th className="py-3 px-6">Model</th>
                <th className="py-3 px-4 font-mono">Accuracy</th>
                <th className="py-3 px-4 font-mono">Precision</th>
                <th className="py-3 px-4 font-mono">Recall</th>
                <th className="py-3 px-4 font-mono">F1-Score</th>
                <th className="py-3 px-4 font-mono">ROC-AUC</th>
                <th className="py-3 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {benchmarks.map((row, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors ${
                    row.selected
                      ? 'bg-blue-50/50 font-medium'
                      : 'hover:bg-slate-50/60'
                  }`}
                >
                  <td className="py-3.5 px-6 font-semibold text-navy-900">
                    <div className="flex items-center gap-2">
                      {row.selected && (
                        <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                      )}
                      <span>{row.model}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-800">{row.accuracy}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-800">{row.precision}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-800">{row.recall}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-800">{row.f1}</td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-navy-900">{row.rocAuc}</td>
                  <td className="py-3.5 px-6 text-right">
                    {row.selected ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-100/70 px-2.5 py-0.5 rounded-full border border-blue-200">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                        <span>Selected Pipeline</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-500 font-mono">Candidate</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 leading-relaxed">
          <strong>Ensemble Rationale:</strong> While Tuned Random Forest achieved 79.98% ROC-AUC, the Soft Voting ensemble achieved the highest <strong>Recall (68.82%)</strong> with superior probability calibration, critical for minimizing false negatives in clinical risk screening.
        </div>
      </Card>

      {/* Visual Charts: Grouped Bar & Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Grouped Bar Chart */}
        <Card className="lg:col-span-8 p-5 border-slate-200 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-navy-900">
              Metric-by-Metric Comparison
            </h3>
            <p className="text-xs text-slate-500">
              Scale constrained to 60% – 85% to highlight discrimination variance
            </p>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={metricComparisonData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="metric" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis domain={[60, 85]} tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip
                  formatter={(val) => [`${val}%`]}
                  contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                <Bar dataKey="SVM" fill="#64748B" radius={[2, 2, 0, 0]} />
                <Bar dataKey="Tuned RF" fill="#2563EB" radius={[2, 2, 0, 0]} />
                <Bar dataKey="Soft Voting" fill="#0B192C" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Radar Chart */}
        <Card className="lg:col-span-4 p-5 border-slate-200 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-navy-900">
              Multi-Axis Radar Comparison
            </h3>
            <p className="text-xs text-slate-500">
              Balanced diagnostic coverage across 5 dimensions
            </p>
          </div>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="75%">
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#475569' }} />
                <PolarRadiusAxis angle={30} domain={[60, 80]} stroke="#CBD5E1" tick={{ fontSize: 8 }} />
                <Radar name="SVM" dataKey="SVM" stroke="#64748B" fill="#64748B" fillOpacity={0.15} />
                <Radar name="Tuned RF" dataKey="Tuned RF" stroke="#2563EB" fill="#2563EB" fillOpacity={0.15} />
                <Radar name="Soft Voting" dataKey="Soft Voting" stroke="#0B192C" fill="#0B192C" fillOpacity={0.2} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[11px] text-slate-500 text-center border-t border-slate-100 pt-2">
            Soft Voting provides the most uniform polygon balance across all 5 evaluation metrics.
          </p>
        </Card>

      </div>

      {/* Clean Block-Based ML Pipeline Architecture Flow */}
      <section className="space-y-6">
        <SectionHeader
          eyebrow="Architecture Pipeline"
          title="Machine Learning Execution Flow"
          description="Sequential data transformation from raw patient input to calibrated ensemble risk probability."
        />

        <div className="max-w-xl mx-auto space-y-2">
          {pipelineBlocks.map((block, idx) => (
            <React.Fragment key={block.step}>
              <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-md bg-slate-100 text-slate-700 font-mono text-xs font-semibold flex items-center justify-center shrink-0">
                    {block.step}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-navy-900 leading-tight">
                      {block.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {block.desc}
                    </p>
                  </div>
                </div>
              </div>

              {idx < pipelineBlocks.length - 1 && (
                <div className="flex justify-center my-0.5">
                  <ArrowDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* 10 Selected Features Table */}
      <Card className="overflow-hidden border-slate-200 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-navy-900">
              The 10 Model Features (Exact Artifact Order)
            </h3>
            <p className="text-xs text-slate-500">
              Extracted from selected_features.pkl used by the trained backend ensemble
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500">
            N = 10 Features
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                <th className="py-3 px-6 font-mono">Index</th>
                <th className="py-3 px-4 font-mono">Feature Code</th>
                <th className="py-3 px-4">Feature Name</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4 font-mono">Formula / Range</th>
                <th className="py-3 px-6">Clinical Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {featuresList.map((item, idx) => (
                <tr key={item.name} className="hover:bg-slate-50/60">
                  <td className="py-3 px-6 font-mono text-slate-400">[{idx}]</td>
                  <td className="py-3 px-4 font-mono font-bold text-navy-900">{item.name}</td>
                  <td className="py-3 px-4 font-medium text-slate-800">{item.label}</td>
                  <td className="py-3 px-4">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {item.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-slate-600">{item.formula}</td>
                  <td className="py-3 px-6 text-xs text-slate-600">{item.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Medical Disclaimer Banner */}
      <MedicalDisclaimerBanner compact />

    </div>
  );
}
