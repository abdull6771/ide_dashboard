require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 3001;
const isProd = process.env.NODE_ENV === "production";

// In dev allow the Vite dev server; in prod the frontend is served from the same origin
app.use(
  cors({
    origin: isProd ? false : "http://localhost:5173",
  })
);
app.use(express.json({ limit: "2mb" }));

// Serve built frontend in production
if (isProd) {
  const distPath = path.join(__dirname, "../dist");
  app.use(express.static(distPath));
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_INSTRUCTION = `You are an expert AI analyst embedded in the Digital Enablement Initiatives Index (DEII) dashboard for Malaysia's Islamic Digital Economy.

You have been given structured data from the dashboard covering:
- 12,192 digital initiatives extracted from 2,706 annual reports of 854 publicly-listed companies on Bursa Malaysia across 2022–2024
- 16 industry sectors with full PLCT (People Empowerment, Customer Experience, Operational Efficiency, New Business Models) dimension scores
- Innovation levels (Incremental, Moderate, Transformational), investment scale, digital maturity classifications, and disclosure quality (DQ) scores
- Year-on-year trends, sector rankings, weighted scores, and strategic recommendations

Answering guidelines:
- Be analytical, precise, and concise. Cite specific numbers from the data where relevant.
- When comparing sectors or dimensions, highlight the gap and its significance.
- If asked for recommendations, base them on the REC data provided.
- If a question is entirely outside the scope of the dashboard data, say so clearly.
- Format responses with short paragraphs or bullet points for readability.
- NEVER fabricate numbers — only use values present in the provided context.`;

app.post("/api/chat", async (req, res) => {
  const { messages, context } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array is required" });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res
      .status(500)
      .json({ error: "GEMINI_API_KEY is not configured on the server." });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction:
        SYSTEM_INSTRUCTION +
        (context
          ? `\n\n--- DASHBOARD DATA CONTEXT ---\n${context}\n--- END CONTEXT ---`
          : ""),
    });

    // Convert message history to Gemini format
    // messages: [{ role: "user"|"assistant", content: string }, ...]
    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const lastMessage = messages[messages.length - 1];

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastMessage.content);
    const text = result.response.text();

    res.json({ reply: text });
  } catch (err) {
    console.error("Gemini error:", err);
    res
      .status(500)
      .json({ error: err.message || "Failed to get response from Gemini." });
  }
});

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// SPA fallback — serve index.html for all non-API routes in production
if (isProd) {
  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`✅  DEII AI server running on http://localhost:${PORT}`);
});
