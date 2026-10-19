# CardioSense AI — Complete Frontend & UI Component Specification

> **Target Audience**: Developers, UI/UX engineers, and AI assistants (GPT / Claude) working on modifying, extending, or maintaining the CardioSense AI frontend application.  
> **Visual Design Direction**: **Variant 1 Clinical Design System** — Minimalist, professional, analytical, trustworthy, modern, and restrained (no purple/neon/cyberpunk/AI-gradient tropes).  
> **Source Repository**: `CardioSense-AI`

---

## ⚠️ Non-Negotiable Architectural Rules

1. **Frontend Only Scope**:
   - You may modify: React/Vite code (`frontend/src/`), components, pages, design tokens, styles, routing, and UI configuration.
   - You must **NEVER modify**: `backend/main.py`, FastAPI endpoints, model/scaler `.pkl` files, ML inference logic, backend schemas, or model feature ordering.
2. **Feature Vector Order Invariance**:
   The backend ML model requires exactly 10 features in this specific, strict order:
   `["BMI", "MAP", "PP", "active", "age_years", "ap_hi", "ap_lo", "cholesterol", "weight", "gluc"]`
3. **Preserve End-to-End Compatibility**:
   Keep routing, `/health`, `/model-status`, `/predict`, session storage persistence, production/demo status detection, and client-side fallback calculation.

---

## 1. System & Tech Stack Overview

### Frontend
- **Framework**: React 18.3 (`react`, `react-dom`)
- **Build Tool**: Vite 5.4 (`vite`, `@vitejs/plugin-react`)
- **Styling**: Tailwind CSS 3.4 with custom design tokens (`tailwindcss`, `postcss`, `autoprefixer`)
- **Routing**: React Router DOM 6.29 (`react-router-dom`)
- **Icons**: Lucide React 0.475 (`lucide-react`)
- **Data Visualization**: Recharts 2.15 (`recharts`)
- **Typography**: Inter (System sans fallback)
- **Production Bundling**: Optimized with `manualChunks` in `vite.config.js` splitting `vendor` (React/Router), `charts` (Recharts), and `icons` (Lucide).

### Backend (Integration Reference)
- **Framework**: FastAPI (Python 3.12, Uvicorn)
- **ML Artifacts**: `soft_voting_model.pkl` (~409 MB), `ensemble_scaler.pkl` (~1.2 KB), `selected_features.pkl` (~100 B)
- **Base URL**: Default `http://localhost:8000` (configurable via `VITE_API_URL`)

---

## 2. Design System Tokens & Global Styling Architecture

The application uses a centralized token architecture declared in `frontend/src/styles/` and integrated via `frontend/src/index.css` and `frontend/tailwind.config.js`.

### 2.1. CSS Design Tokens (`frontend/src/styles/variables.css`)
```css
:root {
  /* Brand & Navy Palette */
  --color-deep-navy: #0B192C;     /* Primary brand, headers, main CTA buttons */
  --color-navy: #132238;          /* Hover states for primary elements */
  --color-blue: #1E40AF;          /* Accent blue */
  --color-action-blue: #2563EB;   /* Interactive links, focus rings, badges */

  /* Neutral Background & Surfaces */
  --color-bg: #F8FAFC;            /* Clean light slate background */
  --color-surface: #FFFFFF;       /* White cards, form inputs */
  --color-border: #E2E8F0;        /* Subtle slate-200 borders */
  --color-border-subtle: #F1F5F9; /* Table borders, dividers */

  /* Typography */
  --color-heading: #0B192C;       /* Dark navy typography */
  --color-text: #334155;          /* Slate-700 body text */
  --color-muted: #64748B;         /* Slate-500 secondary text */

  /* Semantic Health Status Colors */
  --color-success: #059669;        /* Emerald-600 (Normal / Optimal / Lower Risk) */
  --color-success-light: #ECFDF5;  /* Emerald-50 background */
  --color-success-border: #A7F3D0; /* Emerald-200 border */

  --color-warning: #D97706;        /* Amber-600 (Moderate / Demo Mode / Overweight) */
  --color-warning-light: #FFFBEB;  /* Amber-50 background */
  --color-warning-border: #FDE68A; /* Amber-200 border */

  --color-risk: #DC2626;           /* Red-600 (Elevated Risk / Obese / High BP) */
  --color-risk-light: #FEF2F2;     /* Red-50 background */
  --color-risk-border: #FECACA;    /* Red-200 border */

  --color-info: #2563EB;           /* Blue-600 (Informational indicators) */
  --color-info-light: #EFF6FF;     /* Blue-50 background */
  --color-info-border: #BFDBFE;    /* Blue-200 border */

  /* Dimensions & Geometry */
  --radius-card: 12px;
  --radius-button: 8px;
  --radius-pill: 9999px;
  --container-max-width: 1200px;

  /* Shadows (Minimal & Non-Glow) */
  --shadow-card: 0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05);
  --shadow-card-hover: 0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05);
}
```

