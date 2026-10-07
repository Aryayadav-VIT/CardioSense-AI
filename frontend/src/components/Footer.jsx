import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">

      {/* Main Footer Links */}
      <div className="container-app py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Purpose */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-navy-900 flex items-center justify-center text-white">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
              </div>
              <span className="font-bold text-base text-navy-900">CardioSense AI</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Cardiovascular Risk Assessment platform powered by machine learning ensembles trained on clinical records.
            </p>
            <div className="pt-2 text-xs text-slate-500">
              Architecture designed for scikit-learn ensemble deployment.
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Navigation</h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>
                <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/assess" className="hover:text-blue-600 transition-colors">Risk Assessment Form</Link>
              </li>
              <li>
                <Link to="/results" className="hover:text-blue-600 transition-colors">Assessment Results</Link>
              </li>
              <li>
                <Link to="/analytics" className="hover:text-blue-600 transition-colors">Dataset Analytics</Link>
              </li>
              <li>
                <Link to="/model-performance" className="hover:text-blue-600 transition-colors">Model Benchmarks</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Architecture & Engineering */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Methodology</h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>
                <Link to="/how-it-works" className="hover:text-blue-600 transition-colors">Hemodynamic Feature Engineering</Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-blue-600 transition-colors">Pulse Pressure & MAP Derivation</Link>
              </li>
              <li>
                <Link to="/model-performance" className="hover:text-blue-600 transition-colors">Ensemble Pipeline Flow</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-600 transition-colors">FastAPI & React Integration</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-600 transition-colors">Colab Model Deployment Guide</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Project Specifications */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Tech Stack</h4>
            <div className="flex flex-wrap gap-1.5">
              {['Python', 'FastAPI', 'scikit-learn', 'joblib', 'pandas', 'React', 'Vite', 'Tailwind CSS', 'Recharts'].map((tech) => (
                <span
                  key={tech}
                  className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium border border-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 pt-2">
              Based on Google Colab machine-learning research project.
            </p>
          </div>

        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CardioSense AI. Educational research demonstration. Not for clinical diagnosis.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>N = 70,000 Records</span>
            <span>•</span>
            <span>10 Features</span>
            <span>•</span>
            <span>Soft Voting Ensemble</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
