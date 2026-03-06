require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const XLSX = require("xlsx");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// ── Load & parse data.xlsx at startup ──────────────────────────────
function loadExcelContext() {
  try {
    const wb = XLSX.readFile(path.join(__dirname, "data.xlsx"));

    // Sheet 1: Unique Companies — full list (id, name, sector, years, reports)
    const companies = XLSX.utils
      .sheet_to_json(wb.Sheets["Unique Companies"])
      .map(
        ({
          id,
          company_name,
          company_sector,
          first_year_mentioned,
          last_year_mentioned,
          total_reports,
        }) => ({
          id,
          company_name,
          company_sector,
          first_year_mentioned,
          last_year_mentioned,
          total_reports,
        }),
      );

    // Sheet 3: Initiatives — aggregate scores per company/sector (skip long text rationale fields)
    const rawInitiatives = XLSX.utils.sheet_to_json(wb.Sheets["Initiatives"]);
    const sectorMap = {};
    for (const row of rawInitiatives) {
      const sector = row.company_sector || "Unknown";
      if (!sectorMap[sector]) {
        sectorMap[sector] = {
          sector,
          initiative_count: 0,
          total_plct: 0,
          total_ce: 0,
          total_pe: 0,
          total_oe: 0,
          total_nbm: 0,
          innovation: { Incremental: 0, Moderate: 0, Transformational: 0 },
          maturity: {},
          categories: {},
        };
      }
      const s = sectorMap[sector];
      s.initiative_count++;
      s.total_plct += row.plct_total_score || 0;
      s.total_ce += row.plct_customer_experience_score || 0;
      s.total_pe += row.plct_people_empowerment_score || 0;
      s.total_oe += row.plct_operational_efficiency_score || 0;
      s.total_nbm += row.plct_new_business_models_score || 0;
      if (row.innovation_level)
        s.innovation[row.innovation_level] =
          (s.innovation[row.innovation_level] || 0) + 1;
      if (row.digital_maturity_level)
        s.maturity[row.digital_maturity_level] =
          (s.maturity[row.digital_maturity_level] || 0) + 1;
      if (row.category)
        s.categories[row.category] = (s.categories[row.category] || 0) + 1;
    }
    const sectorSummary = Object.values(sectorMap).map((s) => ({
      sector: s.sector,
      initiative_count: s.initiative_count,
      avg_plct: +(s.total_plct / s.initiative_count).toFixed(2),
      avg_ce: +(s.total_ce / s.initiative_count).toFixed(2),
      avg_pe: +(s.total_pe / s.initiative_count).toFixed(2),
      avg_oe: +(s.total_oe / s.initiative_count).toFixed(2),
      avg_nbm: +(s.total_nbm / s.initiative_count).toFixed(2),
      innovation: s.innovation,
      maturity: s.maturity,
      top_categories: Object.entries(s.categories)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([k, v]) => `${k}:${v}`)
        .join(", "),
    }));

    // Sheet 2: Companies — per-company year snapshots (compact fields only)
    const companyReports = XLSX.utils
      .sheet_to_json(wb.Sheets["Companies"])
      .map(
        ({
          stock_code,
          company_name,
          company_sector,
          year_mentioned,
          digital_maturity_level,
          strategic_priority,
        }) => ({
          stock_code,
          company_name,
          company_sector,
          year_mentioned,
          digital_maturity_level,
          strategic_priority,
        }),
      );

    return JSON.stringify(
      { companies, sectorSummary, companyReports },
      null,
      0,
    );
  } catch (err) {
    console.warn("⚠️  Could not load data.xlsx:", err.message);
    return null;
  }
}

const EXCEL_CONTEXT = loadExcelContext();
if (EXCEL_CONTEXT) {
  console.log(
    `✅  data.xlsx loaded — ${(EXCEL_CONTEXT.length / 1024).toFixed(0)} KB injected into AI context`,
  );
}

const app = express();
const PORT = process.env.PORT || 3001;
const isProd = process.env.NODE_ENV === "production";

// In dev allow the Vite dev server; in prod the frontend is served from the same origin
app.use(
  cors({
    origin: isProd ? false : "http://localhost:5173",
  }),
);
app.use(express.json({ limit: "2mb" }));

// Serve built frontend in production
if (isProd) {
  const distPath = path.join(__dirname, "../dist");
  app.use(express.static(distPath));
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_INSTRUCTION = `You are an expert AI analyst embedded in the Digital Enablement Initiatives Index (DEII) dashboard for Malaysia's Islamic Digital Economy.

You have been given two sources of structured data:

1. DASHBOARD SUMMARY DATA (sent per request): Pre-aggregated PLCT scores, sector rankings, year-on-year trends, maturity distributions, and strategic recommendations covering 12,192 digital initiatives from 854 companies (2022–2024).

2. RAW DATABASE (loaded from data.xlsx, always available below): Three datasets —
   - "companies": 1,127 unique Bursa Malaysia-listed companies with sector, years covered, and report count.
   - "sectorSummary": Per-sector aggregated average PLCT dimension scores (CE, PE, OE, NBM), initiative counts, innovation level breakdown, maturity distribution, and top initiative categories.
   - "companyReports": 2,706 company-year snapshots with digital maturity level and strategic priority.

Answering guidelines:
- Be analytical, precise, and concise. Cite specific numbers from the data where relevant.
- When asked about a specific company, look it up in the companies or companyReports arrays.
- When comparing sectors or dimensions, use the sectorSummary averages and highlight the gap and its significance.
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
        (EXCEL_CONTEXT
          ? `\n\n--- RAW DATABASE (data.xlsx) ---\n${EXCEL_CONTEXT}\n--- END RAW DATABASE ---`
          : "") +
        (context
          ? `\n\n--- DASHBOARD SUMMARY CONTEXT ---\n${context}\n--- END DASHBOARD SUMMARY ---`
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
