import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Terminal, Menu, X, PhoneCall } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ onOpenTerminal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Experience', path: '/experience' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Tools', path: '/tools' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 dark:bg-black/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-neutral-800/80 shadow-sm dark:shadow-2xl py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo / Monogram */}
        <Link to="/" className="flex items-center group" title="Ahsan Raza Home">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-cyan-500 text-slate-950 font-black text-base transition-all group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] shadow-sm">
            AR
          </div>
        </Link>

        {/* Desktop Multi-Page Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 dark:bg-neutral-900/80 p-1.5 rounded-full border border-slate-200 dark:border-neutral-800 backdrop-blur-md">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-neutral-800/60'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Action Buttons & Theme Switcher */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Modern Light / Dark Mode Switcher */}
          <ThemeToggle />

          {/* Launch Terminal */}
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 text-slate-700 dark:text-slate-300 text-xs font-mono hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/40 transition-all shadow-sm cursor-pointer"
            title="Launch Terminal CLI"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            <span>Terminal CLI</span>
          </button>

          {/* Contact Button */}
          <Link
            to="/contact"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Contact</span>
          </Link>
        </div>

        {/* Mobile Header Controls */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle compact />
          <button
            onClick={onOpenTerminal}
            className="p-2 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 text-emerald-500 dark:text-emerald-400 text-xs"
            title="Open CLI"
          >
            <Terminal className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 bg-white/98 dark:bg-black/98 border-b border-slate-200 dark:border-neutral-800 backdrop-blur-2xl animate-in slide-in-from-top-4 shadow-xl">
          <div className="flex flex-col gap-1.5">
            {/* Theme switcher inside mobile drawer */}
            <div className="flex items-center justify-between px-3 py-2 mb-1 rounded-xl bg-slate-100/80 dark:bg-neutral-900/80 border border-slate-200 dark:border-neutral-800">
              <span className="text-xs font-mono font-medium text-slate-600 dark:text-slate-400">Appearance</span>
              <ThemeToggle />
            </div>

            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-neutral-900 hover:text-cyan-600 dark:hover:text-cyan-400'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-3 flex flex-col gap-2 border-t border-slate-200 dark:border-neutral-800/80 mt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold"
              >
                <Terminal className="w-4 h-4" /> Launch Terminal CLI
              </button>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold"
              >
                <PhoneCall className="w-4 h-4" /> Get in Touch
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
