# CardioSense AI --- Frontend Redesign Instructions

## 1. Mission

Redesign the **frontend only** of the existing CardioSense AI
application using the approved **Variant 1** visual direction.

The final product must feel like a serious healthcare/ML research
product: **minimalist, professional, clinical, analytical, trustworthy,
modern, and restrained**.

Do **not** redesign or modify the backend, FastAPI endpoints, ML
inference, model artifacts, feature order, or API contracts.

------------------------------------------------------------------------

# 2. Non-Negotiable Rules

### Frontend only

You may modify: - React/Vite frontend code - frontend components -
frontend pages - frontend styling - frontend design tokens - frontend
configuration only when required for the UI

Do not modify: - `backend/main.py` - FastAPI endpoints - model/scaler
`.pkl` files - ML inference logic - model feature ordering - backend
request/response schemas - model training

The current API integration must continue working.

### Preserve functionality

Keep: - routing - `/health` - `/model-status` - `/predict` - session
storage - assessment submission - results rendering - production/demo
model status - analytics data - model benchmark data - all important
existing interactions

The frontend redesign must not become a functional rewrite.

------------------------------------------------------------------------

# 3. Variant 1 --- Visual Direction

The entire application must use one coherent design language.

## Desired feeling

**Professional healthcare product + academic ML research platform +
modern SaaS usability.**

The UI should look carefully designed rather than AI-generated.

## Use

-   white surfaces
-   very light slate page backgrounds
-   deep navy typography
-   restrained blue accents
-   subtle emerald success states
-   restrained amber warnings
-   restrained red elevated-risk/error states
-   generous whitespace
-   clear typography hierarchy
-   thin borders
-   subtle shadows
-   moderate corner radii
-   clean data visualization
-   strong alignment
-   consistent spacing

## Do NOT use

-   purple-heavy themes
-   violet gradients
-   pink/purple AI gradients
-   rainbow/LGBTQ+ palettes
-   neon colors
-   cyberpunk styling
-   giant glowing effects
-   aurora backgrounds
-   decorative blobs
-   excessive glassmorphism
-   excessive pills
-   floating translucent cards everywhere
-   random AI illustrations
-   robots/brains/neural-network stock art
-   excessive particles
-   glowing borders
-   excessive animations
-   giant marketing typography
-   generic AI startup-template aesthetics

### Gradient rule

**Do not use gradients as a default visual technique.**

The visual quality must come from spacing, typography, borders, layout
and restrained color.

------------------------------------------------------------------------

# 4. Global Color System

Use a restrained palette:

``` text
Deep Navy       #0B192C
Navy            #132238
Blue            #1E40AF
Action Blue     #2563EB

Background      #F8FAFC
Surface         #FFFFFF
Border          #E2E8F0
Text            #334155
Muted Text      #64748B

Success         #059669
Success Light   #ECFDF5

Warning         #D97706
Warning Light   #FFFBEB

Risk            #DC2626
Risk Light      #FEF2F2

Info            #2563EB
Info Light      #EFF6FF
```

Semantic colors must communicate meaning. Do not color elements
decoratively.

------------------------------------------------------------------------

# 5. Typography

Keep the existing Inter-based typography unless the project already has
a compatible setup.

Use: - dark navy headings - readable slate body text - compact labels -
strong but not oversized numbers - restrained uppercase labels only when
useful

Do not make every heading huge.

------------------------------------------------------------------------

# 6. Global CSS Architecture --- CRITICAL

The application must have a **centralized design system**.

Do not hardcode independent CSS logic inside every page.

Keep Tailwind CSS, but centralize recurring design decisions.

A suitable structure is:

``` text
frontend/src/
├── components/
├── pages/
├── services/
└── styles/
    ├── globals.css
    ├── variables.css
    ├── components.css
    └── utilities.css
```

The exact structure can follow the existing project if it already has an
equivalent.

## Mandatory principle

If a visual rule is reused, it must live in: 1. a global design token,
2. a reusable component, 3. or a global utility.

Do not copy the same styling into multiple page files.

Centralize: - colors - typography - spacing - radius - shadows -
containers - buttons - cards - form controls - status badges - section
headings - responsive behavior - transitions

Example token concept:

``` css
:root {
  --color-navy: #0B192C;
  --color-blue: #2563EB;
  --color-bg: #F8FAFC;
  --color-surface: #FFFFFF;
  --color-border: #E2E8F0;
  --color-text: #334155;
  --color-muted: #64748B;
  --color-success: #059669;
  --color-warning: #D97706;
  --color-danger: #DC2626;

  --radius-card: 12px;
  --radius-button: 8px;
  --shadow-card: 0 4px 18px rgba(15,23,42,.06);
  --container-width: 1200px;
}
```

