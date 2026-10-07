# CardioSense AI — Complete Application Architecture & Component Specification

> **CardioSense AI — Cardiovascular Risk Assessment**  
> A portfolio-grade healthcare machine learning web application based on the 70,000-record Cardiovascular Disease dataset and Google Colab ML project.  
> This specification document lists all **pages**, **components**, **forms**, **inputs**, **dropdowns/buttons**, **visualizations**, **hemodynamic formulas**, **ML benchmarks**, and **backend endpoints** with granular detail for sharing with GPT or other LLMs for further modification.

---

## ⚠️ Important Educational Notice
> **"This application is an educational machine-learning project and is not intended to diagnose, treat, or prevent any medical condition."**  
> Any risk assessments produced are probabilistic machine learning estimates derived from statistical datasets and must never replace clinical consultations or professional medical advice.

---

## 1. System Overview & Technology Stack

### Frontend Stack
- **Framework**: React 18 (`react`, `react-dom`)
- **Build Tool**: Vite 5 (`vite`, `@vitejs/plugin-react`)
- **Styling**: Tailwind CSS 3.4 (`tailwindcss`, `postcss`, `autoprefixer`)
- **Routing**: React Router DOM 6 (`react-router-dom`)
- **Charts & Data Visualization**: Recharts 2.15 (`recharts`)
- **Icons**: Lucide React (`lucide-react`)
- **Typography**: Inter (Google Fonts)

### Backend Stack
- **Language & Runtime**: Python 3.12
- **Web Framework**: FastAPI (`fastapi`, `uvicorn[standard]`)
- **Data Validation & Schemas**: Pydantic v2 (`pydantic`)
- **Data Science & ML**: Scikit-Learn (`scikit-learn`), Joblib (`joblib`), Pandas (`pandas`), NumPy (`numpy`)
- **Serialization Formats**: Python Pickle / Joblib (`.pkl`)

### Design Guidelines & Theme
- **Style**: Clean, modern, professional, futuristic but trustworthy, light background with deep navy accents.
- **Color Palette**:
  - `navy-900`: `#0B192C` (Primary headers, dark buttons, brand background)
  - `navy-800`: `#1E3E62` (Card borders, secondary headers)
  - `cardio-blue`: `#1E40AF` / `#3B82F6` (Action links, primary highlights)
  - `cardio-pulse` / `rose`: `#E11D48` / `#F43F5E` (Cardiac pulse, high risk indicator)
  - `emerald`: `#10B981` / `#059669` (Normal indicators, lower risk classification)
  - `amber`: `#F59E0B` / `#D97706` (Moderate indicators, demo mode indicator)
  - `slate-50`: `#F8FAFC` (Page background)
  - `white`: `#FFFFFF` (Surface cards)

---

## 2. Global Shared Components

### 2.1. Navbar (`frontend/src/components/Navbar.jsx`)
- **Sticky Header**: `sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80`
- **Brand Logo**:
  - Stylized rounded square (`bg-navy-900 text-white`) housing a cardiac heart icon (`Heart` in rose-500 with subtle fill).
  - Title: **CardioSense** with adjacent pill badge: **AI** (`bg-blue-100 text-blue-800`).
  - Sub-tagline: *"Cardiovascular Risk Intelligence"*.
- **Desktop Navigation Links** (`react-router-dom` `Link`):
  1. `Home` (`/`)
  2. `Risk Assessment` (`/assess`)
  3. `Results` (`/results`)
  4. `Analytics` (`/analytics`)
  5. `Model Performance` (`/model-performance`)
  6. `How It Works` (`/how-it-works`)
  7. `About` (`/about`)
  - Active state: Highlighted in `bg-blue-50/80 text-blue-700 font-semibold`.
- **Live Model Status Pill**:
  - Automatically polls `GET /model-status` every 15 seconds.
  - State 1: **"Trained Model Active"** (`bg-emerald-50 text-emerald-700 border-emerald-200` with `CheckCircle2` icon) when `soft_voting_model.pkl` and `ensemble_scaler.pkl` are loaded in memory.
  - State 2: **"Demo Mode"** (`bg-amber-50 text-amber-700 border-amber-200` with `Cpu` icon) when fallback mode is active.
