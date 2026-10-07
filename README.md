# CardioSense AI — Cardiovascular Risk Assessment

> **Portfolio-Grade Machine Learning Web Application**  
> Educational cardiovascular risk estimation based on 70,000 patient records from the Cardiovascular Disease dataset, featuring engineered hemodynamic features and ensemble machine learning models.

---

## ⚠️ Medical Disclaimer

> **This application is an educational machine-learning project and is not intended to diagnose, treat, or prevent any medical condition.**  
> Any risk scores or metrics produced are probabilistic machine learning estimates intended purely for educational and technical demonstration. Always consult a qualified healthcare professional for clinical medical advice, diagnosis, or treatment.

---

## 🌟 Highlights

- **70,000+ Patient Records**: Rigorously processed and evaluated from the benchmark Cardiovascular Disease dataset.
- **10 Selected Key Features**: Rigorously selected through correlation analysis, feature importance, and multicollinearity checks (`BMI`, `MAP`, `PP`, `active`, `age_years`, `ap_lo`, `cholesterol`, `weight`, `gluc`, `gender`).
- **Hemodynamic Feature Engineering**: Incorporates real-time clinical derivations including Body Mass Index (BMI), Pulse Pressure (PP = SBP - DBP), and Mean Arterial Pressure (MAP = (SBP + 2·DBP)/3).
- **Soft Voting Ensemble Architecture**: Evaluated multiple state-of-the-art algorithms (SVM, Tuned Random Forest, Soft Voting) achieving ~73.6% accuracy and ~80% ROC-AUC.
- **Full-Stack Decoupled Architecture**: Clean FastAPI Python backend connected to a modern, responsive React + Vite + Tailwind CSS frontend with interactive Recharts visualizations.
- **Zero-Friction Model Integration**: Built-in dynamic loader that immediately serves `.pkl` models when dropped into `backend/model/`, with a graceful calibrated Demo Mode fallback.

---

## 📊 Model Benchmarks (Google Colab Project)

| Model | Accuracy | Precision | Recall | F1 Score | ROC-AUC |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **SVM** | 73.58% | 76.46% | 67.32% | 71.60% | 78.76% |
| **Tuned Random Forest** | 73.58% | 75.96% | 68.16% | 71.85% | 79.98% |
| **Soft Voting Ensemble** | **73.24%** | **75.01%** | **68.82%** | **71.78%** | **79.47%** |

---

## 🛠️ Project Structure

```
CardioSense-AI/
├── frontend/                     # React + Vite + Tailwind CSS Frontend
│   ├── src/
│   │   ├── components/           # Reusable UI & Visual components
│   │   ├── pages/                # 7 Full Application Pages
│   │   ├── services/             # API client & risk calculation helpers
│   │   ├── App.jsx               # Routes & layout shell
│   │   ├── main.jsx              # App entry point
│   │   └── index.css             # Tailwind & typography styling
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── backend/                      # FastAPI Python Backend
│   ├── main.py                   # REST API endpoints & prediction logic
│   ├── requirements.txt          # Python dependencies
│   └── model/                    # Model storage directory
│       ├── README.md             # Colab export instructions
│       └── .gitkeep
├── README.md                     # Project documentation
└── .gitignore
```

---

## 🚀 Quick Start Guide

### 1. Backend Setup (FastAPI)

```bash
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# On Windows (PowerShell):
.venv\Scripts\Activate.ps1
# On macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI development server
uvicorn main:app --reload --port 8000
```

The backend will be accessible at `http://localhost:8000`.  
Interactive API docs are available at `http://localhost:8000/docs`.

### 2. Connecting Your Trained Model (.pkl files)

To connect your trained models from Google Colab, export:
1. `soft_voting_model.pkl`
2. `ensemble_scaler.pkl`
3. `selected_features.pkl`

Place them directly into `backend/model/`. The backend will automatically detect and load them.

### 3. Frontend Setup (React + Vite)

```bash
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

The web application will open at `http://localhost:5173`.
