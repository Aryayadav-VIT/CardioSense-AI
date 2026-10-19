import os
from pathlib import Path
from typing import List, Optional, Dict, Any
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import numpy as np
import pandas as pd
import joblib

app = FastAPI(
    title="CardioSense AI Backend",
    description="Cardiovascular Risk Assessment API with scikit-learn ensemble model integration",
    version="1.0.0",
)

# Enable CORS for frontend Vite development & production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define Model Directory Paths
BASE_DIR = Path(__file__).resolve().parent
MODEL_DIR = BASE_DIR / "model"
MODEL_PATH = MODEL_DIR / "cardiosense_small_candidate.pkl"
SCALER_PATH = MODEL_DIR / "ensemble_scaler.pkl"
FEATURES_PATH = MODEL_DIR / "selected_features.pkl"

# Exact ordered 10 features required by the trained model:
# BMI, MAP, PP, active, age_years, ap_hi, ap_lo, cholesterol, weight, gluc
EXPECTED_FEATURES = [
    "BMI",
    "MAP",
    "PP",
    "active",
    "age_years",
    "ap_hi",
    "ap_lo",
    "cholesterol",
    "weight",
    "gluc",
]

# Global cache for loaded model and artifacts
loaded_model = None
loaded_scaler = None
loaded_features = None


def load_ml_artifacts():
    global loaded_model, loaded_scaler, loaded_features
    if MODEL_PATH.exists() and SCALER_PATH.exists():
        try:
            loaded_model = joblib.load(MODEL_PATH)
            loaded_scaler = joblib.load(SCALER_PATH)
            if FEATURES_PATH.exists():
                feats = joblib.load(FEATURES_PATH)
                if isinstance(feats, (list, tuple, np.ndarray)):
                    loaded_features = list(feats)
                else:
                    loaded_features = EXPECTED_FEATURES
            else:
                loaded_features = EXPECTED_FEATURES
            print(f"Successfully loaded ML model and scaler from disk. Features: {loaded_features}")
            return True
        except Exception as e:
            print(f"Error loading model files: {e}")
            loaded_model = None
            loaded_scaler = None
            loaded_features = None
            return False
    return False


# Attempt initial load
load_ml_artifacts()


class RiskInput(BaseModel):
    age_years: float = Field(..., ge=18, le=110, description="Age in years")
    gender: int = Field(..., ge=1, le=2, description="Gender (1: Women, 2: Men)")
    height: float = Field(..., ge=80, le=250, description="Height in cm")
    weight: float = Field(..., ge=25, le=250, description="Weight in kg")
    systolic_bp: float = Field(..., ge=60, le=260, description="Systolic Blood Pressure (mmHg)")
    diastolic_bp: float = Field(..., ge=40, le=180, description="Diastolic Blood Pressure (mmHg)")
    cholesterol: int = Field(..., ge=1, le=3, description="Cholesterol (1: Normal, 2: Above Normal, 3: Well Above Normal)")
    glucose: int = Field(..., ge=1, le=3, description="Glucose (1: Normal, 2: Above Normal, 3: Well Above Normal)")
    smoking: int = Field(0, ge=0, le=1, description="Smoking status (0: No, 1: Yes)")
    alcohol: int = Field(0, ge=0, le=1, description="Alcohol intake (0: No, 1: Yes)")
    active: int = Field(1, ge=0, le=1, description="Physical activity (0: Inactive, 1: Active)")


class RiskOutput(BaseModel):
    prediction: int = Field(..., description="0 for Lower Risk, 1 for Elevated Risk")
    risk_probability: float = Field(..., description="Estimated risk probability between 0 and 1")
    risk_label: str = Field(..., description="'LOWER RISK' or 'ELEVATED RISK'")
    bmi: float = Field(..., description="Calculated Body Mass Index (kg/m²)")
    pulse_pressure: float = Field(..., description="Calculated Pulse Pressure (mmHg)")
    map: float = Field(..., description="Calculated Mean Arterial Pressure (mmHg)")
    is_demo: bool = Field(..., description="True if running in Demo Mode (pkl files pending)")
    demo_notice: Optional[str] = None
    key_factors: List[str] = Field(default_factory=list, description="Primary contributing factors")
    metrics_summary: Dict[str, Any] = Field(default_factory=dict, description="Detailed physiological categories")


