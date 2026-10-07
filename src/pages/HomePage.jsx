import React from 'react';
import { Link } from 'react-router-dom';
import { personalInfo } from '../data/portfolioData';
import TechBackground from '../components/TechBackground';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Mail, 
  Terminal, 
  Code2, 
  Briefcase, 
  Cpu, 
  Wrench, 
  User, 
  Send 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, MediumIcon } from '../components/Icons';

export default function HomePage({ onOpenTerminal }) {
  const socialLinks = [
    {
      name: 'GitHub',
      label: 'allen9650',
      href: personalInfo.github,
      icon: GithubIcon
    },
    {
      name: 'LinkedIn',
      label: 'ahsan-raza8hbb',
      href: personalInfo.linkedin,
      icon: LinkedinIcon
    },
    {
      name: 'Medium',
      label: '@ahsanrazakb',
      href: personalInfo.medium,
      icon: MediumIcon
    },
    {
      name: 'Email',
      label: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      icon: Mail
    }
  ];

  const quickLinks = [
    {
      title: 'Projects',
      desc: 'vibe.Sınav, Verimoo, Markaan, and AI Legal Assistant',
      path: '/projects',
      icon: Code2
    },
    {
      title: 'Experience',
      desc: 'Pak-Turk Maarif IT Officer, instruction & systems administration',
      path: '/experience',
      icon: Briefcase
    },
    {
      title: 'Skills & Tech Stack',
      desc: 'Enterprise LAN/WAN, pfSense firewall, CCTV matrices & full-stack',
      path: '/skills',
      icon: Cpu
    },
    {
      title: 'Sysadmin Tools',
      desc: 'Interactive TCP port checker, hash generator & CCTV calculator',
      path: '/tools',
      icon: Wrench
    },
    {
      title: 'About & Credentials',
      desc: 'BS Computer Science graduate (2025) & engineering background',
      path: '/about',
      icon: User
    },
    {
      title: 'Get In Touch',
      desc: 'Contact for infrastructure roles, consulting & inquiries',
      path: '/contact',
      icon: Send
    }
  ];

  return (
    <div className="relative min-h-[85vh] flex flex-col justify-center">
      {/* Dynamic interactive tech background */}
      <TechBackground />

      <div className="relative z-10 pt-32 pb-24 px-4 sm:px-6 max-w-3xl mx-auto w-full space-y-12 animate-fade-in-up">
        {/* Profile Header: Photo + Intro */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Profile Photo */}
            <div className="relative shrink-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border border-slate-200 dark:border-neutral-800 shadow-md bg-slate-100 dark:bg-neutral-900 backdrop-blur-xs">
                <img
                  src={personalInfo.photo}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                  loading="eager"
                />
              </div>
            </div>

            {/* Name & Title */}
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {personalInfo.name}
              </h1>

              <p className="text-base sm:text-lg text-cyan-600 dark:text-cyan-400 font-mono font-semibold">
                IT Enthusiast
              </p>
            </div>
          </div>

          {/* Concise Bio */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            BS Computer Science graduate focused on enterprise network infrastructure, pfSense firewalls, IP camera CCTV systems, and modern software development.
          </p>

          {/* Social / External Links */}
          <div className="pt-1">
            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target={item.name === 'Email' ? undefined : '_blank'}
                    rel={item.name === 'Email' ? undefined : 'noopener noreferrer'}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border border-slate-200 dark:border-neutral-800 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 transition-all shadow-2xs hover:shadow-xs"
                  >
                    <Icon className="w-4 h-4 shrink-0 text-slate-500 dark:text-slate-400" />
                    <span className="font-semibold">{item.name}</span>
                    <span className="text-slate-400 dark:text-slate-500 text-[11px]">({item.label})</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  </a>
                );
              })}

              {onOpenTerminal && (
                <button
                  onClick={onOpenTerminal}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100/80 dark:bg-neutral-900/60 backdrop-blur-sm border border-slate-200 dark:border-neutral-800 text-xs font-mono text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:border-emerald-500/40 transition-all cursor-pointer shadow-2xs"
                  title="Open Interactive Terminal"
                >
                  <Terminal className="w-3.5 h-3.5 shrink-0" />
                  <span>CLI Terminal</span>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Navigation / Portfolio Sections */}
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-neutral-800/80">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">
              Explore Portfolio
            </h2>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-neutral-800 border border-slate-200 dark:border-neutral-800 rounded-2xl overflow-hidden bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm shadow-xs">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  to={item.path}
                  className="group flex items-center justify-between p-4 sm:px-5 hover:bg-slate-50/80 dark:hover:bg-neutral-900/60 transition-colors"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-colors shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {item.desc}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:translate-x-1 transition-all pl-2 shrink-0">
                    <span className="text-xs font-mono hidden sm:inline">View</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
