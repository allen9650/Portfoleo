import React from 'react';
import { Link } from 'react-router-dom';
import { personalInfo, certifications } from '../data/portfolioData';
import { 
  GraduationCap, 
  MapPin, 
  CheckCircle, 
  Network, 
  ShieldAlert, 
  Cpu, 
  Sparkles, 
  Lock, 
  Globe, 
  ArrowRight,
  BookOpen,
  Award
} from 'lucide-react';

export default function AboutPage() {
  const pillars = [
    {
      icon: Network,
      color: 'from-cyan-500 to-blue-600',
      border: 'border-cyan-500/30',
      text: 'text-cyan-400',
      title: 'Enterprise Networking & LAN/WAN',
      description: 'Designing, configuring, and sustaining reliable high-density networks. Specialized in managed switches, Cisco routers, multi-AP Wi-Fi mesh, CAT6 structured cabling, and zero-loss IP subnetting.'
    },
    {
      icon: ShieldAlert,
      color: 'from-emerald-500 to-teal-600',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      title: 'Cyber Threat Defense & Firewalls',
      description: 'VU-ITU certified in Cyber Threat Management. Hardening perimeter firewalls, monitoring unauthorized ingress, implementing access control lists (ACLs), and protecting mission-critical network assets.'
    },
    {
      icon: Cpu,
      color: 'from-purple-500 to-indigo-600',
      border: 'border-purple-500/30',
      text: 'text-purple-400',
      title: 'L1/L2 IT Systems & Infrastructure',
      description: 'Comprehensive campus systems support. Managing biometric attendance machines, IP camera surveillance matrices, server maintenance, and delivering rapid tier-1/tier-2 resolution.'
    },
    {
      icon: Sparkles,
      color: 'from-amber-500 to-rose-600',
      border: 'border-amber-500/30',
      text: 'text-amber-400',
      title: 'AI Engineering & Instruction',
      description: 'Google Prompting Essentials & Elements of AI certified. 3+ years lecturing technical computing & networking labs, translating complex OSI models into actionable labs, and engineering modern full-stack web software as a freelance software engineer.'
    }
  ];

  const iconMap = {
    Sparkles: Sparkles,
    ShieldAlert: ShieldAlert,
    Globe: Globe,
    Lock: Lock,
    Cpu: Cpu,
    GraduationCap: GraduationCap
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-400 text-xs font-mono mb-3">
          <span>01. ABOUT & ACADEMICS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          About Ahsan Raza
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl font-mono text-xs sm:text-sm">
          IT & Network Support | IT Operations | Systems Support | Networking | Cybersecurity Student | AI
        </p>
      </div>

      {/* Narrative & Executive Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left 7 cols: Story & Education */}
        <div className="lg:col-span-7 space-y-6 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          <div className="p-6 rounded-3xl bg-white/90 dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800/90 space-y-4 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Professional Biography
            </h2>
            <p>
              I am <strong className="text-slate-900 dark:text-white">Ahsan Raza</strong>, a Computer Science graduate from{' '}
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{personalInfo.education.institution}</span>, based in{' '}
              <span className="text-slate-800 dark:text-slate-200">Sindh, Pakistan</span>. My career is defined by a relentless drive to ensure digital infrastructure never goes down and technical concepts are accessible to everyone.
            </p>

            <p>
              As an <strong className="text-slate-900 dark:text-white">Information Technology Officer</strong>, I oversee complete campus technology ecosystems—from enterprise switches, routers, and high-density wireless access points to biometric timekeeping, IP camera surveillance, and hardware diagnostics across campus.
            </p>

            <p>
              Concurrently, through over <strong className="text-slate-900 dark:text-white">3.5 years of technical computing instruction</strong>, I have mentored more than 500 students in practical networking, the 7-Layer OSI Model, IPv4 subnetting, and software architecture. My pedagogy always emphasizes real-world implications: turning dry theoretical diagrams into working cables, switches, and resilient networks.
            </p>
          </div>

          {/* Detailed Education Card */}
          <div className="p-6 rounded-3xl bg-white/90 dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800/90 space-y-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 uppercase font-semibold">
                  {personalInfo.education.period}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {personalInfo.education.degree}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {personalInfo.education.institution}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 pt-2 leading-relaxed">
              {personalInfo.education.details}
            </p>

            <div className="pt-3 border-t border-slate-200 dark:border-neutral-800 flex flex-wrap gap-2">
              {["Computer Networks", "Database Systems (Oracle)", "Operating Systems", "Cyber Security", "Data Structures & Algorithms", "Artificial Intelligence"].map((course, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-black border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-slate-300">
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 cols: Executive Credentials Card */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative group w-full max-w-sm rounded-3xl p-1 bg-gradient-to-b from-cyan-500/40 via-purple-500/20 to-slate-300 dark:to-neutral-800/80 shadow-xl">
            <div className="rounded-[22px] bg-white dark:bg-black p-6 flex flex-col items-center text-center space-y-4 border border-slate-200 dark:border-neutral-800">
              {/* Executive Monogram & Cyber Node Emblem */}
              <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-cyan-500/50 shadow-xl bg-gradient-to-br from-slate-100 via-white to-cyan-100/60 dark:from-neutral-900 dark:via-black dark:to-cyan-950/60 flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black text-3xl shadow-lg">
                  AR
                </div>
                <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 mt-2 font-bold tracking-wider">
                  VERIFIED PROFILE
                </span>
                <div className="absolute top-2 right-2 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Ahsan Raza</h3>
                <p className="text-xs font-mono text-cyan-700 dark:text-cyan-400 mt-0.5">
                  BS Computer Science (SALU '25)
                </p>
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
                  <span>Sindh, Pakistan</span>
                </div>
              </div>

              {/* Verified Checklist */}
              <div className="w-full text-left space-y-2 pt-2 border-t border-slate-200 dark:border-neutral-800 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  <span>Active Information Technology Officer</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0" />
                  <span>Google Prompting Essentials Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500 dark:text-purple-400 shrink-0" />
                  <span>VU-ITU Cyber Threat Management Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>3+ Years Global Freelance</span>
                </div>
              </div>

              {/* Action Button */}
              <Link
                to="/contact"
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-cyan-500/40 text-slate-900 dark:text-cyan-300 text-xs font-mono font-semibold hover:bg-slate-200 dark:hover:bg-cyan-500/10 hover:border-cyan-500 transition-all flex items-center justify-center gap-2"
              >
                <span>Connect with Ahsan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Architectural Pillars Grid */}
      <section className="space-y-6">
        <div className="text-center">
          <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block mb-1">
            CORE DOMAINS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Architectural Focus Areas
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className={`p-6 rounded-3xl bg-white/90 dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800 backdrop-blur-md hover:bg-slate-50 dark:hover:bg-neutral-900/80 transition-all group hover:-translate-y-1 shadow-sm dark:shadow-lg`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center text-slate-950 font-bold mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Verified Certifications Showcase */}
      <section className="space-y-6">
        <div className="text-center">
          <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block mb-1">
            CREDENTIALS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Accredited Certifications & Licenses
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => {
            const IconComponent = iconMap[cert.icon] || Sparkles;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white/90 dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/40 transition-all flex flex-col justify-between group hover:-translate-y-1 shadow-sm dark:shadow-lg backdrop-blur-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-neutral-900 text-cyan-700 dark:text-cyan-300 border border-slate-200 dark:border-neutral-800 font-semibold">
                      {cert.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-1">
                    {cert.title}
                  </h3>
                  <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-medium block mb-3">
                    {cert.issuer}
                  </span>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-neutral-800/80">
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block mb-2 uppercase font-semibold">
                    Competencies:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skillsLearned.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-black text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-neutral-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

