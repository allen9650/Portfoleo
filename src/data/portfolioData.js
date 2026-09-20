export const personalInfo = {
  name: "Ahsan Raza",
  photo: "/images/profile/ahsan-profile.jpg",
  title: "IT & Network Support | IT Operations | Systems Support | Networking | Cybersecurity Student | AI",
  roles: [
    "IT & Network Support",
    "IT Operations",
    "Systems Support",
    "Networking",
    "Cybersecurity Student",
    "AI & Automation"
  ],
  bio: "Computer Science graduate with extensive hands-on experience in enterprise IT infrastructure, high-density network engineering, firewall defense, and modern web systems. Proven record of orchestrating multi-campus LAN/WAN systems, mentoring over 500+ aspiring tech minds, and building robust, secure digital solutions.",
  location: "Sindh, Pakistan",
  email: "arkolachi190@gmail.com",
  secondaryEmail: "arkolachi190@gmail.com",
  linkedin: "https://www.linkedin.com/in/ahsan-raza8hbb",
  github: "https://github.com/ahsanraza-tech",
  medium: "https://medium.com/@ahsan-raza8hbb",
  education: {
    degree: "Bachelor of Science - BS, Computer Science",
    institution: "Shah Abdul Latif University (SALU), Khairpur",
    period: "February 2021 - February 2025",
    details: "Comprehensive coursework in Computer Networks, Cyber Threat Analysis, Database Systems (Oracle), Operating Systems, Software Architecture, and Artificial Intelligence."
  },
  stats: [
    { label: "Years Experience", value: "4+", detail: "In instructing, IT, systems & networking" },
    { label: "Students Mentored", value: "500+", detail: "ICT, fundamentals of IT, networking, system design, how to code" },
    { label: "Network Uptime", value: "90.2%", detail: "Across campus infrastructure" },
    { label: "Client Satisfaction", value: "4.5 ★", detail: "Global freelance software delivery" }
  ]
};

export const experiences = [
  {
    id: "pakturk",
    role: "Information Technology Officer",
    company: "Pak-Turk Maarif International Schools and Colleges",
    location: "Khairpur District, Sindh",
    period: "September 2025 - Present",
    tag: "Current Role",
    color: "cyan",
    summary: "Spearheading entire campus IT infrastructure to ensure 24/7 high-reliability network and system operations for academic and administrative ecosystems.",
    keyResponsibilities: [
      "Configuring, monitoring, and troubleshooting enterprise-level LAN/WAN networks, routers, managed switches, and high-density wireless access points (APs).",
      "Deploying, hardening, and maintaining campus IP camera CCTV surveillance matrix with secure remote monitoring.",
      "Managing biometric attendance terminals, network printer fleets, workstations, and specialized IT peripherals.",
      "Providing rapid L1 & L2 technical diagnostics and resolution for 100+ faculty and staff members.",
      "Performing systematic routine hardware/software maintenance, asset inventory tracking, disaster recovery, and executive technical documentation."
    ],
    technologies: ["Cisco Routers", "Managed Switches", "Enterprise Wi-Fi APs", "IP CCTV Surveillance", "Biometric SDK", "Windows Server", "Structured Cabling", "VLSM Subnetting"]
  },
  {
    id: "freelance",
    role: "Software Engineer",
    company: "Freelance",
    location: "Global / Remote",
    period: "July 2023 - Present",
    tag: "3+ Years",
    color: "emerald",
    summary: "Delivering custom full-stack web applications, Next.js portals, MongoDB databases, and technical consulting to international clients with top-tier ratings.",
    keyResponsibilities: [
      "Architecting responsive web applications with modern frontend frameworks and robust backend integrations.",
      "Developing custom automation scripts for data migration, system optimization, and API orchestration.",
      "Consulting on website security hardening, performance tuning, and cross-browser reliability.",
      "Maintaining 100% on-time project milestones and transparent client communication."
    ],
    technologies: ["Next.js", "MongoDB", "React", "Node.js", "JavaScript (ES6+)", "Tailwind CSS", "REST APIs", "Git", "Security Auditing"]
  },
  {
    id: "microsoft-khp",
    role: "IT Instructor & Support Technician",
    company: "Microsoft Institute KHP",
    location: "Khairpur District, Sindh",
    period: "November 2021 - August 2025",
    tag: "3 Years 10 Months",
    color: "purple",
    summary: "Educated students in core computing disciplines while concurrently maintaining the institute's network hardware, structured cabling, and computer labs.",
    keyResponsibilities: [
      "Instructed programming courses, networking preliminaries, IT essentials, system design, Oracle DB, and ICT.",
      "Demystified complex networking theories like the 7-Layer OSI Model and IP Subnetting using practical, real-world packet labs.",
      "Mentored hundreds of students on capstone development projects, logic building, and hands-on hardware diagnostics.",
      "Engineered institute Wi-Fi expansion using multi-access point topologies and unmanaged/managed switches.",
      "Carried out CAT5e/CAT6 structured network cabling, RJ45 terminations, patch panel management, and connectivity diagnostics."
    ],
    technologies: ["OSI Model", "IPv4 Subnetting", "Oracle Database", "CAT6 Structured Cabling", "Hardware Diagnostics", "Windows/Linux OS", "Lesson Planning"]
  }
];

