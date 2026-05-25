import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, User, Sparkles, Phone, MapPin, Check, Code, ExternalLink, RefreshCw } from "lucide-react";
import { ChatMessage, BusinessMatch } from "../types";

export default function BatleinChatDemo() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-1",
      sender: "batlein",
      text: "Welcome to Batlein Local Business Gateway! I am an AI router built by Simple Tech. Tell me exactly what services or goods you are looking for in the box below, and I will instantly connect you directly to perfect local businesses.",
      timestamp: new Date()
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [connectedBusiness, setConnectedBusiness] = useState<BusinessMatch | null>(null);
  const [connectingProgress, setConnectingProgress] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    "I need an affordable computer repair shop to fix motherboards",
    "Looking for a reliable local plumber",
    "Where can I buy fresh organic vegetables in bulk?",
    "Need a React web developer to build my startup platform"
  ];

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    // 1. Add User message
    const userMsg: ChatMessage = {
      id: "user-" + Date.now(),
      sender: "user",
      text: text,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMsg]);
    setUserInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/batlein/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });

      if (!response.ok) {
        throw new Error("API Route issue");
      }

      const responseData = await response.json();

      // 2. Add System message with matched providers array
      const batleinMsg: ChatMessage = {
        id: "batlein-" + Date.now(),
        sender: "batlein",
        text: responseData.reply || "Matched with providers solving your specific request.",
        matches: responseData.matches || [],
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, batleinMsg]);
    } catch (error) {
      console.error("Batlein connection error:", error);
      // Fallback response inside front-end in case of server timeouts or issues
      const errResponse: ChatMessage = {
        id: "err-" + Date.now(),
        sender: "batlein",
        text: "Connected with Simple Tech primary maintenance and developer network to fulfill your need.",
        matches: [
          { name: "Simple Tech Hardware Support", category: "Hardware Diagnostics", description: "Diagnostics, BIOS setups & motherboard cleanups.", phone: "+1 (555) 7000", address: "Local Hub", matchScore: 99, accentColor: "#10b981" },
          { name: "Batlein Systems Ltd", category: "Web Systems Dvp", description: "Expert React, Express & automated mobile systems.", phone: "+1 (555) 9000", address: "Web Portal", matchScore: 95, accentColor: "#0ea5e9" }
        ],
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errResponse]);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectBusiness = (biz: BusinessMatch) => {
    setConnectedBusiness(biz);
    setConnectingProgress(10);
  };

  // Simulate an interactive encrypted connection dialer
  useEffect(() => {
    if (connectedBusiness && connectingProgress > 0 && connectingProgress < 100) {
      const interval = setInterval(() => {
        setConnectingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 15;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [connectedBusiness, connectingProgress]);

  return (
    <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6 shadow-xl text-white">
      
      {/* App Descriptor */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-800 pb-5 mb-6">
        <div>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Proprietary AI Software Demo
          </span>
          <h3 className="text-xl font-bold font-sans text-white mt-2">
            Batlein Live Conversational Gateway
          </h3>
          <p className="text-xs text-gray-400">
            A revolutionary interface replacing complicated search filters with a conversational agent that matches and displays structured providers immediately.
          </p>
        </div>
        <div className="flex gap-2">
          <span className="text-xs bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-lg text-emerald-400 font-mono">
            ● Conversational API Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Sample prompts sidebar */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-gray-900/60 p-4 border border-gray-800 rounded-xl">
            <h4 className="text-xs font-mono font-bold text-gray-400 mb-3 uppercase tracking-wider">
              Try Sample Prompts:
            </h4>
            <div className="space-y-2">
              {samplePrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p)}
                  className="w-full text-left text-xs bg-gray-950 hover:bg-gray-900 border border-gray-800 hover:border-cyan-500/35 p-2.5 rounded-lg transition-all text-gray-300 hover:text-cyan-300 block font-sans"
                  disabled={loading}
                  id={`sample-prompt-btn-${idx}`}
                >
                  "{p}"
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 text-[11px] text-gray-400 leading-relaxed font-sans block">
            <span className="text-white font-bold block mb-1">How it works:</span>
            When you type a query, Simple Tech's server-parsed LLM infers intent, maps keywords, and returns matching businesses with live call-to-actions. Highly robust!
          </div>
        </div>

        {/* Right Column: Chat layout */}
        <div className="lg:col-span-9 flex flex-col h-[520px] bg-gray-900/40 border border-gray-800 rounded-xl overflow-hidden justify-between">
          
          {/* Chat Messages flow viewer */}
          <div className="p-4 overflow-y-auto space-y-4 flex-1">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 max-w-[85%] ${m.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                {/* Avatar Icon */}
                <div className={`p-1.5 rounded-full h-8 w-8 flex items-center justify-center shrink-0 border ${
                  m.sender === "user" ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                }`}>
                  {m.sender === "user" ? <User size={14} /> : <Sparkles size={14} />}
                </div>

                {/* Bubble Container */}
                <div className="space-y-3">
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    m.sender === "user" ? "bg-cyan-950/40 text-cyan-100 border border-cyan-500/15 rounded-tr-none" : "bg-gray-950/60 text-gray-300 border border-gray-800 rounded-tl-none"
                  }`}>
                    {m.text}
                  </div>

                  {/* If match card is available */}
                  {m.matches && m.matches.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                      {m.matches.map((biz, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-950 border border-gray-850 p-3.5 rounded-xl hover:border-gray-700 transition"
                          style={{ borderLeft: `3px solid ${biz.accentColor}` }}
                        >
                          <div className="flex justify-between items-start gap-1 mb-1.5">
                            <span 
                              className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                              style={{ backgroundColor: `${biz.accentColor}1A`, color: biz.accentColor }}
                            >
                              {biz.category}
                            </span>
                            <span className="text-[10px] text-gray-500 font-mono">
                              Match: <strong className="text-white">{biz.matchScore}%</strong>
                            </span>
                          </div>

                          <h5 className="font-bold text-xs text-white mb-1">{biz.name}</h5>
                          <p className="text-[10px] text-gray-400 mb-3">{biz.description}</p>

                          <div className="space-y-1.5 text-[10px] text-gray-500 font-mono mb-3">
                            <div className="flex items-center gap-1">
                              <Phone size={10} className="text-gray-400" />
                              <span>{biz.phone}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin size={10} className="text-gray-400" />
                              <span className="truncate">{biz.address}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleConnectBusiness(biz)}
                            className="w-full py-1.5 rounded-lg text-center font-sans font-medium text-[10px] text-white hover:opacity-95 text-xs transition duration-200"
                            style={{ backgroundColor: biz.accentColor }}
                            id={`connect-${biz.name}`}
                          >
                            Connect Instantly
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono bg-cyan-500/5 border border-cyan-500/10 p-3 rounded-xl max-w-sm mr-auto">
                <RefreshCw size={12} className="animate-spin" />
                <span>Batlein router parsing intent and scoring matching hubs...</span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Form message sender inputs */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(userInput); }}
            className="p-3 bg-gray-950 border-t border-gray-850 flex gap-2"
          >
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type what service, tech, or goods you need (e.g. 'I need some computer maintenance')..."
              className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-gray-500"
              disabled={loading}
              id="batlein-chat-input"
            />
            <button
              type="submit"
              disabled={loading || !userInput.trim()}
              className="bg-cyan-500 hover:bg-cyan-600 transition p-2.5 rounded-xl text-black font-semibold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              id="send-chat-btn"
            >
              <Send size={15} />
            </button>
          </form>

        </div>

      </div>

      {/* Simulated Connection dialer Overlay dialog */}
      {connectedBusiness && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-gray-950 border border-gray-800 rounded-2xl max-w-sm w-full p-5 text-center shadow-2xl relative">
            
            <div className="w-14 h-14 mx-auto mb-4 bg-emerald-500/15 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400">
              <Phone size={24} className={connectingProgress < 100 ? "animate-bounce" : ""} />
            </div>

            <h4 className="font-bold font-sans text-md text-white mb-1">
              {connectingProgress < 100 ? "Connecting to Provider Account" : "Secure Line Connected!"}
            </h4>
            <p className="text-xs text-gray-400 font-mono mb-4 text-emerald-400">
              {connectedBusiness.name}
            </p>

            <div className="text-xs text-left space-y-2 bg-gray-900/60 p-3 border border-gray-850 rounded-xl mb-5 font-mono">
              <div className="flex justify-between">
                <span className="text-gray-500">Service:</span>
                <span className="text-white">{connectedBusiness.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Contact:</span>
                <span className="text-white">{connectedBusiness.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Routing Node:</span>
                <span className="text-cyan-400">BATLEIN_NODE_{connectedBusiness.matchScore}</span>
              </div>
            </div>

            {/* Simulated progress wire */}
            <div className="w-full bg-gray-900 border border-gray-800 h-2 rounded-full overflow-hidden mb-6">
              <div 
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${connectingProgress}%` }}
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setConnectedBusiness(null)}
                className="flex-1 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg border border-gray-800 transition font-sans cursor-pointer"
                id="close-connection-btn"
              >
                {connectingProgress < 100 ? "Cancel" : "Close Hub"}
              </button>
              
              {connectingProgress === 100 && (
                <a
                  href={`tel:${connectedBusiness.phone}`}
                  className="flex-1 py-1.5 text-xs bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-lg transition text-center inline-block font-sans"
                >
                  Dial Now
                </a>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
