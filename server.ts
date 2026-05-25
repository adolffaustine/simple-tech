import express from "express";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("GEMINI_API_KEY environment variable is not defined. AI features will fallback to offline mock generators.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

app.use(express.json());

// 1. Batlein Intelligent conversational endpoint
app.post("/api/batlein/chat", async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    // Elegant fallback simulation if API key is not yet set
    const fallbackResponses = [
      {
        reply: "Hi! I found some great local tech assistants and electronics repairs nearby that fit your query.",
        matches: [
          { name: "Electralab Systems", category: "Electronics & Embedded", description: "Specialists in firmware and custom PCB repairs.", phone: "+1 (555) 0192", address: "Tech District, Block B", matchScore: 98, accentColor: "#0ea5e9" },
          { name: "ByteFix Maintenance", category: "Computer Maintenance", description: "Quick turn-around motherboard Diagnostics and hardware cleaning.", phone: "+1 (555) 0481", address: "Downtown Ave 45", matchScore: 92, accentColor: "#f59e0b" }
        ]
      },
      {
        reply: "Hello! Based on your request, I identified two premium web agencies ready to assist.",
        matches: [
          { name: "Simple Tech Web Studio", category: "Web & Systems Dvp", description: "Our elite web development team. We build lighting fast React portals.", phone: "+1 (555) 1000", address: "Simple Tech HQ (Remote/Global)", matchScore: 100, accentColor: "#10b981" },
          { name: "Apex NetSolutions", category: "Networking", description: "High performance wireless setups and remote server diagnostics.", phone: "+1 (555) 0399", address: "Highroad Pl, Ste 2", matchScore: 89, accentColor: "#6366f1" }
        ]
      }
    ];
    const picked = fallbackResponses[Math.abs(message.length) % fallbackResponses.length];
    return res.json(picked);
  }

  try {
    const ai = getGeminiClient();
    const systemInstruction = `You are the core intelligence of Batlein App, an ultra-fast business connection engine built by Simple Tech.
The user is describing what they want or what business problem they have. You must do two things:
1. Provide a warm, conversational, 1-to-2 sentence response explaining that you matched their need.
2. Formulate 1 to 3 realistic mock matches (such as local plumbers, technicians, web developers, food suppliers, system architects) that can perfectly execute their request.
Include interesting contact numbers, real-world sounding addresses, matching scores, and choose high-contrast accent colors (e.g., #0ea5e9 for blue, #10b981 for green, #f59e0b for amber, #6366f1 for purple, #ec4899 for pink).

You MUST output strictly in JSON format according to the schema specified.`;

    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: message,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["reply", "matches"],
          properties: {
            reply: {
              type: Type.STRING,
              description: "A friendly, welcoming 1-2 sentence match summary."
            },
            matches: {
              type: Type.ARRAY,
              description: "List of 1-3 business units that solve the request perfectly.",
              items: {
                type: Type.OBJECT,
                required: ["name", "category", "description", "phone", "address", "matchScore", "accentColor"],
                properties: {
                  name: { type: Type.STRING, description: "Compact business or provider name." },
                  category: { type: Type.STRING, description: "Technology or service trade domain." },
                  description: { type: Type.STRING, description: "How they match the user's need. Keep it under 15 words." },
                  phone: { type: Type.STRING, description: "Standard phone format, e.g. +255 (712) 000-000." },
                  address: { type: Type.STRING, description: "Short geographic location or online tag." },
                  matchScore: { type: Type.INTEGER, description: "A percentage value from 75 to 100." },
                  accentColor: { type: Type.STRING, description: "Hex color code representing their brand vibe." }
                }
              }
            }
          }
        }
      }
    });

    const parsedData = JSON.parse(result.text || "{}");
    return res.json(parsedData);
  } catch (error: any) {
    console.error("Error in Batlein chat API:", error);
    return res.status(500).json({ error: "Failed to generate AI connection. Please try again." });
  }
});

