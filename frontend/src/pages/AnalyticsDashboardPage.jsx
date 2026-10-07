import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Database,
  BarChart3,
  PieChart as PieIcon,
  TrendingUp,
  Activity,
  Users,
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import MedicalDisclaimerBanner from '../components/MedicalDisclaimerBanner';

export default function AnalyticsDashboardPage() {
  // Target class distribution: 35,021 vs 34,979 (Total: 70,000)
  // Standardized palette: No Disease: #2563EB (Action Blue), Disease: #DC2626 (Risk Red)
  const targetDistribution = [
    { name: 'No Disease (Class 0)', value: 35021, percentage: '50.0%', color: '#2563EB' },
    { name: 'Cardiovascular Disease (Class 1)', value: 34979, percentage: '50.0%', color: '#DC2626' },
  ];

  // Age Bracket Risk Breakdown in the 70k dataset
  const ageGroupData = [
    { ageGroup: '35–39', noDisease: 980, disease: 320, riskRate: '24.6%' },
    { ageGroup: '40–44', noDisease: 3820, disease: 1890, riskRate: '33.1%' },
    { ageGroup: '45–49', noDisease: 6240, disease: 4510, riskRate: '41.9%' },
    { ageGroup: '50–54', noDisease: 9110, disease: 8740, riskRate: '49.0%' },
    { ageGroup: '55–59', noDisease: 8430, disease: 10420, riskRate: '55.3%' },
    { ageGroup: '60–64', noDisease: 6441, disease: 9099, riskRate: '58.5%' },
  ];

  // Hemodynamic Feature Engineering Distribution: Mean Arterial Pressure (MAP)
  const mapDistributionData = [
    { range: '< 80', label: 'Low', noDisease: 2840, disease: 620 },
    { range: '80–90', label: 'Optimal', noDisease: 12450, disease: 5820 },
    { range: '90–100', label: 'Normal Upper', noDisease: 11200, disease: 9840 },
    { range: '100–110', label: 'Stage 1', noDisease: 6140, disease: 10420 },
    { range: '> 110', label: 'Stage 2', noDisease: 2391, disease: 8279 },
  ];

  // Pulse Pressure (PP) Correlation with Cardiovascular Disease
  const ppDistributionData = [
    { bracket: '< 40 mmHg', noDisease: 14200, disease: 7800, ratio: '35.5% Risk' },
    { bracket: '40–50 mmHg', noDisease: 12100, disease: 11400, ratio: '48.5% Risk' },
    { bracket: '50–60 mmHg', noDisease: 5821, disease: 8979, ratio: '60.7% Risk' },
    { bracket: '> 60 mmHg', noDisease: 2900, disease: 6800, ratio: '70.1% Risk' },
  ];

  // Biomarker Disease Rates
  const biomarkerData = [
    { category: 'Cholesterol: Normal (1)', diseaseRate: 44.0 },
    { category: 'Cholesterol: Above Normal (2)', diseaseRate: 60.2 },
    { category: 'Cholesterol: Well Above Normal (3)', diseaseRate: 76.6 },
    { category: 'Glucose: Normal (1)', diseaseRate: 48.1 },
    { category: 'Glucose: Above Normal (2)', diseaseRate: 59.3 },
    { category: 'Glucose: Well Above Normal (3)', diseaseRate: 62.2 },
  ];

  return (
    <div className="container-app py-8 sm:py-12 space-y-10">
      
      {/* Page Header */}
      <PageHeader
        eyebrow="Cohort Analytics"
        title="Dataset Analytics & Distributions"
        description="Exploratory analysis across the 70,000 patient benchmark dataset used to train and calibrate the ensemble pipeline. Inspect outcome balance, age distributions, and hemodynamic correlations."
      />

      {/* Cohort Overview StatCards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          value="70,000"
          label="Total Records"
          detail="Standardized patient cohort"
        />
        <StatCard
          value="50.0%"
          label="Class 0 (No Disease)"
          detail="35,021 negative records"
        />
        <StatCard
          value="50.0%"
          label="Class 1 (Disease)"
          detail="34,979 positive records"
        />
        <StatCard
          value="1.00 : 1"
          label="Class Balance"
          detail="Balanced training baseline"
        />
      </div>

      {/* Charts Grid: 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Target Label Distribution */}
        <Card className="p-5 border-slate-200 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-navy-900">
              Target Class Balance
            </h3>
            <p className="text-xs text-slate-500">
              Binary cardiovascular outcome distribution (35,021 vs 34,979)
            </p>
          </div>

          <div className="h-56 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={targetDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {targetDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value.toLocaleString()} records`, 'Count']}
                  contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
            {targetDistribution.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 font-medium">
                  {item.name}: <strong className="text-navy-900">{item.percentage}</strong>
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Chart 2: Age Bracket Risk Rate */}
        <Card className="p-5 border-slate-200 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-navy-900">
              Age Group Prevalence
            </h3>
            <p className="text-xs text-slate-500">
              Cardiovascular disease prevalence across 5-year age cohorts
            </p>
          </div>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageGroupData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="ageGroup" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                <Bar dataKey="noDisease" name="No Disease" fill="#2563EB" radius={[2, 2, 0, 0]} />
                <Bar dataKey="disease" name="Disease" fill="#DC2626" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-xs text-slate-500 pt-2 border-t border-slate-100">
            Observation: Disease incidence passes 50% threshold in the 55–59 cohort (55.3%).
          </p>
        </Card>

        {/* Chart 3: Mean Arterial Pressure (MAP) */}
        <Card className="p-5 border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-navy-900">
                Mean Arterial Pressure (MAP)
              </h3>
              <p className="text-xs text-slate-500">
                MAP = (SBP + 2·DBP) / 3 (mmHg)
              </p>
            </div>
            <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              Organ Perfusion
            </span>
          </div>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mapDistributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="range" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                <Bar dataKey="noDisease" name="No Disease" fill="#2563EB" radius={[2, 2, 0, 0]} />
                <Bar dataKey="disease" name="Disease" fill="#DC2626" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-xs text-slate-500 pt-2 border-t border-slate-100">
            Observation: Cohorts with MAP &gt; 110 mmHg exhibit over 77% cardiovascular disease prevalence.
          </p>
        </Card>

        {/* Chart 4: Pulse Pressure (PP) */}
        <Card className="p-5 border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-navy-900">
                Pulse Pressure (PP)
              </h3>
              <p className="text-xs text-slate-500">
                PP = SBP - DBP (mmHg)
              </p>
            </div>
            <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              Arterial Stiffness
            </span>
          </div>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ppDistributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="bracket" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                <Bar dataKey="noDisease" name="No Disease" fill="#2563EB" radius={[2, 2, 0, 0]} />
                <Bar dataKey="disease" name="Disease" fill="#DC2626" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-xs text-slate-500 pt-2 border-t border-slate-100">
            Observation: Pulse Pressure &gt; 60 mmHg reflects arterial stiffness and doubles disease incidence (70.1%).
          </p>
        </Card>

      </div>

      {/* Categorical Biomarkers Influence Chart */}
      <Card className="p-5 border-slate-200 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-navy-900">
            Biomarker Tiers & Disease Rate
          </h3>
          <p className="text-xs text-slate-500">
            Cardiovascular disease prevalence across standard serum cholesterol and fasting glucose categories
          </p>
        </div>

        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={biomarkerData}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 140, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
              <XAxis type="number" domain={[0, 100]} unit="%" tick={{ fontSize: 11, fill: '#64748B' }} />
              <YAxis
                type="category"
                dataKey="category"
                tick={{ fontSize: 11, fill: '#0B192C' }}
              />
              <Tooltip
                formatter={(val) => [`${val}%`, 'Disease Rate']}
                contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF' }}
              />
              <Bar dataKey="diseaseRate" name="Disease Prevalence (%)" fill="#2563EB" radius={[0, 2, 2, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs text-slate-600">
          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <strong>Lipid Profile Escalation:</strong> High cholesterol (Tier 3) exhibits 76.6% disease prevalence vs 44.0% in normal ranges.
          </div>
          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <strong>Glycemic Correlation:</strong> High fasting glucose (Tier 3) shows 62.2% prevalence, magnifying risk when paired with elevated MAP.
          </div>
        </div>
      </Card>

      {/* Medical Disclaimer Banner */}
      <MedicalDisclaimerBanner compact />

    </div>
  );
}
