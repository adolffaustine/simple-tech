import React, { useState, useEffect } from "react";
import { Filter, Droplet, Check, Sliders, AlertCircle, Sparkles, DollarSign } from "lucide-react";

interface WaterSource {
  id: string;
  name: string;
  initialTds: number;
  initialTurbidity: number; // 0 (clear) - 100 (super dirty)
  initialPathogens: number; // 0 - 100
  initialTaste: 'Bitter/Mucky' | 'Salty' | 'Chemical' | 'Earthy';
}

export default function EcoWaterSimulator() {
  const waterSources: WaterSource[] = [
    { id: "river", name: "Silty River Water", initialTds: 450, initialTurbidity: 85, initialPathogens: 90, initialTaste: "Earthy" },
    { id: "well", name: "Heavy Metal Well", initialTds: 800, initialTurbidity: 40, initialPathogens: 35, initialTaste: "Bitter/Mucky" },
    { id: "chlorine", name: "Heavy Chlorinated Tap", initialTds: 220, initialTurbidity: 5, initialPathogens: 2, initialTaste: "Chemical" },
    { id: "brackish", name: "Saline Brackish Water", initialTds: 1200, initialTurbidity: 15, initialPathogens: 15, initialTaste: "Salty" }
  ];

  const [selectedSource, setSelectedSource] = useState<WaterSource>(waterSources[0]);
  const [meshFilter, setMeshFilter] = useState(true);
  const [charcoalFilter, setCharcoalFilter] = useState(false);
  const [uvSterilizer, setUvSterilizer] = useState(false);
  const [mineralizer, setMineralizer] = useState(false);

  // Dynamic telemetry scores
  const [tds, setTds] = useState(selectedSource.initialTds);
  const [turbidity, setTurbidity] = useState(selectedSource.initialTurbidity);
  const [pathogens, setPathogens] = useState(selectedSource.initialPathogens);
  const [taste, setTaste] = useState(selectedSource.initialTaste);
  const [healthRating, setHealthRating] = useState(30); // 0-100%

  useEffect(() => {
    // Math model of the electronic water treating steps
    let currentTds = selectedSource.initialTds;
    let currentTurbidity = selectedSource.initialTurbidity;
    let currentPathogens = selectedSource.initialPathogens;
    let currentTaste = selectedSource.initialTaste;

    // 1. Mechanical mesh decreases turbidity profoundly, slight TDS drop
    if (meshFilter) {
      currentTurbidity = Math.max(2, Math.round(currentTurbidity * 0.1));
      currentTds = Math.max(10, Math.round(currentTds * 0.9));
    }

    // 2. Activated charcoal absorbs odor, bad taste, chemical tastes, lowers TDS & turbidity
    if (charcoalFilter) {
      currentTurbidity = Math.max(1, Math.round(currentTurbidity * 0.4));
      currentTds = Math.max(5, Math.round(currentTds * 0.7));
      if (currentTaste === "Chemical" || currentTaste === "Bitter/Mucky") {
        currentTaste = "Earthy";
      }
    }

    // 3. UV-C eliminates pathogens almost fully (99.9%)
    if (uvSterilizer) {
      currentPathogens = Math.max(0, Math.round(currentPathogens * 0.001));
    }

    // 4. Mineralizer reconstructs standard drinking TDS and updates taste to Great
    if (mineralizer) {
      // Re-mineralization adds pure calcium/magnesium back, stabilizing TDS to sweet spot (120-180 mg/l)
      currentTds = Math.round(currentTds * 0.6 + 130);
      if (meshFilter && charcoalFilter && uvSterilizer) {
        currentTaste = "Great" as any; // Sweet/Crisp
      } else if (charcoalFilter) {
        currentTaste = "Flat Mineral" as any;
      }
    } else {
      // General safety taste without remineralization
      if (meshFilter && charcoalFilter && uvSterilizer) {
        currentTaste = "Clean but Flat" as any;
      }
    }

    // Health Rating based on pathogens and turbidity
    const bioHazardPenality = currentPathogens * 0.75;
    const sedimentPenalty = currentTurbidity * 0.35;
    const score = Math.max(5, Math.min(100, Math.round(100 - bioHazardPenality - sedimentPenalty)));

    setTds(currentTds);
    setTurbidity(currentTurbidity);
    setPathogens(currentPathogens);
    setTaste(currentTaste);
    setHealthRating(score);

  }, [selectedSource, meshFilter, charcoalFilter, uvSterilizer, mineralizer]);

  // Handle Water Source change
  const handleSourceChange = (srcId: string) => {
    const src = waterSources.find(w => w.id === srcId);
    if (src) {
      setSelectedSource(src);
    }
  };

  return (
    <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6 shadow-xl text-white">
      
      {/* Intro info */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-800 pb-5 mb-6">
        <div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
            IoT EcoWater Purifier
          </span>
          <h3 className="text-xl font-bold font-sans text-white mt-2">
            EcoWater Smart Dispenser Simulator
          </h3>
          <p className="text-xs text-gray-400">
            Microcontroller hardware prototype using automated mesh arrays, UV-C sterilizers, and mineral release gates.
          </p>
        </div>
        <div className="bg-gray-900 px-4 py-2 border border-gray-800 rounded-lg text-right">
          <span className="text-[10px] font-mono text-gray-400 block uppercase">Project Metric</span>
          <span className="text-lg font-bold font-mono text-emerald-400">$0.008 / Liter</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Input Settings and filtration nodes */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Selection Source */}
          <div className="bg-gray-900/60 p-4 border border-gray-800 rounded-xl">
            <label className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-3">
              1. Choose Input Untreated Water Source:
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {waterSources.map((w) => (
                <button
                  key={w.id}
                  onClick={() => handleSourceChange(w.id)}
                  className={`p-2.5 text-xs font-medium rounded-lg border transition text-center ${
                    selectedSource.id === w.id
                      ? "bg-emerald-500/15 border-emerald-400 text-emerald-400 shadow-md shadow-emerald-500/5"
                      : "bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white"
                  }`}
                  id={`water-source-${w.id}`}
                >
                  {w.name}
                </button>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4 mt-3 pt-3 border-t border-gray-800/60 text-xs text-gray-400 font-mono">
              <div>Source TDS: <span className="text-white font-bold">{selectedSource.initialTds} ppm</span></div>
              <div>Turbidity: <span className="text-white font-bold">{selectedSource.initialTurbidity} NTU</span></div>
              <div>Pathogens: <span className="text-red-400 font-bold">{selectedSource.initialPathogens}% load</span></div>
            </div>
          </div>

          {/* 2. Interactive Hardware Filters Toggle Matrix */}
          <div className="bg-gray-900/60 p-4 border border-gray-800 rounded-xl">
            <label className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-3">
              2. Toggle Active Treatment Physical Hardware Stages:
            </label>
            
            <div className="space-y-3">
              
              {/* Mesh Filter Toggle */}
              <div 
                className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                  meshFilter ? "bg-emerald-500/5 border-emerald-500/30" : "bg-gray-950/60 border-gray-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded ${meshFilter ? "bg-emerald-500/20 text-emerald-400" : "bg-gray-800 text-gray-500"}`}>
                    <Filter size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Mechanical Micro-Mesh Grid</h4>
                    <p className="text-[10px] text-gray-400">Removes mud, silt, and macroscopic particulate matter</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={meshFilter}
                  onChange={(e) => setMeshFilter(e.target.checked)}
                  className="w-4 h-4 text-emerald-500 bg-gray-900 border-gray-700 rounded focus:ring-emerald-500 focus:ring-offset-gray-950 cursor-pointer"
                  id="toggle-mesh-mesh"
                />
              </div>

              {/* Activated Charcoal Toggle */}
              <div 
                className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                  charcoalFilter ? "bg-emerald-500/5 border-emerald-500/30" : "bg-gray-950/60 border-gray-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded ${charcoalFilter ? "bg-emerald-500/20 text-emerald-400" : "bg-gray-800 text-gray-500"}`}>
                    <Sliders size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Granular Charcoal Grid</h4>
                    <p className="text-[10px] text-gray-400">Absorbs chemical pesticides, heavy chlorine, and foul odor</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={charcoalFilter}
                  onChange={(e) => setCharcoalFilter(e.target.checked)}
                  className="w-4 h-4 text-emerald-500 bg-gray-900 border-gray-700 rounded focus:ring-emerald-500 focus:ring-offset-gray-950 cursor-pointer"
                  id="toggle-charcoal-grid"
                />
              </div>

              {/* UV Sterilize Toggle */}
              <div 
                className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                  uvSterilizer ? "bg-emerald-500/5 border-emerald-500/30" : "bg-gray-950/60 border-gray-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded ${uvSterilizer ? "bg-emerald-500/20 text-emerald-400 animate-pulse" : "bg-gray-800 text-gray-500"}`}>
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">High-Intensified UV-C Reactor</h4>
                    <p className="text-[10px] text-gray-400">Disrupts bacterial, amoebic and viral DNA pathologically</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={uvSterilizer}
                  onChange={(e) => setUvSterilizer(e.target.checked)}
                  className="w-4 h-4 text-emerald-500 bg-gray-900 border-gray-700 rounded focus:ring-emerald-500 focus:ring-offset-gray-950 cursor-pointer"
                  id="toggle-uv-sterilizer"
                />
              </div>

              {/* Re-Mineralization Toggle */}
              <div 
                className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                  mineralizer ? "bg-emerald-500/5 border-emerald-500/30" : "bg-gray-950/60 border-gray-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded ${mineralizer ? "bg-emerald-500/20 text-emerald-400" : "bg-gray-800 text-gray-500"}`}>
                    <Droplet size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Magnesium & Calcium Re-balancer</h4>
                    <p className="text-[10px] text-gray-400">Optimizes water taste alkalinity and adds rich organic trace minerals</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={mineralizer}
                  onChange={(e) => setMineralizer(e.target.checked)}
                  className="w-4 h-4 text-emerald-500 bg-gray-900 border-gray-700 rounded focus:ring-emerald-500 focus:ring-offset-gray-950 cursor-pointer"
                  id="toggle-remineralizer"
                />
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Output telemetry state */}
        <div className="lg:col-span-5 bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block mb-4">
              Real-time Output Sensor Telemetry
            </span>
            
            {/* Visual Health Rating Dial */}
            <div className="text-center py-4 border-b border-gray-850">
              <span className="text-[10px] font-mono text-gray-400 block mb-1 uppercase">Purity Safety Rating</span>
              <div className="relative inline-flex items-center justify-center p-6 bg-gray-950 rounded-full border border-gray-800 ring-4 ring-gray-900/40">
                <span className={`text-3xl font-extrabold font-mono transition-colors duration-500 ${
                  healthRating >= 90 ? "text-emerald-400" : healthRating >= 70 ? "text-yellow-400" : "text-red-400"
                }`}>
                  {healthRating}%
                </span>
              </div>
              <div className="mt-2">
                {healthRating >= 90 ? (
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/15">
                    <Check size={12} /> Certified Safe to Drink
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs text-red-400 font-semibold bg-red-500/10 px-2.5 py-0.5 rounded-full border border-red-500/15 animate-pulse">
                    <AlertCircle size={12} /> Untreated Hazards Detected
                  </span>
                )}
              </div>
            </div>

            {/* Readout stats */}
            <div className="space-y-4 pt-4">
              
              {/* TDS gauge */}
              <div>
                <div className="flex justify-between text-xs mb-1 font-mono">
                  <span className="text-gray-400">Total Dissolved Solids (TDS):</span>
                  <span className="text-white font-bold">{tds} ppm</span>
                </div>
                <div className="w-full bg-gray-950 h-1.5 rounded-full overflow-hidden border border-gray-800">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      tds <= 250 ? "bg-emerald-400" : tds <= 600 ? "bg-yellow-400" : "bg-red-400"
                    }`}
                    style={{ width: `${Math.min(100, (tds / 1200) * 100)}%` }}
                  />
                </div>
                <span className="text-[9px] font-mono text-gray-500 mt-0.5 block leading-normal">
                  WHO target: 100-300 ppm for excellent taste.
                </span>
              </div>

              {/* Turbidity gauge */}
              <div>
                <div className="flex justify-between text-xs mb-1 font-mono">
                  <span className="text-gray-400">Turbidity (Sediment Mud):</span>
                  <span className="text-white font-bold">{turbidity} NTU</span>
                </div>
                <div className="w-full bg-gray-950 h-1.5 rounded-full overflow-hidden border border-gray-800">
                  <div 
                    className="h-full bg-cyan-400 transition-all duration-500"
                    style={{ width: `${turbidity}%` }}
                  />
                </div>
              </div>

              {/* Biotic pathogen safety */}
              <div>
                <div className="flex justify-between text-xs mb-1 font-mono">
                  <span className="text-gray-400">Pathogens Safety (Bacteria/Virus):</span>
                  <span className={`font-bold ${pathogens === 0 ? "text-emerald-400" : "text-red-400"}`}>
                    {pathogens === 0 ? "0% (Fully Sterile)" : `${pathogens}% Alert`}
                  </span>
                </div>
                <div className="w-full bg-gray-950 h-1.5 rounded-full overflow-hidden border border-gray-800">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      pathogens === 0 ? "bg-emerald-400" : "bg-red-500"
                    }`}
                    style={{ width: `${pathogens}%` }}
                  />
                </div>
              </div>

              {/* Final Taste profile */}
              <div className="flex items-center justify-between text-xs font-mono bg-gray-950 border border-gray-850 p-2.5 rounded-lg">
                <span className="text-gray-400">Alkaline Taste Profile:</span>
                <span className={`font-bold px-2 py-0.5 rounded ${
                  taste === "Great" ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20" : "text-yellow-400 bg-yellow-500/10 border border-yellow-500/20"
                }`}>
                  {taste}
                </span>
              </div>

            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-gray-800 bg-gray-950/40 p-3 rounded-lg text-[11px] text-gray-400 leading-normal space-y-1 font-sans">
            <span className="text-white font-bold block mb-1">Affordable Hardware Innovation:</span>
            Designed with non-proprietary high-efficiency mechanical mesh coupled with custom electronic solar chargers. Simple Tech licenses this device schematic cheaply to support sanitation access!
          </div>

        </div>

      </div>

    </div>
  );
}