### 2.2. Global CSS Utilities (`frontend/src/styles/components.css`)
- `.container-app`: Standard responsive container constrained to `--container-max-width` (1200px) with responsive horizontal padding (`px-5 sm:px-6 lg:px-8`).
- `.card-clinical`: Clinical surface card with white background, subtle border, 12px border radius, and minimal shadow.
- `.card-clinical-hover`: Smooth hover transition on border and elevation.
- `.btn-primary`: Dark navy button (`bg-navy-900 text-white`) with 8px radius, focus ring, and hover transition.
- `.btn-secondary`: White button with subtle border (`border-slate-200 text-slate-700`) and hover states.
- `.input-clinical`: Standardized text/number input styling with blue focus ring.

---

## 3. Application Routing Architecture

Configured in `frontend/src/App.jsx` with automatic `ScrollToTop` upon path change.

| Route | Page Component | Description |
| :--- | :--- | :--- |
| `/` | `LandingPage.jsx` | Executive landing page, hero with visual pipeline, cohort stats, and feature engineering explanations. |
| `/assess` | `RiskAssessmentPage.jsx` | 5-step guided risk assessment intake form with live hemodynamic calculations. |
| `/results` | `ResultsPage.jsx` | Clinical evaluation report with radial gauge, key indicator cards, contributing factors, and model metadata. |
| `/analytics` | `AnalyticsDashboardPage.jsx` | Research cohort analytics dashboard with 5 Recharts visualizations over 70,000 patient records. |
| `/model-performance` | `ModelPerformancePage.jsx` | Benchmark comparison table, radar chart, grouped bar chart, 7-step pipeline flow, and 10-feature artifact table. |
| `/how-it-works` | `HowItWorksPage.jsx` | Sequential 7-step methodological breakdown of data cleaning, feature engineering, scaling, and soft voting. |
| `/about` | `AboutPage.jsx` | Project objective, methodology overview, live model artifact tracker, and technology matrix. |
| `*` | Fallback | Redirects unmatched paths back to `/` (`LandingPage.jsx`). |

---

## 4. Shared UI Components Library

Located in `frontend/src/components/ui/` and `frontend/src/components/`.

### 4.1. Core Atoms (`frontend/src/components/ui/`)

#### 1. `Button.jsx`
- **Props**:
  - `children`: ReactNode
  - `variant`: `'primary'` (navy-900) \| `'secondary'` (white bordered) \| `'ghost'` (transparent) \| `'danger'` (red-600)
  - `size`: `'sm'` (text-xs, py-1.5 px-2.5) \| `'md'` (text-sm, py-2 px-3.5) \| `'lg'` (text-sm/base, py-2.5 px-5)
  - `icon`: Lucide icon component
  - `iconPosition`: `'left'` (default) \| `'right'`
  - `loading`: Boolean (replaces left icon with spinning `Loader2`)
  - `disabled`: Boolean (opacity-50, cursor-not-allowed)
  - `className`: Custom utility overrides
  - `...props`: Standard HTML button props (`onClick`, `type`, etc.)

#### 2. `Card.jsx`
- **Props**:
  - `children`: ReactNode
  - `hover`: Boolean (applies `card-clinical-hover` transition)
  - `className`: Custom utility overrides
  - `...props`: Standard HTML div props
- **Smart Padding**: Automatically skips default `p-5 sm:p-6` when `className` supplies explicit padding (`p-*`, `px-*`, etc.) or contains `overflow-hidden`.

#### 3. `PageHeader.jsx`
- **Props**:
  - `eyebrow`: String (uppercase text in `text-[11px] font-semibold text-primary-action`)
  - `title`: String (large bold page title `text-2xl sm:text-3xl text-navy-900`)
  - `description`: String (slate-500 explanatory lead paragraph)
  - `action`: Optional ReactNode slot rendered on the right side on desktop
  - `className`: String

#### 4. `SectionHeader.jsx`
- **Props**:
  - `eyebrow`: String (uppercase text in `text-[10px] text-clinical-muted`)
  - `title`: String (section title `text-lg sm:text-xl text-navy-900`)
  - `description`: String (concise subtext)
  - `action`: Optional ReactNode slot
  - `className`: String

