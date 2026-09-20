import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { personalInfo } from '../data/portfolioData';
import { 
  ArrowRight, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  Terminal, 
  Code2,
  Sparkles,
  Gauge
} from 'lucide-react';

export default function HomePage({ onOpenTerminal }) {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24 animate-fade-in-up">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[75vh] flex flex-col justify-center">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />
        <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-float-slow" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Personal Narrative */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-neutral-900 border border-emerald-500/40 text-emerald-700 dark:text-emerald-400 text-xs font-mono transition-transform hover:scale-[1.02]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Available for Engagements & Consulting</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 dark:bg-neutral-900/70 border border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-slate-400 text-xs font-mono transition-transform hover:scale-[1.02]">
                <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Sindh, Pakistan</span>
              </div>
            </div>

            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-3">
                Hello, I'm <br />
                <span className="bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 dark:from-cyan-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">
                  {personalInfo.name}
                </span>
              </h1>

              <div className="h-9 sm:h-10 flex items-center overflow-hidden">
                <span 
                  key={roleIndex}
                  className="animate-text-flip text-lg sm:text-xl font-mono text-cyan-700 dark:text-cyan-300 font-semibold flex items-center gap-2"
                >
                  <span className="text-slate-400 dark:text-slate-500">&gt;</span>
                  <span className="underline decoration-cyan-500/60 decoration-2 underline-offset-4">
                    {personalInfo.roles[roleIndex]}
                  </span>
                </span>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              <strong className="text-slate-900 dark:text-white">Computer Science graduate</strong>. 
              Currently serving as an <strong className="text-cyan-600 dark:text-cyan-400">Information Technology Officer</strong>, 
              orchestrating campus-wide LAN/WAN networks, IP CCTV surveillance, and enterprise infrastructure. 
              Google Prompting & VU-ITU Cyber Threat certified.
            </p>

            {/* Quick Action Navigation */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/experience"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] hover:scale-105 transition-all"
              >
                <span>View Career Experience</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/skills"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 text-slate-800 dark:text-slate-200 font-semibold text-sm hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-300 transition-all shadow-sm"
              >
                <span>Skills Matrix</span>
              </Link>

              <button
                onClick={onOpenTerminal}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white dark:bg-neutral-900/80 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 font-mono text-xs hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-all cursor-pointer shadow-sm"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>CLI Terminal</span>
              </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200 dark:border-neutral-800/80">
              {personalInfo.stats.map((stat, i) => (
                <div key={i} className="p-3 rounded-xl bg-white dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800 shadow-sm card-hover-minor">
                  <span className="text-xl sm:text-2xl font-black text-cyan-600 dark:text-cyan-400 font-mono block">
                    {stat.value}
                  </span>
                  <span className="text-xs font-semibold text-slate-900 dark:text-white block">
                    {stat.label}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5 line-clamp-1">
                    {stat.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Portrait Shower */}
          <div className="lg:col-span-6 w-full flex flex-col items-center">
            <div className="w-full relative">
              {/* Shower Frame */}
              <div className="relative w-full h-[480px] sm:h-[540px] lg:h-[580px] rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900/60 via-slate-950/80 to-black border border-slate-200/80 dark:border-neutral-800 shadow-2xl backdrop-blur-xl flex flex-col items-center justify-between p-5 sm:p-6 group">
                
                {/* Ambient Radial Backlight Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/15 via-purple-600/10 to-transparent pointer-events-none animate-pulse-glow" />

                {/* Top Shower HUD Header */}
                <div className="w-full flex items-center justify-start z-10 pointer-events-none">
                  {/* Status Indicator */}
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-neutral-900/90 border border-slate-200 dark:border-neutral-800 text-xs font-mono backdrop-blur-md shadow-sm transition-transform hover:scale-105">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 font-semibold">
                      {personalInfo.name}
                    </span>
                  </div>
                </div>

                {/* Center Portrait Display */}
                <div className="relative flex-1 w-full flex items-center justify-center py-4 overflow-hidden z-0">
                  {/* Soft Breathing Gradient Aura */}
                  <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-cyan-500/20 via-sky-500/15 to-purple-600/20 blur-3xl pointer-events-none animate-float-slow" />

                  {/* Centered Image with Smooth Gradient Vignette */}
                  <div className="relative h-full max-h-[440px] w-auto aspect-square rounded-2xl overflow-hidden shadow-2xl border border-slate-200/50 dark:border-neutral-800/80 bg-black">
                    <img 
                      src={personalInfo.photo} 
                      alt={personalInfo.name} 
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Bottom gradient fade blending into the shower base */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Bottom Right Degree Badge */}
                <div className="w-full flex items-center justify-end z-10 pointer-events-none pt-1">
                  <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-neutral-900/90 border border-slate-200 dark:border-neutral-800 text-xs font-mono text-cyan-600 dark:text-cyan-400 backdrop-blur-md shadow-sm font-semibold">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>BSCS '25</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DEDICATED SECTIONS PREVIEW GRID */}
      <section className="space-y-8">
        <div className="text-center">
          <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block mb-1">
            EXPLORE THE PORTFOLIO
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Dedicated Portfolio Pages
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/about"
            className="p-6 rounded-3xl bg-white/90 dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800/90 hover:border-cyan-500/50 hover:bg-slate-50 dark:hover:bg-neutral-900/80 transition-all card-hover-minor group flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-2">
                About & Education
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Computer Science graduate, professional philosophy, and certified credentials.
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">
              Learn More <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            to="/experience"
            className="p-6 rounded-3xl bg-white/90 dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800/90 hover:border-emerald-500/50 hover:bg-slate-50 dark:hover:bg-neutral-900/80 transition-all card-hover-minor group flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2">
                Career Experience
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Detailed timelines across enterprise IT administration, freelance software development, and technical instruction.
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold group-hover:translate-x-1 transition-transform">
              View Roles <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            to="/skills"
            className="p-6 rounded-3xl bg-white/90 dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800/90 hover:border-purple-500/50 hover:bg-slate-50 dark:hover:bg-neutral-900/80 transition-all card-hover-minor group flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-2">
                Skills & Tech Stack
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Categorized matrix spanning IP subnetting, network troubleshooting, cyber defense, L1/L2 support, and modern AI/Web.
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-purple-600 dark:text-purple-400 font-bold group-hover:translate-x-1 transition-transform">
              Explore Skills <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            to="/projects"
            className="p-6 rounded-3xl bg-white/90 dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800/90 hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-neutral-900/80 transition-all card-hover-minor group flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                Projects Portfolio
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Featured software platforms: vibe.Sınav (Offline Examination Suite), Verimoo (Digital Certificate SaaS), AI Legal Aid Assistant (Graduation Capstone), and Adalynn Chatbot (7th Sem CS-PRE-EXPO).
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 font-bold group-hover:translate-x-1 transition-transform">
              Inspect Projects <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            to="/tools"
            className="p-6 rounded-3xl bg-white/90 dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800/90 hover:border-amber-500/50 hover:bg-slate-50 dark:hover:bg-neutral-900/80 transition-all card-hover-minor group flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Gauge className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-2">
                Network & Sysadmin Tools
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Port connectivity checker, cryptographic hash generator (MD5, SHA-256), bandwidth estimator, and IP CCTV storage calculator.
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-amber-600 dark:text-amber-400 font-bold group-hover:translate-x-1 transition-transform">
              Launch Tools <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            to="/contact"
            className="p-6 rounded-3xl bg-white/90 dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800/90 hover:border-rose-500/50 hover:bg-slate-50 dark:hover:bg-neutral-900/80 transition-all card-hover-minor group flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors mb-2">
                Contact & Hire Ahsan Raza
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Get in touch directly via institutional email, GitHub, or LinkedIn for enterprise IT leadership, network engineering, and cybersecurity roles.
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-rose-600 dark:text-rose-400 font-bold group-hover:translate-x-1 transition-transform">
              Get In Touch <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
