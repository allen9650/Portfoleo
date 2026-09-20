import React from 'react';
import { Link } from 'react-router-dom';
import { personalInfo } from '../data/portfolioData';
import { ArrowUp, Terminal, Shield, Heart } from 'lucide-react';

export default function Footer({ onOpenTerminal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-neutral-800/80 bg-slate-100/70 dark:bg-black py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 font-black text-sm shadow-sm">
            AR
          </Link>
          <div className="text-left">
            <span className="text-sm font-bold text-slate-900 dark:text-white block">
              {personalInfo.name}
            </span>
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block">
              IT & Network Support • IT Operations • Systems Support
            </span>
          </div>
        </div>

        {/* Quick Route Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-600 dark:text-slate-400">
          <button
            onClick={onOpenTerminal}
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            <span>CLI</span>
          </button>
          <span className="opacity-40">•</span>
          <Link to="/about" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            About
          </Link>
          <span className="opacity-40">•</span>
          <Link to="/experience" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            Experience
          </Link>
          <span className="opacity-40">•</span>
          <Link to="/skills" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            Skills
          </Link>
          <Link to="/projects" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            Projects
          </Link>
          <span className="opacity-40">•</span>
          <Link to="/tools" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            Tools
          </Link>
          <span className="opacity-40">•</span>
          <Link to="/contact" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            Contact
          </Link>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-cyan-500/40 transition-all flex items-center gap-1 text-xs font-mono shadow-sm cursor-pointer"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4" />
          <span className="hidden sm:inline">Top</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-200 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 gap-2">
        <span>© {new Date().getFullYear()} Ahsan Raza. All systems operational.</span>
        <span>
          Built with React 19 + Tailwind CSS + Enterprise Routing
        </span>
      </div>
    </footer>
  );
}
