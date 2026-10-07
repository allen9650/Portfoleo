import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Keyboard, 
  Eye, 
  ShieldAlert, 
  Users, 
  WifiOff, 
  Award, 
  BarChart3, 
  CheckCircle2, 
  Server, 
  Code2, 
  Layers, 
  ExternalLink, 
  ArrowRight, 
  FolderGit2, 
  X,
  Cpu,
  Lock,
  Database,
  Monitor,
  Activity,
  Sparkles,
  QrCode,
  ShieldCheck,
  Palette,
  FileCheck2,
  Terminal,
  Download,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Mic,
  Volume2,
  Globe,
  Copy,
  Check,
  Scale
} from 'lucide-react';
import { GithubIcon } from '../components/Icons';

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [copiedInstallCmd, setCopiedInstallCmd] = useState(false);
  const modalRef = useRef(null);

  // Lock body scroll and handle Escape for modal
  useEffect(() => {
    if (activeModalProject) {
      document.body.style.overflow = 'hidden';
      if (modalRef.current) {
        modalRef.current.scrollTop = 0;
      }
    } else {
      document.body.style.overflow = '';
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModalProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalProject]);

  // Close lightbox on Escape key and navigate with arrows
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveLightboxIndex(null);
      } else if (e.key === 'ArrowRight' && activeLightboxIndex !== null) {
        setActiveLightboxIndex((prev) => (prev + 1) % lightboxImages.length);
      } else if (e.key === 'ArrowLeft' && activeLightboxIndex !== null) {
        setActiveLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, lightboxImages]);

  const openLightbox = (images, index) => {
    setLightboxImages(images);
    setActiveLightboxIndex(index);
  };

  const handleCopyCommand = (cmd) => {
    navigator.clipboard.writeText(cmd);
    setCopiedInstallCmd(true);
    setTimeout(() => setCopiedInstallCmd(false), 2000);
  };

  const projects = [
    {
      id: "vibe-sinav",
      title: "vibe.Sınav — Offline Assessment & Examination System",
      shortTitle: "vibe.Sınav",
      category: "Educational Examination Platform",
      badge: "Offline & LAN Deployment",
      role: "Platform Architect & Developer",
      environment: "Schools & Computer Labs",
      summary: "A browser-based assessment platform designed for schools and computer labs, supporting offline/LAN deployment, quizzes, typing tests, live proctoring, role-based access, certificates, reports, and anti-cheating telemetry.",
      accentColor: "cyan",
      technologies: [
        { name: "PHP", category: "Backend Engine", desc: "Server-side business logic, session security, test dispatching & evaluation" },
        { name: "MySQL / MariaDB", category: "Relational Database", desc: "Normalized schemas for candidates, questions, proctor logs, and certificates" },
        { name: "JavaScript", category: "Client Engine", desc: "Real-time exam timers, WPM keystroke calculator, and anti-cheating listeners" },
        { name: "Bootstrap", category: "UI Framework", desc: "Responsive, lab-optimized interface accessible across all workstation monitors" },
        { name: "HTML/CSS", category: "Frontend Structure", desc: "Semantic markup, high-contrast layouts, and clean print-ready certificate designs" }
      ],
      features: [
        { title: "Assessment Builder", desc: "Multi-format quiz creator, randomized question pools, configurable time limits & automated scoring." },
        { title: "Typing Tests Engine", desc: "Real-time Words Per Minute (WPM), accuracy percentages, net speed calculations & lab benchmarking." },
        { title: "Live Proctoring", desc: "Real-time supervisor console tracking active student workstation sessions, progress & status." },
        { title: "Anti-Cheating Telemetry", desc: "Fullscreen enforcement, tab-switch / blur tracking, context menu lockdown & infraction logs." },
        { title: "Role-Based Access Control (RBAC)", desc: "Granular multi-tier privilege separation for Super Admins, Instructors, Examiners, and Students." },
        { title: "Offline & LAN Deployment", desc: "Runs 100% locally on campus school intranet (Apache/Nginx) with zero external internet dependencies." },
        { title: "Automated Certificates", desc: "Verifiable achievement & completion certificate generation upon passing scores with unique IDs." },
        { title: "Reports & Analytics", desc: "Comprehensive academic analytics, student score distributions, item difficulty & CSV/PDF exports." }
      ],
      metrics: [
        { label: "Deployment", value: "Offline & LAN" },
        { label: "Test Engines", value: "Quizzes + Typing" },
        { label: "Security", value: "Proctored Telemetry" },
        { label: "Access Tier", value: "Multi-Role RBAC" }
      ],
      github: "https://github.com/allen9650"
    },
    {
      id: "verimoo",
      title: "Verimoo — Certificate Management & Verification System",
      shortTitle: "Verimoo",
      category: "Certificate Management & Verification SaaS",
      badge: "Next.js & MongoDB Platform",
      role: "Full-Stack Software Engineer",
      environment: "Web / Cloud SaaS & API (Live)",
      liveUrl: "https://verimoo-zeta.vercel.app/",
      summary: "A web-based certificate management platform for organizations to create, manage, and verify digital certificates using unique certificate IDs.",
      accentColor: "emerald",
      logo: "/images/verimoo/verimoo-logo.png",
      screenshots: [
        {
          title: "Public Instant Verification Portal",
          src: "/images/verimoo/verimoo-verify-landing.png",
          caption: "Public certificate search allowing employers and institutions to check credentials with a unique serial ID.",
          tag: "Dark Mode UI"
        },
        {
          title: "Superadmin Control Center",
          src: "/images/verimoo/verimoo-admin-dashboard.png",
          caption: "Full management suite displaying total projects, issued certificates count, team members, and organization management.",
          tag: "Admin Dashboard"
        },
        {
          title: "Progressive Web App (PWA) / Android Install",
          src: "/images/verimoo/verimoo-install-pwa.png",
          caption: "Cross-platform mobile & tablet installation modal featuring 1-tap offline verification access.",
          tag: "PWA & Mobile"
        },
        {
          title: "Release Changelogs v1.2.5 (High-Definition Engine)",
          src: "/images/verimoo/verimoo-changelog-modal.png",
          caption: "Architecture notes on 300 DPI dual-format PNG & PDF compilation, Vercel serverless optimization under 1MB, and ~1ms caching.",
          tag: "Engine Changelog"
        }
      ],
      technologies: [
        { name: "Next.js", category: "Full-Stack Framework", desc: "App Router, Server-Side Rendering (SSR), and high-throughput Server Actions" },
        { name: "TypeScript", category: "Type Safety", desc: "Strict end-to-end type safety across schemas, API routes, and client components" },
        { name: "React", category: "Frontend UI", desc: "Modular, declarative component architecture with fast client-side state hydration" },
        { name: "Tailwind CSS", category: "Design System", desc: "Utility-first modern styling with seamless dark/light responsive layout" },
        { name: "Shadcn UI", category: "Component Library", desc: "Accessible, high-craft UI primitives for tables, modals, forms, and dialogs" },
        { name: "Node.js", category: "Runtime", desc: "Asynchronous backend execution and serverless API handlers" },
        { name: "MongoDB", category: "NoSQL Database", desc: "Flexible document model with Mongoose schemas, indexes, and aggregation pipelines" }
      ],
      features: [
        { title: "Certificate Creation & Management", desc: "Complete credential lifecycle from batch generation to issuance, updates, and secure revocation." },
        { title: "Unique Certificate ID Generation", desc: "Algorithmic and cryptographic unique identifier generator ensuring zero collision and tamper-proof verification." },
        { title: "Public Certificate Verification", desc: "Instant public lookup portal where employers and auditors check and validate credentials in seconds." },
        { title: "Admin Dashboard", desc: "Intuitive executive control center for managing organizations, issued credentials, audit trails, and usage metrics." },
        { title: "Digital Certificate Generation", desc: "Pixel-perfect automated certificate rendering engine with dynamic recipient details, dates, and sign-offs." },
        { title: "Downloadable Certificate Output", desc: "High-resolution print-ready PDF and vector downloads with embedded QR codes and validation links." },
        { title: "Certificate Verification API", desc: "Secure RESTful API enabling external LMS, HR portals, and third-party systems to query certificate status." },
        { title: "Organization Branding & Templates", desc: "Customizable visual templates with institutional logos, brand colors, typography, and digital signatures." }
      ],
      metrics: [
        { label: "Verification", value: "Unique ID Lookup" },
        { label: "Architecture", value: "Next.js SSR" },
        { label: "Database", value: "MongoDB Atlas" },
        { label: "Status", value: "Live on Vercel 🌐" }
      ],
      github: "https://github.com/allen9650"
    },
    {
      id: "legal-aid-assistant",
      title: "AI-Powered Legal Aid Assistant",
      shortTitle: "Legal Aid Assistant",
      category: "AI & Legal Tech Platform",
      badge: "Final Year Graduation Capstone",
      role: "Lead Full-Stack Developer & AI Architect",
      collaborator: "with Muhammad Shafiullah",
      institution: "Shah Abdul Latif University (SALU), Khairpur",
      environment: "Web Application / Vercel Cloud (Live)",
      liveUrl: "https://legal-aid-assistant-by-ahsan-and-shafiullah-bn7c.vercel.app/",
      summary: "A web application that provides accessible legal assistance using AI. Enables users to ask legal queries and receive structured guidance based on legal documentation and AI-powered insights across Family, Property, Criminal, and Financial Law.",
      accentColor: "blue",
      screenshots: [
        {
          title: "University Project Exhibition (SALU)",
          src: "/images/legal-aid/legal-aid-exhibition.jpg",
          caption: "Ahsan Raza and Muhammad Shafiullah presenting their Final Year Project at the Shah Abdul Latif University (SALU) Project Exhibition.",
          tag: "SALU Exhibition"
        },
        {
          title: "Start Legal Inquiry Portal",
          src: "/images/legal-aid/legal-aid-landing.png",
          caption: "High-contrast landing interface featuring the justice creed and instant consultation launchpad.",
          tag: "Portal Landing"
        },
        {
          title: "NextAuth.js OAuth & Guest Access",
          src: "/images/legal-aid/legal-aid-auth.png",
          caption: "Seamless authentication modal supporting Google and GitHub OAuth with instant guest trial option.",
          tag: "NextAuth OAuth"
        },
        {
          title: "Legal FAQ & AI Advisory Interface",
          src: "/images/legal-aid/legal-aid-chat.png",
          caption: "Real-time AI query console with categorized legal branches (Family, Property, Criminal, Financial Law) and prompt bar.",
          tag: "AI Legal Query"
        }
      ],
      technologies: [
        { name: "Next.js", category: "Full-Stack Framework", desc: "React Server Components, App Router, and serverless edge functions" },
        { name: "Google Generative AI", category: "AI Engine", desc: "Gemini API integration for deep legal reasoning, citation extraction, and natural language advice" },
        { name: "NextAuth.js", category: "Authentication", desc: "Multi-provider OAuth with Google & GitHub, JWT sessions, and guest mode" },
        { name: "MongoDB & Mongoose", category: "Database", desc: "NoSQL document persistence for user queries, session memory, and legal knowledge bases" },
        { name: "Tailwind CSS", category: "UI Styling", desc: "High-contrast accessible theme customized for legal reading and clarity" },
        { name: "Shadcn & Radix UI", category: "Design System", desc: "High-craft UI primitives for accessible query dialogs, drawers, and form controls" },
        { name: "Node.js & TypeScript", category: "Backend Engine", desc: "Type-safe server actions, prompt chaining, and legal FAQ indexing" }
      ],
      features: [
        { title: "AI-Powered Legal Query Processing", desc: "Instant legal intelligence synthesizing complex legal doctrines into actionable, easy-to-understand advice." },
        { title: "User Authentication via Google/GitHub", desc: "Secure OAuth login using NextAuth.js with encrypted sessions, profile sync, and guest trials." },
        { title: "Categorized Legal FAQ Explorer", desc: "Pre-indexed knowledge bases spanning Family Law, Property Law, Criminal Law, and Financial Law in Pakistan." },
        { title: "Persistent Document Database", desc: "Scalable MongoDB collections storing conversation history, legal citations, and user questions securely." },
        { title: "Responsive Web Interface", desc: "Built with Next.js, Tailwind CSS, Shadcn UI, and Radix UI with seamless mobile and desktop views." },
        { title: "Live Vercel Production Deployment", desc: "Deployed to production on Vercel with high availability, instant global CDN delivery, and edge routing." }
      ],
      installation: {
        command: "git clone https://github.com/yourusername/auth-legal.git && cd auth-legal && npm install && npm run dev",
        envVars: [
          "NEXTAUTH_URL=http://localhost:3000",
          "NEXTAUTH_SECRET=your_secret_key",
          "GOOGLE_CLIENT_ID=your_google_client_id",
          "GOOGLE_CLIENT_SECRET=your_google_client_secret",
          "GITHUB_CLIENT_ID=your_github_client_id",
          "GITHUB_CLIENT_SECRET=your_github_client_secret",
          "MONGODB_URI=your_mongodb_connection_string",
          "API_KEY=your_google_generative_ai_key"
        ],
        prerequisites: "Node.js (>= 18), MongoDB"
      },
      metrics: [
        { label: "AI Engine", value: "Google Gen AI" },
        { label: "Auth Provider", value: "NextAuth OAuth" },
        { label: "Database", value: "MongoDB Atlas" },
        { label: "Status", value: "Live on Vercel 🌐" }
      ],
      github: "https://github.com/allen9650"
    },
    {
      id: "adalynn-chatbot",
      title: "Adalynn Chatbot — Voice Assistant & Speech UI",
      shortTitle: "Adalynn Chatbot",
      category: "AI & Speech Processing",
      badge: "7th Sem CS-PRE-EXPO (SALU 2024)",
      role: "Lead Developer & Speech AI Engineer",
      institution: "Shah Abdul Latif University (SALU), Khairpur",
      event: "SALU CS-PRE-EXPO 2024 (7th Semester — 30th April 2024)",
      environment: "Python Desktop Application",
      summary: "Assigned in the 7th Semester of BS Computer Science at Shah Abdul Latif University (SALU) as a mandatory CS-PRE-EXPO milestone to prototype, test, and master speech processing and applied AI architecture prior to the final graduation capstone. Demonstrates live offline speech recognition with Vosk, text-to-speech with pyttsx3, and dynamic audio wave oscillations in Tkinter.",
      accentColor: "purple",
      technologies: [
        { name: "Python", category: "Core Language", desc: "Main programming language, audio streaming event loops, and logic execution" },
        { name: "Vosk", category: "Speech Recognition", desc: "Lightweight, offline speech-to-text recognition with local acoustic models" },
        { name: "pyttsx3", category: "Speech Synthesis", desc: "Multi-platform offline text-to-speech conversion engine with customizable pitch & rate" },
        { name: "Tkinter", category: "Desktop GUI", desc: "Standard Python interface framework rendering the interactive assistant window" },
        { name: "Matplotlib", category: "Data Visualization", desc: "Real-time audio waveform oscillation plotting and animation canvas" },
        { name: "NumPy", category: "Numerical Math", desc: "Fast numerical array transformations for audio signal frequency processing" },
        { name: "PyAudio", category: "Audio Input Stream", desc: "PortAudio bindings capturing live 16kHz microphone audio chunks" },
        { name: "webbrowser", category: "Standard Library", desc: "Automated browser dispatcher opening requested websites and queries" }
      ],
      features: [
        { title: "7th Sem CS-PRE-EXPO Demo", desc: "Demonstrated live with audio capture equipment at the SALU CS-PRE-EXPO 2024 on 30th April 2024." },
        { title: "Voice Recognition using Vosk", desc: "High-accuracy offline speech parsing with zero cloud dependency and low resource footprint." },
        { title: "Text-to-Speech using pyttsx3", desc: "Natural voice synthesized auditory responses answering user commands and system feedback." },
        { title: "Graphical Voice Animation", desc: "Dynamic graphical wave visualization built using Matplotlib canvas embedded in a Tkinter GUI." },
        { title: "Voice Command Processing", desc: "Executes voice commands to open websites (Google, YouTube, GitHub), launch apps, and report status." },
        { title: "PyAudio Audio Capture", desc: "Real-time microphone stream listener buffering raw audio data for acoustic model tokenization." }
      ],
      screenshots: [
        {
          title: "SALU CS-PRE-EXPO 2024 (7th Semester Presentation)",
          src: "/images/adalynn/adalynn-pre-expo.jpg",
          tag: "7th Sem Expo Booth",
          aspect: "aspect-[3/4]",
          caption: "Ahsan Raza (right) and project teammate presenting Adalynn Chatbot live with audio microphone equipment at the Shah Abdul Latif University (SALU) 7th Semester CS-PRE-EXPO on 30th April 2024."
        }
      ],
      installation: {
        command: "pip install numpy matplotlib vosk pyaudio pyttsx3",
        libraries: [
          { name: "NumPy", desc: "For numerical operations and audio buffer array transformations" },
          { name: "Matplotlib", desc: "For plotting real-time voice waveform animations" },
          { name: "Tkinter", desc: "Standard Python library for the desktop graphical user interface" },
          { name: "Vosk", desc: "For lightweight offline speech recognition" },
          { name: "PyAudio", desc: "For capturing microphone audio input stream" },
          { name: "pyttsx3", desc: "For text-to-speech conversion" },
          { name: "webbrowser", desc: "For opening URLs in default web browser (Python standard library)" },
          { name: "json", desc: "For processing JSON data from Vosk engine (Python standard library)" }
        ]
      },
      note: "Assigned in the 7th Semester of BS Computer Science at Shah Abdul Latif University (SALU) as a mandatory CS-PRE-EXPO milestone (held 30th April 2024) to prototype, test, and master speech processing and applied AI architecture prior to the final graduation capstone expo.",
      metrics: [
        { label: "Academic Term", value: "7th Semester" },
        { label: "Event", value: "CS-PRE-EXPO '24" },
        { label: "Speech Engine", value: "Vosk (Offline)" },
        { label: "Voice Output", value: "pyttsx3 Audio" }
      ],
      github: "https://github.com/allen9650"
    },
    {
      id: "markaan",
      title: "Markaan — Bulk Photo Watermarking Desktop & Web Application",
      shortTitle: "Markaan",
      category: "Desktop & Batch Image Processing Tool",
      badge: "Next.js & Sharp Engine",
      role: "Creator & Full-Stack Developer",
      environment: "Local Desktop Web App (Node.js & Sharp)",
      summary: "A 100% private desktop web application designed to watermark hundreds of high-resolution photos in seconds directly on your PC with zero cloud uploads, no subscriptions, live canvas positioning, and instant ZIP downloads.",
      accentColor: "amber",
      technologies: [
        { name: "Next.js", category: "Full-Stack Framework", desc: "React App Router with server-side API routes and static asset optimization" },
        { name: "Sharp", category: "Image Processing Engine", desc: "High-performance native C++ image processing library powered by libvips" },
        { name: "React", category: "Interactive UI", desc: "Real-time canvas preview, drag-and-drop batch dropzone, and responsive layout" },
        { name: "Node.js", category: "Local Server Runtime", desc: "Local asynchronous file streaming, multi-core worker threads, and memory management" },
        { name: "Tailwind CSS", category: "Design System", desc: "Utility-first modern interface with crisp dark/light responsive layout" },
        { name: "Radix UI", category: "Component Primitives", desc: "Accessible slider, dialog, and switch controls for fine-tuned watermark adjustments" },
        { name: "Archiver / ZIP", category: "Archive Streamer", desc: "High-speed streaming ZIP packaging bundling hundreds of outputs directly to disk" }
      ],
      features: [
        { title: "100% Private On-Device Processing", desc: "Photos never leave your computer. No third-party cloud servers, zero security compromises for event/student photos." },
        { title: "High-Throughput Batch Engine", desc: "Watermark 10, 50, 100, or 500+ photos in seconds using multi-threaded CPU image pipeline." },
        { title: "Live Real-Time Visual Preview", desc: "Interactive positioning, logo scaling, opacity sliders (0-100%), and rotation with immediate canvas rendering." },
        { title: "Zero Compression Loss", desc: "Preserves high-resolution source quality, original color profiles, and camera metadata without degradation." },
        { title: "Automated ZIP Export", desc: "One-click batch processing packages all finished images into a clean, ready-to-share ZIP file." },
        { title: "1-Click Windows Launcher", desc: "Start-Markaan.bat script automatically verifies Node.js, installs prerequisites, and opens localhost:3000." },
        { title: "Flexible Watermark Placement", desc: "Nine preset quadrant anchors plus custom pixel offsets for exact logo positioning." },
        { title: "Multi-Format Support", desc: "Flawless batch handling across JPEG, PNG, WebP, and common camera raster formats." }
      ],
      installation: {
        command: "git clone https://github.com/allen9650/markaan.git && cd markaan && npm install && npm run dev",
        quickLaunch: "Or double-click 'Start-Markaan.bat' in the project directory for 1-click launch on Windows",
        prerequisites: "Node.js (LTS >= 18.x)"
      },
      metrics: [
        { label: "Privacy Tier", value: "100% Local" },
        { label: "Throughput", value: "500+ Batch" },
        { label: "Engine", value: "Sharp / C++" },
        { label: "Output", value: "Lossless ZIP" }
      ],
      github: "https://github.com/allen9650/markaan"
    }
  ];

  const categories = ['All', 'Offline & LAN Systems', 'Desktop & Creative Tools', 'Cloud & SaaS Platforms', 'AI & Legal Tech', 'University Capstones'];

  const filteredProjects = projects.filter(p => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Offline & LAN Systems') return p.id === 'vibe-sinav';
    if (selectedCategory === 'Desktop & Creative Tools') return p.id === 'markaan';
    if (selectedCategory === 'Cloud & SaaS Platforms') return p.id === 'verimoo';
    if (selectedCategory === 'AI & Legal Tech') return p.id === 'legal-aid-assistant';
    if (selectedCategory === 'University Capstones') return p.id === 'legal-aid-assistant' || p.id === 'adalynn-chatbot';
    return true;
  });

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 animate-fade-in-up">
      {/* 1. Header */}
      <div className="flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-400 text-xs font-mono mb-3">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>04. SOFTWARE PLATFORMS & PORTFOLIO</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Featured Software Platforms
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
          Real-world applications and engineering systems built by Ahsan Raza — spanning campus examination networks, cloud verification SaaS, desktop utilities, and university AI capstone projects.
        </p>
      </div>

      {/* 2. Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => {
          const count = cat === 'All' 
            ? projects.length 
            : projects.filter(p => {
                if (cat === 'Offline & LAN Systems') return p.id === 'vibe-sinav';
                if (cat === 'Desktop & Creative Tools') return p.id === 'markaan';
                if (cat === 'Cloud & SaaS Platforms') return p.id === 'verimoo';
                if (cat === 'AI & Legal Tech') return p.id === 'legal-aid-assistant';
                if (cat === 'University Capstones') return p.id === 'legal-aid-assistant' || p.id === 'adalynn-chatbot';
                return false;
              }).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-white dark:bg-neutral-950/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 shadow-2xs'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* 3. Featured Showcase Grid */}
      <div className="space-y-14">
        {filteredProjects.map((proj) => {
          const isCyan = proj.accentColor === 'cyan';
          const isEmerald = proj.accentColor === 'emerald';
          const isBlue = proj.accentColor === 'blue';
          const isPurple = proj.accentColor === 'purple';
          const isAmber = proj.accentColor === 'amber';

          return (
            <div
              key={proj.id}
              className="relative rounded-3xl bg-white/95 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 shadow-xl overflow-hidden p-6 sm:p-10 space-y-8 transition-all hover:border-slate-300 dark:hover:border-neutral-700"
            >
              {/* Background ambient glow */}
              <div 
                className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
                  isCyan 
                    ? 'bg-gradient-to-bl from-cyan-500/10 via-blue-500/5 to-transparent' 
                    : isEmerald
                    ? 'bg-gradient-to-bl from-emerald-500/10 via-teal-500/5 to-transparent'
                    : isBlue
                    ? 'bg-gradient-to-bl from-blue-500/15 via-indigo-500/5 to-transparent'
                    : isAmber
                    ? 'bg-gradient-to-bl from-amber-500/15 via-orange-500/5 to-transparent'
                    : 'bg-gradient-to-bl from-purple-500/10 via-indigo-500/5 to-transparent'
                }`} 
              />

              {/* Top Badges & Meta */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-neutral-800/80 pb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                    isCyan 
                      ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30' 
                      : isEmerald
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                      : isBlue
                      ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30'
                      : isAmber
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                      : 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30'
                  }`}>
                    {proj.badge}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-neutral-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-neutral-800 text-xs font-mono">
                    {proj.environment}
                  </span>
                  {proj.collaborator && (
                    <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-neutral-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-neutral-800 text-xs font-mono">
                      {proj.collaborator}
                    </span>
                  )}
                </div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  Role: <strong className="text-slate-900 dark:text-slate-200">{proj.role}</strong>
                </span>
              </div>

              {/* Title & Core Summary with optional Logo / Icon */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                {proj.logo ? (
                  <div className="relative shrink-0">
                    <img 
                      src={proj.logo} 
                      alt={`${proj.shortTitle} Logo`} 
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-contain bg-white dark:bg-black p-2 border border-slate-200 dark:border-neutral-800 shadow-md shadow-emerald-500/10"
                    />
                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white dark:border-black" />
                    </span>
                  </div>
                ) : isBlue ? (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 shadow-md shadow-blue-500/10">
                    <Scale className="w-8 h-8" />
                  </div>
                ) : isPurple ? (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0 shadow-md shadow-purple-500/10">
                    <Mic className="w-8 h-8" />
                  </div>
                ) : isAmber ? (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 shadow-md shadow-amber-500/10">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                ) : null}

                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                    <span>{proj.title}</span>
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
                    {proj.summary}
                  </p>
                </div>
              </div>

              {/* Quick Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                {proj.metrics.map((m, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 text-center">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase font-medium">{m.label}</span>
                    <span className={`text-xs sm:text-sm font-bold mt-0.5 block ${
                      isCyan ? 'text-cyan-600 dark:text-cyan-400' 
                      : isEmerald ? 'text-emerald-600 dark:text-emerald-400' 
                      : isBlue ? 'text-blue-600 dark:text-blue-400'
                      : isAmber ? 'text-amber-600 dark:text-amber-400'
                      : 'text-purple-600 dark:text-purple-400'
                    }`}>
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Screenshots Gallery Section (If Available) */}
              {proj.screenshots && (
                <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-neutral-800/80">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-2">
                      <ImageIcon className={`w-4 h-4 ${isBlue ? 'text-blue-500' : isPurple ? 'text-purple-500' : 'text-emerald-500'}`} />
                      <span>{proj.id === 'adalynn-chatbot' ? 'University Presentation & Live Demo' : 'Production Interface & Live Screenshots'} ({proj.screenshots.length} {proj.screenshots.length === 1 ? 'View' : 'Views'})</span>
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                      Click preview to inspect high-resolution
                    </span>
                  </div>

                  <div className={`grid grid-cols-1 ${proj.screenshots.length === 1 ? 'sm:grid-cols-2 lg:grid-cols-3 max-w-xl' : 'sm:grid-cols-2 lg:grid-cols-4'} gap-4`}>
                    {proj.screenshots.map((screen, sIdx) => (
                      <div
                        key={sIdx}
                        onClick={() => openLightbox(proj.screenshots, sIdx)}
                        className="group/img relative rounded-2xl overflow-hidden border border-slate-200 dark:border-neutral-800 bg-slate-100 dark:bg-black cursor-pointer shadow-sm hover:border-cyan-500/50 hover:shadow-lg transition-all"
                      >
                        <div className={`${screen.aspect || 'aspect-video'} w-full overflow-hidden bg-slate-950 flex items-center justify-center`}>
                          <img 
                            src={screen.src} 
                            alt={screen.title}
                            className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white">
                          <Maximize2 className="w-5 h-5 text-cyan-400" />
                          <span className="text-xs font-medium font-mono">View Fullscreen</span>
                        </div>

                        {/* Caption Card */}
                        <div className="p-3 bg-white/95 dark:bg-neutral-900 border-t border-slate-200 dark:border-neutral-800">
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {screen.title}
                            </span>
                            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border shrink-0 ${
                              isBlue 
                                ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
                                : isPurple
                                ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
                                : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                            }`}>
                              {screen.tag}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {screen.caption}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Features Grid */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>Key Features & Functional Highlights</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {proj.features.map((feat, fIdx) => (
                    <div 
                      key={fIdx} 
                      className="p-4 rounded-2xl bg-slate-50/70 dark:bg-black/60 border border-slate-200 dark:border-neutral-800/80 space-y-1.5 hover:border-slate-300 dark:hover:border-neutral-700 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${
                          isCyan ? 'text-cyan-600 dark:text-cyan-400' 
                          : isEmerald ? 'text-emerald-600 dark:text-emerald-400' 
                          : isBlue ? 'text-blue-600 dark:text-blue-400'
                          : isAmber ? 'text-amber-600 dark:text-amber-400'
                          : 'text-purple-600 dark:text-purple-400'
                        }`} />
                        <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                          {feat.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal pl-5">
                        {feat.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>Technologies & Architecture</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {proj.technologies.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-800 dark:text-slate-200 text-xs font-mono font-semibold flex items-center gap-2"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        isCyan ? 'bg-cyan-500' 
                        : isEmerald ? 'bg-emerald-500' 
                        : isBlue ? 'bg-blue-500'
                        : isAmber ? 'bg-amber-500'
                        : 'bg-purple-500'
                      }`} />
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200 dark:border-neutral-800">
                <button
                  onClick={() => setActiveModalProject(proj)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all hover:scale-105 cursor-pointer ${
                    isCyan
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                      : isEmerald
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                      : isBlue
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]'
                      : isAmber
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                      : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>Inspect Architecture & Details</span>
                </button>

                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-500/40 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Try Live App 🌐</span>
                  </a>
                )}

                {proj.id === 'markaan' && (
                  <button
                    onClick={() => setActiveModalProject(proj)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-500/40 text-amber-700 dark:text-amber-300 text-xs sm:text-sm font-semibold hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors cursor-pointer"
                  >
                    <Terminal className="w-4 h-4" />
                    <span>View Launcher & Setup</span>
                  </button>
                )}

                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-neutral-700 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Repository</span>
                </a>

                {proj.id === 'adalynn-chatbot' ? (
                  <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400 ml-auto flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" />
                    <span>7th Sem CS-PRE-EXPO</span>
                  </span>
                ) : proj.id === 'legal-aid-assistant' ? (
                  <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 ml-auto flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" />
                    <span>SALU Capstone Project</span>
                  </span>
                ) : (
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-mono ml-auto transition-colors"
                  >
                    <span>Inquire Deployment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Deep Architecture Modal */}
      {activeModalProject && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveModalProject(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 dark:bg-black/85 backdrop-blur-md animate-in fade-in"
        >
          <div 
            ref={modalRef}
            className="relative w-full max-w-5xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 max-h-[88vh] overflow-y-auto"
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-neutral-800">
              <div className="flex items-center gap-3 min-w-0">
                {activeModalProject.logo ? (
                  <img 
                    src={activeModalProject.logo} 
                    alt="Logo" 
                    className="w-10 h-10 rounded-xl object-contain bg-slate-100 dark:bg-black p-1 border border-slate-200 dark:border-neutral-800 shadow-sm shrink-0"
                  />
                ) : activeModalProject.id === 'legal-aid-assistant' ? (
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                    <Scale className="w-5 h-5" />
                  </div>
                ) : activeModalProject.id === 'adalynn-chatbot' ? (
                  <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                    <Mic className="w-5 h-5" />
                  </div>
                ) : activeModalProject.id === 'markaan' ? (
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                ) : null}

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
                      {activeModalProject.title}
                    </h2>
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded border font-semibold shrink-0 ${
                      activeModalProject.accentColor === 'cyan'
                        ? 'bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 border-cyan-200 dark:border-cyan-500/30'
                        : activeModalProject.accentColor === 'emerald'
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30'
                        : activeModalProject.accentColor === 'blue'
                        ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/30'
                        : activeModalProject.accentColor === 'amber'
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30'
                        : 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-500/30'
                    }`}>
                      {activeModalProject.badge}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden md:inline">
                      • {activeModalProject.environment}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-mono truncate">
                    Role: <strong className="text-slate-800 dark:text-slate-200">{activeModalProject.role}</strong> {activeModalProject.collaborator && `• ${activeModalProject.collaborator}`}
                  </p>
                </div>
              </div>

              {/* Header Right Actions & Close */}
              <div className="flex items-center gap-2 shrink-0">
                {activeModalProject.liveUrl && (
                  <a
                    href={activeModalProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}
                {activeModalProject.github && (
                  <a
                    href={activeModalProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:text-white transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Repo</span>
                  </a>
                )}
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="p-1.5 rounded-full bg-slate-100 dark:bg-neutral-900 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-neutral-800 transition-all cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Project Specific Architecture Breakdown */}
            {activeModalProject.id === 'vibe-sinav' ? (
              <>
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-rose-500" />
                    <span>Anti-Cheating Telemetry & Proctoring Engine</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 space-y-1">
                      <strong className="text-slate-900 dark:text-white block">Fullscreen Enforcement</strong>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">Tracks HTML5 Fullscreen API exits. Automatically prompts warnings and records infractions to proctor log.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 space-y-1">
                      <strong className="text-slate-900 dark:text-white block">Tab-Switch & Blur Detection</strong>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">Listens to visibilitychange and window.blur events when a student attempts to switch tabs or applications.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 space-y-1">
                      <strong className="text-slate-900 dark:text-white block">Clipboard Restrictions</strong>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">Disables right-click context menus, copy-paste shortcuts (Ctrl+C, Ctrl+V), and text selection during exams.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 space-y-1">
                      <strong className="text-slate-900 dark:text-white block">Live Heartbeat Telemetry</strong>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">Workstations broadcast 5-second asynchronous heartbeats updating question index and time remaining to supervisor board.</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-xs">
                    <WifiOff className="w-3.5 h-3.5 text-amber-500" />
                    <span>Campus LAN & Offline Execution Model</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Runs on a local campus host with Apache/Nginx & MySQL/MariaDB bound to a static subnet IP (e.g. <code>http://sinav.local</code>). Zero external CDN dependencies, high-concurrency session handler optimized for 100+ simultaneous laboratory workstations.
                  </p>
                </div>
              </>
            ) : activeModalProject.id === 'markaan' ? (
              <>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-amber-500" />
                      <span>Sharp Image Engine & Architecture Deep-Dive</span>
                    </h4>
                    <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      100% Private On-Device Execution
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 space-y-1">
                      <strong className="text-slate-900 dark:text-white block">Native C++ Sharp Engine</strong>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">Employs native multithreaded libvips bindings via Node.js Sharp to batch process 500+ photos in seconds without blocking event threads.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 space-y-1">
                      <strong className="text-slate-900 dark:text-white block">Positioning Canvas</strong>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">Interactive live positioning canvas with 9 cardinal anchor presets, fine pixel coordinate offsets, and 0-100% opacity sliders.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 space-y-1">
                      <strong className="text-slate-900 dark:text-white block">Lossless Quality Retention</strong>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">Preserves original image dimensions, DPI metadata, and sRGB/P3 color gamuts across JPEG, PNG, and WebP raster formats.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 space-y-1">
                      <strong className="text-slate-900 dark:text-white block">Streaming ZIP Archiver</strong>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">Pipes memory buffers directly into continuous compression streams via <code>archiver</code>, enabling instant packaging and download.</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-amber-500" />
                      <span>Desktop Setup & Windows Launcher: Start-Markaan.bat</span>
                    </span>
                    <a href={activeModalProject.github} target="_blank" rel="noopener noreferrer" className="text-[11px] text-cyan-600 dark:text-cyan-400 font-mono underline">
                      GitHub Repository
                    </a>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    <code>git clone https://github.com/allen9650/markaan.git && cd markaan && npm install && npm run dev</code>
                  </p>
                </div>
              </>
            ) : activeModalProject.id === 'verimoo' ? (
              <>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-2">
                      <QrCode className="w-4 h-4 text-emerald-500" />
                      <span>Verification & Unique ID Generation Engine</span>
                    </h4>
                    <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Live Production SaaS
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 space-y-1">
                      <strong className="text-slate-900 dark:text-white block">Unique Serial Engine</strong>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">Generates tamper-resistant, collision-free alphanumeric serials indexed in MongoDB for sub-millisecond retrieval.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 space-y-1">
                      <strong className="text-slate-900 dark:text-white block">Public Verification Portal</strong>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">Public lookup portal where employers and auditors check and validate credentials instantly by serial ID.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 space-y-1">
                      <strong className="text-slate-900 dark:text-white block">RESTful Verification API</strong>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">Programmatic JSON endpoint enabling external HR systems and LMS portals to query validity programmatically.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 space-y-1">
                      <strong className="text-slate-900 dark:text-white block">Brand Customization</strong>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">Custom templates supporting organization logos, authorized signatures, seals, and typography.</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-xs">
                    <Database className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Next.js App Router & Serverless Optimizations</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Dual-format (PNG & PDF) 300 DPI engine with zero-dependency <code>pdf-lib</code>, Vercel 4.5MB serverless payload optimization (&lt;1MB), MongoDB indexed serial lookups, and multi-tier in-memory caching (~1ms).
                  </p>
                </div>
              </>
            ) : activeModalProject.id === 'legal-aid-assistant' ? (
              <>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-2">
                      <Scale className="w-4 h-4 text-blue-500" />
                      <span>AI Legal Assistant Architecture</span>
                    </h4>
                    <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                      SALU Graduation Capstone
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 space-y-1">
                      <strong className="text-slate-900 dark:text-white block">Google Gemini LLM</strong>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">Prompt engineering tailored for legal document synthesis, cross-referencing statutory clauses, and advice.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 space-y-1">
                      <strong className="text-slate-900 dark:text-white block">NextAuth.js OAuth</strong>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">Multi-provider OAuth with Google and GitHub, encrypted JWT tokens, and anonymous guest trial access.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 space-y-1">
                      <strong className="text-slate-900 dark:text-white block">Legal Knowledge Base</strong>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">Pre-built query trees and legal FAQs across Family Law, Property Disputes, Criminal, and Financial Law.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 space-y-1">
                      <strong className="text-slate-900 dark:text-white block">MongoDB Persistence</strong>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">Mongoose schemas storing user profiles, chat query history, audit trails, and legal FAQ documents.</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-blue-500" />
                      <span>Exhibition Capstone Project with Muhammad Shafiullah</span>
                    </span>
                    {activeModalProject.liveUrl && (
                      <a href={activeModalProject.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] text-blue-600 dark:text-blue-400 font-mono underline">
                        Open Vercel App
                      </a>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Presented and demonstrated at Shah Abdul Latif University (SALU) Project Exhibition. Features responsive UI built with Next.js, Tailwind CSS, and Shadcn UI.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-2">
                      <Mic className="w-4 h-4 text-purple-500" />
                      <span>Offline Speech AI Pipeline Architecture</span>
                    </h4>
                    <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                      7th Sem CS-PRE-EXPO Milestone
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 space-y-1">
                      <strong className="text-purple-600 dark:text-purple-400 block">PyAudio (16kHz)</strong>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">Streams microphone input asynchronously at 16,000 Hz with zero cloud latency.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 space-y-1">
                      <strong className="text-purple-600 dark:text-purple-400 block">Vosk Acoustic Model</strong>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">Offline speech-to-text recognition running 100% locally on CPU without internet.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 space-y-1">
                      <strong className="text-purple-600 dark:text-purple-400 block">pyttsx3 Voice Engine</strong>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">Native multi-platform speech synthesis converting recognized intents to audio.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 space-y-1">
                      <strong className="text-purple-600 dark:text-purple-400 block">Tkinter & Matplotlib</strong>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">Live visual audio wave canvas animating vocal pitch during assistant speech.</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-purple-500" />
                      <span>Python Dependencies & Pipeline Runbook</span>
                    </span>
                    <button
                      onClick={() => handleCopyCommand(activeModalProject.installation?.command || 'pip install vosk pyaudio pyttsx3')}
                      className="inline-flex items-center gap-1 text-[11px] text-purple-600 dark:text-purple-400 font-mono hover:underline cursor-pointer"
                    >
                      {copiedInstallCmd ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedInstallCmd ? 'Copied' : 'Copy pip command'}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    <code>{activeModalProject.installation?.command || 'pip install vosk pyaudio pyttsx3'}</code>
                  </p>
                </div>
              </>
            )}

            {/* Technologies Pills */}
            <div className="space-y-1.5 pt-1">
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">
                Technologies & Tools
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeModalProject.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-slate-300"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200 dark:border-neutral-800">
              <button
                onClick={() => setActiveModalProject(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-neutral-900 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Close
              </button>
              {activeModalProject.liveUrl && (
                <a
                  href={activeModalProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors inline-flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Launch Live Platform</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. Fullscreen Lightbox Modal */}
      {activeLightboxIndex !== null && lightboxImages[activeLightboxIndex] && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in"
          onClick={() => setActiveLightboxIndex(null)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[95vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Controls */}
            <div className="w-full flex items-center justify-between text-white pb-3 px-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 rounded">
                  {activeLightboxIndex + 1} / {lightboxImages.length}
                </span>
                <span className="text-sm font-semibold text-slate-200 truncate">
                  {lightboxImages[activeLightboxIndex].title}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length)}
                  className="p-2 rounded-full bg-neutral-900 text-slate-300 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                  title="Previous image (Left Arrow)"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveLightboxIndex((prev) => (prev + 1) % lightboxImages.length)}
                  className="p-2 rounded-full bg-neutral-900 text-slate-300 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                  title="Next image (Right Arrow)"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveLightboxIndex(null)}
                  className="p-2 rounded-full bg-neutral-900 text-slate-300 hover:text-white hover:bg-rose-900 transition-colors cursor-pointer ml-2"
                  title="Close (Escape)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Lightbox Image */}
            <div className="relative w-full max-h-[78vh] flex items-center justify-center rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl">
              <img 
                src={lightboxImages[activeLightboxIndex].src} 
                alt={lightboxImages[activeLightboxIndex].title}
                className="max-w-full max-h-[78vh] object-contain"
              />
            </div>

            {/* Lightbox Caption */}
            <div className="w-full text-center pt-3 px-4">
              <p className="text-xs sm:text-sm text-slate-300 font-mono">
                {lightboxImages[activeLightboxIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 6. Bottom Call to Action */}
      <div className="p-8 rounded-3xl bg-white/90 dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800 text-center space-y-4 shadow-sm dark:shadow-none">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Need custom software or campus platforms built?</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Ahsan specializes in designing resilient software architectures — from offline, high-security examination networks to cloud-native verification and AI advisory platforms.
        </p>
        <div className="pt-2">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-105"
          >
            <span>Start a Software Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