- **Primary CTA Button**:
  - Label: *"Assess Risk"* (`bg-navy-900 text-white hover:bg-navy-800` with `Activity` icon in rose-400, routes to `/assess`).
- **Mobile Menu Drawer**:
  - Hamburger toggle (`Menu` / `X` icon).
  - Drawer menu showing live model status, all 7 navigation links, and full-width "Start Risk Assessment" button.

### 2.2. Footer (`frontend/src/components/Footer.jsx`)
- **Top Disclaimer Strip**:
  - `ShieldAlert` icon in amber-600.
  - Bold note: *"Educational ML Project: Not intended to diagnose, treat, or prevent any medical condition."*
  - Cohort metadata counter: `N = 70,000 Patient Records • 10 Engineered Features • Soft Voting Classifier`.
- **4-Column Links Grid**:
  - *Col 1 (Brand & Rationale)*: CardioSense AI overview, scikit-learn ensemble architecture description.
  - *Col 2 (Navigation)*: Home, Risk Assessment Form, Assessment Results, Dataset Analytics, Model Benchmarks.
  - *Col 3 (Methodology)*: Hemodynamic Feature Engineering, Pulse Pressure & MAP Derivation, Ensemble Pipeline Flow, FastAPI & React Integration, Colab Model Deployment Guide.
  - *Col 4 (Tech Stack Badges)*: Python, FastAPI, scikit-learn, joblib, pandas, React, Vite, Tailwind CSS, Recharts.
- **Bottom Bar**: Copyright notice + Quick links.

### 2.3. Medical Disclaimer Banner (`frontend/src/components/MedicalDisclaimerBanner.jsx`)
- **Standard (Full) Variant**:
  - Ambient gradient: `bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-200`.
  - Icon: `AlertTriangle` in amber-700 housed in amber-100 rounded container.
  - Header: *"EDUCATIONAL MACHINE LEARNING PROJECT — MEDICAL DISCLAIMER"*.
  - Body: Complete medical non-diagnostic declaration.
- **Compact Variant**:
  - Single-line pill banner used on intake form and results sub-sections.

### 2.4. Cardiovascular Telemetry Visual (`frontend/src/components/CardiovascularVisual.jsx`)
- **Visual Features**:
  - Dual outer ambient glow rings with pulsing opacity (`animate-pulse-subtle`).
  - Top telemetry bar: Pulsing live indicator ("CardioSense Engine") + "Ensemble Active" badge (`Cpu` icon).
  - Central SVG vector: Stylized anatomical heart contour rendered in deep navy/indigo gradient with inner vascular pathways.
  - Neural Network Overlay: 6 glowing nodes across ventricular and atrial chambers with connecting synaptic branches.
  - Dynamic ECG waveform (`stroke="url(#ecgGrad)"`) traversing the cardiac cycle.
  - Floating clinical metric badges:
    - `MAP` | Hemodynamics
    - `PP` | Pulse Pressure
    - `BMI` | Anthropometric
  - Bottom status ribbon: Activity icon + "10 Engineered Features Pipeline" + "Soft Voting".

### 2.5. Circular Probability Gauge (`frontend/src/components/CircularGauge.jsx`)
- **Visual Features**:
  - 270-degree SVG radial gauge with rounded caps and drop-shadow glow filter.
  - Background track circle in slate-200.
  - Dynamic stroke color interpolation:
    - `< 35%`: Emerald (`#10B981`)
    - `35% – 49.9%`: Amber (`#F59E0B`)
    - `>= 50%`: Rose/Crimson (`#E11D48`)
  - Center Content:
    - Subtitle: *"RISK PROBABILITY"*
    - Big metric number: e.g. `46%` (`text-5xl font-extrabold text-navy-900`)
    - Exact probability readout: e.g. `0.4609 P(Y=1)` in monospace font.
  - Status classification badge: *"LOWER RISK"* or *"ELEVATED RISK"* with matching colored borders.

