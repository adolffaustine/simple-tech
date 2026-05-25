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
    <header className="border-b border-gray-800 bg-gray-950 text-white py-4 px-6 sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo and Tagline */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-emerald-500 to-cyan-500 p-2.5 rounded-lg text-black shadow-md shadow-emerald-500/10">
            <Cpu size={24} className="animate-pulse" id="header-logo-icon" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-sans tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Simple Tech
              </h1>
              <span className="text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 px-1.5 py-0.5 rounded uppercase tracking-wider">
                Startup Lab
              </span>
            </div>
            <p className="text-xs text-gray-400">Engineering future-proof systems simplified</p>
          </div>
        </div>

        {/* Live system monitoring stats */}
        <div className="hidden lg:flex items-center gap-6 text-xs text-gray-400 border-l border-gray-800 pl-6 font-mono">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>NODE: ACTIVE</span>
          </div>
          <div>
            <span className="text-gray-500">SYS_TIME:</span>{" "}
            <span className="text-emerald-400">{currentTime || "Loading..."}</span>
          </div>
        </div>

        {/* Temporary Hosting Link & Social Share */}
        <div className="flex items-center flex-wrap gap-2 md:gap-3 bg-gray-900/60 p-2 rounded-lg border border-gray-800">
          <div className="text-[11px] font-mono px-2 py-1 text-gray-400 flex items-center gap-1.5">
            <Share2 size={13} className="text-cyan-400" />
            <span>SHARE HOSTING:</span>
          </div>

          {/* Development Link */}
          <div className="flex items-center bg-gray-900 border border-gray-700/60 rounded overflow-hidden text-xs">
            <span className="px-2 text-[10px] text-gray-500 font-mono">DEV</span>
            <button
              onClick={() => copyToClipboard(devUrl, 'dev')}
              className="px-2.5 py-1 text-cyan-400 hover:text-cyan-300 font-medium hover:bg-gray-800 transition flex items-center gap-1"
              title="Copy development share link"
              id="copy-dev-btn"
            >
              {copiedDev ? <CheckCircle size={12} className="text-emerald-400 animate-scale" /> : <Copy size={12} />}
              <span>{copiedDev ? "Copied" : "Copy"}</span>
            </button>
            <a 
              href={devUrl} 
              target="_blank" 
              referrerPolicy="no-referrer"
              className="border-l border-gray-800 px-2 py-1 text-gray-400 hover:text-white transition"
              title="Launch full site"
            >
              <ExternalLink size={11} />
            </a>
          </div>

          {/* Shared Target Link */}
          <div className="flex items-center bg-gray-900 border border-gray-700/60 rounded overflow-hidden text-xs">
            <span className="px-2 text-[10px] text-gray-500 font-mono">SHARE</span>
            <button
              onClick={() => copyToClipboard(shareUrl, 'share')}
              className="px-2.5 py-1 text-emerald-400 hover:text-emerald-300 font-medium hover:bg-gray-800 transition flex items-center gap-1"
              title="Copy production preview link"
              id="copy-share-btn"
            >
              {copiedShare ? <CheckCircle size={12} className="text-emerald-400 animate-scale" /> : <Copy size={12} />}
              <span>{copiedShare ? "Copied" : "Copy"}</span>
            </button>
            <a 
              href={shareUrl} 
              target="_blank" 
              referrerPolicy="no-referrer"
              className="border-l border-gray-800 px-2 py-1 text-gray-400 hover:text-white transition"
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
