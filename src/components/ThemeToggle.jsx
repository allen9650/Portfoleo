import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = '', compact = false }) {
  const { theme, toggleTheme, isDark } = useTheme();

  if (compact) {
    return (
      <button
        onClick={toggleTheme}
        type="button"
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        className={`relative p-2 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-center ${
          isDark
            ? 'bg-neutral-900 border-neutral-700/80 text-cyan-400 hover:bg-neutral-800 hover:border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
            : 'bg-white border-slate-200 text-amber-500 hover:bg-slate-100 hover:border-amber-400/50 shadow-sm'
        } ${className}`}
      >
        {isDark ? (
          <Moon className="w-4 h-4 transition-transform duration-300 rotate-0" />
        ) : (
          <Sun className="w-4 h-4 transition-transform duration-300 rotate-0" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Current mode: ${isDark ? 'Dark (Pure Black)' : 'Light'}. Click to switch.`}
      title={`Switch to ${isDark ? 'Light' : 'Dark (Pure Black)'} Mode`}
      className={`relative inline-flex items-center w-16 h-8 p-1 rounded-full border transition-all duration-300 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
        isDark
          ? 'bg-neutral-900/90 border-neutral-700/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]'
          : 'bg-slate-200/90 border-slate-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.08)]'
      } ${className}`}
    >
      {/* Background Icons */}
      <div className="w-full flex items-center justify-between px-1 pointer-events-none">
        <Sun
          className={`w-3.5 h-3.5 transition-opacity duration-200 ${
            isDark ? 'text-neutral-500 opacity-40' : 'text-amber-500 opacity-100'
          }`}
        />
        <Moon
          className={`w-3.5 h-3.5 transition-opacity duration-200 ${
            isDark ? 'text-cyan-400 opacity-100' : 'text-slate-400 opacity-40'
          }`}
        />
      </div>

      {/* Floating Sliding Handle Thumb */}
      <span
        className={`absolute top-1 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ease-out shadow-md pointer-events-none ${
          isDark
            ? 'left-9 bg-black border border-cyan-500/40 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
            : 'left-1 bg-white border border-amber-300/80 text-amber-500 shadow-sm'
        }`}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 animate-in spin-in-90 duration-200" />
        ) : (
          <Sun className="w-3.5 h-3.5 animate-in spin-in-90 duration-200" />
        )}
      </span>
    </button>
  );
}