### 2.6. Metric Card (`frontend/src/components/MetricCard.jsx`)
- **Visual Features**:
  - Card for displaying derived physiological indicators (BMI, Pulse Pressure, MAP).
  - Title & subtitle with custom category icon.
  - Status pill with colored dot (`emerald`, `amber`, `rose`, `blue`).
  - Metric value in big bold font + uppercase unit (`kg/m²`, `mmHg`).
  - Standard Reference Box showing clinical normal thresholds.
  - Clinical description text with `Info` icon.

---

## 3. Comprehensive Page-by-Page Specifications

### Page 1: Landing Page (`/`)
- **File**: `frontend/src/pages/LandingPage.jsx`
- **Sections**:
  1. **Hero Section**:
     - Sub-badge: Sparkles icon + *"Colab Research Machine Learning Project"*.
     - Headline: *"Predict Cardiovascular Risk Before It Becomes a Problem."*
     - Subtitle: *"CardioSense AI analyzes key health indicators using machine learning to estimate cardiovascular risk and provide an educational risk assessment."*
     - Action Buttons:
       - *"Assess My Risk"* (`/assess`) with `Activity` icon.
       - *"Explore Model"* (`/model-performance`) with `Cpu` icon.
     - Trust footer: *"No sign-up required • Real-time client & FastAPI integration • Educational tool"*.
     - Visual: Interactive `CardiovascularVisual.jsx` SVG graphic.
  2. **Project & Model Statistics Grid** (4 Stat Cards):
     - `70,000+` — Patient Records (Standardized Cardiovascular Dataset, `Database` icon).
     - `10` — Selected Features (Optimal Hemodynamic & Clinical Subset, `GitMerge` icon).
     - `5` — ML Models Evaluated (SVM, Random Forest, Soft Voting, etc., `Cpu` icon).
     - `~73%` — Model Accuracy (Ensemble Performance Benchmark, ~80% AUC, `BarChart3` icon).
  3. **"Why Hemodynamics Matter" Interactive Feature Banner**:
     - Dark navy gradient banner (`from-navy-900 via-navy-950 to-indigo-950`).
     - Card 1: Pulse Pressure ($PP = SBP - DBP$) — arterial stiffness indicator.
     - Card 2: Mean Arterial Pressure ($MAP = \frac{SBP + 2 \times DBP}{3}$) — systemic perfusion resistance.
     - Card 3: Body Mass Index ($BMI = \frac{weight}{height^2}$) — normalized stature metabolic index.
  4. **System Architecture Grid** (4 Cards):
     - Hemodynamic Feature Engineering
     - Multi-Algorithm Ensemble
     - Guided Multi-Step Assessment
     - Transparent Model Metrics
  5. **Medical Disclaimer Banner**.

---

### Page 2: Risk Assessment Page (`/assess`)
- **File**: `frontend/src/pages/RiskAssessmentPage.jsx`
- **Architecture**: 5-step guided form with live real-time derivations and validation rules.
- **Step Progress Bar**:
  - 5 interactive step indicators with icons, labels, progress lines, and completion checkmarks:
    1. Demographics (`User` icon)
    2. Biometrics (`Scale` icon)
    3. Hemodynamics (`Activity` icon)
    4. Lifestyle (`Flame` icon)
    5. Biomarkers (`TestTube2` icon)

#### Granular Step Form Details:

#### Step 1: Demographics
| Field | Type | Min / Max | Default | UI Element | Details & Validation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `age_years` | Number | 18 – 110 | 52 | Numeric Input with "years" suffix | Must be integer/float between 18 and 110. |
| `gender` | Categorical | 1 or 2 | 1 | 2-Button Toggle | • **Female (1)** (`User` icon in pink)<br>• **Male (2)** (`User` icon in blue) |

#### Step 2: Biometrics & Live BMI Calculation
| Field | Type | Min / Max | Default | UI Element | Details & Validation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `height` | Number | 90 – 250 cm | 168 cm | Numeric Input with "cm" suffix | Validates physical height bounds. |
| `weight` | Number | 30 – 260 kg | 74 kg | Numeric Input with "kg" suffix | Validates physical weight bounds. |
| **Derived: BMI** | Calculated | Real-time | Auto | Dynamic Metric Box | Formula: $BMI = \frac{\text{weight}}{(\text{height} / 100)^2}$<br>• `< 18.5`: Underweight (blue)<br>• `18.5 – 24.9`: Normal (emerald)<br>• `25.0 – 29.9`: Overweight (amber)<br>• `≥ 30.0`: Obese (rose) |