Do not create a second unnecessary styling framework.

------------------------------------------------------------------------

# 7. Shared Components

Refactor/create reusable components where appropriate:

-   Navbar
-   Footer
-   PageHeader
-   SectionHeader
-   Card
-   StatCard
-   MetricCard
-   Button
-   StatusBadge
-   Alert/Notice
-   MedicalDisclaimer
-   EmptyState
-   LoadingState
-   ErrorState
-   FormField
-   ProgressStepper
-   ChartCard
-   ResultGauge

Do not create components purely for the sake of creating files. Reuse
actual visual patterns.

------------------------------------------------------------------------

# 8. Navbar

Redesign the current navbar to be clean and restrained.

Desktop structure:

``` text
[CardioSense AI]   Home  Assessment  Results  Analytics  Model  How It Works  About   [Model Status] [Assess Risk]
```

Requirements: - compact brand - small navy logo block -
heart/cardiovascular icon - subtle AI badge - simple text navigation -
one clear active state - muted inactive links - subtle model status -
dark navy Assess Risk CTA

Do not wrap every navigation item in a pill.

Mobile: - compact logo - menu button - clean drawer - same navigation
links - model status - Assess Risk CTA

------------------------------------------------------------------------

# 9. Footer

The existing footer is too repetitive.

Reduce it to: - short CardioSense description - Navigation -
Research/Methodology links - Technology - one compact educational
disclaimer/copyright area

Do not repeat the entire methodology in the footer.

Do not repeat large disclaimer banners unnecessarily.

------------------------------------------------------------------------

# 10. Content Audit Rule

Before redesigning every page, inspect existing content and classify it:

### KEEP

Required functionality or important project facts.

### CONSOLIDATE

Repeated information.

### REMOVE

Decorative, redundant, overly verbose or unnecessary information.

### REWRITE

Useful content that is currently badly presented.

Do not preserve sections merely because they already exist.

The goal is **less clutter and stronger information hierarchy**.

------------------------------------------------------------------------

# 11. Home `/`

## Goal

Immediately communicate: 1. what CardioSense is, 2. what it does, 3. why
it matters, 4. where to start.

## Hero

Use a clean two-column layout.

Left: - small eyebrow: `CARDIOVASCULAR MACHINE LEARNING` - concise
headline such as:
`Estimate cardiovascular risk with a transparent ML pipeline.` - short
factual supporting paragraph - primary `Assess Risk` - secondary
`Explore Model`

Right: - restrained cardiovascular/product visualization - no giant
decorative AI artwork - no neon/glow/gradient-heavy illustration

## Below hero

Use a compact research-statistics row:

``` text
70,000+
Patient Records

10
Selected Features

5
Models Evaluated

73%+
Model Accuracy
```

Then a concise feature-engineering section covering: - BMI - Pulse
Pressure - MAP

Then a short "how the system works" flow.

Then one concise disclaimer.

Then footer.

### Remove/consolidate

Do not keep multiple sections explaining the same: - model statistics -
feature engineering - architecture - ML pipeline - disclaimer

The homepage should not feel like seven pages pasted together.

------------------------------------------------------------------------

# 12. Risk Assessment `/assess`

This is a core product flow.

It should look like a professional structured assessment form.

Layout:

``` text
Page title
Short explanation
5-step progress indicator

[Current step form]

Back                       Continue
```

Keep the existing five steps:

1.  Demographics
2.  Biometrics
3.  Hemodynamics
4.  Lifestyle
5.  Biomarkers

Preserve existing field names, validation and payload behavior.

## Form styling

Use: - white form surfaces - thin borders - clear labels - unit
suffixes - helper text - strong focus states - restrained radio/toggle
controls - compact validation messages

Derived BMI, PP and MAP should be small live calculation panels, not
oversized decorative widgets.

Final CTA remains:

`Analyze Cardiovascular Risk`

Do not alter the backend payload.

------------------------------------------------------------------------

# 13. Results `/results`

Make this page feel like a concise analytical report.

Preferred hierarchy:

``` text
Assessment Result

[Risk Probability]       [Classification + explanation]

Key Indicators
[BMI] [Pulse Pressure] [MAP]

Contributing Factors

Model Information

Disclaimer
```

## Risk gauge

Keep the circular probability gauge if useful, but: - reduce unnecessary
visual effects - remove glow - use semantic colors - make the percentage
highly readable

Example:

``` text
22%
Estimated probability

LOWER RISK
```

## Classification