export const skillsCategories = [
  {
    title: "Networking & Infrastructure",
    icon: "Network",
    color: "cyan",
    skills: [
      { name: "LAN / WAN Architecture", level: 95 },
      { name: "IP Addressing & Subnetting", level: 98 },
      { name: "OSI Model & Routing Protocols", level: 92 },
      { name: "Routers & Managed Switches", level: 90 },
      { name: "Wireless APs & Mesh Coverage", level: 92 },
      { name: "CAT5e / CAT6 Structured Cabling", level: 95 },
      { name: "VLANs & Traffic Segmentation (Currently Learning)", level: 50 },
      { name: "DNS, DHCP & Gateway Config", level: 90 }
    ]
  },
  {
    title: "Cybersecurity & Defense",
    icon: "ShieldCheck",
    color: "emerald",
    skills: [
      { name: "Cyber Threat Management", level: 90 },
      { name: "Firewall Deployment & Rules", level: 88 },
      { name: "Vulnerability Scanning & Hardening", level: 85 },
      { name: "Network Access Control (NAC)", level: 86 },
      { name: "Incident Diagnostics & Log Audit", level: 88 },
      { name: "Endpoint Security & Antivirus", level: 92 }
    ]
  },
  {
    title: "IT Support & Systems",
    icon: "Cpu",
    color: "blue",
    skills: [
      { name: "L1 & L2 Technical Support", level: 96 },
      { name: "Biometric Attendance Systems", level: 92 },
      { name: "IP CCTV Surveillance Setup", level: 90 },
      { name: "Hardware Repair & Diagnostics", level: 94 },
      { name: "Peripheral & Network Printing", level: 92 },
      { name: "IT Asset & Inventory Management", level: 90 }
    ]
  },
  {
    title: "AI, Software & Database",
    icon: "Code2",
    color: "purple",
    skills: [
      { name: "Next.js & Modern SSR", level: 90 },
      { name: "MongoDB & NoSQL Databases", level: 88 },
      { name: "Web Development (React / JS)", level: 92 },
      { name: "Google Prompting Essentials", level: 95 },
      { name: "Oracle Database & SQL", level: 85 },
      { name: "Tailwind CSS & Responsive UI", level: 92 },
      { name: "Elements of AI & Automation", level: 88 },
      { name: "Git & Version Control", level: 86 }
    ]
  }
];

