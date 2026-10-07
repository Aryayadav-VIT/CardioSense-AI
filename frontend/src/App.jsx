import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import LandingPage from './pages/LandingPage';
import RiskAssessmentPage from './pages/RiskAssessmentPage';
import ResultsPage from './pages/ResultsPage';
import AnalyticsDashboardPage from './pages/AnalyticsDashboardPage';
import ModelPerformancePage from './pages/ModelPerformancePage';
import HowItWorksPage from './pages/HowItWorksPage';
import AboutPage from './pages/AboutPage';

// Scroll to top on navigation change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/assess" element={<RiskAssessmentPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/analytics" element={<AnalyticsDashboardPage />} />
            <Route path="/model-performance" element={<ModelPerformancePage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/about" element={<AboutPage />} />
            {/* Fallback route */}
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
