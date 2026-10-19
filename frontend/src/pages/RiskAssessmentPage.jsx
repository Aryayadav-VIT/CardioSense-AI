import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Scale,
  Activity,
  Heart,
  Flame,
  TestTube2,
  ArrowRight,
  ArrowLeft,
  Check,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { predictRisk } from '../services/api';
import MedicalDisclaimerBanner from '../components/MedicalDisclaimerBanner';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import StatusBadge from '../components/ui/StatusBadge';

export default function RiskAssessmentPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Demographics
    age_years: 52,
    gender: 1, // 1: Female, 2: Male

    // Step 2: Biometrics
    height: 168, // cm
    weight: 74, // kg

    // Step 3: Hemodynamics
    systolic_bp: 130, // mmHg
    diastolic_bp: 85, // mmHg

    // Step 4: Lifestyle
    smoking: 0,
    alcohol: 0,
    active: 1,

    // Step 5: Clinical Biomarkers
    cholesterol: 1, // 1: Normal, 2: Above Normal, 3: Well Above Normal
    glucose: 1,     // 1: Normal, 2: Above Normal, 3: Well Above Normal
  });

  // Real-time calculated derivations
  const calculations = useMemo(() => {
    const height_m = (formData.height || 170) / 100.0;
    const bmi = formData.weight && formData.height ? Number((formData.weight / (height_m * height_m)).toFixed(2)) : 0;
    const pp = formData.systolic_bp && formData.diastolic_bp ? Number((formData.systolic_bp - formData.diastolic_bp).toFixed(2)) : 0;
    const map = formData.systolic_bp && formData.diastolic_bp ? Number(((formData.systolic_bp + 2 * formData.diastolic_bp) / 3.0).toFixed(2)) : 0;

    let bmiCat = 'Normal';
    let bmiVariant = 'success';
    if (bmi < 18.5) {
      bmiCat = 'Underweight';
      bmiVariant = 'info';
    } else if (bmi >= 25 && bmi < 30) {
      bmiCat = 'Overweight';
      bmiVariant = 'warning';
    } else if (bmi >= 30) {
      bmiCat = 'Obese';
      bmiVariant = 'risk';
    }

    let ppStatus = 'Normal (≤60 mmHg)';
    let ppVariant = 'success';
    if (pp > 60) {
      ppStatus = 'Elevated (>60 mmHg)';
      ppVariant = 'risk';
    }

    let mapStatus = 'Optimal (70–105 mmHg)';
    let mapVariant = 'success';
    if (map > 105) {
      mapStatus = 'High (>105 mmHg)';
      mapVariant = 'risk';
    } else if (map < 70) {
      mapStatus = 'Low (<70 mmHg)';
      mapVariant = 'warning';
    }

    return {
      bmi,
      bmiCat,
      bmiVariant,
      pp,
      ppStatus,
      ppVariant,
      map,
      mapStatus,
      mapVariant,
    };
  }, [formData]);

  const handleChange = (field, value) => {
    setErrorMsg('');
    setFormData((prev) => ({
      ...prev,
      [field]: Number(value),
    }));
  };

  // Step Validation Rules
  const validateStep = (step) => {
    if (step === 1) {
      if (!formData.age_years || formData.age_years < 18 || formData.age_years > 110) {
        setErrorMsg('Please enter a valid adult age between 18 and 110 years.');
        return false;
      }
      if (!formData.gender) {
        setErrorMsg('Please select a gender designation.');
        return false;
      }
    } else if (step === 2) {
      if (!formData.height || formData.height < 90 || formData.height > 250) {
        setErrorMsg('Please enter a realistic height between 90 and 250 cm.');
        return false;
      }
      if (!formData.weight || formData.weight < 30 || formData.weight > 260) {
        setErrorMsg('Please enter a valid weight between 30 and 260 kg.');
        return false;
      }
    } else if (step === 3) {
      if (!formData.systolic_bp || formData.systolic_bp < 70 || formData.systolic_bp > 250) {
        setErrorMsg('Please enter a systolic blood pressure between 70 and 250 mmHg.');
        return false;
      }
      if (!formData.diastolic_bp || formData.diastolic_bp < 40 || formData.diastolic_bp > 160) {
        setErrorMsg('Please enter a diastolic blood pressure between 40 and 160 mmHg.');
        return false;
      }
      if (formData.diastolic_bp >= formData.systolic_bp) {
        setErrorMsg('Diastolic pressure must be lower than systolic blood pressure.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setErrorMsg('');
      setCurrentStep((prev) => Math.min(5, prev + 1));
    }
  };

  const handleBack = () => {
    setErrorMsg('');
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const result = await predictRisk(formData);
      // Persist to session storage for reload support
      sessionStorage.setItem('cardiosense_last_result', JSON.stringify(result));
      sessionStorage.setItem('cardiosense_last_inputs', JSON.stringify(formData));

      navigate('/results', { state: { result, inputs: formData } });
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to process risk assessment. Please check backend connection and try again.');
      setIsSubmitting(false);
    }
  };

  const steps = [
    { num: 1, label: 'Demographics', desc: 'Age & Sex' },
    { num: 2, label: 'Biometrics', desc: 'Height, Weight & BMI' },
    { num: 3, label: 'Hemodynamics', desc: 'BP, PP & MAP' },
    { num: 4, label: 'Lifestyle', desc: 'Habits & Activity' },
    { num: 5, label: 'Biomarkers', desc: 'Lipid & Glycemic' },
  ];

  return (
    <div className="container-app max-w-3xl py-8 sm:py-12 space-y-8">
      
      {/* Page Header */}
      <PageHeader
        eyebrow="Clinical Risk Assessment"
        title="Cardiovascular Risk Intake"
        description="Complete the 5 guided sections below to analyze physiological and hemodynamic indicators with our soft voting machine learning ensemble."
      />

      {/* 5-Step Progress Stepper */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <div className="grid grid-cols-5 gap-2 sm:gap-4">
          {steps.map((s) => {
            const isCompleted = currentStep > s.num;
            const isCurrent = currentStep === s.num;

            return (
              <button
                key={s.num}
                type="button"
                onClick={() => {
                  if (s.num < currentStep) setCurrentStep(s.num);
                }}
                disabled={s.num > currentStep}
                className={`text-left transition-all flex flex-col items-center sm:items-start group ${
                  s.num > currentStep ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                {/* Step indicator bar */}
                <div
                  className={`w-full h-1 rounded-full mb-2.5 transition-colors ${
                    isCompleted
                      ? 'bg-emerald-600'
                      : isCurrent
                      ? 'bg-navy-900'
                      : 'bg-slate-200'
                  }`}
                />

                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                      isCompleted
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                        : isCurrent
                        ? 'bg-navy-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : s.num}
                  </div>
                  <div className="hidden sm:block">
                    <div className={`text-xs font-semibold leading-tight ${isCurrent ? 'text-navy-900' : 'text-slate-600'}`}>
                      {s.label}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Card */}
      <Card className="overflow-hidden shadow-sm border-slate-200">
        
        {/* Form Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-md bg-navy-900 text-white flex items-center justify-center font-mono text-xs font-semibold">
              {currentStep}
            </span>
            <span className="text-sm font-semibold text-navy-900">
              {steps[currentStep - 1].label}
            </span>
            <span className="text-xs text-slate-500 hidden sm:inline">
              — {steps[currentStep - 1].desc}
            </span>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Step {currentStep} of 5
          </span>
        </div>

        {/* Form Body */}
        <form onSubmit={currentStep === 5 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }} className="p-6 space-y-6">
          
          {errorMsg && (
            <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* ================= STEP 1: DEMOGRAPHICS ================= */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Age Input */}
                <div className="space-y-1.5">
                  <label htmlFor="age" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Age (in years)
                  </label>
                  <div className="relative">
                    <input
                      id="age"
                      type="number"
                      min="18"
                      max="110"
                      value={formData.age_years}
                      onChange={(e) => handleChange('age_years', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-900 font-medium text-base transition-all bg-white"
                      placeholder="50"
                      required
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                      years
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Adult baseline cohort range: 18 to 110 years.
                  </p>
                </div>

                {/* Gender Input */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Biological Sex / Gender
                  </label>
                  <div className="grid grid-cols-2 gap-3 pt-0.5">
                    <button
                      type="button"
                      onClick={() => handleChange('gender', 1)}
                      className={`py-2.5 px-3.5 rounded-lg border text-sm font-medium transition-all text-center ${
                        formData.gender === 1
                          ? 'bg-navy-900 border-navy-900 text-white shadow-xs'
                          : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      Female
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChange('gender', 2)}
                      className={`py-2.5 px-3.5 rounded-lg border text-sm font-medium transition-all text-center ${
                        formData.gender === 2
                          ? 'bg-navy-900 border-navy-900 text-white shadow-xs'
                          : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      Male
                    </button>
                  </div>
                  <p className="text-xs text-slate-500">
                    Encoded representation matching the original clinical dataset.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* ================= STEP 2: BIOMETRICS & BMI ================= */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Height Input */}
                <div className="space-y-1.5">
                  <label htmlFor="height" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Height (centimeters)
                  </label>
                  <div className="relative">
                    <input
                      id="height"
                      type="number"
                      min="90"
                      max="250"
                      value={formData.height}
                      onChange={(e) => handleChange('height', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-900 font-medium text-base transition-all bg-white"
                      placeholder="170"
                      required
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                      cm
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">Standard standing height.</p>
                </div>

                {/* Weight Input */}
                <div className="space-y-1.5">
                  <label htmlFor="weight" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Weight (kilograms)
                  </label>
                  <div className="relative">
                    <input
                      id="weight"
                      type="number"
                      min="30"
                      max="260"
                      value={formData.weight}
                      onChange={(e) => handleChange('weight', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-900 font-medium text-base transition-all bg-white"
                      placeholder="75"
                      required
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                      kg
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">Current body mass.</p>
                </div>

              </div>

              {/* Compact Real-time BMI Panel */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
                    Live Feature Calculation
                  </span>
                  <div className="text-sm font-medium text-slate-900">
                    Body Mass Index (BMI)
                  </div>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">
                    BMI = weight / (height/100)²
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-right">
                  <div>
                    <div className="text-lg font-bold text-navy-900 font-mono">
                      {calculations.bmi || '—'} <span className="text-xs font-normal text-slate-500">kg/m²</span>
                    </div>
                  </div>
                  <StatusBadge variant={calculations.bmiVariant}>
                    {calculations.bmiCat}
                  </StatusBadge>
                </div>
              </div>

            </div>
          )}

          {/* ================= STEP 3: HEMODYNAMICS ================= */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Systolic BP */}
                <div className="space-y-1.5">
                  <label htmlFor="sbp" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Systolic Blood Pressure (SBP)
                  </label>
                  <div className="relative">
                    <input
                      id="sbp"
                      type="number"
                      min="70"
                      max="250"
                      value={formData.systolic_bp}
                      onChange={(e) => handleChange('systolic_bp', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-900 font-medium text-base transition-all bg-white"
                      placeholder="120"
                      required
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                      mmHg
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">Peak arterial pressure during ventricular contraction (&lt; 120 mmHg).</p>
                </div>

                {/* Diastolic BP */}
                <div className="space-y-1.5">
                  <label htmlFor="dbp" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Diastolic Blood Pressure (DBP)
                  </label>
                  <div className="relative">
                    <input
                      id="dbp"
                      type="number"
                      min="40"
                      max="160"
                      value={formData.diastolic_bp}
                      onChange={(e) => handleChange('diastolic_bp', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-900 font-medium text-base transition-all bg-white"
                      placeholder="80"
                      required
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                      mmHg
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">Resting arterial pressure between beats (&lt; 80 mmHg).</p>
                </div>

              </div>

              {/* Compact PP and MAP Panels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                
                {/* Pulse Pressure Card */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      Pulse Pressure (PP)
                    </span>
                    <StatusBadge variant={calculations.ppVariant}>
                      {calculations.ppStatus}
                    </StatusBadge>
                  </div>
                  <div className="text-lg font-bold text-navy-900 font-mono">
                    {calculations.pp} <span className="text-xs font-normal text-slate-500">mmHg</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 font-mono">
                    PP = SBP ({formData.systolic_bp}) - DBP ({formData.diastolic_bp})
                  </p>
                </div>

                {/* Mean Arterial Pressure Card */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      Mean Arterial Pressure (MAP)
                    </span>
                    <StatusBadge variant={calculations.mapVariant}>
                      {calculations.mapStatus}
                    </StatusBadge>
                  </div>
                  <div className="text-lg font-bold text-navy-900 font-mono">
                    {calculations.map} <span className="text-xs font-normal text-slate-500">mmHg</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 font-mono">
                    MAP = (SBP + 2·DBP) / 3
                  </p>
                </div>

              </div>

            </div>
          )}

          {/* ================= STEP 4: LIFESTYLE ================= */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Smoking */}
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Smoking Status
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleChange('smoking', 0)}
                      className={`py-2 px-2.5 rounded-lg border text-xs font-medium transition-all ${
                        formData.smoking === 0
                          ? 'bg-navy-900 border-navy-900 text-white'
                          : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      Non-Smoker
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChange('smoking', 1)}
                      className={`py-2 px-2.5 rounded-lg border text-xs font-medium transition-all ${
                        formData.smoking === 1
                          ? 'bg-navy-900 border-navy-900 text-white'
                          : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      Smoker
                    </button>
                  </div>
                </div>

                {/* Alcohol */}
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Alcohol Intake
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleChange('alcohol', 0)}
                      className={`py-2 px-2.5 rounded-lg border text-xs font-medium transition-all ${
                        formData.alcohol === 0
                          ? 'bg-navy-900 border-navy-900 text-white'
                          : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      None / Rare
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChange('alcohol', 1)}
                      className={`py-2 px-2.5 rounded-lg border text-xs font-medium transition-all ${
                        formData.alcohol === 1
                          ? 'bg-navy-900 border-navy-900 text-white'
                          : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      Regular
                    </button>
                  </div>
                </div>

                {/* Physical Activity */}
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Physical Activity
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleChange('active', 1)}
                      className={`py-2 px-2.5 rounded-lg border text-xs font-medium transition-all ${
                        formData.active === 1
                          ? 'bg-navy-900 border-navy-900 text-white'
                          : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      Active
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChange('active', 0)}
                      className={`py-2 px-2.5 rounded-lg border text-xs font-medium transition-all ${
                        formData.active === 0
                          ? 'bg-navy-900 border-navy-900 text-white'
                          : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      Sedentary
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ================= STEP 5: CLINICAL LAB BIOMARKERS ================= */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Cholesterol Tier */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Serum Cholesterol Category
                  </label>
                  <div className="space-y-2">
                    {[
                      { val: 1, label: '1: Normal', desc: 'Optimal lipid profile (<200 mg/dL)' },
                      { val: 2, label: '2: Above Normal', desc: 'Borderline elevated (200–239 mg/dL)' },
                      { val: 3, label: '3: Well Above Normal', desc: 'High risk hyperlipidemia (≥240 mg/dL)' },
                    ].map((item) => (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => handleChange('cholesterol', item.val)}
                        className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between ${
                          formData.cholesterol === item.val
                            ? 'bg-blue-50 border-blue-600 text-navy-900 ring-1 ring-blue-600'
                            : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div>
                          <div className="text-xs sm:text-sm font-semibold">{item.label}</div>
                          <div className="text-[11px] text-slate-500">{item.desc}</div>
                        </div>
                        {formData.cholesterol === item.val && (
                          <Check className="w-4 h-4 text-blue-600 shrink-0 stroke-[2.5]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Glucose Tier */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Fasting Glucose Category
                  </label>
                  <div className="space-y-2">
                    {[
                      { val: 1, label: '1: Normal', desc: 'Euglycemic baseline (<100 mg/dL)' },
                      { val: 2, label: '2: Above Normal', desc: 'Impaired fasting glucose (100–125 mg/dL)' },
                      { val: 3, label: '3: Well Above Normal', desc: 'Diabetic range hyperglycemia (≥126 mg/dL)' },
                    ].map((item) => (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => handleChange('glucose', item.val)}
                        className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between ${
                          formData.glucose === item.val
                            ? 'bg-blue-50 border-blue-600 text-navy-900 ring-1 ring-blue-600'
                            : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div>
                          <div className="text-xs sm:text-sm font-semibold">{item.label}</div>
                          <div className="text-[11px] text-slate-500">{item.desc}</div>
                        </div>
                        {formData.glucose === item.val && (
                          <Check className="w-4 h-4 text-blue-600 shrink-0 stroke-[2.5]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Ready to Analyze Summary */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 flex items-center gap-3 text-xs text-slate-700">
                <Activity className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <strong>Ready for Ensemble Inference:</strong> 10 features (BMI: {calculations.bmi}, MAP: {calculations.map}, PP: {calculations.pp}, SBP: {formData.systolic_bp}, DBP: {formData.diastolic_bp}) will be passed to the Soft Voting model.
                </div>
              </div>
            </div>
          )}

          {/* Form Actions Footer */}
          <div className="pt-5 border-t border-slate-200 flex items-center justify-between gap-4">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium text-xs sm:text-sm hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-navy-900 hover:bg-navy-800 text-white font-medium text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-xs transition-all flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-navy-900 hover:bg-navy-800 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-lg shadow-xs transition-all flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Inference...</span>
                  </>
                ) : (
                  <>
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span>Analyze Cardiovascular Risk</span>
                  </>
                )}
              </button>
            )}
          </div>

        </form>

      </Card>

      {/* Medical Disclaimer */}
      <MedicalDisclaimerBanner compact />

    </div>
  );
}