export const certifications = [
  {
    title: "Google Prompting Essentials",
    issuer: "Google",
    date: "Verified Credential",
    badge: "AI Mastery",
    icon: "Sparkles",
    description: "Expert techniques in generative AI prompt engineering, iterative prompt refinement, automated workflows, and complex task chaining.",
    skillsLearned: ["System Prompts", "Zero/Few-Shot Reasoning", "AI Workflow Automation"]
  },
  {
    title: "Cyber Threat Management",
    issuer: "VU - ITU - Digital Training Center (DTC)",
    date: "Verified Certification",
    badge: "Security Defense",
    icon: "ShieldAlert",
    description: "Deep examination of cyber threat vectors, malware mitigation, defense-in-depth architecture, packet sniffers, and incident response.",
    skillsLearned: ["Threat Hunting", "Firewall Analysis", "Incident Response", "Vulnerability Remediation"]
  },
  {
    title: "Technical Domain: Web Development Training",
    issuer: "Authorized Technical Directorate",
    date: "Professional Credential",
    badge: "Full-Stack Web",
    icon: "Globe",
    description: "Modern web architecture, frontend component engineering, asynchronous APIs, responsive design, and production deployment.",
    skillsLearned: ["HTML5/CSS3/JavaScript", "Single Page Applications", "Web Security"]
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Accredited Security Academy",
    date: "Certified Specialist",
    badge: "Cyber Fundamentals",
    icon: "Lock",
    description: "Core principles of confidentiality, integrity, availability (CIA triad), cryptography basics, social engineering defense, and data protection.",
    skillsLearned: ["CIA Triad", "Network Hardening", "Access Control Lists"]
  },
  {
    title: "Elements of AI",
    issuer: "University of Helsinki & Reaktor",
    date: "AI Accreditation",
    badge: "Machine Intelligence",
    icon: "Cpu",
    description: "Foundations of modern AI, neural networks, machine learning paradigms, probabilistic reasoning, and ethical AI deployment.",
    skillsLearned: ["Machine Learning Basics", "Neural Networks", "Algorithmic Decision Making"]
  },
  {
    title: "Bachelor of Science in Computer Science",
    issuer: "Shah Abdul Latif University (SALU), Khairpur",
    date: "Graduated Feb 2025",
    badge: "Academic Degree",
    icon: "GraduationCap",
    description: "4-year comprehensive degree covering Computer Systems, Advanced Networks, Cyber Security, Database Engineering, Algorithms, and Software Design.",
    skillsLearned: ["Computer Networks", "Oracle DB", "Data Structures", "System Analysis"]
  }
];