#### Step 3: Hemodynamics (Blood Pressure Derivations)
| Field | Type | Min / Max | Default | UI Element | Details & Validation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `systolic_bp` | Number | 70 – 250 mmHg | 130 mmHg | Numeric Input with "mmHg" suffix | Upper reading ($ap\_hi$). Normal resting < 120. |
| `diastolic_bp` | Number | 40 – 160 mmHg | 85 mmHg | Numeric Input with "mmHg" suffix | Lower reading ($ap\_lo$). Normal resting < 80. |
| **Validation** | Rule | SBP > DBP | — | Alert Banner | **Diastolic pressure must be strictly lower than systolic pressure.** |
| **Derived: PP** | Calculated | Real-time | Auto | Dynamic Metric Box | Formula: $PP = SBP - DBP$<br>• `≤ 60 mmHg`: Normal (emerald)<br>• `> 60 mmHg`: Elevated / Arterial Stiffening (rose) |
| **Derived: MAP** | Calculated | Real-time | Auto | Dynamic Metric Box | Formula: $MAP = \frac{SBP + 2 \times DBP}{3}$<br>• `70 – 105 mmHg`: Optimal (emerald)<br>• `< 70 mmHg`: Low (amber)<br>• `> 105 mmHg`: High (rose) |

#### Step 4: Lifestyle Factors
| Field | Type | Options | Default | UI Element | Details & Clinical Context |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `smoking` | Binary | 0 or 1 | 0 | 2-Button Toggle | • **Non-Smoker (0)** (emerald badge)<br>• **Smoker (1)** (rose badge) |
| `alcohol` | Binary | 0 or 1 | 0 | 2-Button Toggle | • **None / Rare (0)** (emerald badge)<br>• **Regular (1)** (amber badge) |
| `active` | Binary | 1 or 0 | 1 | 2-Button Toggle | • **Active (1)** (emerald badge)<br>• **Sedentary (0)** (rose badge) |

#### Step 5: Clinical Lab Biomarkers
| Field | Type | Options | Default | UI Element | Details & Clinical Thresholds |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `cholesterol` | Categorical | 1, 2, 3 | 1 | 3-Card Radio Selector | • **1: Normal** (<200 mg/dL)<br>• **2: Above Normal** (200–239 mg/dL)<br>• **3: Well Above Normal** (≥240 mg/dL) |
| `glucose` | Categorical | 1, 2, 3 | 1 | 3-Card Radio Selector | • **1: Normal** (<100 mg/dL euglycemic)<br>• **2: Above Normal** (100–125 mg/dL pre-diabetic)<br>• **3: Well Above Normal** (≥126 mg/dL diabetic range) |
| **Summary Box** | Info Box | — | — | Blue Alert Box | Displays live review of the 10 selected features before running ensemble inference. |

- **Navigation & Submission Controls**:
  - `Back` button (visible on Steps 2 to 5).
  - `Continue` button (Steps 1 to 4) with validation check.
  - Final Action: **"Analyze Cardiovascular Risk"** with `Activity` icon / animated `Loader2` spinner.
  - Submits payload to FastAPI `POST /predict`.
  - Persists response and inputs into `sessionStorage` (`cardiosense_last_result`, `cardiosense_last_inputs`).
  - Navigates immediately to `/results`.

---

