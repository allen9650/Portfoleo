import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  Download, 
  Smartphone, 
  Monitor, 
  CheckCircle2, 
  Sparkles, 
  Share2, 
  MoreVertical, 
  ShieldCheck, 
  WifiOff, 
  RefreshCw, 
  ArrowLeft,
  Terminal,
  ExternalLink,
  Laptop,
  Check,
  Zap,
  Info
} from 'lucide-react';

export default function PwaInstallPage() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [deviceType, setDeviceType] = useState('desktop'); // 'desktop', 'android', 'ios'
  const [activeTab, setActiveTab] = useState('desktop');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    // 1. Detect if running as standalone PWA
    const isStandaloneMode = 
      window.matchMedia('(display-mode: standalone)').matches || 
      window.navigator.standalone === true ||
      document.referrer.includes('android-app://');
    
    setIsStandalone(isStandaloneMode);

    // 2. Detect Device Type
    const ua = navigator.userAgent || '';
    if (/Android/i.test(ua)) {
      setDeviceType('android');
      setActiveTab('android');
    } else if (/iPhone|iPad|iPod/i.test(ua)) {
      setDeviceType('ios');
      setActiveTab('ios');
    } else {
      setDeviceType('desktop');
      setActiveTab('desktop');
    }

    // 3. Check for globally captured beforeinstallprompt
    if (window.__pwaInstallPrompt) {
      setDeferredPrompt(window.__pwaInstallPrompt);
    }

    const handlePromptCaptured = () => {
      if (window.__pwaInstallPrompt) {
        setDeferredPrompt(window.__pwaInstallPrompt);
      }
    };

    const handleBeforeInstall = (e) => {
      e.preventDefault();
      window.__pwaInstallPrompt = e;
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      window.__pwaInstallPrompt = null;
      triggerCelebration();
    };

    window.addEventListener('pwa-prompt-captured', handlePromptCaptured);
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('pwa-prompt-captured', handlePromptCaptured);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        triggerCelebration();
      }
      setDeferredPrompt(null);
      window.__pwaInstallPrompt = null;
    } else {
      // If native prompt isn't directly dispatchable (e.g. already handled or in iOS/unsupported browser),
      // smoothly scroll down to the step-by-step installation instructions for the active device
      const element = document.getElementById('install-instructions');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-neutral-800">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="w-10 h-10 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
            title="Return to Home"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-200 dark:border-cyan-500/30 font-semibold uppercase tracking-wider">
                Direct Application Package
              </span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                v2.5 PWA
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
              Download Ahsan Raza Portfolio App
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-mono text-slate-600 dark:text-slate-300 hover:border-cyan-500/40 transition-colors"
            title="Copy Portfolio URL"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4 text-cyan-500" />}
            <span>{copiedLink ? 'Link Copied!' : 'Share Portfolio Link'}</span>
          </button>
        </div>
      </div>

      {/* Main Installer Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-neutral-950 text-white p-6 sm:p-10 shadow-2xl shadow-cyan-950/30">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left info */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-4">
              <img
                src="/pwa-192x192.png"
                alt="Ahsan Raza App Icon"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/20"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    Ahsan Raza Executive App
                  </h2>
                  <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-400/30 font-bold">
                    OFFICIAL
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-mono mt-1">
                  IT Officer • Systems Support • Enterprise Network Engineering
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Standalone PWA
                  </span>
                  <span>•</span>
                  <span>0 MB App Store Download</span>
                  <span>•</span>
                  <span className="text-cyan-400">Instant Offline Cache</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              Install Ahsan Raza's complete interactive portfolio directly to your <strong className="text-white">Desktop (Windows, macOS, Linux)</strong> or <strong className="text-white">Android / iOS mobile phone</strong>. Enjoy seamless full-screen performance, offline document browsing, dedicated desktop taskbar launch, and instant response times.
            </p>

            {/* Direct Action Area */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {isStandalone ? (
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-sm block text-white">Application Already Installed</span>
                    <span className="text-xs font-mono text-emerald-300/90">
                      You are currently running this portfolio in standalone PWA mode!
                    </span>
                  </div>
                  <Link
                    to="/"
                    className="ml-auto px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors whitespace-nowrap"
                  >
                    Open Home
                  </Link>
                </div>
              ) : isInstalled ? (
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                  <Sparkles className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-sm block text-white">App Installed Successfully! 🎉</span>
                    <span className="text-xs font-mono text-cyan-300/90">
                      Find the Ahsan Raza icon on your Desktop or Home Screen.
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    onClick={handleInstallClick}
                    className="group relative inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    {deviceType === 'android' ? (
                      <Smartphone className="w-5 h-5 text-cyan-200" />
                    ) : (
                      <Monitor className="w-5 h-5 text-cyan-200" />
                    )}
                    <div className="text-left">
                      <span className="block text-[11px] font-mono text-cyan-200 font-normal uppercase tracking-wider">
                        {deferredPrompt ? 'Direct One-Click Install' : 'Select & Install'}
                      </span>
                      <span className="text-sm sm:text-base font-extrabold tracking-tight">
                        {deviceType === 'android'
                          ? 'Download App for Android'
                          : deviceType === 'ios'
                          ? 'Install on iPhone / iPad'
                          : 'Download & Install on Desktop'}
                      </span>
                    </div>
                    <Download className="w-4 h-4 ml-1 group-hover:translate-y-0.5 transition-transform" />
                  </button>

                  <a
                    href="#install-instructions"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-colors text-center"
                  >
                    <Info className="w-4 h-4 text-cyan-400" />
                    <span>View Step-by-Step Guide</span>
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Right Preview Device Card */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full max-w-xs p-5 rounded-3xl bg-slate-950/80 border border-cyan-500/20 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-slate-400">Detected Client:</span>
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                  {deviceType === 'android' ? 'Android Device' : deviceType === 'ios' ? 'iOS Device' : 'Desktop Browser'}
                </span>
              </div>

              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Engine:</span>
                  <span className="text-slate-400">Chromium / WebKit</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Storage Footprint:</span>
                  <span className="text-emerald-400">&lt; 1.2 MB</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Installation Prompt:</span>
                  <span className={deferredPrompt ? "text-emerald-400 font-bold" : "text-amber-400"}>
                    {deferredPrompt ? 'Ready (1-Click)' : 'Browser Menu'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Offline Sync:</span>
                  <span className="text-cyan-400">Service Worker Active</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                <span className="text-cyan-400 font-bold block mb-1">💡 Pro-Tip:</span>
                No Google Play or Apple App Store account is required. The app runs in a native sandbox directly on your device.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Instructions Tabs */}
      <div id="install-instructions" className="space-y-6 pt-4">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            How to Install on Your Device
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Choose your device below for step-by-step installation instructions:
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('desktop')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'desktop'
                ? 'bg-white dark:bg-neutral-800 text-cyan-600 dark:text-cyan-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>Desktop</span>
          </button>

          <button
            onClick={() => setActiveTab('android')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'android'
                ? 'bg-white dark:bg-neutral-800 text-cyan-600 dark:text-cyan-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Android</span>
          </button>

          <button
            onClick={() => setActiveTab('ios')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'ios'
                ? 'bg-white dark:bg-neutral-800 text-cyan-600 dark:text-cyan-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>iOS / Safari</span>
          </button>
        </div>

        {/* Tab Content Cards */}
        <div className="mt-6">
          {activeTab === 'desktop' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    Desktop Installation (Windows, macOS & Linux)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    Supported on Google Chrome, Microsoft Edge, Brave, and Opera
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-2">
                  <span className="w-7 h-7 rounded-xl bg-cyan-500 text-white font-mono text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Look for Install Icon</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Look at the right side of your browser's address bar (URL bar). You will see an <strong className="text-slate-900 dark:text-white">Install icon</strong> (a computer monitor with a download arrow).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-2">
                  <span className="w-7 h-7 rounded-xl bg-cyan-500 text-white font-mono text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Or Use Browser Menu</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Click the three dots <strong className="text-slate-900 dark:text-white">(⋮)</strong> in the top right → select <strong className="text-slate-900 dark:text-white">"Save and share"</strong> or <strong className="text-slate-900 dark:text-white">"Install Ahsan Raza Portfolio..."</strong>.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-2">
                  <span className="w-7 h-7 rounded-xl bg-cyan-500 text-white font-mono text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Click "Install"</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    A desktop shortcut is created and the portfolio launches immediately in its own clean window with zero browser tabs.
                  </p>
                </div>
              </div>

              {deferredPrompt && (
                <div className="pt-2 text-center">
                  <button
                    onClick={handleInstallClick}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-colors shadow-md cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Launch Desktop Install Prompt Now</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'android' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    Android Installation (Chrome & Samsung Internet)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    Works on all modern Android devices and tablets
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-2">
                  <span className="w-7 h-7 rounded-xl bg-emerald-500 text-white font-mono text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Open in Chrome</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Make sure this page is open in <strong className="text-slate-900 dark:text-white">Google Chrome</strong> or <strong className="text-slate-900 dark:text-white">Samsung Internet</strong>.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-2">
                  <span className="w-7 h-7 rounded-xl bg-emerald-500 text-white font-mono text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Tap Three Dots (⋮)</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Tap the menu icon <strong className="text-slate-900 dark:text-white">(⋮)</strong> at the top-right corner of Chrome.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-2">
                  <span className="w-7 h-7 rounded-xl bg-emerald-500 text-white font-mono text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Tap "Install app"</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Select <strong className="text-slate-900 dark:text-white">"Install app"</strong> or <strong className="text-slate-900 dark:text-white">"Add to Home screen"</strong> and confirm. The app will be placed on your home screen and app drawer!
                  </p>
                </div>
              </div>

              {deferredPrompt && (
                <div className="pt-2 text-center">
                  <button
                    onClick={handleInstallClick}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-md cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Trigger Android Install Dialog</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'ios' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    Apple iOS Installation (iPhone & iPad)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    Install in Safari without App Store credentials
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-2">
                  <span className="w-7 h-7 rounded-xl bg-blue-500 text-white font-mono text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Open in Safari</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Open this portfolio website in Apple <strong className="text-slate-900 dark:text-white">Safari</strong>.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-2">
                  <span className="w-7 h-7 rounded-xl bg-blue-500 text-white font-mono text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Tap Share Button</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Tap the <strong className="text-slate-900 dark:text-white">Share icon</strong> (the square with an arrow pointing up) at the bottom toolbar.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-2">
                  <span className="w-7 h-7 rounded-xl bg-blue-500 text-white font-mono text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">"Add to Home Screen"</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Scroll down and tap <strong className="text-slate-900 dark:text-white">"Add to Home Screen"</strong>, then tap <strong className="text-slate-900 dark:text-white">"Add"</strong> in the top right.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PWA Advantages Grid */}
      <div className="space-y-6 pt-4">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Why Install Ahsan Raza's Portfolio PWA?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Engineered with modern Progressive Web App architecture for maximum performance
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Instant Launch</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Launches in milliseconds with hardware acceleration and pre-cached assets.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <WifiOff className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Offline Resilience</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Explore career history, networking skills, and projects even during internet outages.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Monitor className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Clean Window Mode</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              No distracting URL address bars or browser tabs — feels like an executive native tool.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-500/30 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Safe & Lightweight</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Sandboxed browser security with zero bloatware or background battery drain.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Shortcut */}
      <div className="pt-6 border-t border-slate-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
          Hidden Access Point: <code className="text-cyan-600 dark:text-cyan-400 bg-slate-100 dark:bg-neutral-900 px-2 py-0.5 rounded border border-slate-200 dark:border-neutral-800">/pwa</code>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            ← Return to Portfolio
          </Link>
          <Link
            to="/contact"
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold transition-colors"
          >
            Contact Ahsan →
          </Link>
        </div>
      </div>
    </div>
  );
}
