# CardioSense AI — ML Model Storage

This directory holds the serialized scikit-learn machine learning artifacts from your Google Colab training notebook.

## Expected Model Files

1. **`soft_voting_model.pkl`**
   - The trained soft-voting ensemble classifier.
   - Must implement `.predict(X)` and `.predict_proba(X)`.

2. **`ensemble_scaler.pkl`**
   - The fitted `StandardScaler` (or preprocessor) used prior to ensemble inference.
   - Must implement `.transform(X)`.

3. **`selected_features.pkl`** (Optional, falls back to default 10 features)
   - The list of 10 selected features in exact order:
   ```python
   [
       "BMI",
       "MAP",
       "PP",
       "active",
       "age_years",
       "ap_lo",
       "cholesterol",
       "weight",
       "gluc",
       "gender"
   ]
   ```

## How to Export from Google Colab

Run this cell in your Colab notebook after fitting your ensemble model and scaler:

```python
import joblib

# 1. Export the Soft Voting Ensemble
joblib.dump(soft_voting_clf, 'soft_voting_model.pkl')

# 2. Export the Scaler
joblib.dump(scaler, 'ensemble_scaler.pkl')

# 3. Export Selected Features
selected_features = [
    "BMI",
    "MAP",
    "PP",
    "active",
    "age_years",
    "ap_lo",
    "cholesterol",
    "weight",
    "gluc",
    "gender"
]
joblib.dump(selected_features, 'selected_features.pkl')

print("All 3 model artifacts successfully exported!")
```

Download these 3 files from Colab and drop them into this `backend/model/` folder.
The FastAPI backend will immediately detect them without requiring any code modifications or retraining!