### Page 3: Results Page (`/results`)
- **File**: `frontend/src/pages/ResultsPage.jsx`
- **Sections & Features**:
  1. **Empty State Handler**:
     - If no assessment has been conducted, presents an inviting state with `Activity` icon, explanatory text, and *"Start Risk Assessment"* CTA button.
  2. **Inference Engine Status Banner**:
     - Dynamically synchronizes with `GET /model-status` and prediction response.
     - **Trained Model Active**:
       - Badge: *"Trained Soft Voting Ensemble"* (`bg-emerald-50 text-emerald-700 border-emerald-200`).
       - Subtitle: *"Prediction generated using trained Soft Voting Classifier and StandardScaler from backend/model/."*
     - **Demo Mode**:
       - Badge: *"Educational Demo Mode"* (`bg-amber-50 text-amber-700 border-amber-200`).
       - Subtitle: Shows exact `demo_notice` returned by backend.
     - Auto-refresh mechanism: If a cached demo result is found in `sessionStorage` but the backend has since loaded the trained model, it automatically re-runs inference with the saved inputs to display true model results!
     - Quick action: *"Retake Assessment"* (`RefreshCw` icon).
  3. **Primary Assessment Card**:
     - Header ribbon: *"Model-Estimated Cardiovascular Risk Assessment"*.
     - Left Column: `CircularGauge` (animated SVG arc, probability percentage, P(Y=1) exact decimal, classification label).
     - Right Column:
       - Classification Header: *"Elevated Cardiovascular Risk"* or *"Lower Cardiovascular Risk"*.
       - Detailed percentage narrative: *"The soft voting ensemble model calculated an estimated probability of X%..."*
       - Advisory Callout Box (emerald or rose) contextualizing key risk patterns.
       - Quick Metric Summary Badges: BMI, Pulse Pressure, Mean Arterial Pressure (MAP).
  4. **Engineered Physiological Indicators** (3 `MetricCard`s):
     - **Body Mass Index (BMI)**: Value, unit (`kg/m²`), status badge, reference `18.5 – 24.9 kg/m²`, clinical context.
     - **Pulse Pressure (PP)**: Value, unit (`mmHg`), status badge, reference `30 – 50 mmHg`, vascular stiffness context.
     - **Mean Arterial Pressure (MAP)**: Value, unit (`mmHg`), status badge, reference `70 – 105 mmHg`, perfusion resistance context.
  5. **Key Contributing Factors Section**:
     - Numbered list of specific physiological indicators that contributed to elevating or stabilizing the score (e.g. Stage 1/2 BP elevation, high pulse pressure, high MAP, obese/overweight BMI, serum cholesterol, glucose, smoking, sedentary lifestyle, age factor).
  6. **Medical Disclaimer Banner**.
  7. **Action Navigation Footer**:
     - *"Retake Assessment"* (`/assess`)
     - *"Dataset Analytics"* (`/analytics`)
     - *"Model Pipeline"* (`/model-performance`)

---

### Page 4: Analytics Dashboard (`/analytics`)
- **File**: `frontend/src/pages/AnalyticsDashboardPage.jsx`
- **Sections & Recharts Visualizations**:
  1. **Cohort Metric Summary Cards** (4 Cards):
     - Total Cohort Size: `70,000` records
     - Class 0 (Lower/No Disease): `35,021` (50.03%)
     - Class 1 (Cardiovascular Disease): `34,979` (49.97%)
     - Dataset Balance Ratio: `1.001 : 1` (perfect balance)
  2. **Target Label Distribution** (Recharts `PieChart` / Donut):
     - Inner radius: `65`, outer radius: `95`, padding angle: `4`.
     - Class 0: `#10B981` (Emerald) — 35,021 records.
     - Class 1: `#E11D48` (Crimson) — 34,979 records.
     - Custom SVG tooltips and data breakdown table.
  3. **Risk Prevalence Across Age Brackets** (Recharts Grouped `BarChart`):
     - 6 age cohorts: `35–39`, `40–44`, `45–49`, `50–54`, `55–59`, `60–64`.
     - Compares healthy vs diseased counts; highlights disease prevalence crossover at age ~52 (rising from 24.6% to 58.5%).
  4. **Mean Arterial Pressure (MAP) Distribution** (Recharts `BarChart`):
     - 5 pressure brackets: `< 80 mmHg`, `80–90 mmHg`, `90–100 mmHg`, `100–110 mmHg`, `> 110 mmHg`.
     - Demonstrates escalation from low risk to >77% disease rate in cohorts with MAP > 110 mmHg.
  5. **Pulse Pressure (PP) Arterial Stiffness** (Recharts `BarChart`):
     - 4 brackets: `< 40 mmHg`, `40–50 mmHg`, `50–60 mmHg`, `> 60 mmHg`.
     - Highlights vascular stiffening risk escalation from 35.5% to 70.1%.
  6. **Cholesterol & Glucose Tier Influence** (Recharts Horizontal `BarChart`):
     - Displays disease prevalence percentages across Normal (1), Above Normal (2), and High (3) categories.
     - High cholesterol shows 76.6% prevalence; High glucose shows 62.2% prevalence.
  7. **Medical Disclaimer Banner**.