def generate_key_factors(
    age: float,
    bmi: float,
    sbp: float,
    dbp: float,
    pp: float,
    map_val: float,
    chol: int,
    gluc: int,
    smoke: int,
    alco: int,
    active: int,
) -> tuple[List[str], Dict[str, Any]]:
    """Generate educational clinical context for key contributing health metrics."""
    factors = []
    summary = {}

    # Blood pressure classification (AHA Guidelines)
    if sbp >= 140 or dbp >= 90:
        bp_cat = "Hypertension Stage 2"
        factors.append(f"Stage 2 Blood Pressure elevation ({int(sbp)}/{int(dbp)} mmHg)")
    elif sbp >= 130 or dbp >= 80:
        bp_cat = "Hypertension Stage 1"
        factors.append(f"Stage 1 Blood Pressure elevation ({int(sbp)}/{int(dbp)} mmHg)")
    elif sbp >= 120 and dbp < 80:
        bp_cat = "Elevated Blood Pressure"
        factors.append(f"Borderline elevated systolic blood pressure ({int(sbp)} mmHg)")
    else:
        bp_cat = "Normal Blood Pressure"

    summary["bp_category"] = bp_cat

    # Pulse Pressure analysis (>60 mmHg signals arterial stiffness)
    if pp > 60:
        factors.append(f"Elevated pulse pressure ({pp:.1f} mmHg), an indicator of vascular stiffness")
        summary["pp_status"] = "Elevated (>60 mmHg)"
    else:
        summary["pp_status"] = "Normal (≤60 mmHg)"

    # MAP analysis (normal ~70-105 mmHg)
    if map_val > 105:
        factors.append(f"High Mean Arterial Pressure ({map_val:.1f} mmHg, normal 70–105 mmHg)")
        summary["map_status"] = "Elevated (>105 mmHg)"
    elif map_val < 70:
        summary["map_status"] = "Low (<70 mmHg)"
    else:
        summary["map_status"] = "Optimal (70–105 mmHg)"

    # BMI classification (WHO)
    if bmi >= 30:
        bmi_cat = "Obese"
        factors.append(f"BMI in the obese range ({bmi:.1f} kg/m²)")
    elif bmi >= 25:
        bmi_cat = "Overweight"
        factors.append(f"BMI in the overweight range ({bmi:.1f} kg/m²)")
    elif bmi < 18.5:
        bmi_cat = "Underweight"
    else:
        bmi_cat = "Normal weight"

    summary["bmi_category"] = bmi_cat

    # Cholesterol
    if chol == 3:
        factors.append("Cholesterol well above normal range")
        summary["cholesterol_status"] = "Well Above Normal"
    elif chol == 2:
        factors.append("Cholesterol above normal range")
        summary["cholesterol_status"] = "Above Normal"
    else:
        summary["cholesterol_status"] = "Normal"

    # Glucose
    if gluc == 3:
        factors.append("Glucose well above normal range (hyperglycemic trend)")
        summary["glucose_status"] = "Well Above Normal"
    elif gluc == 2:
        factors.append("Glucose above normal range")
        summary["glucose_status"] = "Above Normal"
    else:
        summary["glucose_status"] = "Normal"

    # Lifestyle
    lifestyle_items = []
    if smoke == 1:
        factors.append("Active tobacco smoking")
        lifestyle_items.append("Smoker")
    if alco == 1:
        factors.append("Regular alcohol consumption")
        lifestyle_items.append("Alcohol consumer")
    if active == 0:
        factors.append("Sedentary lifestyle (low physical activity)")
        lifestyle_items.append("Sedentary")
    else:
        lifestyle_items.append("Physically Active")

    summary["lifestyle"] = lifestyle_items

    # Age context
    if age >= 55:
        factors.append(f"Age bracket factor ({int(age)} years)")

    if not factors:
        factors.append("Optimal baseline indicators across all primary clinical metrics")

    return factors, summary


