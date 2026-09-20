import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Clock, 
  Globe, 
  MessageSquare, 
  ShieldCheck, 
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { LinkedinIcon, GithubIcon, MediumIcon } from '../components/Icons';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Enterprise Network Engineering',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const topics = [
    'Enterprise Network Engineering (LAN/WAN & Subnetting)',
    'Campus IT Systems & Biometric Support',
    'Perimeter Firewall & Cyber Threat Hardening',
    'Custom Software & Web Development',
    'Technical Instruction & Corporate Training',
    'Full-Time / Contract Employment Opportunity'
  ];

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const directMailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
    `[Portfolio Inquiry] ${formData.topic || 'Engineering Consultation'}`
  )}&body=${encodeURIComponent(
    `Hello Ahsan,\n\nMy name is ${formData.name || 'a visitor'}.\n\nMessage:\n${formData.message}\n\nYou can reach me back at: ${formData.email}`
  )}`;

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 animate-fade-in-up">
      {/* 1. Header */}
      <div className="flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-400 text-xs font-mono mb-3">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>05. GET IN TOUCH</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Connect with Ahsan Raza
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
          Initiate direct communication for IT infrastructure roles, multi-campus networking projects, cyber threat audits, or full-stack software development.
        </p>
      </div>

      {/* 2. Top Fast-Action Channels */}
      {/* 2. Top Fast-Action Channels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Official Email */}
        <div className="p-5 rounded-3xl bg-white/90 dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/40 transition-all card-hover-minor flex flex-col justify-between space-y-3 shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Mail className="w-5 h-5" />
            </div>
            <button
              onClick={() => handleCopy(personalInfo.email, 'email')}
              className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
              title="Copy email"
            >
              {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedField === 'email' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <div>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block">Direct Email</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white font-mono truncate block" title={personalInfo.email}>
              {personalInfo.email}
            </span>
          </div>
          <a
            href={`mailto:${personalInfo.email}`}
            className="w-full text-center py-1.5 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-neutral-800 transition-colors block"
          >
            Send Email
          </a>
        </div>

        {/* LinkedIn Profile */}
        <div className="p-5 rounded-3xl bg-white/90 dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/40 transition-all card-hover-minor flex flex-col justify-between space-y-3 shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400">
              <LinkedinIcon className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono text-sky-700 dark:text-sky-400 bg-sky-100 dark:bg-sky-950/50 px-2 py-0.5 rounded-full border border-sky-300 dark:border-sky-500/30 font-medium">
              Verified Profile
            </span>
          </div>
          <div>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block">LinkedIn Connection</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white font-mono truncate block">
              ahsan-raza8hbb
            </span>
          </div>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center py-1.5 rounded-xl bg-sky-100 dark:bg-sky-600/20 border border-sky-300 dark:border-sky-500/40 text-sky-800 dark:text-sky-300 text-xs hover:bg-sky-200 dark:hover:bg-sky-600/40 transition-colors flex items-center justify-center gap-1 font-medium"
          >
            <span>Connect on LinkedIn</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Medium Profile / Publication */}
        <div className="p-5 rounded-3xl bg-white/90 dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/40 transition-all card-hover-minor flex flex-col justify-between space-y-3 shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <MediumIcon className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-500/30 font-medium">
              Tech Articles
            </span>
          </div>
          <div>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block">Medium Publication</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white font-mono truncate block">
              @ahsanrazakb
            </span>
          </div>
          <a
            href={personalInfo.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-600/20 border border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300 text-xs hover:bg-emerald-200 dark:hover:bg-emerald-600/40 transition-colors flex items-center justify-center gap-1 font-medium"
          >
            <span>Read on Medium</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Location & Timezone */}
        <div className="p-5 rounded-3xl bg-white/90 dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/40 transition-all card-hover-minor flex flex-col justify-between space-y-3 shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono text-cyan-700 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-950/50 px-2 py-0.5 rounded-full border border-cyan-200 dark:border-cyan-500/30 font-medium">
              PKT (UTC+5)
            </span>
          </div>
          <div>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block">Location</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight block">
              Sindh, Pakistan
            </span>
          </div>
          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5 pt-1">
            <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Response &lt; 24 Hours</span>
          </div>
        </div>
      </div>

      {/* 3. Main Form & Professional Credentials Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Form: Inquiry / Consultation */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800 backdrop-blur-md space-y-6 shadow-sm dark:shadow-none">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Send an Executive Message
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Have a campus network upgrade, IT systems support query, or security audit? Drop your details below.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/40 text-center space-y-4 animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Message Prepared Successfully!</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                Thank you, <span className="text-cyan-700 dark:text-cyan-400 font-semibold">{formData.name}</span>. Click the button below to dispatch this message directly via your email client to Ahsan's inbox.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={directMailtoUrl}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs hover:shadow-lg transition-all"
                >
                  Open in Email Client ({personalInfo.email})
                </a>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', topic: topics[0], message: '' });
                  }}
                  className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-4 py-2 cursor-pointer"
                >
                  Reset Form
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-mono text-slate-700 dark:text-slate-300 font-semibold">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Salman Khan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors shadow-2xs"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-mono text-slate-700 dark:text-slate-300 font-semibold">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="salman@organization.edu.pk"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors shadow-2xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-mono text-slate-700 dark:text-slate-300 font-semibold">Engagement Area *</label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors shadow-2xs cursor-pointer"
                >
                  {topics.map((top, idx) => (
                    <option key={idx} value={top} className="bg-white dark:bg-black text-slate-900 dark:text-white">
                      {top}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-mono text-slate-700 dark:text-slate-300 font-semibold">Project Scope / Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your network requirements, timeline, or consultation goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none shadow-2xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 text-slate-950 font-bold text-xs hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2 hover:scale-[1.01] cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Info: Professional Assurance & Profile Summary */}
        <div className="lg:col-span-5 space-y-6">
          {/* Availability Card */}
          <div className="p-6 rounded-3xl bg-white/95 dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800 space-y-4 shadow-sm dark:shadow-none">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-medium">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="uppercase tracking-wider">Current Availability</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Open to Engagements
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Currently serving as an Information Technology Officer while welcoming strategic consulting roles, IT infrastructure engagements, and software initiatives.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-neutral-800 text-xs font-mono text-slate-600 dark:text-slate-300">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Preferred Work:</span>
                <span className="text-cyan-700 dark:text-cyan-300 font-semibold">Full-Time / Consulting</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Location Modality:</span>
                <span className="text-cyan-700 dark:text-cyan-300 font-semibold">Hybrid / On-site / Remote</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Notice Period:</span>
                <span className="text-cyan-700 dark:text-cyan-300 font-semibold">Standard Professional</span>
              </div>
            </div>
          </div>

          {/* Institutional Credibility */}
          <div className="p-6 rounded-3xl bg-white/95 dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800 space-y-3 shadow-sm dark:shadow-none">
            <h4 className="text-xs font-mono uppercase text-cyan-700 dark:text-cyan-400 flex items-center gap-2 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Identity & Background</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              All credentials, degrees from Shah Abdul Latif University (BSCS, 2025), Google Prompting certifications, and VU-ITU Cyber Threat credentials have been validated.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 text-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-neutral-600 transition-all"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 text-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-neutral-600 transition-all"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={personalInfo.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 text-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-neutral-600 transition-all"
              >
                <MediumIcon className="w-3.5 h-3.5" />
                <span>Medium</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