#### 5. `StatCard.jsx`
- **Props**:
  - `value`: String \| Number (large bold monospace stat, e.g. `"70,000+"`)
  - `label`: String (stat label in slate-500)
  - `description` or `detail`: String (small explanatory footnote below number)
  - `icon`: Lucide icon component (top-right badge)
  - `className`: String

#### 6. `StatusBadge.jsx`
- **Props**:
  - `children`: ReactNode (badge label text)
  - `variant`: `'success'` (emerald) \| `'warning'` (amber) \| `'risk'` (red) \| `'info'` (blue) \| `'neutral'` (slate)
  - `dot`: Boolean (renders 6px circular status dot, defaults to `true`)
  - `className`: String

---

### 4.2. Composite Clinical Components (`frontend/src/components/`)

#### 1. `Navbar.jsx`
- **Desktop Navigation**:
  - Compact brand: Navy rounded square with red heart icon + "CardioSense" bold text + "AI" badge (`bg-blue-50 text-blue-600 border-blue-100`).
  - Text navigation links: Home, Assessment, Results, Analytics, Model, How It Works, About.
  - Active indicator: Dark navy text with bottom border (`border-b-2 border-navy-900`).
  - Live Model Status Indicator: Polls `GET /model-status` every 15s. Displays green dot + "Trained Model" if loaded, or amber dot + "Demo Mode" if offline.
  - Primary CTA: Dark navy `Assess Risk` button.
- **Mobile Drawer**:
  - Hamburger toggle (`Menu` / `X` icon).
  - Slide-down drawer containing model status pill, vertical navigation links, and full-width "Start Risk Assessment" button.

#### 2. `Footer.jsx`
- **Structure**:
  - 4-column responsive grid:
    1. *Brand & Overview*: Mission description and scikit-learn ensemble architecture note.
    2. *Navigation*: Quick links to Home, Assessment Form, Results, Analytics, Model Benchmarks.
    3. *Methodology*: Links to Hemodynamic Engineering, PP/MAP Derivation, Pipeline Flow, FastAPI integration.
    4. *Tech Stack*: Badge pills for Python, FastAPI, scikit-learn, joblib, pandas, React, Vite, Tailwind CSS, Recharts.
  - Bottom strip: Educational disclaimer note, copyright, and metadata chips (`N = 70,000 Records • 10 Features • Soft Voting Ensemble`).

#### 3. `MedicalDisclaimerBanner.jsx`
- **Standard Variant**: Full-width card with `AlertCircle` icon, bold title, and non-diagnostic educational statement.
- **Compact Variant**: Single-line slate pill with `AlertCircle` icon and concise notice.

#### 4. `MetricCard.jsx`
- Designed specifically for physiological metrics (BMI, Pulse Pressure, MAP).
- **Props**:
  - `title`: String (e.g., `"Pulse Pressure"`)
  - `subtitle`: String (formula, e.g., `"Systolic - Diastolic"`)
  - `value`: Number \| String
  - `unit`: String (e.g., `"mmHg"`, `"kg/m²"`)
  - `statusLabel`: String (e.g., `"Normal (≤60)"`, `"Elevated"`)
  - `statusVariant`: `'success'` \| `'warning'` \| `'risk'` \| `'info'` \| `'neutral'` (also accepts `statusColor` alias)
  - `icon`: Lucide icon component rendered in a small slate square
  - `referenceRange`: String (e.g., `"30 – 50 mmHg"`)
  - `description`: String (clinical rationale)

#### 5. `CircularGauge.jsx`
- **Design**: Clean 270-degree radial gauge with no glowing neon or artificial bloom filters.
- **Props**:
  - `probability`: Float (0.0000 to 1.0000)
  - `label`: String (e.g. `"LOWER RISK"` or `"ELEVATED RISK"`)
  - `size`: Number in px (defaults to 260px)
- **Visual Math**:
  - Stroke width: 16px
  - 270° active arc (`arcLength = circumference * 0.75`)
  - Dynamic `strokeDashoffset = arcLength - (arcLength * percentage) / 100`
- **Semantic Colors**:
  - `< 35%`: Emerald (`#059669`)
  - `35% – 49.9%`: Amber (`#D97706`)
  - `≥ 50%`: Red (`#DC2626`)
- **Center Readout**:
  - Uppercase subtext: `"ESTIMATED PROBABILITY"`
  - Large percentage: e.g. `22%` (`text-5xl font-extrabold text-navy-900`)
  - Exact decimal readout: e.g. `0.2240 P(Y=1)` in monospace font
  - Bottom status pill: Rounded border badge with semantic background.

