/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import Header from "./components/Header";
import CapabilityCards from "./components/CapabilityCards";
import EcoWaterSimulator from "./components/EcoWaterSimulator";
import BatleinChatDemo from "./components/BatleinChatDemo";
import { 
  Compass, 
  Cpu, 
  Settings,  
  BookOpen, 
  ArrowRight, 
  Send, 
  Sparkles, 
  Terminal, 
  Briefcase, 
  Check, 
  Lightbulb, 
  Network, 
  Workflow, 
  Lock,
  ChevronRight,
  User
} from "lucide-react";
import { CustomBlueprint } from "./types";

export default function App() {
  // Current active project prototype tab
  const [activeTab, setActiveTab] = useState<"ecowater" | "batlein">("ecowater");

  // Idea submission consultant state
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("Healthcare / Biotech");
  const [ideaDescription, setIdeaDescription] = useState("");
  const [blueprint, setBlueprint] = useState<CustomBlueprint | null>(null);
  const [loadingBlueprint, setLoadingBlueprint] = useState(false);
  const [errorBlueprint, setErrorBlueprint] = useState("");

  // Contact/Inquiry Form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactTrack, setContactTrack] = useState("AI Integration");
  const [contactFeedback, setContactFeedback] = useState("");
  const [submittingInquiry, setSubmittingInquiry] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);

  // Submit company idea for custom engineering roadmap
  const handleGenerateBlueprint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaDescription.trim()) return;

    setLoadingBlueprint(true);
    setErrorBlueprint("");
    setBlueprint(null);

    try {
      const response = await fetch("/api/consult/blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName, industry, ideaDescription })
      });

      if (!response.ok) {
        throw new Error("Blueprint retrieval failed");
      }

      const data = await response.json();
      setBlueprint(data);
    } catch (err) {
      console.error(err);
      setErrorBlueprint("Failed to fetch engineering blueprint. Displaying responsive placeholder diagram.");
      // Soft graceful fallback UI state
      setBlueprint({
        recommendedStack: ["ESP32 RISC-V Node", "Modbus RS485", "React client dashboard", "Supabase authentication and data pipelines"],
        keyArchitectureSteps: [
          "Assemble structural board housing and interface with mechanical components",
          "Program high-speed serial firmware and diagnostic triggers",
          "Deploy React-Vite visual web monitors and live diagnostic dashboards"
        ],
        estimatedHardwareCost: "Approx $65 per custom prototype block",
        networkingSecurityPlan: "Secure mesh routing, encrypted hardware handshakes, and strict API proxy requests.",
        sintelTechValueAdd: "Sintel Tech engineers, tests, installs, and maintains full systems remotely."
      });
    } finally {
      setLoadingBlueprint(false);
    }
  };

  // Submit Joint Venture contact form
  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim()) return;

    setSubmittingInquiry(true);
    setTimeout(() => {
      setSubmittingInquiry(false);
      setInquirySuccess(true);
      // Clean
      setContactName("");
      setContactEmail("");
      setContactFeedback("");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-650 selection:text-white">
      
      {/* Top Header with live UTC clock and hosting copy parameters */}
      <Header />

      {/* Main Container Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">

        {/* 1. Hero Innovation Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950 border border-zinc-800 p-8 md:p-12 lg:p-16">
          {/* Subtle architectural mesh grid background */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              
              {/* Mission label */}
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/25 px-3 py-1 rounded-full text-xs font-mono text-indigo-300">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                <span>LAUNCHING THE FUTURE OF SIMPLIFIED INFRASTRUCTURE</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Empowering Businesses through <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Custom-Integrated Engineering</span>
              </h2>
              
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed max-w-2xl">
                We are <strong>Sintel Tech</strong> — a specialized technology boutique. We bridge the gap between creative business ideas and robust physical or cloud deployments. From <strong>Embedded Electronics</strong> and <strong>Enterprise Mesh Networking</strong>, to <strong>Conversational A.I.</strong> and <strong>Motherboard Maintenance</strong>, we construct affordable hardware and software products.
              </p>

              {/* Action shortcuts */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a 
                  href="#prototype-lab" 
                  className="bg-indigo-600 hover:bg-indigo-500 transition text-white font-semibold text-xs px-5 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-550/15 cursor-pointer"
                >
                  <span>Explore Interactive Prototypes</span>
                  <ArrowRight size={14} />
                </a>
                <a 
                  href="#idea-consultant" 
                  className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition text-zinc-200 font-medium text-xs px-5 py-3 rounded-xl flex items-center gap-2 cursor-pointer"
                >
                  <span>Interactive Idea Blueprint Tool</span>
                </a>
              </div>

            </div>

            {/* Visual Abstract Engineering terminal */}
            <div className="lg:col-span-5 bg-zinc-950/80 border border-zinc-850 rounded-2xl p-5 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-zinc-850 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-indigo-500/80" />
                </div>
                <span className="text-[10px] font-mono text-zinc-300 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
                  sintel_tech_v2.01
                </span>
              </div>
              
              <div className="space-y-3 font-mono text-xs text-zinc-400 leading-relaxed">
                <p className="text-zinc-550 select-none"># initialize sintel_tech modules...</p>
                <div className="flex justify-between border-b border-zinc-900 pb-2">
                  <span className="text-white">● AI conversational cores</span>
                  <span className="text-indigo-400">ONLINE</span>
                </div>
                <div className="flex justify-between border-b border-zinc-900 pb-2">
                  <span className="text-white">● ESP32 mesh nodes (EcoWater)</span>
                  <span className="text-indigo-400">ACTIVE</span>
                </div>
                <div className="flex justify-between border-b border-zinc-900 pb-2">
                  <span className="text-white">● DNS Security filtering</span>
                  <span className="text-indigo-400">SECURED</span>
                </div>
                <div className="flex justify-between border-b border-zinc-900 pb-2">
                  <span className="text-white">● Board level diagnostic tools</span>
                  <span className="text-purple-400">CALIBRATING</span>
                </div>
                <p className="text-indigo-400 text-[11px] mt-2 font-semibold">
                  &gt; ready to implement client-focused custom designs.
                </p>
              </div>

              {/* Decorative tags */}
              <div className="mt-5 flex flex-wrap gap-1">
                {["AI Integration", "Embedded C++", "Board Maintenance", "DNS Mesh", "React Dev"].map((tag, idx) => (
                  <span key={idx} className="text-[9px] font-mono bg-zinc-900 text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 1.5. Strategic Explainer: Plain English Breakdown */}
        <section className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-40 -mt-40" />
          
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest block mb-1">
              GUIDE & COMPREHENSION MODEL
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold font-sans tracking-tight text-white mb-3">
              Understanding Sintel Tech: What We Do in Simple Terms
            </h2>
            <p className="text-xs md:text-sm text-zinc-350 leading-relaxed">
              New to our startup or looking for a simplified overview of how our operations run? Here is a breakdown of what Sintel Tech handles daily, and why we designed our target pilots.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Component 1: Core Company Purpose */}
            <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-850 hover:border-indigo-500/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-300/15 flex items-center justify-center text-indigo-400 mb-4">
                  <BookOpen size={20} />
                </div>
                <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide font-sans">
                  Who is Sintel Tech?
                </h3>
                <p className="text-xs text-zinc-350 leading-relaxed">
                  We are an elite boutique engineering lab. We do <strong>NOT</strong> just build websites; we design integrated systems that connect hardware components to digital apps. 
                </p>
                <div className="mt-3 text-[11px] text-zinc-400 space-y-1 bg-zinc-900/40 p-2 border border-zinc-800 rounded">
                  <div>• AI & Agentic software</div>
                  <div>• PCB fabrication & C++</div>
                  <div>• Router networking guards</div>
                </div>
              </div>
              <p className="text-[11px] text-indigo-400 font-mono mt-4">
                Operational Track: Full-Stack
              </p>
            </div>

            {/* Component 2: EcoWater Explanation */}
            <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-850 hover:border-violet-500/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-300/15 flex items-center justify-center text-violet-400 mb-4">
                  <Cpu size={20} />
                </div>
                <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide font-sans">
                  The EcoWater Dispenser
                </h3>
                <p className="text-xs text-zinc-355 leading-relaxed">
                  Millions lack sweet, pathogen-free water. <strong>EcoWater</strong> is our low-cost dispenser. It uses custom microchips combined with mechanical mesh, activated carbon, and ultraviolet light.
                </p>
                <div className="mt-3 text-[11px] text-zinc-400 space-y-1 bg-zinc-900/40 p-2 border border-zinc-800 rounded">
                  <div>• Removes mud & silt</div>
                  <div>• Destroys bacterial DNA</div>
                  <div>• Re-mineralizes for taste</div>
                </div>
              </div>
              <p className="text-[11px] text-violet-400 font-mono mt-4">
                Target: Primary Health Access
              </p>
            </div>

            {/* Component 3: Batlein App Explanation */}
            <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-850 hover:border-sky-500/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-300/15 flex items-center justify-center text-sky-400 mb-4">
                  <Lightbulb size={20} />
                </div>
                <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide font-sans">
                  The Batlein Chat Engine
                </h3>
                <p className="text-xs text-zinc-350 leading-relaxed">
                  Searching directories for technical repairs or traders is complex. <strong>Batlein</strong> replaces menus with a <strong>chat bar</strong>. You text what you want, and the AI presents direct matches.
                </p>
                <div className="mt-3 text-[11px] text-zinc-400 space-y-1 bg-zinc-900/40 p-2 border border-zinc-800 rounded">
                  <div>• No complex filters needed</div>
                  <div>• Natural Language parser</div>
                  <div>• Direct system connections</div>
                </div>
              </div>
              <p className="text-[11px] text-sky-400 font-mono mt-4">
                Target: Frictionless Commerce
              </p>
            </div>

          </div>

          {/* Quick Flowchart Summary */}
          <div className="mt-8 pt-6 border-t border-zinc-850 bg-zinc-950/40 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="font-mono bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded">Venture Flow</span>
              <p className="text-zinc-350 text-[11px] sm:text-xs">
                Have a raw technology concept? We create the electronics 🔬 → compile custom web code 💻 → and deliver support.
              </p>
            </div>
            <a 
              href="#idea-consultant" 
              className="text-indigo-400 hover:text-indigo-350 transition font-mono shrink-0 flex items-center gap-1 font-bold"
            >
              Try Idea Blueprint Generator
              <ArrowRight size={12} className="inline" />
            </a>
          </div>

        </section>


        {/* 2. Interactive Prototype Lab Showcases */}
        <section id="prototype-lab" className="space-y-8 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest block mb-2">
              DEPLOYED ACTIVE PILOTS
            </span>
            <h2 className="text-3xl font-extrabold font-sans text-white tracking-tight">
              Interactive Prototype Sandbox
            </h2>
            <p className="text-zinc-300 text-sm mt-3">
              Sintel Tech builds real physical and visual products. Toggle between an interactive model of our <strong>EcoWater Smart Dispenser</strong>, or test the live conversational routing of our <strong>Batlein App Engine</strong>.
            </p>
          </div>

          {/* Premium Selector Pills */}
          <div className="flex justify-center">
            <div className="flex bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800 gap-1.5">
              <button
                onClick={() => setActiveTab("ecowater")}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold font-sans transition flex items-center gap-2 cursor-pointer ${
                  activeTab === "ecowater"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-550/10"
                    : "text-zinc-400 hover:text-zinc-100"
                }`}
                id="tab-ecowater-trigger"
              >
                <Cpu size={14} />
                <span>1. EcoWater Dispenser Pilot</span>
              </button>
              
              <button
                onClick={() => setActiveTab("batlein")}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold font-sans transition flex items-center gap-2 cursor-pointer ${
                  activeTab === "batlein"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-550/10"
                    : "text-zinc-400 hover:text-zinc-100"
                }`}
                id="tab-batlein-trigger"
              >
                <Terminal size={14} />
                <span>2. Batlein Business Chat Engine</span>
              </button>
            </div>
          </div>

          {/* Selected Sandbox Display Frame */}
          <div className="relative">
            {activeTab === "ecowater" ? (
              <div className="animate-fade-in">
                <EcoWaterSimulator />
              </div>
            ) : (
              <div className="animate-fade-in">
                <BatleinChatDemo />
              </div>
            )}
          </div>
        </section>


        {/* 3. Innovative Idea Consultant / Blueprint Planner (Take ideas from companies to help implement) */}
        <section id="idea-consultant" className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-10 shadow-xl scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Input Form Column */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs text-indigo-350 font-mono bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider mb-4">
                  <Lightbulb size={12} className="text-indigo-350" />
                  <span>Interactive Idea Accelerator</span>
                </div>
                
                <h3 className="text-2xl font-bold font-sans text-white mb-3">
                  Have an Idea? Let's Plan the Implementation.
                </h3>
                
                <p className="text-xs text-zinc-350 leading-relaxed mb-6">
                  Sintel Tech specializes in translating conceptual dreams into physical and software prototypes. Put your industry and idea details below, and our automated architect will formulate a customized technical roadmap.
                </p>

                <form onSubmit={handleGenerateBlueprint} className="space-y-4">
                  
                  {/* Company Name */}
                  <div>
                    <label className="text-[11px] font-mono text-zinc-300 block mb-1.5 uppercase">
                      Innovator or Company Name:
                    </label>
                    <input
                      type="text"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-zinc-650 font-sans"
                      placeholder="e.g. AgriGrow Farms, GreenMobility, or yourself"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      id="consult-company-input"
                    />
                  </div>

                  {/* Industry Track */}
                  <div>
                    <label className="text-[11px] font-mono text-zinc-300 block mb-1.5 uppercase">
                      Industry / Target Domain:
                    </label>
                    <select
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-550 font-sans"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      id="consult-industry-select"
                    >
                      <option value="Agriculture & Smart Irrigation">Agriculture & Smart Irrigation</option>
                      <option value="Consumer Electronics & Hardware">Consumer Electronics & Hardware</option>
                      <option value="Healthcare & Clean WaterTech">Healthcare & Clean WaterTech</option>
                      <option value="Systems Security & Networking">Systems Security & Networking</option>
                      <option value="Automated Retail / Commerce">Automated Retail / Commerce</option>
                      <option value="Enterprise Web & SaaS Platform">Enterprise Web & SaaS Platform</option>
                    </select>
                  </div>

                  {/* Idea Description */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-[11px] font-mono text-zinc-300 block uppercase">
                        Describe the Idea or Problem:
                      </label>
                      <span className="text-[9px] font-mono text-zinc-550">Be descriptive</span>
                    </div>
                    <textarea
                      rows={4}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-zinc-650 font-sans"
                      placeholder="e.g. I want to build a smart box that attaches to soil sensors and sends automated notifications via SMS to farmers when moisture drops..."
                      value={ideaDescription}
                      onChange={(e) => setIdeaDescription(e.target.value)}
                      required
                      id="consult-idea-textarea"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loadingBlueprint || !ideaDescription.trim()}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-xs py-2.5 rounded-lg hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
                    id="generate-blueprint-btn"
                  >
                    {loadingBlueprint ? (
                      <>
                        <div className="w-4 h-4 rounded-full border border-white border-t-transparent animate-spin" />
                        <span>Compiling Technological Schematic...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={14} />
                        <span>Compile Implementation Tech Blueprint</span>
                      </>
                    )}
                  </button>

                </form>
              </div>

              <div className="text-[10px] text-zinc-550 italic mt-4 font-mono leading-normal">
                * Note: Sintel Tech leverages Gemini model intelligence to instantly build accurate, realistic structural hardware/software outlines.
              </div>
            </div>

            {/* Generated Schematic Blueprint display Column */}
            <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 md:p-6 flex flex-col justify-between relative overflow-hidden">
              {/* Holographic style grid accent */}
              <div className="absolute inset-0 bg-radial-gradient from-indigo-500/5 to-transparent pointer-events-none" />

              {loadingBlueprint && (
                <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-xs flex flex-col items-center justify-center text-center p-6 z-20">
                  <div className="p-4 bg-indigo-500/10 border border-indigo-500/25 rounded-full text-indigo-400 mb-4 animate-spin">
                    <Workflow size={28} />
                  </div>
                  <h4 className="font-bold text-white text-sm mb-1">Synthesizing Implementation Plan</h4>
                  <p className="text-xs text-zinc-350 max-w-sm">Generating recommended electronics chipsets, cloud framework options, cost estimations, security parameters, and Sintel Tech milestones...</p>
                </div>
              )}

              {blueprint ? (
                <div className="relative z-10 space-y-5 animate-fade-in font-sans">
                  
                  {/* Success Title Header */}
                  <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
                    <div>
                      <span className="text-[9px] font-mono text-indigo-450 bg-indigo-500/10 border border-indigo-500/25 px-2.5 py-0.5 rounded-full uppercase tracking-wider block mb-1">
                        CTO SYSTEM BLUEPRINT APPROVED
                      </span>
                      <h4 className="text-md font-bold text-white">
                        {companyName || "Innovator"} Custom Roadmap
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-mono text-zinc-400 block uppercase">Est. Hardware Cost</span>
                      <span className="text-xs font-bold text-indigo-400 font-mono">{blueprint.estimatedHardwareCost}</span>
                    </div>
                  </div>

                  {/* 1. Stack */}
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 block mb-2 uppercase tracking-widest">
                      Recommended Engineering Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {blueprint.recommendedStack.map((tech, index) => (
                        <span 
                          key={index} 
                          className="bg-zinc-950 text-indigo-300 text-xs border border-zinc-800 px-3 py-1 rounded-md font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 2. Key steps */}
                  <div>
                    <span className="text-[10px] font-mono text-zinc-455 block mb-2.5 uppercase tracking-widest">
                      Execution Milestones
                    </span>
                    <div className="space-y-2">
                      {blueprint.keyArchitectureSteps.map((step, idx) => (
                        <div key={idx} className="flex gap-2.5 items-start text-xs text-zinc-300">
                          <span className="w-5 h-5 bg-indigo-950/60 text-indigo-350 text-[10px] font-mono flex items-center justify-center rounded border border-indigo-500/15 shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <p className="leading-relaxed">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. Networking security config */}
                  <div className="bg-zinc-950 p-3 border border-zinc-850 rounded-xl">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 uppercase mb-1.5">
                      <Lock size={12} className="text-indigo-350" />
                      <span>Security & Cyber-Safety Strategy</span>
                    </div>
                    <p className="text-xs text-zinc-350 leading-normal font-sans">
                      {blueprint.networkingSecurityPlan}
                    </p>
                  </div>

                  {/* 4. Sintel Tech value addition */}
                  <div className="bg-indigo-500/5 p-3.5 border border-indigo-500/15 rounded-xl">
                    <span className="text-[10px] font-mono text-indigo-350 block uppercase font-bold tracking-wider mb-1">
                      Our Joint Integration Mandate
                    </span>
                    <p className="text-xs text-zinc-355 leading-relaxed font-sans">
                      {blueprint.sintelTechValueAdd}
                    </p>
                  </div>

                  {/* Reset/New consultation buttons */}
                  <div className="flex justify-end pt-2 border-t border-zinc-800">
                    <button
                      onClick={() => setBlueprint(null)}
                      className="text-zinc-400 hover:text-white transition text-xs font-mono flex items-center gap-1 cursor-pointer"
                    >
                      Clear Roadmap & Create New
                    </button>
                  </div>

                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 py-16">
                  <div className="w-14 h-14 bg-zinc-950 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-500 mb-4 animate-pulse">
                    <Workflow size={24} />
                  </div>
                  <h4 className="font-bold text-zinc-400 text-sm mb-1.5 uppercase tracking-wider">
                    Roadmap Architect Waiting
                  </h4>
                  <p className="text-xs text-zinc-550 max-w-sm leading-relaxed mb-4">
                    Describe your project idea in the left form and hit compile! Sintel Tech will model your architecture, electronics microchips, estimated pricing, and core software blocks dynamically.
                  </p>
                  
                  {/* Showcase cards placeholders */}
                  <div className="grid grid-cols-2 gap-2 text-left w-full max-w-sm mt-3 text-[10px] font-mono text-zinc-650">
                    <div className="bg-zinc-950 border border-zinc-800 p-2 rounded-lg">
                      ⚙️ ANALOG CHIPSETS
                    </div>
                    <div className="bg-zinc-950 border border-zinc-800 p-2 rounded-lg">
                      🌐 MESH DATA FLOW
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        </section>


        {/* 4. Complete Technical Services Grid */}
        <section className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 md:p-8">
          <CapabilityCards />
        </section>


        {/* 5. Contact / Joint-Venture Inquiry form */}
        <section className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-10 relative overflow-hidden">
          {/* Futuristic radar graphic elements */}
          <div className="absolute right-0 bottom-0 top-0 w-96 opacity-5 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_right,#6366f1,transparent_75%)]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Callout */}
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest block">
                PARTNERSHIPS & ALIGNMENT
              </span>
              <h3 className="text-3xl font-extrabold text-white tracking-tight">
                Align Your Team with Sintel Tech Experts
              </h3>
              <p className="text-xs md:text-sm text-zinc-350 leading-relaxed">
                Whether you need a physical prototype assembly, custom micro-sensors, diagnostic motherboard cleaning, a Fast React portal system, or localized enterprise routing setup—we are ready. Sintel Tech specializes in high-speed, cost-competitive technical implementation.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-zinc-300">
                  <span className="p-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded">
                    <Check size={12} />
                  </span>
                  <span><strong>Turnaround:</strong> Dynamic responsive pilots completed rapidly.</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-300">
                  <span className="p-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded">
                    <Check size={12} />
                  </span>
                  <span><strong>Pricing:</strong> Affordable hardware and customizable templates.</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-300">
                  <span className="p-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded">
                    <Check size={12} />
                  </span>
                  <span><strong>Support:</strong> Ongoing software maintenance and system tuning.</span>
                </div>
              </div>
            </div>

            {/* Interactive Inquiry submit box */}
            <div className="lg:col-span-6">
              <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl shadow-xl relative">
                
                {inquirySuccess ? (
                  <div className="text-center py-8 animate-fade-in">
                    <div className="w-14 h-14 bg-indigo-500/15 border border-indigo-500/35 rounded-full flex items-center justify-center text-indigo-455 mx-auto mb-4">
                      <Check size={28} />
                    </div>
                    <h4 className="font-bold text-white text-md mb-2">Inquiry Form Lodged Successfully!</h4>
                    <p className="text-xs text-zinc-355 max-w-sm mx-auto leading-relaxed mb-6">
                      Thank you for contacting Sintel Tech portfolio. An electronics or software specialist will review your details shortly.
                    </p>
                    <button
                      onClick={() => setInquirySuccess(false)}
                      className="px-4 py-2 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-300 hover:text-white transition cursor-pointer"
                    >
                      Send Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2 pb-2 border-b border-zinc-850">
                      Submit a Technology Inquiry
                    </h4>

                    <div>
                      <label className="text-[10px] font-mono text-zinc-400 block mb-1">YOUR NAME</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                        placeholder="e.g. John Doe"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        id="contact-name-input"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-zinc-400 block mb-1">EMAIL ADDRESS</label>
                      <input
                        type="email"
                        required
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                        placeholder="john@company.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        id="contact-email-input"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-zinc-400 block mb-1">SELECT PREFERRED DOMAIN TRACK</label>
                      <select
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-sans"
                        value={contactTrack}
                        onChange={(e) => setContactTrack(e.target.value)}
                        id="contact-track-select"
                      >
                        <option value="AI Integration">A.I. & Chat Solutions (like Batlein)</option>
                        <option value="Electronics">Electronics & Hardware Treatment (like EcoWater)</option>
                        <option value="Embedded Systems">Embedded Systems & PCB Assembly</option>
                        <option value="Networking">Networking Guard & Mesh Mesh</option>
                        <option value="Web & Systems Dvp">Web & Core Systems Dvp</option>
                        <option value="Computer Maintenance">Preventive Motherboard Maintenance</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-zinc-400 block mb-1">OPTIONAL BRIEF DETAIL</label>
                      <textarea
                        rows={3}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                        placeholder="Let us know how we can collaborate..."
                        value={contactFeedback}
                        onChange={(e) => setContactFeedback(e.target.value)}
                        id="contact-feedback-textarea"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submittingInquiry}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 transition text-white font-semibold text-xs py-2.5 rounded-lg text-center cursor-pointer block"
                    >
                      {submittingInquiry ? "transmitting secure protocol..." : "Initiate Secure Consultation Link"}
                    </button>
                  </form>
                )}

              </div>
            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-10 px-6 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold font-sans text-white text-sm">Sintel Tech</span>
            <span className="text-zinc-650">|</span>
            <span>Simplified Technological Blueprints</span>
          </div>
          <div className="font-mono text-[10px] text-zinc-500">
            © 2026 Sintel Tech. Deployed and Hosted via AI Studio sandboxed systems.
          </div>
        </div>
      </footer>

    </div>
  );
}