export const projects = [
  {
    id: "vibe-sinav",
    title: "vibe.Sınav — Offline Assessment & Examination System",
    category: "Educational Examination Platform",
    featured: true,
    tag: "Offline & LAN Deployment",
    role: "Platform Architect & Developer",
    environment: "Schools & Computer Labs",
    description: "A browser-based assessment platform designed for schools and computer labs, supporting offline/LAN deployment, quizzes, typing tests, live proctoring, role-based access, certificates, reports, and anti-cheating telemetry.",
    highlights: [
      "Assessment Builder for multi-format exam creation & automated evaluation",
      "Typing Tests with real-time WPM, accuracy scoring, and benchmark logging",
      "Live Proctoring dashboard tracking active candidate sessions in real time",
      "Anti-Cheating Telemetry: fullscreen enforcement, tab-switch detection & blur alerts",
      "Role-Based Access Control (RBAC) for Administrators, Instructors, and Students",
      "Zero-Internet Campus LAN Deployment on local Apache/Nginx web servers",
      "Automated Certificate Generation with verifiable credentials",
      "Reports & Analytics with exportable student performance summaries"
    ],
    keyFeatures: [
      "Assessment Builder",
      "Typing Tests",
      "Live Proctoring",
      "RBAC",
      "LAN Deployment",
      "Certificates",
      "Reports & Analytics",
      "Anti-Cheating Telemetry"
    ],
    techStack: ["PHP", "MySQL/MariaDB", "JavaScript", "Bootstrap", "HTML/CSS"],
    demoLink: "/projects",
    githubLink: "https://github.com/ahsanraza-tech"
  },
  {
    id: "verimoo",
    title: "Verimoo — Certificate Management & Verification System",
    category: "Certificate & Verification SaaS",
    featured: true,
    tag: "Next.js & MongoDB Platform",
    role: "Full-Stack Software Engineer",
    environment: "Web / Cloud SaaS",
    description: "A web-based certificate management platform for organizations to create, manage, and verify digital certificates using unique certificate IDs.",
    highlights: [
      "Certificate creation and management lifecycle for accredited institutions",
      "Unique certificate ID generation with algorithmic verification indexing",
      "Public instant certificate verification portal for employers and verifiers",
      "Admin dashboard with audit logs, revocation controls, and analytics",
      "Automated digital certificate generation with print-ready downloadable output",
      "Certificate verification API for seamless third-party LMS/HR integration",
      "Organization branding with customizable templates, stamps, and signatures"
    ],
    keyFeatures: [
      "Certificate creation and management",
      "Unique certificate ID generation",
      "Public certificate verification",
      "Admin dashboard",
      "Digital certificate generation",
      "Downloadable certificate output",
      "Certificate verification API",
      "Organization branding and customizable templates"
    ],
    techStack: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Shadcn UI", "Node.js", "MongoDB"],
    logo: "/images/verimoo/verimoo-logo.png",
    screenshots: [
      {
        title: "Public Instant Verification Portal",
        src: "/images/verimoo/verimoo-verify-landing.png",
        caption: "Dark-mode public lookup interface allowing instant credential validation by unique serial ID."
      },
      {
        title: "Superadmin Control Center",
        src: "/images/verimoo/verimoo-admin-dashboard.png",
        caption: "Full management suite with project metrics, team management, and certificate creation."
      },
      {
        title: "Progressive Web App (PWA) / Mobile",
        src: "/images/verimoo/verimoo-install-pwa.png",
        caption: "Cross-platform installation modal supporting 1-tap Android & tablet access and offline verification."
      },
      {
        title: "v1.2.5 Dual-Format PDF & Vercel Engine",
        src: "/images/verimoo/verimoo-changelog-modal.png",
        caption: "Release changelog detailing 300 DPI PNG/PDF outputs, Vercel serverless optimizations, and multi-tier caching."
      }
    ],
    demoLink: "/projects",
    githubLink: "https://github.com/ahsanraza-tech"
  },
  {
    id: "adalynn-chatbot",
    title: "Adalynn Chatbot — Voice Assistant & Speech UI",
    category: "AI & Speech Processing",
    featured: true,
    tag: "7th Semester CS-PRE-EXPO Project",
    role: "Lead Developer & Speech AI Engineer",
    institution: "Shah Abdul Latif University (SALU), Khairpur",
    event: "SALU CS-PRE-EXPO 2024 (7th Semester — 30th April 2024)",
    environment: "Python Desktop Application",
    description: "Assigned in the 7th Semester of BS Computer Science at Shah Abdul Latif University (SALU) as a mandatory CS-PRE-EXPO milestone to prototype, learn, and demonstrate applied AI and speech recognition before developing the final graduation capstone. Adalynn leverages offline speech recognition with Vosk, text-to-speech with pyttsx3, real-time microphone stream capture via PyAudio, and dynamic voice wave animations with Matplotlib and Tkinter.",
    highlights: [
      "Presented and demonstrated live at SALU CS-PRE-EXPO 2024 (7th Semester — 30th April 2024)",
      "7th Semester CS-PRE-EXPO research assignment to master speech processing & acoustic models",
      "Offline speech recognition using Vosk lightweight models without internet connectivity",
      "Real-time graphical voice waveform animation using Matplotlib canvas in Tkinter GUI",
      "Text-to-speech auditory feedback and vocal synthesis using pyttsx3",
      "Microphone audio streaming and JSON packet parsing via PyAudio and Python json module",
      "Voice command dispatcher to automate web browser tasks and system actions"
    ],
    keyFeatures: [
      "Live demonstration at 7th Semester CS-PRE-EXPO 2024",
      "Offline voice recognition via Vosk",
      "Text-to-speech synthesis via pyttsx3",
      "Real-time graphical animation (Matplotlib & Tkinter)",
      "Microphone audio capture (PyAudio 16kHz stream)",
      "Voice command dispatcher for web & system automation",
      "JSON token parsing & local acoustic processing"
    ],
    installationLibraries: [
      "NumPy: for numerical operations",
      "Matplotlib: for plotting and animations",
      "Tkinter: for GUI",
      "Vosk: for speech recognition",
      "PyAudio: for capturing audio input",
      "pyttsx3: for text-to-speech",
      "webbrowser: for opening URLs in browser (standard library)",
      "json: for processing Vosk JSON data (standard library)"
    ],
    installCommand: "pip install numpy matplotlib vosk pyaudio pyttsx3",
    techStack: ["Python", "Vosk", "pyttsx3", "Tkinter", "Matplotlib", "NumPy", "PyAudio"],
    screenshots: [
      {
        title: "SALU CS-PRE-EXPO 2024 (7th Semester Presentation)",
        src: "/images/adalynn/adalynn-pre-expo.jpg",
        caption: "Ahsan Raza (right) and project teammate presenting Adalynn Chatbot live with audio microphone equipment at the Shah Abdul Latif University (SALU) 7th Semester CS-PRE-EXPO on 30th April 2024."
      }
    ],
    demoLink: "/projects",
    githubLink: "https://github.com/ahsanraza-tech"
  },
  {
    id: "legal-aid-assistant",
    title: "AI-Powered Legal Aid Assistant",
    category: "AI & Full-Stack Web Platform",
    featured: true,
    tag: "Final Year Graduation Capstone Project",
    role: "Lead Full-Stack Developer & AI Architect",
    collaborator: "with Muhammad Shafiullah",
    institution: "Shah Abdul Latif University (SALU), Khairpur",
    environment: "Web Application / Vercel Cloud",
    liveUrl: "https://legal-aid-assistant-by-ahsan-and-shafiullah-bn7c.vercel.app/",
    description: "A web application that provides accessible legal assistance using AI. It enables users to ask legal queries and receive structured guidance based on legal documentation and AI-powered insights across Family, Property, Criminal, and Financial Law.",
    highlights: [
      "AI-powered legal query processing integrating Google Generative AI",
      "User authentication via Google and GitHub OAuth using NextAuth.js",
      "Categorized legal FAQs across Family Law, Property Law, Criminal Law, and Financial Law",
      "Secure persistent database storage with MongoDB and Mongoose",
      "High-craft responsive user interface built with Next.js, Tailwind CSS, Shadcn UI, and Radix UI",
      "Presented and demonstrated at university project exhibition with Muhammad Shafiullah"
    ],
    keyFeatures: [
      "User authentication via Google/GitHub (NextAuth.js)",
      "AI-powered legal query processing",
      "Secure database storage with MongoDB",
      "Responsive UI built with Next.js, Tailwind CSS, and Shadcn",
      "Categorized Legal FAQ explorer (Family, Property, Criminal, Financial Law)",
      "Live production deployment on Vercel"
    ],
    screenshots: [
      {
        title: "University Project Exhibition (SALU)",
        src: "/images/legal-aid/legal-aid-exhibition.jpg",
        caption: "Ahsan Raza and Muhammad Shafiullah presenting their Final Year Capstone Project at the Shah Abdul Latif University (SALU) Project Exhibition."
      },
      {
        title: "Consultation Landing Portal",
        src: "/images/legal-aid/legal-aid-landing.png",
        caption: "High-contrast landing interface with legal justice creed and instant inquiry launch."
      },
      {
        title: "OAuth Authentication Modal",
        src: "/images/legal-aid/legal-aid-auth.png",
        caption: "Secure NextAuth.js login with Google, GitHub, and instant guest trial capabilities."
      },
      {
        title: "Interactive Legal Query Workspace",
        src: "/images/legal-aid/legal-aid-chat.png",
        caption: "Real-time AI legal advisory interface with categorized legal branches (Family, Property, Criminal, Financial Law)."
      }
    ],
    techStack: ["Next.js", "React", "Tailwind CSS", "Shadcn UI", "Node.js", "NextAuth.js", "TypeScript", "MongoDB", "Google Generative AI"],
    demoLink: "https://legal-aid-assistant-by-ahsan-and-shafiullah-bn7c.vercel.app/",
    githubLink: "https://github.com/ahsanraza-tech"
  }
];