#### 6. `CardiovascularVisual.jsx`
- Compact clinical visual card displayed on the Home hero section.
- **Architecture**:
  - Header: Green live indicator + "Inference Pipeline Architecture" + "N = 70,000 Cohort".
  - Step 01: Clinical Inputs (Age: 52y, SBP: 130, DBP: 85).
  - Step 02: Hemodynamic Derivations (BMI: 26.2, PP: 45, MAP: 100.0).
  - Step 03: Soft Voting Estimators (LogReg, Tuned RF, LinSVM with weights `[1, 2, 1]`).
  - Output Ribbon: Calibrated risk probability readout (`22.4% P(Y=1)`) with `Lower Risk` badge.

---

## 5. Granular Page-by-Page Specifications

---

### 5.1. Page 1: Landing Page (`/` — `frontend/src/pages/LandingPage.jsx`)

#### 1. Hero Section
- **Eyebrow**: `"CARDIOVASCULAR MACHINE LEARNING"` in uppercase blue font.
- **Headline**: `"Estimate cardiovascular risk with a transparent ML pipeline."`
- **Supporting Paragraph**: Explains biometric processing, hemodynamic derivation, and soft voting ensemble calibration.
- **CTA Actions**:
  - Primary Button: Link to `/assess` (`"Assess Risk"`, dark navy background, emerald activity icon, arrow right).
  - Secondary Button: Link to `/model-performance` (`"Explore Model"`, white background with subtle border, CPU icon).
- **Trust Footnote**: Checkmark icon + `"No sign-up required • Real-time inference • Educational demonstration"`.
- **Right Column Visual**: `<CardiovascularVisual />` component.

#### 2. Research Statistics Row
A 4-column responsive grid of `<StatCard />` components:
1. Value: `"70,000+"` \| Label: `"Patient Records"` \| Detail: `"Standardized clinical cohort"`
2. Value: `"10"` \| Label: `"Selected Features"` \| Detail: `"Hemodynamic & clinical subset"`
3. Value: `"5"` \| Label: `"Models Evaluated"` \| Detail: `"SVM, Random Forest, Soft Voting"`
4. Value: `"73%+"` \| Label: `"Model Accuracy"` \| Detail: `"Ensemble benchmark (~80% ROC-AUC)"`

#### 3. Engineered Hemodynamic Indicators Section
- `<SectionHeader>`: Eyebrow `"Hemodynamic Physiology"`, Title `"Engineered Hemodynamic Indicators"`, description on continuous vascular resistance.
- 3 Clinical Cards:
  1. **Body Mass Index (BMI)**:
     - Formula box: `weight (kg) / height (m)²`
     - Normal range: `18.5 – 24.9 kg/m²`
     - Description: Anthropometric ratio normalizing mass to stature.
  2. **Pulse Pressure (PP)**:
     - Formula box: `Systolic BP - Diastolic BP`
     - Normal range: `30 – 50 mmHg (≤60 normal)`
     - Description: Pulsatile mechanical stress on arterial walls indicating vascular stiffness.
  3. **Mean Arterial Pressure (MAP)**:
     - Formula box: `(SBP + 2 · DBP) / 3`
     - Normal range: `70 – 105 mmHg`
     - Description: Average continuous perfusion pressure sustaining vital organ blood flow.

#### 4. How the System Works Flow
4 sequential stage cards:
- `01`: Clinical Intake (10 inputs)
- `02`: Feature Derivation (BMI, PP, MAP)
- `03`: Standard Scaling (Z-score normalization fit on 70,000 records)
- `04`: Ensemble Inference (Soft voting across RF, SVM, LogReg)

#### 5. Educational Disclaimer
`<MedicalDisclaimerBanner compact />`

---

### 5.2. Page 2: Risk Assessment Page (`/assess` — `frontend/src/pages/RiskAssessmentPage.jsx`)

A guided 5-step structured clinical intake form with live calculations and validation.

#### Interactive 5-Step Progress Stepper
- Stepper bars indicating completion (`emerald-600`), active step (`navy-900`), and pending steps (`slate-200`).
- Step badges with checkmark icons for completed steps.
- Clickable back navigation to any previously completed step.

#### Granular Step Form Details:

##### Step 1: Demographics
| Form Control | Type | Name | Allowed Range / Values | Default | UI Presentation & Behavior |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Age** | Number Input | `age_years` | Min `18`, Max `110` | `52` | Numeric input with absolute `"years"` suffix, validation alert if out of adult range. |
| **Biological Sex** | Segmented Button Group | `gender` | `1` (Female) \| `2` (Male) | `1` | 2-button selector. Selected option gains navy background with white text; unselected is white with slate border. |