---

### Page 5: Model Performance Page (`/model-performance`)
- **File**: `frontend/src/pages/ModelPerformancePage.jsx`
- **Sections & Visualizations**:
  1. **Exact Colab Machine Learning Benchmark Cards**:
     - **Support Vector Machine (SVM)**:
       - Accuracy: `73.58%` | Precision: `76.46%` | Recall: `67.32%` | F1: `71.60%` | ROC-AUC: `78.76%`
       - Badge: *"High Precision"*
     - **Tuned Random Forest**:
       - Accuracy: `73.58%` | Precision: `75.96%` | Recall: `68.16%` | F1: `71.85%` | ROC-AUC: `79.98%`
       - Badge: *"Highest ROC-AUC (79.98%)"*
     - **Soft Voting Ensemble (Final Model)**:
       - Accuracy: `73.24%` | Precision: `75.01%` | Recall: `68.82%` | F1: `71.78%` | ROC-AUC: `79.47%`
       - Badge: *"Highest Recall & Calibrated Proba"*
  2. **Benchmark Metric Comparison Chart** (Recharts Grouped `BarChart`):
     - Groups metrics by Accuracy, Precision, Recall, F1 Score, and ROC-AUC.
     - Color legend: SVM (`#3B82F6`), Tuned RF (`#10B981`), Soft Voting (`#E11D48`).
     - Clinical justification callout: Why Soft Voting was chosen for clinical screening (highest recall of 68.82% to minimize false negatives).
  3. **Multi-Axis Radar Comparison** (Recharts `RadarChart`):
     - 5-point radar polygon demonstrating diagnostic balance across the models.
  4. **Visual Machine Learning Pipeline Flowchart** (7 Vertical Connected Stages):
     ```
     1. Patient Data (Raw Input: 70,000 Records)
        ↓
     2. Feature Engineering (BMI, MAP, PP Derivation)
        ↓
     3. Feature Selection (10 Selected Features)
        ↓
     4. Standard Scaling (ensemble_scaler.pkl)
        ↓
     5. Multiple ML Models (SVM & Random Forest)
        ↓
     6. Soft Voting Ensemble (soft_voting_model.pkl)
        ↓
     7. Risk Probability (Continuous P(Y=1) ∈ [0.0, 1.0])
     ```
  5. **10 Selected Features Ranking Grid**:
     | Rank | Feature Code | Feature Name | Category | Clinical Rationale |
     | :---: | :--- | :--- | :--- | :--- |
     | 1 | `BMI` | Body Mass Index | Engineered | Anthropometric weight-to-height normalization ($kg/m^2$) |
     | 2 | `MAP` | Mean Arterial Pressure | Engineered | Combined systolic & diastolic systemic perfusion index ($mmHg$) |
     | 3 | `PP` | Pulse Pressure | Engineered | Arterial compliance and pulsatile vascular strain ($mmHg$) |
     | 4 | `active` | Physical Activity | Lifestyle | Regular physical exercise protective factor (0/1) |
     | 5 | `age_years` | Age in Years | Demographic | Chronological vascular aging marker |
     | 6 | `ap_hi` | Systolic Blood Pressure | Clinical | Peak cardiac contraction arterial wall pressure ($mmHg$) |
     | 7 | `ap_lo` | Diastolic Blood Pressure | Clinical | Resting systemic vascular resistance ($mmHg$) |
     | 8 | `cholesterol` | Serum Cholesterol | Clinical | Atherosclerotic lipid plaque accumulation (1, 2, 3) |
     | 9 | `weight` | Body Weight | Anthropometric | Absolute physical workload on cardiac muscle ($kg$) |
     | 10 | `gluc` | Fasting Glucose | Clinical | Glycemic vascular endothelial damage indicator (1, 2, 3) |
  6. **Medical Disclaimer Banner**.

---

