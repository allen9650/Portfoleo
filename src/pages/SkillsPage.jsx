import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { skillsCategories, personalInfo } from '../data/portfolioData';
import { 
  Network, 
  ShieldCheck, 
  Cpu, 
  Code2, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  Server, 
  Terminal, 
  ArrowRight,
  Search,
  BookOpen,
  Activity,
  Sliders,
  ChevronRight
} from 'lucide-react';

export default function SkillsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOsiLayer, setSelectedOsiLayer] = useState(3); // Layer 3 Network by default

  const iconMap = {
    Network: Network,
    ShieldCheck: ShieldCheck,
    Cpu: Cpu,
    Code2: Code2
  };

  // Verified Top Skills from profile.pdf
  const verifiedTopSkills = [
    {
      title: "IP Addressing & Subnetting",
      level: 98,
      issuer: "Verified Credential",
      description: "Mastery of Classful/CIDR IPv4 architectures, VLSM design, host calculations, subnet masking, and zero-waste address allocation for multi-segment campuses.",
      tag: "Top Ranked Skill"
    },
    {
      title: "Network Troubleshooting",
      level: 96,
      issuer: "Hands-on Field Expertise",
      description: "Diagnostic isolation across all OSI layers using packet sniffers, loop detection, IP subnet auditing, ARP analysis, and switch port health validation.",
      tag: "Enterprise Core"
    },
    {
      title: "Lesson Planning & Instruction",
      level: 95,
      issuer: "Technical Training Academy (3+ Years)",
      description: "Proven capability translating complex networking and computing concepts into hands-on lab curricula for 500+ mentored students.",
      tag: "Academic & Training"
    },
    {
      title: "L1 & L2 Support Operations",
      level: 96,
      issuer: "Enterprise IT Operations",
      description: "End-to-end administration of workstations, biometric clocking devices, high-throughput printer networks, and 24/7 staff ticket resolution.",
      tag: "Operations Leadership"
    },
    {
      title: "Cyber Threat Defense",
      level: 90,
      issuer: "VU-ITU Certified",
      description: "Perimeter firewall engineering, stateful rule creation, threat surface minimization, and network access control for sensitive organizational data.",
      tag: "Security Specialist"
    },
    {
      title: "Google Prompting Essentials",
      level: 95,
      issuer: "Google Certified",
      description: "Generative AI engineering, structured zero/few-shot prompting, algorithmic task chaining, and LLM automation workflows.",
      tag: "AI & Modern Tech"
    }
  ];

  // OSI Model breakdown showcasing Ahsan's teaching and troubleshooting approach
  const osiLayers = [
    {
      layer: 7,
      name: "Application",
      protocol: "HTTP, HTTPS, DNS, DHCP, SSH",
      ahsanFocus: "Web portal access, DNS lookup diagnostics, biometric cloud API synchronization.",
      badgeColor: "border-purple-500/40 text-purple-400 bg-purple-950/30"
    },
    {
      layer: 6,
      name: "Presentation",
      protocol: "TLS, SSL, JSON, ASCII, JPEG",
      ahsanFocus: "Secure data encryption, CCTV video stream decoding, SSL certificate installation.",
      badgeColor: "border-indigo-500/40 text-indigo-400 bg-indigo-950/30"
    },
    {
      layer: 5,
      name: "Session",
      protocol: "RPC, NetBIOS, PPTP, Sockets",
      ahsanFocus: "Session continuity during switch failovers, remote administrative SSH sessions.",
      badgeColor: "border-blue-500/40 text-blue-400 bg-blue-950/30"
    },
    {
      layer: 4,
      name: "Transport",
      protocol: "TCP, UDP, Port 80/443/53/22",
      ahsanFocus: "Port forwarding, firewall transport rule inspection, TCP flow control & retransmission checks.",
      badgeColor: "border-cyan-500/40 text-cyan-400 bg-cyan-950/30"
    },
    {
      layer: 3,
      name: "Network",
      protocol: "IPv4, IPv6, ICMP, ARP, RIP, OSPF",
      ahsanFocus: "Ahsan's primary strength: CIDR subnetting, gateway routing tables, packet tracer diagnostics.",
      badgeColor: "border-emerald-500/40 text-emerald-400 bg-emerald-950/30"
    },
    {
      layer: 2,
      name: "Data Link",
      protocol: "Ethernet, 802.11 Wi-Fi, MAC, Switch Ports",
      ahsanFocus: "Managed switch port configuration, MAC filtering, physical link health, loop detection (currently expanding into 802.1Q VLAN trunking).",
      badgeColor: "border-amber-500/40 text-amber-400 bg-amber-950/30"
    },
    {
      layer: 1,
      name: "Physical",
      protocol: "CAT5e, CAT6, RJ45, Fiber, Radio RF",
      ahsanFocus: "Structured cabling, T568B RJ45 crimping, patch panel punching, Wi-Fi RF signal attenuation testing.",
      badgeColor: "border-rose-500/40 text-rose-400 bg-rose-950/30"
    }
  ];

  // Subnet Demonstrator State
  const [demoCidr, setDemoCidr] = useState(24);
  const calculateSubnet = (cidr) => {
    const totalHosts = Math.pow(2, 32 - cidr);
    const usableHosts = totalHosts > 2 ? totalHosts - 2 : 0;
    const masks = [
      "128.0.0.0", "192.0.0.0", "224.0.0.0", "240.0.0.0", "248.0.0.0", "252.0.0.0", "254.0.0.0", "255.0.0.0",
      "255.128.0.0", "255.192.0.0", "255.224.0.0", "255.240.0.0", "255.248.0.0", "255.252.0.0", "255.254.0.0", "255.255.0.0",
      "255.255.128.0", "255.255.192.0", "255.255.224.0", "255.255.240.0", "255.255.248.0", "255.255.252.0", "255.255.254.0", "255.255.255.0",
      "255.255.255.128", "255.255.255.192", "255.255.255.224", "255.255.255.240", "255.255.255.248", "255.255.255.252", "255.255.255.254", "255.255.255.255"
    ];
    return {
      mask: masks[cidr - 1] || "255.255.255.0",
      usable: usableHosts.toLocaleString(),
      total: totalHosts.toLocaleString(),
      wildcard: masks[cidr - 1] ? masks[cidr - 1].split('.').map(n => 255 - parseInt(n)).join('.') : '0.0.0.255'
    };
  };

  const currentSubnetInfo = calculateSubnet(demoCidr);

  // Filter skills
  const categoriesList = ['All', ...skillsCategories.map(c => c.title)];
  const filteredCategories = skillsCategories
    .filter(cat => selectedCategory === 'All' || cat.title === selectedCategory)
    .map(cat => ({
      ...cat,
      skills: cat.skills.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(cat => cat.skills.length > 0);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20 animate-fade-in-up">
      {/* 1. Header */}
      <div className="flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-400 text-xs font-mono mb-3">
          <Sliders className="w-3.5 h-3.5" />
          <span>03. TECHNICAL PROFICIENCY</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Skills & Technical Matrix
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
          Verified hands-on competencies across enterprise network infrastructure, cyber threat hardening, full-stack development, and classroom instruction.
        </p>
      </div>

      {/* 2. Top Verified Skills Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              <span>Verified Top Skills</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Validated competencies from profile.pdf & production deployments</p>
          </div>
          <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-200 dark:border-cyan-500/30 hidden sm:inline-block font-semibold">
            6 Primary Pillars
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {verifiedTopSkills.map((skill, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl bg-white/90 dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/40 hover:bg-slate-50 dark:hover:bg-neutral-900/90 transition-all group relative overflow-hidden shadow-sm dark:shadow-none"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors pointer-events-none" />
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-neutral-900 text-cyan-700 dark:text-cyan-400 border border-slate-200 dark:border-neutral-700 font-semibold">
                  {skill.tag}
                </span>
                <span className="text-sm font-mono font-bold text-cyan-600 dark:text-cyan-300">
                  {skill.level}%
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                {skill.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                {skill.description}
              </p>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-slate-200 dark:bg-neutral-800 rounded-full overflow-hidden mb-2">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 inline-block" />
                {skill.issuer}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Interactive Technical Showcase: OSI Model & Subnet Calculator */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* OSI Model Troubleshooting Methodology */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800 backdrop-blur-md space-y-6 shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400 text-xs font-mono mb-1 font-semibold">
                <BookOpen className="w-4 h-4" />
                <span>INSTRUCTION & LAB METHODOLOGY</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                7-Layer OSI Model Diagnostics
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                How Ahsan isolates network anomalies and trains students in computing labs.
              </p>
            </div>
          </div>

          {/* Layer Selector Stack */}
          <div className="flex flex-col gap-2">
            {osiLayers.map((l) => {
              const isActive = selectedOsiLayer === l.layer;
              return (
                <button
                  key={l.layer}
                  onClick={() => setSelectedOsiLayer(l.layer)}
                  className={`text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-slate-100 dark:bg-neutral-900 border-cyan-500 dark:border-cyan-500/50 shadow-sm ring-1 ring-cyan-500/30'
                      : 'bg-slate-50/80 dark:bg-black/60 border-slate-200 dark:border-neutral-800/80 hover:border-slate-300 dark:hover:border-neutral-700 hover:bg-slate-100 dark:hover:bg-neutral-900/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-white dark:bg-black border border-slate-200 dark:border-neutral-700 flex items-center justify-center text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 shadow-2xs">
                      L{l.layer}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{l.name} Layer</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${l.badgeColor}`}>
                          {l.protocol}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'rotate-90 text-cyan-600 dark:text-cyan-400' : 'text-slate-400 dark:text-slate-600'}`} />
                </button>
              );
            })}
          </div>

          {/* Active Layer Details */}
          {(() => {
            const active = osiLayers.find(l => l.layer === selectedOsiLayer) || osiLayers[4];
            return (
              <div className="p-4 rounded-2xl bg-cyan-50/70 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-500/30 text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400">
                    Ahsan's Practical Layer {active.layer} Protocol Strategy:
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{active.protocol}</span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {active.ahsanFocus}
                </p>
              </div>
            );
          })()}
        </div>

        {/* Subnet Calculation Proficiency Demonstrator */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800 backdrop-blur-md flex flex-col justify-between space-y-6 shadow-sm dark:shadow-none">
          <div>
            <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400 text-xs font-mono mb-1 font-semibold">
              <Network className="w-4 h-4" />
              <span>CORE ARCHITECTURAL SKILL</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Subnetting Competency
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Interactive demonstration of CIDR calculations used to partition high-density campus subnets.
            </p>

            {/* Slider */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 dark:text-slate-400">Select CIDR Prefix:</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-bold text-base">/{demoCidr}</span>
              </div>
              <input
                type="range"
                min="8"
                max="30"
                value={demoCidr}
                onChange={(e) => setDemoCidr(parseInt(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
                <span>/8 (Class A)</span>
                <span>/16 (Class B)</span>
                <span>/24 (Class C)</span>
                <span>/30 (P2P Link)</span>
              </div>
            </div>

            {/* Calculated Values Matrix */}
            <div className="mt-6 grid grid-cols-2 gap-3 font-mono text-left">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">Subnet Mask</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{currentSubnetInfo.mask}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">Usable Hosts</span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{currentSubnetInfo.usable}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">Total IP Space</span>
                <span className="text-sm font-bold text-cyan-600 dark:text-cyan-300">{currentSubnetInfo.total}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">Wildcard Mask</span>
                <span className="text-sm font-bold text-purple-600 dark:text-purple-300">{currentSubnetInfo.wildcard}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/80 border border-slate-200 dark:border-neutral-800 text-xs text-slate-600 dark:text-slate-400">
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold block mb-1">Engineering Impact:</span>
            Utilized precise VLSM partitioning to segment enterprise campus networks into dedicated subnets for CCTV (`/24`), Biometrics (`/28`), Staff Wi-Fi (`/23`), and Management (`/27`), optimizing IP address space and preventing traffic bottlenecks.
          </div>
        </div>
      </section>

      {/* 4. Complete Categorized Competencies */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              <span>Full Categorized Technical Inventory</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Filter through all {skillsCategories.reduce((acc, cat) => acc + cat.skills.length, 0)} verified technical skillsets
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search skill (e.g., Subnetting, Next.js)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors shadow-2xs"
            />
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap gap-2">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-white dark:bg-neutral-950/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 shadow-2xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCategories.map((category, idx) => {
            const Icon = iconMap[category.icon] || Network;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800/90 backdrop-blur-sm space-y-6 shadow-sm dark:shadow-none"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 text-cyan-600 dark:text-cyan-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{category.title}</h3>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {category.skills.length} Competencies
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, sIdx) => {
                    const isLearning = skill.name.includes('(Currently Learning)');
                    const displayName = skill.name.replace(' (Currently Learning)', '');
                    return (
                      <div key={sIdx} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2">
                            <span>{displayName}</span>
                            {isLearning && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                                Currently Learning
                              </span>
                            )}
                          </span>
                          <span className="font-mono font-semibold text-cyan-600 dark:text-cyan-400">
                            {isLearning ? (
                              <span className="text-amber-600 dark:text-amber-400 text-[11px]">In Progress</span>
                            ) : (
                              `${skill.level}%`
                            )}
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isLearning
                                ? 'bg-gradient-to-r from-amber-500 to-amber-400'
                                : 'bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500'
                            }`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Call to Action Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-cyan-100/70 via-white to-blue-100/70 dark:from-cyan-950/40 dark:via-black dark:to-blue-950/40 border border-cyan-300 dark:border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Need these skills deployed for your organization?</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Ahsan is available for enterprise IT infrastructure, network engineering, and cybersecurity consultations.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            to="/projects"
            className="flex-1 sm:flex-initial text-center px-5 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-neutral-600 transition-all shadow-2xs"
          >
            View Projects
          </Link>
          <Link
            to="/contact"
            className="flex-1 sm:flex-initial text-center px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </div>
  );
}