##### Step 2: Biometrics & Live BMI
| Form Control | Type | Name | Allowed Range / Values | Default | UI Presentation & Behavior |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Height** | Number Input | `height` | Min `90`, Max `250` cm | `168` | Numeric input with `"cm"` suffix. |
| **Weight** | Number Input | `weight` | Min `30`, Max `260` kg | `74` | Numeric input with `"kg"` suffix. |
| **Live BMI Panel** | Real-time calculation | — | Auto-computed | ~`26.2` | Displays live formula `BMI = weight / (height/100)²`, exact decimal value, and dynamic `<StatusBadge>`: <br>• `< 18.5`: Underweight (`info`)<br>• `18.5–24.9`: Normal (`success`)<br>• `25.0–29.9`: Overweight (`warning`)<br>• `≥ 30.0`: Obese (`risk`) |

##### Step 3: Hemodynamics (Blood Pressure Derivations)
| Form Control | Type | Name | Allowed Range / Values | Default | UI Presentation & Behavior |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Systolic BP** | Number Input | `systolic_bp` | Min `70`, Max `250` mmHg | `130` | Peak contraction pressure ($ap\_hi$). |
| **Diastolic BP** | Number Input | `diastolic_bp` | Min `40`, Max `160` mmHg | `85` | Resting pressure ($ap\_lo$). Validates that $DBP < SBP$. |
| **Live Pulse Pressure** | Real-time calculation | — | Auto-computed | `45` | Computes $PP = SBP - DBP$. <br>• `≤ 60 mmHg`: Normal (`success`)<br>• `> 60 mmHg`: Elevated (`risk`) |
| **Live MAP Panel** | Real-time calculation | — | Auto-computed | `100.0` | Computes $MAP = (SBP + 2 \cdot DBP) / 3$. <br>• `70–105 mmHg`: Optimal (`success`)<br>• `< 70 mmHg`: Low (`warning`)<br>• `> 105 mmHg`: High (`risk`) |

##### Step 4: Lifestyle Factors
Three 2-button toggle cards:
1. **Smoking Status (`smoking`)**:
   - `0`: Non-Smoker
   - `1`: Active Tobacco Smoker
2. **Alcohol Consumption (`alcohol`)**:
   - `0`: Non-Drinker / Occasional
   - `1`: Regular Alcohol Intake
3. **Physical Activity (`active`)**:
   - `1`: Regularly Active (≥ 30 min/day)
   - `0`: Sedentary / Inactive

##### Step 5: Clinical Biomarkers
Radio-card selection for lipid and glycemic categories matching original dataset encoding:
1. **Serum Cholesterol (`cholesterol`)**:
   - `1`: Normal (`< 200 mg/dL`)
   - `2`: Above Normal (`200–239 mg/dL`)
   - `3`: Well Above Normal (`≥ 240 mg/dL`)
2. **Fasting Glucose (`glucose`)**:
   - `1`: Normal (`< 100 mg/dL`)
   - `2`: Above Normal / Impaired (`100–125 mg/dL`)
   - `3`: Well Above Normal / Diabetic (`≥ 126 mg/dL`)

##### Ready for Inference Summary & Submission
- Displays an informational box confirming all 10 features are ready for the ensemble.
- **Form Actions**:
  - `Back` button (visible on steps 2–5).
  - `Continue` button (steps 1–4, validates inputs before proceeding).
  - `Analyze Cardiovascular Risk` button (step 5). On click: sets `isSubmitting = true`, displays `Loader2` spinner, calls `predictRisk(formData)`, stores output in `sessionStorage`, and navigates to `/results`.

---

### 5.3. Page 3: Results Page (`/results` — `frontend/src/pages/ResultsPage.jsx`)

#### 1. Empty State
Rendered when accessed directly with no cached assessment:
- Clinical activity icon.
- Message: `"No Recent Risk Assessment Found"`.
- Primary CTA button routing to `/assess`.

#### 2. Assessment Header & Status Badge
- `<PageHeader>`: `"Assessment Report"`, `"Cardiovascular Risk Evaluation"`.
- Status pill:
  - Green dot + `"Trained Soft Voting Ensemble"` if calculated by backend.
  - Amber dot + `"Educational Demo Mode"` if computed via client fallback.

#### 3. Primary Analytical Report Card
- **Left Column**: `<CircularGauge />` rendering probability, percentage, and risk tier badge.
- **Right Column**:
  - Classification headline: `"Elevated Cardiovascular Risk"` (if $\ge 50\%$) or `"Lower Cardiovascular Risk"` (if $< 50\%$).
  - Estimated probability summary paragraph.
  - Model Interpretation statement card (red banner for elevated risk, green banner for lower risk).
  - Action link: `"Adjust Inputs"` (navigates back to `/assess`).

