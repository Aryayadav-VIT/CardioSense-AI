const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Check backend connection and model loading status
 */
export async function getModelStatus() {
  try {
    const res = await fetch(`${API_BASE_URL}/model-status`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend /model-status check failed:', err.message);
    return {
      model_available: false,
      model_loaded: false,
      mode: 'offline_demo',
      error: err.message,
    };
  }
}

/**
 * Perform risk prediction via FastAPI backend
 * Falls back to client-side calibrated calculation if backend is temporarily unreachable.
 */
export async function predictRisk(inputData) {
  try {
    const res = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputData),
    });

    if (res.ok) {
      return await res.json();
    }
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || `Server error (${res.status})`);
  } catch (err) {
    if (err.message && (err.message.includes('Server error') || err.message.includes('Trained model') || err.message.includes('500'))) {
      throw err;
    }
    console.warn('Backend request failed, using client-side calibrated fallback:', err.message);
    return fallbackLocalPrediction(inputData);
  }
}

/**
 * Robust client-side fallback mirroring the backend demo estimation
 */
function fallbackLocalPrediction(data) {
  const height_m = data.height / 100.0;
  const bmi = Number((data.weight / (height_m * height_m)).toFixed(2));
  const pp = Number((data.systolic_bp - data.diastolic_bp).toFixed(2));
  const map_val = Number(((data.systolic_bp + 2 * data.diastolic_bp) / 3.0).toFixed(2));

  // Log-odds estimation aligned with the 70,000 patient dataset
  let logOdds = -3.2;
  logOdds += (data.age_years - 40) * 0.05;

  if (data.systolic_bp >= 140 || data.diastolic_bp >= 90) logOdds += 1.1;
  else if (data.systolic_bp >= 130 || data.diastolic_bp >= 80) logOdds += 0.6;
  else if (data.systolic_bp >= 120) logOdds += 0.25;

  if (map_val > 105) logOdds += 0.35;
  if (pp > 60) logOdds += 0.3;

  if (data.cholesterol === 3) logOdds += 0.85;
  else if (data.cholesterol === 2) logOdds += 0.42;

  if (data.glucose === 3) logOdds += 0.55;
  else if (data.glucose === 2) logOdds += 0.25;

  if (bmi >= 30) logOdds += 0.45;
  else if (bmi >= 25) logOdds += 0.2;

  if (data.smoking === 1) logOdds += 0.25;
  if (data.alcohol === 1) logOdds += 0.15;
  if (data.active === 0) logOdds += 0.35;
  else logOdds -= 0.2;

  if (data.gender === 2) logOdds += 0.08;

  const prob = Math.min(0.95, Math.max(0.05, 1 / (1 + Math.exp(-logOdds))));
  const isElevated = prob >= 0.5;

  const key_factors = [];
  if (data.systolic_bp >= 140 || data.diastolic_bp >= 90) {
    key_factors.push(`Stage 2 Blood Pressure elevation (${data.systolic_bp}/${data.diastolic_bp} mmHg)`);
  } else if (data.systolic_bp >= 130 || data.diastolic_bp >= 80) {
    key_factors.push(`Stage 1 Blood Pressure elevation (${data.systolic_bp}/${data.diastolic_bp} mmHg)`);
  }

  if (pp > 60) key_factors.push(`Elevated pulse pressure (${pp} mmHg), suggesting arterial stiffness`);
  if (map_val > 105) key_factors.push(`Elevated Mean Arterial Pressure (${map_val} mmHg)`);
  if (bmi >= 30) key_factors.push(`Obese BMI category (${bmi} kg/m²)`);
  else if (bmi >= 25) key_factors.push(`Overweight BMI category (${bmi} kg/m²)`);

  if (data.cholesterol > 1) key_factors.push(`Elevated serum cholesterol (level ${data.cholesterol})`);
  if (data.glucose > 1) key_factors.push(`Elevated glucose trend (level ${data.glucose})`);
  if (data.smoking === 1) key_factors.push('Active tobacco smoking factor');
  if (data.active === 0) key_factors.push('Sedentary lifestyle factor');

  if (key_factors.length === 0) {
    key_factors.push('Optimal baseline indicators across all primary clinical biomarkers');
  }

  return {
    prediction: isElevated ? 1 : 0,
    risk_probability: Number(prob.toFixed(4)),
    risk_label: isElevated ? 'ELEVATED RISK' : 'LOWER RISK',
    bmi: bmi,
    pulse_pressure: pp,
    map: map_val,
    is_demo: true,
    demo_notice: 'Offline demo estimation based on cardiovascular dataset statistics.',
    key_factors: key_factors,
    metrics_summary: {
      bp_category: data.systolic_bp >= 140 ? 'Hypertension Stage 2' : data.systolic_bp >= 130 ? 'Hypertension Stage 1' : 'Normal',
      bmi_category: bmi >= 30 ? 'Obese' : bmi >= 25 ? 'Overweight' : 'Normal',
      pp_status: pp > 60 ? 'Elevated (>60 mmHg)' : 'Normal (≤60 mmHg)',
      map_status: map_val > 105 ? 'Elevated' : 'Optimal (70–105 mmHg)',
    },
  };
}