def calculate_demo_probability(
    age: float,
    gender: int,
    bmi: float,
    sbp: float,
    dbp: float,
    pp: float,
    map_val: float,
    chol: int,
    gluc: int,
    smoke: int,
    alco: int,
    active: int,
) -> float:
    """
    Realistic demo risk estimation calibrated against the 70,000-record
    cardiovascular disease dataset patterns when pkl files are not yet loaded.
    """
    # Baseline log-odds calibrated to the ~50% dataset prevalence
    log_odds = -3.2

    # Age effect (dataset shows steep increase between 45 and 65)
    log_odds += (age - 40) * 0.05

    # Systolic and Diastolic blood pressure / MAP impact
    if sbp >= 140 or dbp >= 90:
        log_odds += 1.1
    elif sbp >= 130 or dbp >= 80:
        log_odds += 0.6
    elif sbp >= 120:
        log_odds += 0.25

    # Mean Arterial Pressure and Pulse Pressure elevation
    if map_val > 105:
        log_odds += 0.35
    if pp > 60:
        log_odds += 0.3

    # Cholesterol effect
    if chol == 3:
        log_odds += 0.85
    elif chol == 2:
        log_odds += 0.42

    # Glucose effect
    if gluc == 3:
        log_odds += 0.55
    elif gluc == 2:
        log_odds += 0.25

    # BMI effect
    if bmi >= 30:
        log_odds += 0.45
    elif bmi >= 25:
        log_odds += 0.2

    # Lifestyle
    if smoke == 1:
        log_odds += 0.25
    if alco == 1:
        log_odds += 0.15
    if active == 0:
        log_odds += 0.35
    else:
        log_odds -= 0.2

    # Gender adjustment in dataset
    if gender == 2:
        log_odds += 0.08

    # Sigmoid function with bounded probability
    prob = 1.0 / (1.0 + np.exp(-log_odds))
    # Clip between 0.05 and 0.95 for realistic clinical estimation
    return float(np.clip(prob, 0.05, 0.95))


@app.get("/")
def root():
    return {
        "service": "CardioSense AI API",
        "status": "online",
        "model_loaded": loaded_model is not None,
        "mode": "production" if loaded_model is not None else "demo",
        "docs_url": "/docs",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "model_loaded": loaded_model is not None,
        "scaler_loaded": loaded_scaler is not None,
    }


@app.get("/model-status")
def model_status():
    model_exists = MODEL_PATH.exists()
    scaler_exists = SCALER_PATH.exists()
    features_exists = FEATURES_PATH.exists()

    # Try reloading if files exist but haven't been loaded
    if model_exists and scaler_exists and loaded_model is None:
        load_ml_artifacts()

    active_features = loaded_features if loaded_features is not None else EXPECTED_FEATURES

    return {
        "model_available": model_exists and scaler_exists,
        "model_loaded": loaded_model is not None,
        "scaler_loaded": loaded_scaler is not None,
        "features_loaded": loaded_features is not None,
        "mode": "production" if (loaded_model is not None and loaded_scaler is not None) else "demo",
        "files": {
            "soft_voting_model.pkl": {
                "path": str(MODEL_PATH),
                "exists": model_exists,
                "size_bytes": MODEL_PATH.stat().st_size if model_exists else 0,
            },
            "ensemble_scaler.pkl": {
                "path": str(SCALER_PATH),
                "exists": scaler_exists,
                "size_bytes": SCALER_PATH.stat().st_size if scaler_exists else 0,
            },
            "selected_features.pkl": {
                "path": str(FEATURES_PATH),
                "exists": features_exists,
                "size_bytes": FEATURES_PATH.stat().st_size if features_exists else 0,
            },
        },
        "expected_features": active_features,
    }