#### 4. Key Indicators Grid (3 `MetricCard`s)
1. **Body Mass Index**: Metric value, unit `kg/m²`, status (`Normal` / `Overweight` / `Obese`), reference range `18.5 – 24.9 kg/m²`, Scale icon.
2. **Pulse Pressure**: Metric value, unit `mmHg`, status (`Normal (≤60)` / `Elevated (>60)`), reference range `30 – 50 mmHg`, Activity icon.
3. **Mean Arterial Pressure**: Metric value, unit `mmHg`, status (`Optimal` / `Elevated` / `Low`), reference range `70 – 105 mmHg`, Heart icon.

#### 5. Contributing Factors Section
- Displays numbered clinical factor cards (`01`, `02`, `03`...) explaining which specific markers elevated the risk score (e.g., Stage 1 BP elevation, arterial stiffness, overweight BMI, high cholesterol, sedentary lifestyle).

#### 6. Model Architecture Note & Navigation Actions
- Note: Soft Voting classifier combining Random Forest, Logistic Regression, and SVM across 10 selected features.
- Bottom Buttons:
  - `"Retake Assessment"` (refresh icon, returns to `/assess`)
  - `"Cohort Analytics"` (bar chart icon, routes to `/analytics`)
  - `"Model Benchmarks"` (arrow right icon, routes to `/model-performance`)

---

### 5.4. Page 4: Cohort Analytics Dashboard (`/analytics` — `frontend/src/pages/AnalyticsDashboardPage.jsx`)

A research-oriented analytical dashboard built with Recharts over the 70,000-record dataset.

#### 1. Cohort Overview Grid (4 `StatCard`s)
1. Total Records: `70,000` (Standardized patient cohort)
2. Class 0 (No Disease): `50.0%` (35,021 negative records)
3. Class 1 (Disease): `50.0%` (34,979 positive records)
4. Class Balance: `1.00 : 1` (Balanced baseline)

#### 2. Recharts Data Visualizations (2-Column Grid)

1. **Target Class Balance (Donut Chart)**:
   - Component: `<PieChart>`, `<Pie>`, `<Cell>`, `<Tooltip>`
   - Inner radius: `60`, Outer radius: `85`
   - Colors: No Disease (`#2563EB` Action Blue), Disease (`#DC2626` Risk Red)
   - Legend chips with record counts.

2. **Age Group Prevalence (Grouped Bar Chart)**:
   - Component: `<BarChart>`, `<Bar>`, `<XAxis>`, `<YAxis>`, `<CartesianGrid>`, `<Tooltip>`, `<Legend>`
   - 6 Age cohorts: `35–39`, `40–44`, `45–49`, `50–54`, `55–59`, `60–64`
   - Shows disease rate crossing 50% threshold in the 55–59 group (55.3%).

3. **Mean Arterial Pressure (MAP) Distribution (Bar Chart)**:
   - Categories: `< 80` (Low), `80–90` (Optimal), `90–100` (Normal Upper), `100–110` (Stage 1), `> 110` (Stage 2)
   - Demonstrates exponential disease prevalence as MAP exceeds 100 mmHg.

4. **Pulse Pressure (PP) Correlation (Bar Chart)**:
   - Brackets: `< 40 mmHg` (35.5% risk), `40–50 mmHg` (48.5% risk), `50–60 mmHg` (60.7% risk), `> 60 mmHg` (70.1% risk).
   - Validates pulse pressure as a marker of vascular stiffening.

5. **Biomarker Risk Elevation (Horizontal Bar Comparison)**:
   - Compares disease rates across Cholesterol levels (Normal: 44.0%, Above Normal: 60.2%, High: 76.6%) and Glucose levels (Normal: 48.1%, Impaired: 59.3%, Diabetic: 62.2%).

---

### 5.5. Page 5: Model Performance & Benchmarks (`/model-performance` — `frontend/src/pages/ModelPerformancePage.jsx`)

An academic benchmark page comparing algorithms from the Google Colab experiment.

#### 1. Algorithm Benchmark Comparison Table
Clean responsive table highlighting the selected Soft Voting ensemble:

