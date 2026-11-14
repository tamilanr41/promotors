import { useState, useEffect } from "react";
import {
  Cpu, Zap, BarChart3, FileText, Layers,
  Home, Building2, Factory, Road, PaintBucket,
  CheckCircle, Terminal, Activity, DollarSign, ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";

const projectTypes = [
  { value: "residential", label: "Residential", icon: Home },
  { value: "commercial", label: "Commercial", icon: Building2 },
  { value: "industrial", label: "Industrial", icon: Factory },
  { value: "infrastructure", label: "Infrastructure", icon: Road },
  { value: "renovation", label: "Renovation", icon: PaintBucket },
];

const features = [
  { icon: Zap, title: "Instant Results", description: "Get your estimate in seconds, not days" },
  { icon: BarChart3, title: "Cost Breakdown", description: "Detailed line-item cost analysis" },
  { icon: FileText, title: "PDF Reports", description: "Download professional estimate reports" },
  { icon: Layers, title: "Material Takeoff", description: "Automated material quantity calculations" },
];

export default function Estimator() {
  const [formData, setFormData] = useState({
    projectType: "", squareFootage: "", location: "", quality: "standard", timeline: "normal", description: "",
  });
  const [showResult, setShowResult] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  useEffect(() => {
    const lines = [
      "INIT_ENGINE_v4.2 ... OK",
      "LOAD_PROJECT_DB ... OK",
      "COST_INDEX (regional) ... FETCHED",
      "MATERIAL_PRICES ... SYNCED",
      "LABOR_RATES ... CALCULATED",
      "READY",
    ];
    let i = 0;
    const t = setInterval(() => {
      if (i < lines.length) {
        setTerminalLines((p) => [...p.slice(-9), lines[i]]);
        i++;
      } else clearInterval(t);
    }, 600);
    return () => clearInterval(t);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
  };

  const qualityMultiplier = formData.quality === "economy" ? 0.7 : formData.quality === "standard" ? 1 : formData.quality === "premium" ? 1.4 : 1.8;
  const timelineMultiplier = formData.timeline === "expedited" ? 1.25 : formData.timeline === "normal" ? 1 : 0.85;
  const baseCost = formData.squareFootage ? parseInt(formData.squareFootage) * 139 * qualityMultiplier * timelineMultiplier : 0;

  const costBreakdown = [
    { label: "Foundation & Structure", pct: 32, amt: (baseCost * 0.32).toLocaleString() },
    { label: "MEP Systems", pct: 20, amt: (baseCost * 0.20).toLocaleString() },
    { label: "Interior Finishes", pct: 18, amt: (baseCost * 0.18).toLocaleString() },
    { label: "Labor", pct: 22, amt: (baseCost * 0.22).toLocaleString() },
    { label: "Permits & Misc", pct: 8, amt: (baseCost * 0.08).toLocaleString() },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0a1a" }}>
      <style>{`
        @keyframes glitch {
          0%,100% { transform: translate(0); text-shadow: 0 0 8px #00f0ff, 0 0 16px #00f0ff; }
          20% { transform: translate(-2px,1px); text-shadow: 2px 0 #ff00ff, -2px 0 #00f0ff; }
          40% { transform: translate(2px,-1px); text-shadow: -2px 0 #ff00ff, 2px 0 #00f0ff; }
          60% { transform: translate(-1px,2px); text-shadow: 1px 0 #00f0ff, -1px 0 #ff00ff; }
          80% { transform: translate(1px,-2px); text-shadow: -1px 0 #00f0ff, 1px 0 #ff00ff; }
        }
        @keyframes scanline {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        @keyframes glow-pulse {
          0%,100% { box-shadow: 0 0 6px #00f0ff44, 0 0 12px #00f0ff22, 0 0 0 0 #ff00ff00; }
          50% { box-shadow: 0 0 12px #00f0ff66, 0 0 24px #00f0ff44, 0 0 0 2px #ff00ff44; }
        }
        @keyframes neon-flicker {
          0%,100% { opacity: 1; }
          3% { opacity: 0.6; }
          6% { opacity: 1; }
          7% { opacity: 0.8; }
          8% { opacity: 1; }
          50% { opacity: 0.95; }
          53% { opacity: 0.7; }
          56% { opacity: 1; }
        }
        .glitch-text { animation: glitch 2s infinite; display: inline-block; }
        .scan-line { position: absolute; left: 0; right: 0; height: 3px; background: linear-gradient(90deg,transparent,#00f0ff88,transparent); animation: scanline 3s linear infinite; }
        .neon-glow { animation: glow-pulse 3s ease-in-out infinite; }
        .neon-border { border-color: #00f0ff44; }
        .neon-border:focus-within { border-color: #00f0ff; box-shadow: 0 0 8px #00f0ff33; }
        .chip-active { box-shadow: 0 0 12px #00f0ff66, 0 0 0 1px #00f0ff; }
      `}</style>

      {/* Hero */}
      <section className="relative min-h-[55vh] overflow-hidden">
        <div className="absolute inset-0 opacity-25" style={{
          backgroundImage: `linear-gradient(#00f0ff22 1px,transparent 1px),linear-gradient(90deg,#00f0ff22 1px,transparent 1px)`,
          backgroundSize: "50px 50px"
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[55vh] flex items-center">
          <div className="w-full py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-mono" style={{ border: "1px solid #00f0ff44", color: "#00f0ff", background: "#00f0ff11" }}>
                  <Cpu className="w-3 h-3" /> AI ENGINE v4.2 — ONLINE
                </div>
                <h1 className="text-5xl md:text-7xl font-bold leading-[0.9]" style={{ animation: "neon-flicker 4s infinite" }}>
                  <span style={{ color: "#e0e0ff", textShadow: "0 0 8px #00f0ff66" }}>AI Project</span>
                  <br />
                  <span style={{ color: "#00f0ff", textShadow: "0 0 12px #00f0ff, 0 0 24px #00f0ff88" }}>Estimator</span>
                </h1>
                <p className="text-lg max-w-lg" style={{ color: "#8888aa" }}>
                  Get accurate construction cost estimates in seconds. Powered by machine learning and millions of real project data points.
                </p>
                <div className="flex flex-wrap gap-6">
                  {["90% accuracy", "Free to use", "No signup required"].map((label) => (
                    <span key={label} className="flex items-center gap-2 text-sm" style={{ color: "#00f0ff" }}>
                      <CheckCircle className="w-4 h-4" /> {label}
                    </span>
                  ))}
                </div>
              </div>
              {/* Terminal */}
              <div className="hidden lg:block" style={{ background: "#0a0a1aee", border: "1px solid #00f0ff22", borderRadius: "12px", overflow: "hidden" }}>
                <div className="flex items-center gap-2 px-5 py-3" style={{ borderBottom: "1px solid #00f0ff22", background: "#00f0ff08" }}>
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff0055" }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ffaa00" }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#00ff88" }} />
                  <span className="text-xs font-mono ml-3" style={{ color: "#5555aa" }}>cos-estimator — v4.2</span>
                </div>
                <div className="p-5 space-y-2 font-mono text-xs">
                  <div style={{ color: "#00ff88" }}><Terminal className="w-3 h-3 inline mr-2" />System online. Neural engine loaded.</div>
                  <div style={{ color: "#00f0ff" }}><span className="mr-2">$</span>analyze —region=&quot;global&quot; —model=v4<span className="inline-block w-2 h-4 ml-1" style={{ background: "#00f0ff", animation: "neon-flicker 1s infinite" }} /></div>
                  {terminalLines.map((msg, i) => (
                    <div key={i} style={{ color: msg?.includes("READY") ? "#00ff88" : "#5555aa" }}>
                      <span style={{ color: "#4444aa" }}>[{">"} {i}]</span> {msg}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-24 relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="p-8 md:p-10 neon-glow" style={{ background: "#0a0a1acc", backdropFilter: "blur(24px)", border: "1px solid #00f0ff44", borderRadius: "20px" }}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 flex items-center justify-center text-sm font-bold" style={{ color: "#00f0ff", border: "1px solid #00f0ff66", borderRadius: "10px" }}>&lt;/&gt;</div>
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: "#e0e0ff" }}>Project Details</h2>
                    <p className="text-xs" style={{ color: "#6666aa" }}>Enter your project parameters for an AI estimate</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Project type chips */}
                  <div>
                    <label className="block text-xs font-mono mb-4" style={{ color: "#8888bb" }}>PROJECT_TYPE</label>
                    <div className="flex flex-wrap gap-3">
                      {projectTypes.map((type) => {
                        const Icon = type.icon;
                        const active = formData.projectType === type.value;
                        return (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, projectType: type.value })}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-mono transition-all duration-300 ${active ? "chip-active" : ""}`}
                            style={{
                              background: active ? "#00f0ff18" : "transparent",
                              border: `1px solid ${active ? "#00f0ff" : "#00f0ff33"}`,
                              color: active ? "#00f0ff" : "#6666aa",
                            }}
                          >
                            <Icon className="w-4 h-4" /> {type.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dimensions */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="relative neon-border" style={{ border: "1px solid #00f0ff33", borderRadius: "12px", padding: "0 16px", transition: "all 0.3s" }}>
                      <input
                        type="number"
                        placeholder="Square Footage"
                        value={formData.squareFootage}
                        onChange={(e) => setFormData({ ...formData, squareFootage: e.target.value })}
                        className="w-full py-4 bg-transparent text-base focus:outline-none"
                        style={{ color: "#e0e0ff", border: "none", background: "transparent" }}
                      />
                      <div className="absolute bottom-0 left-4 right-4 h-px" style={{ background: "linear-gradient(90deg,transparent,#00f0ff66,transparent)" }} />
                    </div>
                    <div className="relative neon-border" style={{ border: "1px solid #00f0ff33", borderRadius: "12px", padding: "0 16px", transition: "all 0.3s" }}>
                      <input
                        type="text"
                        placeholder="Location (City, State)"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full py-4 bg-transparent text-base focus:outline-none"
                        style={{ color: "#e0e0ff", border: "none", background: "transparent" }}
                      />
                      <div className="absolute bottom-0 left-4 right-4 h-px" style={{ background: "linear-gradient(90deg,transparent,#00f0ff66,transparent)" }} />
                    </div>
                  </div>

                  {/* Quality & Timeline */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="relative neon-border" style={{ border: "1px solid #00f0ff33", borderRadius: "12px", padding: "0 16px", transition: "all 0.3s" }}>
                      <label className="block text-xs font-mono pt-3" style={{ color: "#8888bb" }}>QUALITY_LEVEL</label>
                      <select
                        value={formData.quality}
                        onChange={(e) => setFormData({ ...formData, quality: e.target.value })}
                        className="w-full py-3 bg-transparent text-base focus:outline-none appearance-none"
                        style={{ color: "#e0e0ff", border: "none", background: "transparent" }}
                      >
                        <option value="economy" style={{ background: "#0a0a1a" }}>Economy</option>
                        <option value="standard" style={{ background: "#0a0a1a" }}>Standard</option>
                        <option value="premium" style={{ background: "#0a0a1a" }}>Premium</option>
                        <option value="luxury" style={{ background: "#0a0a1a" }}>Luxury</option>
                      </select>
                      <ChevronDown className="absolute right-4 bottom-3 w-4 h-4 pointer-events-none" style={{ color: "#5555aa" }} />
                    </div>
                    <div className="relative neon-border" style={{ border: "1px solid #00f0ff33", borderRadius: "12px", padding: "0 16px", transition: "all 0.3s" }}>
                      <label className="block text-xs font-mono pt-3" style={{ color: "#8888bb" }}>TIMELINE</label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full py-3 bg-transparent text-base focus:outline-none appearance-none"
                        style={{ color: "#e0e0ff", border: "none", background: "transparent" }}
                      >
                        <option value="expedited" style={{ background: "#0a0a1a" }}>Expedited</option>
                        <option value="normal" style={{ background: "#0a0a1a" }}>Normal</option>
                        <option value="extended" style={{ background: "#0a0a1a" }}>Extended</option>
                      </select>
                      <ChevronDown className="absolute right-4 bottom-3 w-4 h-4 pointer-events-none" style={{ color: "#5555aa" }} />
                    </div>
                  </div>

                  <div className="relative neon-border" style={{ border: "1px solid #00f0ff33", borderRadius: "12px", padding: "0 16px", transition: "all 0.3s" }}>
                    <label className="block text-xs font-mono pt-3" style={{ color: "#8888bb" }}>DESCRIPTION</label>
                    <textarea
                      placeholder="Describe your project..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full py-3 bg-transparent text-base focus:outline-none resize-none"
                      style={{ color: "#e0e0ff", border: "none", background: "transparent" }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl text-base font-mono font-bold tracking-wider transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg,#00f0ff,#0088ff)",
                      color: "#0a0a1a",
                      boxShadow: "0 0 20px #00f0ff44",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 0 40px #00f0ff88"}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 0 20px #00f0ff44"}
                  >
                    <Cpu className="w-5 h-5 inline mr-2" /> GENERATE ESTIMATE
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Cost preview */}
              <div style={{ background: "#0a0a1acc", backdropFilter: "blur(24px)", border: "1px solid #ff00ff44", borderRadius: "16px", padding: "24px" }}>
                <div className="flex items-center gap-2 mb-6">
                  <DollarSign className="w-4 h-4" style={{ color: "#ff00ff" }} />
                  <h3 className="text-sm font-mono" style={{ color: "#e0e0ff" }}>LIVE_ESTIMATE</h3>
                  {formData.squareFootage && (
                    <span className="ml-auto flex items-center gap-1 text-xs font-mono" style={{ color: "#00ff88" }}>
                      <Activity className="w-3 h-3" /> LIVE
                    </span>
                  )}
                </div>
                {formData.squareFootage ? (
                  <div className="space-y-4">
                    <div className="text-center py-4">
                      <div className="text-xs font-mono mb-1" style={{ color: "#8888bb" }}>ESTIMATED_TOTAL</div>
                      <div className="text-4xl font-bold glitch-text" style={{ color: "#00f0ff" }}>
                        ${baseCost.toLocaleString()}
                      </div>
                      <div className="text-xs font-mono mt-1" style={{ color: "#5555aa" }}>±15% accuracy range</div>
                    </div>
                    <div className="pt-4" style={{ borderTop: "1px solid #ff00ff22" }}>
                      {costBreakdown.map((item) => (
                        <div key={item.label} className="mb-3">
                          <div className="flex justify-between text-xs font-mono mb-1">
                            <span style={{ color: "#8888bb" }}>{item.label}</span>
                            <span style={{ color: "#00f0ff" }}>${item.amt}</span>
                          </div>
                          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#ffffff11" }}>
                            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${item.pct}%`, background: "linear-gradient(90deg,#ff00ff,#00f0ff)" }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4" style={{ borderTop: "1px solid #ff00ff22" }}>
                      <div className="flex justify-between text-xs font-mono">
                        <span style={{ color: "#5555aa" }}>TIMELINE</span>
                        <span style={{ color: "#e0e0ff" }}>{formData.timeline === "expedited" ? "4-6" : formData.timeline === "normal" ? "8-10" : "12-14"} months</span>
                      </div>
                      <div className="flex justify-between text-xs font-mono mt-2">
                        <span style={{ color: "#5555aa" }}>CONFIDENCE</span>
                        <span style={{ color: "#00ff88" }}>92%</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BarChart3 className="w-10 h-10 mx-auto mb-3" style={{ color: "#333366" }} />
                    <p className="text-xs font-mono" style={{ color: "#5555aa" }}>ENTER_SQUARE_FOOTAGE</p>
                  </div>
                )}
              </div>

              {/* Features */}
              <div style={{ background: "#0a0a1acc", backdropFilter: "blur(24px)", border: "1px solid #00f0ff22", borderRadius: "16px", padding: "24px" }}>
                <h3 className="text-sm font-mono mb-5" style={{ color: "#e0e0ff" }}>CAPABILITIES</h3>
                <div className="space-y-4">
                  {features.map((feature) => {
                    const Icon = feature.icon;
                    return (
                      <div key={feature.title} className="flex items-start gap-3 p-3" style={{ border: "1px solid #00f0ff22", borderRadius: "10px", position: "relative" }}>
                        <div style={{ position: "absolute", top: 0, left: 0, width: "8px", height: "8px", borderTop: "2px solid #ff00ff", borderLeft: "2px solid #ff00ff" }} />
                        <div style={{ position: "absolute", top: 0, right: 0, width: "8px", height: "8px", borderTop: "2px solid #ff00ff", borderRight: "2px solid #ff00ff" }} />
                        <div style={{ position: "absolute", bottom: 0, left: 0, width: "8px", height: "8px", borderBottom: "2px solid #ff00ff", borderLeft: "2px solid #ff00ff" }} />
                        <div style={{ position: "absolute", bottom: 0, right: 0, width: "8px", height: "8px", borderBottom: "2px solid #ff00ff", borderRight: "2px solid #ff00ff" }} />
                        <Icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#00f0ff" }} />
                        <div>
                          <div className="text-xs font-mono" style={{ color: "#e0e0ff" }}>{feature.title}</div>
                          <div className="text-xs" style={{ color: "#6666aa" }}>{feature.description}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Result */}
              {showResult && (
                <div className="relative overflow-hidden" style={{ background: "#0a0a1acc", backdropFilter: "blur(24px)", border: "1px solid #00ff8844", borderRadius: "16px" }}>
                  <div className="scan-line" />
                  <div className="px-5 py-3" style={{ borderBottom: "1px solid #00ff8822", background: "#00ff8808" }}>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#00ff88" }} />
                      <span className="text-xs font-mono" style={{ color: "#5555aa" }}>estimate_complete</span>
                    </div>
                  </div>
                  <div className="p-5 space-y-3 font-mono text-sm">
                    <div className="flex items-center gap-2" style={{ color: "#00ff88" }}>
                      <Terminal className="w-4 h-4" /> ESTIMATE GENERATED
                    </div>
                    <div className="p-4 space-y-2" style={{ background: "#00000044", borderRadius: "10px" }}>
                      <div className="flex justify-between text-xs">
                        <span style={{ color: "#8888bb" }}>TYPE</span>
                        <span style={{ color: "#e0e0ff", textTransform: "capitalize" }}>{formData.projectType}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span style={{ color: "#8888bb" }}>AREA</span>
                        <span style={{ color: "#e0e0ff" }}>{formData.squareFootage} sq ft</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span style={{ color: "#8888bb" }}>QUALITY</span>
                        <span style={{ color: "#e0e0ff", textTransform: "capitalize" }}>{formData.quality}</span>
                      </div>
                      <div className="flex justify-between text-xs pt-2" style={{ borderTop: "1px solid #00ff8822" }}>
                        <span style={{ color: "#00f0ff" }}>ESTIMATED COST</span>
                        <span className="text-xl font-bold glitch-text" style={{ color: "#00ff88" }}>${baseCost.toLocaleString()}</span>
                      </div>
                    </div>
                    <Link
                      to="/contact"
                      className="block w-full text-center py-3 rounded-xl font-mono text-sm font-bold transition-all"
                      style={{
                        background: "linear-gradient(135deg,#00ff88,#00f0ff)",
                        color: "#0a0a1a",
                      }}
                    >
                      GET DETAILED QUOTE
                    </Link>
                    <p className="text-[10px] text-center font-mono" style={{ color: "#5555aa" }}>* Indicative estimate — subject to engineering review</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
