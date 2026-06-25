import React, { useState, useEffect } from "react";
import { Cpu, Share2, Copy, CheckCircle, ExternalLink, Activity } from "lucide-react";

export default function Header() {
  const [copiedDev, setCopiedDev] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  const devUrl = "https://ais-dev-4yy2iiubckigvu7h3tngxm-252718204029.europe-west2.run.app";
  const shareUrl = "https://ais-pre-4yy2iiubckigvu7h3tngxm-252718204029.europe-west2.run.app";

  useEffect(() => {
    // Keep a ticking clock for a dynamic system look
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.getUTCFullYear() + "-" +
        String(now.getUTCMonth() + 1).padStart(2, '0') + "-" +
        String(now.getUTCDate()).padStart(2, '0') + " " +
        String(now.getUTCHours()).padStart(2, '0') + ":" +
        String(now.getUTCMinutes()).padStart(2, '0') + ":" +
        String(now.getUTCSeconds()).padStart(2, '0') + " UTC"
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = (url: string, type: 'dev' | 'share') => {
    navigator.clipboard.writeText(url);
    if (type === 'dev') {
      setCopiedDev(true);
      setTimeout(() => setCopiedDev(false), 2000);
    } else {
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/90 text-white py-4 px-6 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo and Tagline */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-2.5 rounded-lg text-white shadow-md shadow-indigo-500/20">
            <Cpu size={24} className="animate-pulse" id="header-logo-icon" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-sans tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-fade-in">
                Sintel Tech
              </h1>
              <span className="text-[10px] font-mono bg-indigo-500/15 text-indigo-300 border border-indigo-500/20 px-1.5 py-0.5 rounded uppercase tracking-wider">
                Startup Lab
              </span>
            </div>
            <p className="text-xs text-zinc-300">Engineering future-proof systems simplified</p>
          </div>
        </div>

        {/* Live system monitoring stats */}
        <div className="hidden lg:flex items-center gap-6 text-xs text-zinc-300 border-l border-zinc-800 pl-6 font-mono">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
            <span>NODE: ACTIVE</span>
          </div>
          <div>
            <span className="text-zinc-500">SYS_TIME:</span>{" "}
            <span className="text-indigo-400">{currentTime || "Loading..."}</span>
          </div>
        </div>

        {/* Temporary Hosting Link & Social Share */}
        <div className="flex items-center flex-wrap gap-2 md:gap-3 bg-zinc-900/80 p-2 rounded-lg border border-zinc-800">
          <div className="text-[11px] font-mono px-2 py-1 text-zinc-400 flex items-center gap-1.5">
            <Share2 size={13} className="text-indigo-400" />
            <span>SHARE HOSTING:</span>
          </div>

          {/* Development Link */}
          <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded overflow-hidden text-xs">
            <span className="px-2 text-[10px] text-zinc-500 font-mono">DEV</span>
            <button
              onClick={() => copyToClipboard(devUrl, 'dev')}
              className="px-2.5 py-1 text-indigo-400 hover:text-indigo-300 font-medium hover:bg-zinc-800 transition flex items-center gap-1"
              title="Copy development share link"
              id="copy-dev-btn"
            >
              {copiedDev ? <CheckCircle size={12} className="text-indigo-400 animate-scale" /> : <Copy size={12} />}
              <span>{copiedDev ? "Copied" : "Copy"}</span>
            </button>
            <a 
              href={devUrl} 
              target="_blank" 
              referrerPolicy="no-referrer"
              className="border-l border-zinc-800 px-2 py-1 text-zinc-400 hover:text-white transition"
              title="Launch full site"
            >
              <ExternalLink size={11} />
            </a>
          </div>

          {/* Shared Target Link */}
          <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded overflow-hidden text-xs">
            <span className="px-2 text-[10px] text-zinc-500 font-mono">SHARE</span>
            <button
              onClick={() => copyToClipboard(shareUrl, 'share')}
              className="px-2.5 py-1 text-purple-400 hover:text-purple-300 font-medium hover:bg-zinc-800 transition flex items-center gap-1"
              title="Copy production preview link"
              id="copy-share-btn"
            >
              {copiedShare ? <CheckCircle size={12} className="text-purple-400 animate-scale" /> : <Copy size={12} />}
              <span>{copiedShare ? "Copied" : "Copy"}</span>
            </button>
            <a 
              href={shareUrl} 
              target="_blank" 
              referrerPolicy="no-referrer"
              className="border-l border-zinc-800 px-2 py-1 text-zinc-400 hover:text-white transition"
              title="Launch Shared Frame"
            >
              <ExternalLink size={11} />
            </a>
          </div>
        </div>

      </div>
    </header>
  );
}