| Model | Accuracy | Precision | Recall | F1-Score | ROC-AUC | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **SVM (Linear)** | `73.58%` | `76.46%` | `67.32%` | `71.60%` | `78.76%` | Candidate |
| **Tuned Random Forest** | `73.58%` | `75.96%` | `68.16%` | `71.85%` | `79.98%` | Candidate |
| **Soft Voting Ensemble** | **`73.24%`** | **`75.01%`** | **`68.82%`** | **`71.78%`** | **`79.47%`** | **Selected Pipeline** |

*Rationale note*: Soft Voting achieved the highest **Recall (68.82%)**, minimizing clinical false negatives, with superior probability calibration.

#### 2. Benchmark Visualizations
1. **Metric-by-Metric Comparison (Grouped Bar Chart)**:
   - Recharts `<BarChart>` comparing SVM, Tuned RF, and Soft Voting across Accuracy, Precision, Recall, F1, and ROC-AUC (Y-axis constrained to 60%–85%).
2. **Multi-Axis Radar Comparison (Radar Chart)**:
   - Recharts `<RadarChart>`, `<PolarGrid>`, `<PolarAngleAxis>`, `<PolarRadiusAxis>`, `<Radar>`.
   - Illustrates balanced polygon coverage across 5 evaluation axes.

#### 3. Machine Learning Execution Flow (7 Sequential Blocks)
Block-based connector flowchart:
1. `01 Raw Dataset` (70,000 records cleaned)
2. `02 Feature Engineering` (BMI, PP, MAP)
3. `03 Feature Selection` (10 non-collinear features)
4. `04 Standard Scaling` (StandardScaler Z-score normalization)
5. `05 ML Models` (Random Forest, SVM, Logistic Regression)
6. `06 Soft Voting` (Weighted probability averaging)
7. `07 Risk Probability` (Calibrated output P(Y=1))

#### 4. The 10 Model Features (Exact Artifact Order Table)
Displays the exact 10 features required by `selected_features.pkl`:
- `[0] BMI` — Body Mass Index (`weight / height²`)
- `[1] MAP` — Mean Arterial Pressure (`(SBP + 2·DBP) / 3`)
- `[2] PP` — Pulse Pressure (`SBP - DBP`)
- `[3] active` — Physical Activity (`Binary 0/1`)
- `[4] age_years` — Age in Years (`Integer 18–110`)
- `[5] ap_hi` — Systolic Blood Pressure (`mmHg`)
- `[6] ap_lo` — Diastolic Blood Pressure (`mmHg`)
- `[7] cholesterol` — Serum Cholesterol (`Ordinal 1, 2, 3`)
- `[8] weight` — Body Weight (`kg`)
- `[9] gluc` — Fasting Glucose (`Ordinal 1, 2, 3`)

---

### 5.6. Page 6: How It Works (`/how-it-works` — `frontend/src/pages/HowItWorksPage.jsx`)

A step-by-step methodology page with formulas and code snippets:
1. **01 Data Preparation & Cleaning**: Age conversion (`age_days / 365.25`), BP bounds filtering (`60 ≤ ap_hi ≤ 260`, `40 ≤ ap_lo ≤ 180`, `ap_hi > ap_lo`), and 3σ outlier removal.
2. **02 Hemodynamic Feature Engineering**: Formulas for BMI, Pulse Pressure, and Mean Arterial Pressure.
3. **03 Feature Selection**: Rationale for the 10-feature subset.
4. **04 Standard Scaling**: Mathematical formula \(z = (x - \mu) / \sigma\) and Python scikit-learn code snippet.
5. **05 Model Training & Exploration**: Standalone performance of SVM, Random Forest, and Logistic Regression.
6. **06 Soft Voting Ensemble**: Formula \(P(Y=1) = \sum (w_i \cdot P_i) / \sum w_i\) and calibration benefits.
7. **07 Risk Estimation & Report**: Clinical 0.50 decision threshold and automated factor attribution.

---

### 5.7. Page 7: About (`/about` — `frontend/src/pages/AboutPage.jsx`)

#### 1. Project Objective & Methodology Cards
Overview of the bridge from Colab research notebooks to production application.

#### 2. Live Model Artifacts & Backend Status Tracker
- Interactive `"Refresh"` button with loading spinner calling `GET /model-status`.
- 3 File Status Cards:
  1. `soft_voting_model.pkl` (Ensemble Classifier, ~409 MB)
  2. `ensemble_scaler.pkl` (StandardScaler Preprocessor, ~1.2 KB)
  3. `selected_features.pkl` (10 Selected Features Vector, ~100 B)
  - Badges show `"Loaded"` (emerald) or `"Pending"` (amber).
- Monospace block displaying the exact feature order vector.

