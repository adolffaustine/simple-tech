import React from "react";
import { Sparkles, Cpu, Radio, Globe, Wrench, Lightbulb } from "lucide-react";

interface Capability {
  id: string;
  title: string;
  description: string;
  iconName: 'ai' | 'electronics' | 'networking' | 'web' | 'maintenance' | 'consultancy';
  badge: string;
  specs: string[];
}

export default function CapabilityCards() {
  const capabilities: Capability[] = [
    {
      id: "cap-ai",
      title: "AI Integration & Agents",
      description: "Custom Large Language Model pipelines, conversational gateways (like Batlein), NLP intent-matching, and automated structural planners.",
      iconName: "ai",
      badge: "Gemini 3.5 Core",
      specs: ["Interactive Chatbots", "JSON Schema Processing", "Automated Workflows"]
    },
    {
      id: "cap-[electrical]",
      title: "Electronics & Embedded Systems",
      description: "Physical microcontrollers, PCB design, sensors, customized actuators, and smart filtration mechanics (like EcoWater).",
      iconName: "electronics",
      badge: "ESP32 & ARM Cortex",
      specs: ["Analog Sensor Hubs", "Dynamic Actuator Gates", "RTOS C++ Firmware"]
    },
    {
      id: "cap-net",
      title: "Enterprise Networking",
      description: "Strategic virtual private routing, low-cost local network gateways, smart watchdogs, rogue device prevention, and multi-node meshes.",
      iconName: "networking",
      badge: "IoT Watchdog",
      specs: ["Automated DNS Filtering", "Mesh Load-Balancers", "Rogue Blockers"]
    },
    {
      id: "cap-web",
      title: "Web & Core Systems Dvp",
      description: "Pristine client applications, Express backgrounds, lightweight production bundling, and fast database-backed cloud platforms.",
      iconName: "web",
      badge: "React & Express",
      specs: ["Vite Component Styling", "Tailwind Fluid Layouts", "Secure REST Endpoints"]
    },
    {
      id: "cap-tech",
      title: "Computer Maintenance",
      description: "Preventive component testing, motherboard level troubleshooting, custom cooling engineering, firmware reprogramming, and clean operating setups.",
      iconName: "maintenance",
      badge: "Diagnostic Lab",
      specs: ["Board Thermography", "BIOS Flushing", "Preventive Airflow Optimization"]
    },
    {
      id: "cap-collab",
      title: "Joint Venture Implementation",
      description: "We translate startup hypotheses into ready-to-test hardware prototypes and responsive web applications. Share your dream, we do the engineering.",
      iconName: "consultancy",
      badge: "Full-Cycle Delivery",
      specs: ["CAD Circuit Blueprints", "Agile Pilot Launch", "Maintenance Support"]
    }
  ];

  const renderIcon = (type: string) => {
    switch (type) {
      case "ai":
        return <Sparkles className="text-indigo-400 group-hover:animate-bounce" size={24} />;
      case "electronics":
        return <Cpu className="text-violet-400 group-hover:rotate-12 transition-transform duration-300" size={24} />;
      case "networking":
        return <Radio className="text-sky-400 group-hover:scale-110 transition-transform duration-300" size={24} />;
      case "web":
        return <Globe className="text-blue-400 group-hover:spin transition-all" size={24} />;
      case "maintenance":
        return <Wrench className="text-purple-400 group-hover:-rotate-12 transition-transform duration-300" size={24} />;
      default:
        return <Lightbulb className="text-pink-400 animate-pulse" size={24} />;
    }
  };

  return (
    <div className="py-6 px-2">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl md:text-3xl font-extrabold font-sans tracking-tight text-white mb-3">
          Our Technology Capabilities
        </h2>
        <p className="text-zinc-300 text-sm">
          Sintel Tech delivers reliable, cost-efficient, hardware-integrated digital solutions across key domain fields to empower modern operations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {capabilities.map((cap) => (
          <div
            key={cap.id}
            id={cap.id}
            className="group relative bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 hover:border-indigo-500/40 hover:bg-zinc-900/80 transition-all duration-300 shadow-lg hover:shadow-indigo-500/5 flex flex-col justify-between"
          >
            <div>
              {/* Header inside Card */}
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-zinc-950 rounded-lg border border-zinc-800 group-hover:border-indigo-500/20 group-hover:bg-zinc-900 transition-colors">
                  {renderIcon(cap.iconName)}
                </div>
                <span className="text-[10px] font-mono bg-zinc-800 text-zinc-200 border border-zinc-700 px-2.5 py-0.5 rounded-full">
                  {cap.badge}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold font-sans text-white group-hover:text-indigo-400 transition-colors mb-2">
                {cap.title}
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                {cap.description}
              </p>
            </div>

            {/* Technical Sub-specs */}
            <div className="border-t border-zinc-800/80 pt-3">
              <span className="text-[10px] font-mono text-zinc-400 block mb-2 uppercase tracking-widest">
                Deliverables
              </span>
              <div className="flex flex-wrap gap-1.5">
                {cap.specs.map((spec, index) => (
                  <span
                    key={index}
                    className="text-[10px] bg-zinc-950/80 text-zinc-200 px-2 py-0.5 rounded border border-zinc-800 group-hover:border-zinc-700 transition-colors"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