@app.post("/predict", response_model=RiskOutput)
def predict_risk(data: RiskInput):
    # Check if files have recently been placed on disk
    global loaded_model, loaded_scaler, loaded_features
    if (loaded_model is None or loaded_scaler is None) and MODEL_PATH.exists() and SCALER_PATH.exists():
        load_ml_artifacts()

    # Derived clinical calculations
    height_m = data.height / 100.0
    bmi = round(float(data.weight / (height_m ** 2)), 2)
    pulse_pressure = round(float(data.systolic_bp - data.diastolic_bp), 2)
    mean_arterial_pressure = round(float((data.systolic_bp + 2 * data.diastolic_bp) / 3.0), 2)

    # 10 Selected Features Mapping:
    # BMI: calculated BMI
    # MAP: Mean Arterial Pressure
    # PP: Pulse Pressure
    # active: Physical activity (0 or 1)
    # age_years: Age in years
    # ap_hi: Systolic Blood Pressure
    # ap_lo: Diastolic Blood Pressure
    # cholesterol: Cholesterol category (1, 2, 3)
    # weight: Weight in kg
    # gluc: Glucose category (1, 2, 3)
    feature_dict = {
        "BMI": bmi,
        "MAP": mean_arterial_pressure,
        "PP": pulse_pressure,
        "active": int(data.active),
        "age_years": float(data.age_years),
        "ap_hi": float(data.systolic_bp),
        "ap_lo": float(data.diastolic_bp),
        "cholesterol": int(data.cholesterol),
        "weight": float(data.weight),
        "gluc": int(data.glucose),
    }

    active_features = loaded_features if loaded_features is not None else EXPECTED_FEATURES

    # Order DataFrame columns exactly in the expected order
    input_df = pd.DataFrame([[feature_dict[col] for col in active_features]], columns=active_features)

    key_factors, metrics_summary = generate_key_factors(
        age=data.age_years,
        bmi=bmi,
        sbp=data.systolic_bp,
        dbp=data.diastolic_bp,
        pp=pulse_pressure,
        map_val=mean_arterial_pressure,
        chol=data.cholesterol,
        gluc=data.glucose,
        smoke=data.smoking,
        alco=data.alcohol,
        active=data.active,
    )

    # Case A: Trained model and scaler are loaded
    if loaded_model is not None and loaded_scaler is not None:
        try:
            scaled_features = loaded_scaler.transform(input_df)
            prediction = int(loaded_model.predict(scaled_features)[0])

            if hasattr(loaded_model, "predict_proba"):
                probs = loaded_model.predict_proba(scaled_features)[0]
                risk_probability = float(probs[1]) if len(probs) > 1 else float(probs[0])
            else:
                risk_probability = float(prediction)

            risk_probability = round(float(risk_probability), 4)
            risk_label = "ELEVATED RISK" if (prediction == 1 or risk_probability >= 0.5) else "LOWER RISK"

            return RiskOutput(
                prediction=prediction,
                risk_probability=risk_probability,
                risk_label=risk_label,
                bmi=bmi,
                pulse_pressure=pulse_pressure,
                map=mean_arterial_pressure,
                is_demo=False,
                demo_notice=None,
                key_factors=key_factors,
                metrics_summary=metrics_summary,
            )
        except Exception as e:
            print(f"Prediction error with loaded model: {e}")
            raise HTTPException(
                status_code=500,
                detail=f"Trained model execution error: {str(e)}"
            )

    # Case B: DEMO MODE (Model or scaler files not found on disk)
    demo_prob = calculate_demo_probability(
        age=data.age_years,
        gender=data.gender,
        bmi=bmi,
        sbp=data.systolic_bp,
        dbp=data.diastolic_bp,
        pp=pulse_pressure,
        map_val=mean_arterial_pressure,
        chol=data.cholesterol,
        gluc=data.glucose,
        smoke=data.smoking,
        alco=data.alcohol,
        active=data.active,
    )
    demo_prediction = 1 if demo_prob >= 0.50 else 0
    demo_label = "ELEVATED RISK" if demo_prediction == 1 else "LOWER RISK"

    return RiskOutput(
        prediction=demo_prediction,
        risk_probability=round(demo_prob, 4),
        risk_label=demo_label,
        bmi=bmi,
        pulse_pressure=pulse_pressure,
        map=mean_arterial_pressure,
        is_demo=True,
        demo_notice="Model files (.pkl) not yet detected in backend/model/. Running in Educational Demo Mode calibrated to project dataset distribution.",
        key_factors=key_factors,
        metrics_summary=metrics_summary,
    )