### Page 6: How It Works Page (`/how-it-works`)
- **File**: `frontend/src/pages/HowItWorksPage.jsx`
- **Sections & Educational Modules** (6 Numbered Interactive Cards with Python snippets):
  1. **Data Processing & Outlier Filtering**:
     - Age conversion: `age_years = age_days / 365.25`.
     - Blood pressure bounding: $60 \le ap\_hi \le 260$, $40 \le ap\_lo \le 180$, $ap\_hi > ap\_lo$.
     - Z-score filtering (> 3 SD) on height and weight.
  2. **Body Mass Index (BMI) Calculation**:
     - Formula: $BMI = \frac{\text{weight (kg)}}{[\text{height (m)}]^2}$.
     - Normalizes adiposity and metabolic workload across statures.
  3. **Blood Pressure-Derived Features (PP & MAP)**:
     - Pulse Pressure: $PP = SBP - DBP$ (arterial stiffness).
     - Mean Arterial Pressure: $MAP = \frac{SBP + 2 \times DBP}{3}$ (diastole accounts for ~2/3 of resting cardiac cycle).
  4. **Feature Selection & Multicollinearity Filtering**:
     - Removing redundant signals and keeping the 10 most informative non-collinear features.
  5. **Machine Learning Models & Scaling**:
     - StandardScaler normalization: $z = \frac{x - \mu}{\sigma}$.
     - SVM with RBF kernel and Tuned Random Forest.
  6. **Soft Voting Ensemble Prediction**:
     - Weighted soft voting formula: $P(Y=1) = \frac{P_{SVM}(Y=1) + P_{RF}(Y=1)}{2}$.
     - Why continuous probabilities are superior to hard voting for clinical risk estimation.
  7. **Medical Disclaimer Banner**.

---

### Page 7: About Page (`/about`)
- **File**: `frontend/src/pages/AboutPage.jsx`
- **Sections & Features**:
  1. **Project Vision & Academic Rationale**:
     - Educational intent and translation of ML research into production healthcare UI.
  2. **Medical Disclaimer Banner**.
  3. **Live Backend Model Connection & File Tracker**:
     - "Refresh Status" button calling `GET /model-status`.
     - 3-Artifact Status Cards:
       - `soft_voting_model.pkl`: Classifier status (FOUND ON DISK / PENDING), size in MB/KB.
       - `ensemble_scaler.pkl`: StandardScaler status, size.
       - `selected_features.pkl`: Feature list status, size.
     - Python snippet demonstrating how to export artifacts from Google Colab using `joblib.dump()`.
  4. **Full Technology Stack Grid**:
     - Machine Learning & Science (Scikit-learn, Pandas, NumPy, Joblib).
     - Backend & Infrastructure (Python 3.12, FastAPI, Pydantic v2, Uvicorn).
     - Frontend & Data Visualization (React 18, Vite 5, Tailwind CSS, Recharts, Lucide React).

---

## 4. Backend Architecture & REST API (`backend/main.py`)

### 4.1. File System Paths & Model Loading
```python
BASE_DIR = Path(__file__).resolve().parent
MODEL_DIR = BASE_DIR / "model"
MODEL_PATH = MODEL_DIR / "soft_voting_model.pkl"
SCALER_PATH = MODEL_DIR / "ensemble_scaler.pkl"
FEATURES_PATH = MODEL_DIR / "selected_features.pkl"
```

### 4.2. Exact 10 Features Array Order
```python
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
```

### 4.3. API Endpoints

#### Endpoint 1: Root Info
- **URL**: `GET /`
- **Response**:
```json
{
  "service": "CardioSense AI API",
  "status": "online",
  "model_loaded": true,
  "mode": "production",
  "docs_url": "/docs"
}
```

#### Endpoint 2: Health Check
- **URL**: `GET /health`
- **Response**:
```json
{
  "status": "healthy",
  "model_loaded": true,
  "scaler_loaded": true
}
```