// 2. Simple Tech Blueprint Planner Endpoint
app.post("/api/consult/blueprint", async (req, res) => {
  const { companyName, industry, ideaDescription } = req.body;
  if (!ideaDescription) {
    return res.status(400).json({ error: "Idea description is required." });
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    // High quality offline blueprint
    return res.json({
      recommendedStack: ["ESP32 Microcontroller", "Direct Cellular NB-IoT Gateway", "FreeRTOS Native Micro-Engine", "React Native Dashboard", "Supabase Backend Engine"],
      keyArchitectureSteps: [
        "Create modular CAD enclosure prototype for the physical IoT node block.",
        "Program analog-to-digital sensor conversion filters in C++ for maximum low-noise inputs.",
        "Implement end-to-end TLS encryption with custom token hardware authorization keys.",
        "Build live cloud dashboard with automated text-message alert channels using Simple Tech web integrations."
      ],
      estimatedHardwareCost: "$85.00 per physical device in batch sizes of 100",
      networkingSecurityPlan: "Use hardware-accelerated SHA-256 signatures, restrict listening ports, and deploy custom local VPN routing.",
      simpleTechValueAdd: "Simple Tech provides continuous network monitoring, initial electronic circuit assembly, diagnostics, and web dashboard hosting."
    });
  }

  try {
    const ai = getGeminiClient();
    const systemInstruction = `You are Simple Tech's Chief Technology Officer (CTO) AI Assistant.
A company or innovator is presenting their idea to Simple Tech. You need to analyze their concept (combining AI, Electronics, Embedded, Networking, Web/Systems, or Maintenance) and output a highly professional, inspiring step-by-step engineering blueprint and tech stack.
Describe how Simple Tech will help them turn their idea into a working reality. Keep descriptions extremely realistic, clear, professional, and free of fluff.`;

    const prompt = `Company: ${companyName || "Innovator"}
Industry: ${industry || "General Technology"}
Idea Description: ${ideaDescription}`;

    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["recommendedStack", "keyArchitectureSteps", "estimatedHardwareCost", "networkingSecurityPlan", "simpleTechValueAdd"],
          properties: {
            recommendedStack: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Array of 4-6 specific engineering technologies, electronics, chipsets, or software libraries optimal for this project."
            },
            keyArchitectureSteps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3-5 technical engineering milestones to execute the project sequentially."
            },
            estimatedHardwareCost: {
              type: Type.STRING,
              description: "An approximate hardware or infrastructure budget estimate with brief rationale."
            },
            networkingSecurityPlan: {
              type: Type.STRING,
              description: "Core networking structure, firewalls, protocols, or cyber-safety strategies relevant."
            },
            simpleTechValueAdd: {
              type: Type.STRING,
              description: "A summary of how Simple Tech's experts can design, assemble, program, or maintain this specific idea."
            }
          }
        }
      }
    });

    const parsedData = JSON.parse(result.text || "{}");
    return res.json(parsedData);
  } catch (error: any) {
    console.error("Error in Consultant Blueprint API:", error);
    return res.status(500).json({ error: "Failed to compile custom blueprint. Please try again." });
  }
});

// Configure Vite middleware or Static files asset pipeline
async function configureServer() {
  const isProd = process.env.NODE_ENV === "production" || fs.existsSync(path.join(process.cwd(), "dist", "index.html"));

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware configured.");
  } else {
    // Determine the absolute path of built static assets resiliently
    let distPath = path.join(process.cwd(), "dist");
    if (!fs.existsSync(path.join(distPath, "index.html"))) {
      distPath = __dirname;
      if (!fs.existsSync(path.join(distPath, "index.html"))) {
        distPath = path.join(__dirname, "..", "dist");
      }
    }

    console.log(`Serving static production assets from: ${distPath}`);
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Simple Tech full-stack server running successfully on host 0.0.0.0:${PORT}`);
  });
}

configureServer().catch((err) => {
  console.error("Failed to bootstrap server core configuration:", err);
});
