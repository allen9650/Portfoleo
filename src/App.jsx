import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import InteractiveTerminal from './components/InteractiveTerminal';

// Separate Dedicated Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ExperiencePage from './pages/ExperiencePage';
import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import ToolsPage from './pages/ToolsPage';
import PwaInstallPage from './pages/PwaInstallPage';

import { Terminal, PhoneCall } from 'lucide-react';

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <Router>
      <div className="relative min-h-screen bg-slate-50 text-slate-900 dark:bg-black dark:text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-900 dark:selection:text-cyan-200 overflow-x-hidden flex flex-col justify-between transition-colors duration-300">
        {/* Background Subtle Grid */}
        <div className="fixed inset-0 grid-bg opacity-15 dark:opacity-10 pointer-events-none -z-10" />

        {/* Scroll restoration helper */}
        <ScrollToTop />

        {/* Global Multi-Page Navigation Header */}
        <Navbar onOpenTerminal={() => setTerminalOpen(true)} />

        {/* Dedicated Route Views */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage onOpenTerminal={() => setTerminalOpen(true)} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/pwa" element={<PwaInstallPage />} />
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Executive Footer */}
        <Footer onOpenTerminal={() => setTerminalOpen(true)} />

        {/* Floating Bottom Quick Triggers */}
        <aside aria-label="Quick Actions" className="fixed bottom-5 left-5 z-30 hidden sm:flex items-center gap-2">
          <button
            onClick={() => setTerminalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-emerald-600 dark:text-emerald-400 text-xs font-mono hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors shadow-md"
            title="Open Sysadmin Terminal"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            <span>CLI</span>
          </button>

          <Link
            to="/contact"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-cyan-600 dark:text-cyan-400 text-xs font-mono hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors shadow-md"
            title="Contact Ahsan Raza"
          >
            <PhoneCall className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
            <span>Contact</span>
          </Link>
        </aside>

        {/* In-Browser Interactive Terminal Modal */}
        <InteractiveTerminal
          isOpen={terminalOpen}
          onClose={() => setTerminalOpen(false)}
        />
      </div>
    </Router>
  );
}