Use: - `Lower Cardiovascular Risk` - `Elevated Cardiovascular Risk`

Clearly state it is a model estimate, not a diagnosis.

## Metrics

Keep: - BMI - PP - MAP

Each card should show: - metric - value - unit - status - reference

## Key factors

Keep interpretability, but use a concise numbered list:

``` text
01  Blood pressure elevation
02  BMI above normal range
```

## Model status

Keep production/demo status, but make it a small system indicator:

``` text
● Trained Soft Voting Ensemble
```

or

``` text
● Educational Demo Mode
```

------------------------------------------------------------------------

# 14. Analytics `/analytics`

Treat this as a **research dashboard**, not a colorful business
dashboard.

Start with: - page title - short description - cohort overview

Then charts in a clean two-column grid.

Charts should: - use restrained navy/blue/emerald/amber/red colors -
have clean axes - have readable labels - use simple legends - use subtle
gridlines - have useful tooltips - sit inside consistent chart cards

Do not give every chart unrelated colors.

Do not invent data.

Use the actual project dataset statistics already provided by the
application.

------------------------------------------------------------------------

# 15. Model Performance `/model-performance`

This should feel like a research benchmark page.

Top:

``` text
Model Performance
Benchmark results from the ML experiment
```

Prefer a professional comparison table:

``` text
Model | Accuracy | Precision | Recall | F1 | ROC-AUC
```

Keep the existing numerical benchmark values exactly.

Highlight the final selected model subtly.

Do not turn every metric into a colorful badge.

Then show the pipeline:

``` text
Raw Dataset
↓
Feature Engineering
↓
Feature Selection
↓
Standard Scaling
↓
ML Models
↓
Soft Voting
↓
Risk Probability
```

Use clean blocks and connectors, not glowing futuristic graphics.

Keep the selected-feature information, but present it compactly.

------------------------------------------------------------------------

# 16. How It Works `/how-it-works`

This page should explain the ML pipeline clearly without becoming a
documentation dump.

Use a sequential structure:

``` text
01 Data preparation
02 Feature engineering
03 Feature selection
04 Scaling
05 Model training
06 Soft voting
07 Risk estimate
```

Each step: - title - short explanation - formula or code only where
genuinely useful

Avoid giant code blocks and excessive text.

------------------------------------------------------------------------

# 17. About `/about`

Keep this page concise.

Recommended:

``` text
About CardioSense

Project objective

Machine learning methodology

Technology stack

Model artifact/status

Educational disclaimer
```

The model artifact tracker may remain because it has technical value,
but simplify its presentation.

Do not turn the page into a long technical dump.

------------------------------------------------------------------------

# 18. Medical Disclaimer

The project must retain its educational disclaimer.

Maintain the meaning of:

> This application is an educational machine-learning project and is not
> intended to diagnose, treat, or prevent any medical condition.

Use: - one compact global/footer notice - one contextual notice on
assessment/results where appropriate

Do not place a large identical disclaimer block repeatedly throughout a
page.

------------------------------------------------------------------------

# 19. Backend/API Compatibility

Preserve:

``` text
GET /health
GET /model-status
POST /predict
```

Do not change request field names or response field names.

Existing request structure must continue working:

