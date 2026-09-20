import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { experiences } from '../data/portfolioData';
import { 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Briefcase, 
  ArrowRight,
  Server,
  Layers,
  Award
} from 'lucide-react';

export default function ExperiencePage() {
  const [selectedExp, setSelectedExp] = useState(experiences[0].id);
  const active = experiences.find((e) => e.id === selectedExp) || experiences[0];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-400 text-xs font-mono mb-3">
          <span>02. CAREER TIMELINE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Professional Experience
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
          Comprehensive breakdown of enterprise IT infrastructure administration, global software development, and technical instruction.
        </p>
      </div>

      {/* Main Experience Selector & Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Role Selector Tabs */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {experiences.map((exp) => {
            const isSelected = exp.id === selectedExp;
            return (
              <button
                key={exp.id}
                onClick={() => setSelectedExp(exp.id)}
                className={`text-left p-5 rounded-3xl border transition-all flex flex-col relative overflow-hidden cursor-pointer ${
                  isSelected
                    ? 'bg-white dark:bg-neutral-950 border-cyan-500 dark:border-cyan-500/60 shadow-md dark:shadow-[0_0_20px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/30'
                    : 'bg-white/80 dark:bg-neutral-950/70 border-slate-200 dark:border-neutral-800 hover:border-slate-300 dark:hover:border-neutral-700 hover:bg-slate-50 dark:hover:bg-neutral-900/40 shadow-xs'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500" />
                )}

                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-neutral-900 text-cyan-700 dark:text-cyan-400 font-semibold border border-slate-200 dark:border-neutral-800">
                    {exp.tag}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    {exp.period}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1 line-clamp-1">
                  {exp.role}
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-1">
                  {exp.company}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Column: Interactive Role Deep-Dive Card */}
        <div key={selectedExp} className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-neutral-950/80 border border-slate-200 dark:border-neutral-800 shadow-xl dark:shadow-2xl backdrop-blur-xl relative space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-neutral-800 pb-5">
            <div>
              <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-semibold block uppercase">
                {active.company}
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {active.role}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-2">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  {active.period}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
                  {active.location}
                </span>
              </div>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 text-xs font-mono text-emerald-700 dark:text-emerald-400 self-start sm:self-auto font-medium">
              Verified Experience
            </div>
          </div>

          {/* Overview summary */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/70 border border-slate-200 dark:border-neutral-800/80">
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              {active.summary}
            </p>
          </div>

          {/* Key Responsibilities & Deliverables */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono text-cyan-700 dark:text-cyan-400 uppercase font-bold tracking-wider">
              Core Responsibilities & Technical Deliverables:
            </h3>
            <div className="space-y-3">
              {active.keyResponsibilities.map((resp, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="p-1 rounded bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 mt-0.5 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {resp}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Stack for Role */}
          <div className="pt-4 border-t border-slate-200 dark:border-neutral-800">
            <h3 className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase mb-2.5 font-semibold">
              Tools, Protocols & Hardware Deployed:
            </h3>
            <div className="flex flex-wrap gap-2">
              {active.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-black border border-slate-200 dark:border-neutral-800 text-cyan-700 dark:text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call to action card */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-cyan-100/70 via-white to-purple-100/70 dark:from-cyan-950/40 dark:via-black dark:to-purple-950/40 border border-cyan-300 dark:border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
            Interested in Ahsan Raza's enterprise IT background?
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Available for full-time opportunities, enterprise network deployments, and infrastructure audits.
          </p>
        </div>
        <Link
          to="/contact"
          className="px-6 py-3 rounded-2xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-lg hover:bg-cyan-400 transition-colors whitespace-nowrap"
        >
          Contact Ahsan
        </Link>
      </div>
    </div>
  );
}