#### Endpoint 3: Model Status
- **URL**: `GET /model-status`
- **Response**:
```json
{
  "model_available": true,
  "model_loaded": true,
  "scaler_loaded": true,
  "features_loaded": true,
  "mode": "production",
  "files": {
    "soft_voting_model.pkl": {
      "path": ".../backend/model/soft_voting_model.pkl",
      "exists": true,
      "size_bytes": 409078115
    },
    "ensemble_scaler.pkl": {
      "path": ".../backend/model/ensemble_scaler.pkl",
      "exists": true,
      "size_bytes": 1191
    },
    "selected_features.pkl": {
      "path": ".../backend/model/selected_features.pkl",
      "exists": true,
      "size_bytes": 100
    }
  },
  "expected_features": [
    "BMI", "MAP", "PP", "active", "age_years",
    "ap_hi", "ap_lo", "cholesterol", "weight", "gluc"
  ]
}
```

#### Endpoint 4: Cardiovascular Risk Prediction
- **URL**: `POST /predict`
- **Request Body (JSON)**:
```json
{
  "age_years": 50,
  "gender": 1,
  "height": 170,
  "weight": 75,
  "systolic_bp": 130,
  "diastolic_bp": 85,
  "cholesterol": 1,
  "glucose": 1,
  "smoking": 0,
  "alcohol": 0,
  "active": 1
}
```
- **Derived Feature Equations**:
  $$\text{height\_m} = \frac{\text{height}}{100}$$
  $$BMI = \frac{\text{weight}}{\text{height\_m}^2}$$
  $$PP = \text{systolic\_bp} - \text{diastolic\_bp}$$
  $$MAP = \frac{\text{systolic\_bp} + 2 \times \text{diastolic\_bp}}{3}$$
- **Feature Mapping**:
  - `ap_hi` $\leftarrow$ `systolic_bp`
  - `ap_lo` $\leftarrow$ `diastolic_bp`
  - `gluc` $\leftarrow$ `glucose`
  - `active` $\leftarrow$ `active`
  - `age_years` $\leftarrow$ `age_years`
  - `weight` $\leftarrow$ `weight`
  - `cholesterol` $\leftarrow$ `cholesterol`
  - `BMI` $\leftarrow$ `bmi`
  - `MAP` $\leftarrow$ `map`
  - `PP` $\leftarrow$ `pulse_pressure`
- **Trained Model Inference Execution**:
  ```python
  scaled_features = loaded_scaler.transform(input_df)
  prediction = int(loaded_model.predict(scaled_features)[0])
  probs = loaded_model.predict_proba(scaled_features)[0]
  risk_probability = float(probs[1])
  ```
- **Response Body (JSON)**:
```json
{
  "prediction": 0,
  "risk_probability": 0.4609,
  "risk_label": "LOWER RISK",
  "bmi": 25.95,
  "pulse_pressure": 45.0,
  "map": 100.0,
  "is_demo": false,
  "demo_notice": null,
  "key_factors": [
    "Stage 1 Blood Pressure elevation (130/85 mmHg)",
    "BMI in the overweight range (25.9 kg/m²)"
  ],
  "metrics_summary": {
    "bp_category": "Hypertension Stage 1",
    "pp_status": "Normal (≤60 mmHg)",
    "map_status": "Optimal (70–105 mmHg)",
    "bmi_category": "Overweight",
    "cholesterol_status": "Normal",
    "glucose_status": "Normal",
    "lifestyle": [
      "Physically Active"
    ]
  }
}
```

---

## 5. Instructions for GPT / LLM Further Modifications

When sharing this specification with GPT to extend or customize CardioSense AI, consider using the following structured prompt:

```text
Hi GPT, I have an existing healthcare web application called "CardioSense AI — Cardiovascular Risk Assessment".
Here is the complete architecture, page list, component specification, and API contracts:
[PASTE THIS FILE OR RELEVANT SECTIONS HERE]

I would like you to help me with the following task:
[YOUR CUSTOM REQUEST, e.g.:
 - Add a PDF export feature for the assessment report on the Results page.
 - Add a patient history comparison table using IndexedDB/LocalStorage.
 - Add a Lifestyle Recommendation Advisor based on the identified Key Factors.
 - Connect a new XGBoost model alongside the Soft Voting Ensemble.]

Rules:
1. Do not break the 10-feature order: [BMI, MAP, PP, active, age_years, ap_hi, ap_lo, cholesterol, weight, gluc].
2. Maintain the educational disclaimer across all views.
3. Ensure responsiveness across desktop and mobile.
```