``` json
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

The existing model feature order must remain untouched:

``` text
BMI
MAP
PP
active
age_years
ap_hi
ap_lo
cholesterol
weight
gluc
```

UI labels may be human-readable, but model/API mapping must not change.

Preserve:

``` text
cardiosense_last_result
cardiosense_last_inputs
```

Do not replace real project values with fake values.

------------------------------------------------------------------------

# 20. Responsive Design

The redesign must be genuinely responsive.

## Desktop

-   wide content container
-   clean two-column hero
-   multi-column metrics
-   two-column analytics charts

## Tablet

-   reduce columns
-   maintain readable spacing

## Mobile

-   single-column layout
-   intentional mobile navigation
-   full-width controls
-   readable tables/charts
-   assessment steps remain usable
-   results remain easy to scan

Do not merely shrink desktop layouts.

------------------------------------------------------------------------

# 21. Icons

Continue using Lucide React where already available.

Icons should be: - small - functional - consistent

Do not put an icon beside every line of text.

------------------------------------------------------------------------

# 22. Animation

Use only subtle animation: - hover transitions - progress transitions -
result gauge animation - loading state - mobile drawer transition

Avoid: - floating elements - pulsing backgrounds - animated particles -
glowing borders - excessive page transitions - bouncing cards

------------------------------------------------------------------------

# 23. Accessibility

Ensure: - labels are associated with inputs - keyboard navigation
works - focus states are visible - color contrast is strong - status is
not communicated by color alone - charts have meaningful text context -
buttons have meaningful labels

------------------------------------------------------------------------

# 24. Implementation Order

## Phase 1 --- Global system

1.  Inspect existing frontend.
2.  Create/refine global CSS/tokens.
3.  Standardize typography.
4.  Standardize containers.
5.  Standardize cards.
6.  Standardize buttons.
7.  Standardize inputs.
8.  Standardize status badges.
9.  Refactor Navbar.
10. Refactor Footer.

## Phase 2 --- Core flow

11. Risk Assessment
12. Results

## Phase 3 --- Research pages

13. Home
14. Analytics
15. Model Performance
16. How It Works
17. About

## Phase 4 --- Responsive refinement

18. Desktop QA
19. Tablet QA
20. Mobile QA
21. Navigation QA
22. Form QA
23. Chart QA
24. Results QA

## Phase 5 --- Regression testing

25. Test all routes.
26. Test `/health`.
27. Test `/model-status`.
28. Submit a real assessment.
29. Confirm real results.
30. Confirm session storage.
31. Confirm production/demo status.
32. Check browser console.
33. Fix visual regressions.

------------------------------------------------------------------------

# 25. Important Development Rule

Do not rewrite everything blindly.

Before modifying: 1. inspect the current code, 2. identify what already
works, 3. identify reusable components, 4. identify duplicated CSS, 5.
identify page-specific styling, 6. identify API services, 7. identify
routing, 8. identify session/state handling.

Then refactor incrementally.

If a current component works functionally, redesign its presentation
instead of replacing its logic unnecessarily.

------------------------------------------------------------------------

# 26. Code Quality

Final frontend should have: - reusable components - clear component
responsibilities - centralized styling - minimal duplication -
meaningful names - no unused imports - no dead components - no
unnecessary dependencies - no console errors

Avoid giant monolithic JSX files.

------------------------------------------------------------------------

# 27. Final Visual QA Checklist

Before finishing, verify:

-   [ ] UI follows Variant 1 on every page.
-   [ ] No purple/AI-gradient aesthetic.
-   [ ] No rainbow palette.
-   [ ] No neon effects.
-   [ ] No unnecessary decorative illustrations.
-   [ ] No excessive glassmorphism.
-   [ ] No excessive pills.
-   [ ] No excessive animation.
-   [ ] Strong whitespace and hierarchy.
-   [ ] Cards are restrained.
-   [ ] Typography is consistent.
-   [ ] Navigation is consistent.
-   [ ] Buttons are consistent.
-   [ ] Forms are consistent.
-   [ ] Charts share one visual language.
-   [ ] Duplicate content has been removed.
-   [ ] Important project information remains.
-   [ ] Disclaimer remains.
-   [ ] Mobile design is intentional.
-   [ ] Backend was not modified.
-   [ ] API integration still works.
-   [ ] Assessment still works.
-   [ ] Results still work.
-   [ ] Production/demo status still works.

------------------------------------------------------------------------

# 28. Definition of Done

The redesign is complete only when:

-   Only the frontend has been redesigned/refactored.
-   Existing backend functionality remains untouched.
-   Existing API contracts still work.
-   All routes work.
-   Assessment submission works.
-   Results display real backend responses.
-   Model status works.
-   Analytics works.
-   Model benchmark information remains accurate.
-   All pages follow one coherent Variant 1 system.
-   Global CSS/design tokens are centralized.
-   Reusable components are used.
-   Duplicate content has been removed or consolidated.
-   The application is minimalist and professional.
-   Desktop and mobile layouts are polished.
-   No obvious console errors remain.

------------------------------------------------------------------------

# 29. Final Creative Direction

The finished CardioSense AI should feel like:

> **A serious university machine-learning research project that has been
> transformed into a polished healthcare technology product.**

Think:

**clinical + analytical + minimal + trustworthy + modern +
research-oriented**

Not:

**flashy + colorful + futuristic + neon + gradient-heavy + generic AI
template**

When choosing between decoration and clarity, choose **clarity**.

When choosing between another card and removing unnecessary information,
choose **removal**.

When choosing between page-specific styling and a reusable design
system, choose **the design system**.

When choosing between an AI-template visual trend and a restrained
healthcare/research interface, choose **the restrained interface**.

------------------------------------------------------------------------

## Source context

This instruction is based on the existing CardioSense AI application
specification, including its frontend stack, shared components, page
structure, forms, API contracts, model information and existing
functionality. The existing specification identifies React/Vite/Tailwind
as the frontend stack and defines the current page/component
architecture.

## END