#### 3. Technology Stack Grid (3 Cards)
1. *Machine Learning*: scikit-learn, pandas & numpy, joblib.
2. *Backend Architecture*: FastAPI, Pydantic v2, Uvicorn.
3. *Frontend & UI*: React & Vite, Tailwind CSS, Recharts.

---

## 6. API Services & Client Integration (`frontend/src/services/api.js`)

### 6.1. Backend Endpoints

#### 1. `GET /model-status`
- **Purpose**: Checks backend connectivity and whether `.pkl` files are loaded.
- **Response**:
```json
{
  "model_available": true,
  "model_loaded": true,
  "scaler_loaded": true,
  "features_loaded": true,
  "mode": "production",
  "files": {
    "soft_voting_model.pkl": { "exists": true, "size_bytes": 409078115 },
    "ensemble_scaler.pkl": { "exists": true, "size_bytes": 1191 },
    "selected_features.pkl": { "exists": true, "size_bytes": 100 }
  },
  "expected_features": ["BMI", "MAP", "PP", "active", "age_years", "ap_hi", "ap_lo", "cholesterol", "weight", "gluc"]
}
```

#### 2. `POST /predict`
- **Purpose**: Runs live inference through `StandardScaler` and `VotingClassifier`.
- **Request Payload**:
```json
{
  "age_years": 52,
  "gender": 1,
  "height": 168,
  "weight": 74,
  "systolic_bp": 130,
  "diastolic_bp": 85,
  "cholesterol": 1,
  "glucose": 1,
  "smoking": 0,
  "alcohol": 0,
  "active": 1
}
```
- **Response Payload**:
```json
{
  "prediction": 1,
  "risk_probability": 0.5233,
  "risk_label": "ELEVATED RISK",
  "bmi": 26.22,
  "pulse_pressure": 45.0,
  "map": 100.0,
  "is_demo": false,
  "demo_notice": null,
  "key_factors": [
    "Stage 1 Blood Pressure elevation (130/85 mmHg)",
    "BMI in the overweight range (26.2 kg/m²)"
  ],
  "metrics_summary": {
    "bp_category": "Hypertension Stage 1",
    "bmi_category": "Overweight",
    "pp_status": "Normal (≤60 mmHg)",
    "map_status": "Optimal (70–105 mmHg)"
  }
}
```

### 6.2. Client-Side Offline Fallback (`fallbackLocalPrediction`)
If the FastAPI backend is temporarily unreachable, `api.js` executes an in-browser log-odds calculation mirroring the dataset statistics so the user is never blocked:
- Derives BMI, PP, and MAP.
- Calculates log-odds using coefficients fit to the 70,000-record dataset.
- Evaluates sigmoid probability: $P(Y=1) = \frac{1}{1 + e^{-\text{logOdds}}}$.
- Generates descriptive `key_factors` and `metrics_summary`.
- Marks `is_demo: true` and sets `demo_notice`.

---

## 7. State Management & Storage Contracts

1. **React State (`useState`)**:
   - Manages step index (`currentStep` 1 to 5), input values, validation errors, loading states, and mobile menu drawer open/close.
2. **Real-time Memoization (`useMemo`)**:
   - Automatically computes BMI, PP, MAP, categories, and badges upon keystroke in `RiskAssessmentPage.jsx`.
3. **Session Storage (`sessionStorage`)**:
   - `cardiosense_last_result`: JSON string of the latest prediction response.
   - `cardiosense_last_inputs`: JSON string of the form input values.
   - Enables browser page refresh support on `/results` without losing user data.
4. **React Router Navigation State (`navigate('/results', { state: { result, inputs } })`)**:
   - Delivers results directly upon form submission.

---

## 8. Instructions for AI & LLM Code Modifications

When modifying or extending this application:
1. **Preserve Variant 1 Styling**:
   - Maintain white surface cards, slate-50 page background, and dark navy headers/buttons.
   - Do **NOT** introduce purple gradients, neon glows, floating decorative AI spheres, or glassy transparency everywhere.
2. **Centralize Reusable Code**:
   - Place reusable UI patterns in `frontend/src/components/ui/`.
   - Use CSS classes from `frontend/src/styles/components.css` (`.container-app`, `.card-clinical`, `.btn-primary`).
3. **Do Not Touch Backend Contracts**:
   - Never change the field names of the 10 inputs or the derived features.
   - Keep `backend/main.py` unaltered.
4. **Accessibility (a11y)**:
   - Ensure input fields have matching labels (`htmlFor` matching `id`).
   - Maintain high contrast between text and surfaces (Navy/Slate on White/Slate-50).
   - Keep interactive controls keyboard-navigable with clear focus rings.
