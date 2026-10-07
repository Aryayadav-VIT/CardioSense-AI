import json
from main import app, predict_risk, RiskInput, model_status, root, health_check

print("--- Running Backend Verification Test ---")

# 1. Test Root
root_res = root()
print("Root response:", json.dumps(root_res, indent=2))
assert root_res["service"] == "CardioSense AI API"
assert root_res["model_loaded"] is True
assert root_res["mode"] == "production"

# 2. Test Health
health_res = health_check()
print("Health response:", json.dumps(health_res, indent=2))
assert health_res["status"] == "healthy"
assert health_res["model_loaded"] is True
assert health_res["scaler_loaded"] is True

# 3. Test Model Status
status_res = model_status()
print("Model status response:", json.dumps(status_res, indent=2))
assert status_res["model_available"] is True
assert status_res["model_loaded"] is True
assert status_res["scaler_loaded"] is True
assert status_res["mode"] == "production"
assert status_res["expected_features"] == [
    "BMI", "MAP", "PP", "active", "age_years", "ap_hi", "ap_lo", "cholesterol", "weight", "gluc"
]

# 4. Test Predict with Lower Risk Sample
sample_lower = RiskInput(
    age_years=50,
    gender=1,
    height=170,
    weight=75,
    systolic_bp=130,
    diastolic_bp=85,
    cholesterol=1,
    glucose=1,
    smoking=0,
    alcohol=0,
    active=1
)

output_lower = predict_risk(sample_lower)
print("\n--- Output for Sample 1 (Lower Risk Profile) ---")
print(json.dumps(output_lower.model_dump(), indent=2))

assert output_lower.is_demo is False, "Prediction MUST use trained model (is_demo should be False)!"
assert output_lower.demo_notice is None
assert output_lower.prediction == 0
assert abs(output_lower.risk_probability - 0.4609) < 0.005, f"Expected ~0.4609, got {output_lower.risk_probability}"
assert output_lower.risk_label == "LOWER RISK"
assert output_lower.bmi == 25.95
assert output_lower.pulse_pressure == 45.0
assert output_lower.map == 100.0

# 5. Test Predict with High Risk Sample (Elevated BP, age 60, high chol/gluc)
sample_high = RiskInput(
    age_years=60,
    gender=2,
    height=165,
    weight=88,
    systolic_bp=150,
    diastolic_bp=95,
    cholesterol=2,
    glucose=2,
    smoking=1,
    alcohol=1,
    active=0
)

output_high = predict_risk(sample_high)
print("\n--- Output for Sample 2 (Elevated Risk Profile) ---")
print(json.dumps(output_high.model_dump(), indent=2))

assert output_high.is_demo is False, "Prediction MUST use trained model (is_demo should be False)!"
assert output_high.prediction == 1
assert output_high.risk_probability > 0.70, f"Expected high risk > 0.70, got {output_high.risk_probability}"
assert output_high.risk_label == "ELEVATED RISK"

print("\n--- ALL TESTS PASSED! Trained model is actively computing predictions! ---")
