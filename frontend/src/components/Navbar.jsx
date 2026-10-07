import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, Activity } from 'lucide-react';
import { getModelStatus } from '../services/api';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [modelStatus, setModelStatus] = useState({ loaded: false, mode: 'checking' });
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    async function checkStatus() {
      const res = await getModelStatus();
      if (mounted) {
        if (res.model_loaded) {
          setModelStatus({ loaded: true, mode: 'Trained Model Active' });
        } else {
          setModelStatus({ loaded: false, mode: 'Demo Mode' });
        }
      }
    }
    checkStatus();
    const interval = setInterval(checkStatus, 15000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Assessment', path: '/assess' },
    { name: 'Results', path: '/results' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Model', path: '/model-performance' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-clinical-border transition-colors">
      <div className="container-app">
        <div className="flex items-center justify-between h-14">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5" onClick={() => setIsOpen(false)}>
            <div className="w-7 h-7 rounded bg-navy-900 flex items-center justify-center text-white">
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-navy-900 tracking-tight">CardioSense</span>
              <span className="text-[10px] font-semibold text-primary-action bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                AI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Simple clean text, no pills) */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs font-medium transition-colors py-1 ${
                    active
                      ? 'text-navy-900 font-semibold border-b-2 border-navy-900'
                      : 'text-clinical-muted hover:text-navy-900'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Section: Subtle Model Status & CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Subtle Status Indicator */}
            <div
              className="flex items-center gap-1.5 text-xs text-clinical-muted"
              title={
                modelStatus.loaded
                  ? 'Active scikit-learn soft voting model loaded from backend/model/'
                  : 'Running in educational demo mode.'
              }
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  modelStatus.loaded ? 'bg-emerald-600' : 'bg-amber-500'
                }`}
              />
              <span className="text-[11px] font-medium text-slate-600">
                {modelStatus.loaded ? 'Trained Model' : 'Demo Mode'}
              </span>
            </div>

            {/* Dark Navy CTA Button */}
            <Link
              to="/assess"
              className="btn-primary text-xs py-1.5 px-3"
            >
              <span>Assess Risk</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded text-slate-600 hover:text-navy-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-clinical-border bg-white px-4 pt-3 pb-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between py-1.5 px-2.5 bg-slate-50 rounded text-xs text-clinical-muted mb-2">
            <span>Model Status:</span>
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <span
                className={`w-2 h-2 rounded-full ${
                  modelStatus.loaded ? 'bg-emerald-600' : 'bg-amber-500'
                }`}
              />
              {modelStatus.loaded ? 'Trained Model Active' : 'Demo Mode'}
            </span>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-2.5 py-2 rounded text-xs font-medium ${
                isActive(link.path)
                  ? 'bg-slate-100 text-navy-900 font-semibold'
                  : 'text-clinical-muted hover:text-navy-900 hover:bg-slate-50'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-2">
            <Link
              to="/assess"
              onClick={() => setIsOpen(false)}
              className="btn-primary w-full text-xs py-2"
            >
              <span>Start Risk Assessment</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