export const terminalCommands = {
  help: `Available Commands:
  - whoami       : Summary of Ahsan Raza
  - skills       : List core technical competencies
  - projects     : View featured software deployments
  - experience   : View career positions and achievements
  - certs        : List verified technical certifications
  - tools        : Launch Network & Sysadmin Engineering Tools
  - contact      : Display direct email, LinkedIn, and location
  - ping <host>  : Simulate ICMP network ping test
  - subnet <cidr>: Show quick subnet breakdown (e.g. subnet /24)
  - clear        : Clear the terminal screen`,
  
  whoami: `Ahsan Raza | IT & Network Support | IT Operations | Systems Support
Location: Sindh, Pakistan
Education: BS Computer Science (Shah Abdul Latif University)
Current: Information Technology Officer
Focus: Networking, Cybersecurity & AI`,

  skills: `Core Competencies:
[NETWORKING]
  • Enterprise LAN/WAN, IP Subnetting, OSI Model, Routers & Switches
  • Wi-Fi APs, CAT6 Cabling, VLSM Subnet Design, DHCP/DNS (VLANs in learning)
[CYBERSECURITY]
  • Threat Management, Firewall Rules, Port Scanning, Endpoint Hardening
[IT OPERATIONS]
  • L1/L2 Technical Support, Biometric Systems, IP CCTV, Asset Tracking
[AI & SOFTWARE]
  • Next.js, MongoDB, React, Node.js, Oracle DB, JavaScript, Google Prompting`,

  projects: `Featured Systems & Platforms:
1. vibe.Sınav — Offline Assessment & Examination System
   Role: Platform Architect & Developer
   Tech: PHP, MySQL/MariaDB, JavaScript, Bootstrap, HTML/CSS
   Highlights: Assessment Builder, Typing Tests, Live Proctoring, RBAC, LAN Deployment, Anti-Cheating Telemetry.

2. Verimoo — Certificate Management & Verification System
   Role: Full-Stack Software Engineer
   Tech: Next.js, TypeScript, React, Tailwind CSS, Shadcn UI, Node.js, MongoDB
   Highlights: Certificate Creation & Management, Unique ID Generation, Public Verification, Verification API, Organization Branding.

3. AI-Powered Legal Aid Assistant (Final Year Graduation Capstone)
   Role: Lead Full-Stack Developer & AI Architect (with Muhammad Shafiullah)
   Tech: Next.js, Google Generative AI, NextAuth.js, MongoDB, Tailwind CSS, Shadcn UI
   Live URL: https://legal-aid-assistant-by-ahsan-and-shafiullah-bn7c.vercel.app/
   Highlights: Google Generative AI, Legal Branch FAQs, NextAuth OAuth, Presented at SALU Exhibition.

4. Adalynn Chatbot — Voice Assistant & Speech UI (7th Semester CS-PRE-EXPO Project)
   Role: Lead Developer & Speech AI Engineer
   Tech: Python, Vosk, pyttsx3, Tkinter, Matplotlib, NumPy, PyAudio
   Event: SALU CS-PRE-EXPO 2024 (7th Semester — 30th April 2024)
   Highlights: Live Pre-Expo Audio Demo, Offline Speech Recognition, Text-to-Speech, Voice Wave Animation, Web Automation.`,

  experience: `Professional Experience:
1. Enterprise Academic Campus
   Role: Information Technology Officer (Sep 2025 - Present)
   Scope: Enterprise campus LAN/WAN, switches, APs, CCTV, biometrics, L1/L2 support.
2. Freelance
   Role: Software Engineer (Jul 2023 - Present)
   Scope: Full-stack web development, automation scripts, global client satisfaction.
3. Technical Training Institute
   Role: IT Instructor & Support Technician (Nov 2021 - Aug 2025)
   Scope: Taught OSI, Subnetting, Coding, Oracle DB. Managed lab networks & CAT cabling.`,

  certs: `Verified Certifications:
• Google Prompting Essentials (Google)
• VU-ITU-DTC Cyber Threat Management (VU-ITU)
• Technical Domain: Web Development Training
• Introduction to Cybersecurity
• Elements of AI (University of Helsinki)
• BS Computer Science (Shah Abdul Latif University Khairpur, 2025)`,

  contact: `Contact Channels:
• Email        : arkolachi190@gmail.com
• LinkedIn     : https://www.linkedin.com/in/ahsan-raza8hbb
• Medium       : https://medium.com/@ahsan-raza8hbb
• Location     : Sindh, Pakistan`,

  pwa: `[PWA INSTALLATION PACKAGE]
• Desktop / Android Installer: /pwa
• Status: Standalone Progressive Web Application Ready
• Features: Offline caching, dedicated taskbar launch, 0 MB store download.
• Access via URL: Open "/pwa" directly in your browser.`,

  tools: `Network & Sysadmin Toolkit (/tools):
1. Port Checker (Under Development): TCP probe & 20+ port risk directory.
2. Cryptographic Hash Generator: MD5, SHA-1, SHA-256, SHA-384, SHA-512 & checksum verifier.
3. Bandwidth & Transfer Calculator: Transfer time, units converter & campus user WAN sizing.
4. IP CCTV Storage Calculator: Bitrate matrix, daily storage & NVR RAID 5 dimensioning.
URL: Navigate to "/tools" directly in your browser.`
};

