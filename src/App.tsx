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
        simpleTechValueAdd: "Simple Tech engineers, tests, installs, and maintains full systems remotely."
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
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* Top Header with live UTC clock and hosting copy parameters */}
      <Header />

      {/* Main Container Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">

        {/* 1. Hero Innovation Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-gray-900 via-gray-950 to-gray-950 border border-gray-800 p-8 md:p-12 lg:p-16">
          {/* Subtle architectural mesh grid background */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              
              {/* Mission label */}
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 rounded-full text-xs font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>LAUNCHING THE FUTURE OF SIMPLIFIED INFRASTRUCTURE</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Empowering Businesses through <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Custom-Integrated Engineering</span>
              </h2>
              
              <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-2xl">
                We are <strong>Simple Tech</strong> — a specialized technology boutique. We bridge the gap between creative business ideas and robust physical or cloud deployments. From <strong>Embedded Electronics</strong> and <strong>Enterprise Mesh Networking</strong>, to <strong>Conversational A.I.</strong> and <strong>Motherboard Maintenance</strong>, we construct affordable hardware and software products.
              </p>

              {/* Action shortcuts */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a 
                  href="#prototype-lab" 
                  className="bg-emerald-500 hover:bg-emerald-400 transition text-black font-semibold text-xs px-5 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-500/10 cursor-pointer"
                >
                  <span>Explore Interactive Prototypes</span>
                  <ArrowRight size={14} />
                </a>
                <a 
                  href="#idea-consultant" 
                  className="bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 transition text-white font-medium text-xs px-5 py-3 rounded-xl flex items-center gap-2 cursor-pointer"
                >
                  <span>Interactive Idea Blueprint Tool</span>
                </a>
              </div>

            </div>

            {/* Visual Abstract Engineering terminal */}
            <div className="lg:col-span-5 bg-gray-950/80 border border-gray-850 rounded-2xl p-5 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-gray-850 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[10px] font-mono text-gray-400 bg-gray-900 border border-gray-800 px-2 py-0.5 rounded">
                  simple_tech_v2.01
                </span>
              </div>
              
              <div className="space-y-3 font-mono text-xs text-gray-400 leading-relaxed">
                <p className="text-gray-500 select-none"># initialize simple_tech modules...</p>
                <div className="flex justify-between border-b border-gray-900 pb-2">
                  <span className="text-white">● AI conversational cores</span>
                  <span className="text-emerald-400">ONLINE</span>
                </div>
                <div className="flex justify-between border-b border-gray-900 pb-2">
                  <span className="text-white">● ESP32 mesh nodes (EcoWater)</span>
                  <span className="text-emerald-400">ACTIVE</span>
                </div>
                <div className="flex justify-between border-b border-gray-900 pb-2">
                  <span className="text-white">● DNS Security filtering</span>
                  <span className="text-emerald-400">SECURED</span>
                </div>
                <div className="flex justify-between border-b border-gray-900 pb-2">
                  <span className="text-white">● Board level diagnostic tools</span>
                  <span className="text-cyan-400">CALIBRATING</span>
                </div>
                <p className="text-emerald-500 text-[11px] mt-2 font-semibold">
                  &gt; ready to implement client-focused custom designs.
                </p>
              </div>

              {/* Decorative tags */}
              <div className="mt-5 flex flex-wrap gap-1">
                {["AI Integration", "Embedded C++", "Board Maintenance", "DNS Mesh", "React Dev"].map((tag, idx) => (
                  <span key={idx} className="text-[9px] font-mono bg-gray-900 text-gray-400 border border-gray-800 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 1.5. Strategic Explainer: Plain English Breakdown */}
        <section className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-40 -mt-40" />
          
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
              GUIDE & COMPREHENSION MODEL
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold font-sans tracking-tight text-white mb-3">
              Understanding Simple Tech: What We Do in Simple Terms
            </h2>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
              New to our startup or looking for a simplified overview of how our operations run? Here is a breakdown of what Simple Tech handles daily, and why we designed our target pilots.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Component 1: Core Company Purpose */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-850 hover:border-emerald-500/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-300/15 flex items-center justify-center text-emerald-400 mb-4">
                  <BookOpen size={20} />
                </div>
                <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide font-sans">
                  Who is Simple Tech?
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  We are an elite boutique engineering lab. We do <strong>NOT</strong> just build websites; we design integrated systems that connect hardware components to digital apps. 
                </p>
                <div className="mt-3 text-[11px] text-gray-500 space-y-1 bg-gray-900/40 p-2 border border-gray-900 rounded">
                  <div>• AI & Agentic software</div>
                  <div>• PCB fabrication & C++</div>
                  <div>• Router networking guards</div>
                </div>
              </div>
              <p className="text-[11px] text-emerald-400 font-mono mt-4">
                Operational Track: Full-Stack
              </p>
            </div>

            {/* Component 2: EcoWater Explanation */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-850 hover:border-cyan-500/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-300/15 flex items-center justify-center text-cyan-400 mb-4">
                  <Cpu size={20} />
                </div>
                <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide font-sans">
                  The EcoWater Dispenser
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Millions lack sweet, pathogen-free water. <strong>EcoWater</strong> is our low-cost dispenser. It uses custom microchips combined with mechanical mesh, activated carbon, and ultraviolet light.
                </p>
                <div className="mt-3 text-[11px] text-gray-500 space-y-1 bg-gray-900/40 p-2 border border-gray-900 rounded">
                  <div>• Removes mud & silt</div>
                  <div>• Destroys bacterial DNA</div>
                  <div>• Re-mineralizes for taste</div>
                </div>
              </div>
              <p className="text-[11px] text-cyan-400 font-mono mt-4">
                Target: Primary Health Access
              </p>
            </div>

            {/* Component 3: Batlein App Explanation */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-850 hover:border-amber-500/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-300/15 flex items-center justify-center text-amber-400 mb-4">
                  <Lightbulb size={20} />
                </div>
                <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide font-sans">
                  The Batlein Chat Engine
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Searching directories for technical repairs or traders is complex. <strong>Batlein</strong> replaces menus with a <strong>chat bar</strong>. You text what you want, and the AI presents direct matches.
                </p>
                <div className="mt-3 text-[11px] text-gray-500 space-y-1 bg-gray-900/40 p-2 border border-gray-900 rounded">
                  <div>• No complex filters needed</div>
                  <div>• Natural Language parser</div>
                  <div>• Direct system connections</div>
                </div>
              </div>
              <p className="text-[11px] text-amber-400 font-mono mt-4">
                Target: Frictionless Commerce
              </p>
            </div>

          </div>

          {/* Quick Flowchart Summary */}
          <div className="mt-8 pt-6 border-t border-gray-850 bg-gray-950/40 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="font-mono bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded">Venture Flow</span>
              <p className="text-gray-400 text-[11px] sm:text-xs">
                Have a raw technology concept? We create the electronics 🔬 → compile custom web code 💻 → and deliver support.
              </p>
            </div>
            <a 
              href="#idea-consultant" 
              className="text-emerald-400 hover:text-emerald-300 transition font-mono shrink-0 flex items-center gap-1 font-bold"
            >
              Try Idea Blueprint Generator
              <ArrowRight size={12} className="inline" />
            </a>
          </div>

        </section>


        {/* 2. Interactive Prototype Lab Showcases */}
        <section id="prototype-lab" className="space-y-8 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-2">
              DEPLOYED ACTIVE PILOTS
            </span>
            <h2 className="text-3xl font-extrabold font-sans text-white tracking-tight">
              Interactive Prototype Sandbox
            </h2>
            <p className="text-gray-400 text-sm mt-3">
              Simple Tech builds real physical and visual products. Toggle between an interactive model of our <strong>EcoWater Smart Dispenser</strong>, or test the live conversational routing of our <strong>Batlein App Engine</strong>.
            </p>
          </div>

          {/* Premium Selector Pills */}
          <div className="flex justify-center">
            <div className="flex bg-gray-900/80 p-1.5 rounded-xl border border-gray-800 gap-1.5">
              <button
                onClick={() => setActiveTab("ecowater")}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold font-sans transition flex items-center gap-2 ${
                  activeTab === "ecowater"
                    ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/10"
                    : "text-gray-400 hover:text-white"
                }`}
                id="tab-ecowater-trigger"
              >
                <Cpu size={14} />
                <span>1. EcoWater Dispenser Pilot</span>
              </button>
              
              <button
                onClick={() => setActiveTab("batlein")}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold font-sans transition flex items-center gap-2 ${
                  activeTab === "batlein"
                    ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/10"
                    : "text-gray-400 hover:text-white"
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
        <section id="idea-consultant" className="bg-gray-950 border border-gray-800 rounded-3xl p-6 md:p-10 shadow-xl scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Input Form Column */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-mono bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider mb-4">
                  <Lightbulb size={12} className="text-amber-400" />
                  <span>Interactive Idea Accelerator</span>
                </div>
                
                <h3 className="text-2xl font-bold font-sans text-white mb-3">
                  Have an Idea? Let's Plan the Implementation.
                </h3>
                
                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  Simple Tech specializes in translating conceptual dreams into physical and software prototypes. Put your industry and idea details below, and our automated architect will formulate a customized technical roadmap.
                </p>

                <form onSubmit={handleGenerateBlueprint} className="space-y-4">
                  
                  {/* Company Name */}
                  <div>
                    <label className="text-[11px] font-mono text-gray-400 block mb-1.5 uppercase">
                      Innovator or Company Name:
                    </label>
                    <input
                      type="text"
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-gray-600 font-sans"
                      placeholder="e.g. AgriGrow Farms, GreenMobility, or yourself"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      id="consult-company-input"
                    />
                  </div>

                  {/* Industry Track */}
                  <div>
                    <label className="text-[11px] font-mono text-gray-400 block mb-1.5 uppercase">
                      Industry / Target Domain:
                    </label>
                    <select
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 font-sans"
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
                      <label className="text-[11px] font-mono text-gray-400 block uppercase">
                        Describe the Idea or Problem:
                      </label>
                      <span className="text-[9px] font-mono text-gray-500">Be descriptive</span>
                    </div>
                    <textarea
                      rows={4}
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-gray-600 font-sans"
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
                    className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-semibold text-xs py-2.5 rounded-lg hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
                    id="generate-blueprint-btn"
                  >
                    {loadingBlueprint ? (
                      <>
                        <div className="w-4 h-4 rounded-full border border-black border-t-transparent animate-spin" />
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

              <div className="text-[10px] text-gray-500 italic mt-4 font-mono leading-normal">
                * Note: Simple Tech leverages Gemini model intelligence to instantly build accurate, realistic structural hardware/software outlines.
              </div>
            </div>

            {/* Generated Schematic Blueprint display Column */}
            <div className="lg:col-span-7 bg-gray-900 border border-gray-850 rounded-2xl p-5 md:p-6 flex flex-col justify-between relative overflow-hidden">
              {/* Holographic style grid accent */}
              <div className="absolute inset-0 bg-radial-gradient from-emerald-500/5 to-transparent pointer-events-none" />

              {loadingBlueprint && (
                <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-xs flex flex-col items-center justify-center text-center p-6 z-20">
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 mb-4 animate-spin">
                    <Workflow size={28} />
                  </div>
                  <h4 className="font-bold text-white text-sm mb-1">Synthesizing Implementation Plan</h4>
                  <p className="text-xs text-gray-400 max-w-sm">Generating recommended electronics chipsets, cloud framework options, cost estimations, security parameters, and Simple Tech milestones...</p>
                </div>
              )}

              {blueprint ? (
                <div className="relative z-10 space-y-5 animate-fade-in font-sans">
                  
                  {/* Success Title Header */}
                  <div className="flex items-start justify-between border-b border-gray-800 pb-4">
                    <div>
                      <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider block mb-1">
                        CTO SYSTEM BLUEPRINT APPROVED
                      </span>
                      <h4 className="text-md font-bold text-white">
                        {companyName || "Innovator"} Custom Roadmap
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-mono text-gray-500 block uppercase">Est. Hardware Cost</span>
                      <span className="text-xs font-bold text-amber-400 font-mono">{blueprint.estimatedHardwareCost}</span>
                    </div>
                  </div>

                  {/* 1. Stack */}
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 block mb-2 uppercase tracking-widest">
                      Recommended Engineering Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {blueprint.recommendedStack.map((tech, index) => (
                        <span 
                          key={index} 
                          className="bg-gray-950 text-emerald-300 text-xs border border-gray-800 px-3 py-1 rounded-md font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 2. Key steps */}
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 block mb-2.5 uppercase tracking-widest">
                      Execution Milestones
                    </span>
                    <div className="space-y-2">
                      {blueprint.keyArchitectureSteps.map((step, idx) => (
                        <div key={idx} className="flex gap-2.5 items-start text-xs text-gray-300">
                          <span className="w-5 h-5 bg-cyan-950 text-cyan-400 text-[10px] font-mono flex items-center justify-center rounded border border-cyan-500/15 shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <p className="leading-relaxed">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. Networking security config */}
                  <div className="bg-gray-950 p-3 border border-gray-850 rounded-xl">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400 uppercase mb-1.5">
                      <Lock size={12} className="text-cyan-400" />
                      <span>Security & Cyber-Safety Strategy</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-normal font-sans">
                      {blueprint.networkingSecurityPlan}
                    </p>
                  </div>

                  {/* 4. Simple Tech value addition */}
                  <div className="bg-emerald-500/5 p-3.5 border border-emerald-500/15 rounded-xl">
                    <span className="text-[10px] font-mono text-emerald-400 block uppercase font-bold tracking-wider mb-1">
                      Our Joint Integration Mandate
                    </span>
                    <p className="text-xs text-gray-300 leading-relaxed font-sans">
                      {blueprint.simpleTechValueAdd}
                    </p>
                  </div>

                  {/* Reset/New consultation buttons */}
                  <div className="flex justify-end pt-2 border-t border-gray-800">
                    <button
                      onClick={() => setBlueprint(null)}
                      className="text-gray-400 hover:text-white transition text-xs font-mono flex items-center gap-1 cursor-pointer"
                    >
                      Clear Roadmap & Create New
                    </button>
                  </div>

                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 py-16">
                  <div className="w-14 h-14 bg-gray-950 border border-gray-800 rounded-full flex items-center justify-center text-gray-500 mb-4 animate-pulse">
                    <Workflow size={24} />
                  </div>
                  <h4 className="font-bold text-gray-400 text-sm mb-1.5 uppercase tracking-wider">
                    Roadmap Architect Waiting
                  </h4>
                  <p className="text-xs text-gray-500 max-w-sm leading-relaxed mb-4">
                    Describe your project idea in the left form and hit compile! Simple Tech will model your architecture, electronics microchips, estimated pricing, and core software blocks dynamically.
                  </p>
                  
                  {/* Showcase cards placeholders */}
                  <div className="grid grid-cols-2 gap-2 text-left w-full max-w-sm mt-3 text-[10px] font-mono text-gray-600">
                    <div className="bg-gray-950 border border-gray-850/60 p-2 rounded-lg">
                      ⚙️ ANALOG CHIPSETS
                    </div>
                    <div className="bg-gray-950 border border-gray-850/60 p-2 rounded-lg">
                      🌐 MESH DATA FLOW
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        </section>


        {/* 4. Complete Technical Services Grid */}
        <section className="bg-gray-900/40 border border-gray-800 rounded-3xl p-6 md:p-8">
          <CapabilityCards />
        </section>


        {/* 5. Contact / Joint-Venture Inquiry form */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-950 to-gray-950 border border-gray-800 rounded-3xl p-6 md:p-10 relative overflow-hidden">
          {/* Futuristic radar graphic elements */}
          <div className="absolute right-0 bottom-0 top-0 w-96 opacity-5 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_right,#10b981,transparent_75%)]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Callout */}
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block">
                PARTNERSHIPS & ALIGNMENT
              </span>
              <h3 className="text-3xl font-extrabold text-white tracking-tight">
                Align Your Team with Simple Tech Experts
              </h3>
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                Whether you need a physical prototype assembly, custom micro-sensors, diagnostic motherboard cleaning, a Fast React portal system, or localized enterprise routing setup—we are ready. Simple Tech specializes in high-speed, cost-competitive technical implementation.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-gray-300">
                  <span className="p-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded">
                    <Check size={12} />
                  </span>
                  <span><strong>Turnaround:</strong> Dynamic responsive pilots completed rapidly.</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-300">
                  <span className="p-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded">
                    <Check size={12} />
                  </span>
                  <span><strong>Pricing:</strong> Affordable hardware and customizable templates.</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-300">
                  <span className="p-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded">
                    <Check size={12} />
                  </span>
                  <span><strong>Support:</strong> Ongoing software maintenance and system tuning.</span>
                </div>
              </div>
            </div>

            {/* Interactive Inquiry submit box */}
            <div className="lg:col-span-6">
              <div className="bg-gray-950 border border-gray-850 p-6 rounded-2xl shadow-xl relative">
                
                {inquirySuccess ? (
                  <div className="text-center py-8 animate-fade-in">
                    <div className="w-14 h-14 bg-emerald-500/15 border border-emerald-500/35 rounded-full flex items-center justify-center text-emerald-400 mx-auto mb-4">
                      <Check size={28} />
                    </div>
                    <h4 className="font-bold text-white text-md mb-2">Inquiry Form Lodged Successfully!</h4>
                    <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed mb-6">
                      Thank you for contacting Simple Tech portfolio. An electronics or software specialist will review your details shortly.
                    </p>
                    <button
                      onClick={() => setInquirySuccess(false)}
                      className="px-4 py-2 bg-gray-900 hover:bg-gray-850 border border-gray-800 rounded-lg text-xs font-mono text-gray-300 hover:text-white transition cursor-pointer"
                    >
                      Send Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2 pb-2 border-b border-gray-850">
                      Submit a Technology Inquiry
                    </h4>

                    <div>
                      <label className="text-[10px] font-mono text-gray-400 block mb-1">YOUR NAME</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-gray-900 border border-gray-850 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                        placeholder="e.g. John Doe"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        id="contact-name-input"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-gray-400 block mb-1">EMAIL ADDRESS</label>
                      <input
                        type="email"
                        required
                        className="w-full bg-gray-900 border border-gray-850 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                        placeholder="john@company.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        id="contact-email-input"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-gray-400 block mb-1">SELECT PREFERRED DOMAIN TRACK</label>
                      <select
                        className="w-full bg-gray-900 border border-gray-850 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
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
                      <label className="text-[10px] font-mono text-gray-400 block mb-1">OPTIONAL BRIEF DETAIL</label>
                      <textarea
                        rows={3}
                        className="w-full bg-gray-900 border border-gray-850 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                        placeholder="Let us know how we can collaborate..."
                        value={contactFeedback}
                        onChange={(e) => setContactFeedback(e.target.value)}
                        id="contact-feedback-textarea"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submittingInquiry}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 transition text-black font-semibold text-xs py-2.5 rounded-lg text-center cursor-pointer block"
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
      <footer className="border-t border-gray-900 bg-gray-950 py-10 px-6 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold font-sans text-white text-sm">Simple Tech</span>
            <span className="text-gray-600">|</span>
            <span>Simplified Technological Blueprints</span>
          </div>
          <div className="font-mono text-[10px] text-gray-500">
            © 2026 Simple Tech. Deployed and Hosted via AI Studio sandboxed systems.
          </div>
        </div>
      </footer>

    </div>
  );
}

