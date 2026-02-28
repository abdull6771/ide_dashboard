import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ComposedChart,
} from "recharts";

/* ── Design tokens ─────────────────────────────────────────────── */
const C = {
  emerald: "#0B4D3A",
  gold: "#C5973A",
  mint: "#1A7A5A",
  cream: "#FAF7F0",
  sand: "#EDE4D0",
  deep: "#07311F",
  muted: "#6B7280",
  text: "#1A1A1A",
  white: "#FFFFFF",
  accent: "#1E6F7A",
  warn: "#B45309",
  danger: "#991B1B",
  light: "#F0FDF8",
  border: "#D4C9B0",
};
const PAL = [
  "#0B4D3A",
  "#C5973A",
  "#1A7A5A",
  "#1E6F7A",
  "#7C3D0F",
  "#3730A3",
  "#B45309",
  "#065F46",
  "#9D174D",
  "#1D4ED8",
];
const MATPAL = { Basic: "#C5973A", Developing: "#0B4D3A", Advanced: "#1E6F7A" };

/* ── Data ──────────────────────────────────────────────────────── */
const DB = {
  yearCoverage: [
    {
      year: "2022",
      companies: 716,
      initiatives: 3359,
      inv_wt: 46.87,
      pol_wt: 41.86,
      str_wt: 38.04,
    },
    {
      year: "2023",
      companies: 773,
      initiatives: 3605,
      inv_wt: 47.03,
      pol_wt: 42.11,
      str_wt: 38.0,
    },
    {
      year: "2024",
      companies: 854,
      initiatives: 3996,
      inv_wt: 46.82,
      pol_wt: 42.41,
      str_wt: 37.91,
    },
  ],
  plctByYear: [
    {
      year: "2022",
      CE: 31.2,
      PE: 38.5,
      OE: 60.6,
      NBM: 18.5,
      Total: 148.7,
      Investor: 46.9,
      Policy: 41.9,
      Strategic: 38.0,
    },
    {
      year: "2023",
      CE: 30.0,
      PE: 38.6,
      OE: 61.8,
      NBM: 18.4,
      Total: 148.8,
      Investor: 47.0,
      Policy: 42.1,
      Strategic: 38.0,
    },
    {
      year: "2024",
      CE: 29.2,
      PE: 39.2,
      OE: 61.4,
      NBM: 18.3,
      Total: 148.0,
      Investor: 46.8,
      Policy: 42.4,
      Strategic: 37.9,
    },
  ],
  plctOverall: [
    { dim: "Operational Efficiency", short: "OE", score: 61.7, color: PAL[0] },
    { dim: "People Empowerment", short: "PE", score: 39.6, color: PAL[1] },
    { dim: "Customer Experience", short: "CE", score: 30.5, color: PAL[2] },
    { dim: "New Business Models", short: "NBM", score: 19.0, color: PAL[3] },
  ],
  sectorPLCT: [
    {
      sector: "Telecom & Media",
      total: 176.1,
      CE: 46.8,
      PE: 37.3,
      OE: 60.8,
      NBM: 31.2,
      n: 341,
      dq: 53.9,
    },
    {
      sector: "Technology",
      total: 172.3,
      CE: 38.0,
      PE: 42.6,
      OE: 61.2,
      NBM: 30.3,
      n: 1197,
      dq: 54.8,
    },
    {
      sector: "Financial Services",
      total: 163.2,
      CE: 42.1,
      PE: 42.0,
      OE: 59.4,
      NBM: 19.8,
      n: 502,
      dq: 52.8,
    },
    {
      sector: "Healthcare",
      total: 160.2,
      CE: 39.3,
      PE: 40.4,
      OE: 60.1,
      NBM: 20.2,
      n: 215,
      dq: 53.7,
    },
    {
      sector: "Retail",
      total: 158.6,
      CE: 41.1,
      PE: 38.0,
      OE: 58.9,
      NBM: 20.5,
      n: 365,
      dq: 53.8,
    },
    {
      sector: "Hospitality",
      total: 155.4,
      CE: 43.9,
      PE: 32.5,
      OE: 61.3,
      NBM: 17.7,
      n: 59,
      dq: 51.8,
    },
    {
      sector: "Business Services",
      total: 153.1,
      CE: 34.0,
      PE: 39.2,
      OE: 58.8,
      NBM: 21.0,
      n: 405,
      dq: 51.8,
    },
    {
      sector: "Energy",
      total: 153.0,
      CE: 26.5,
      PE: 42.1,
      OE: 63.2,
      NBM: 21.2,
      n: 740,
      dq: 53.9,
    },
    {
      sector: "Utilities",
      total: 152.2,
      CE: 30.9,
      PE: 38.6,
      OE: 65.6,
      NBM: 17.1,
      n: 43,
      dq: 53.7,
    },
    {
      sector: "Consumer Products",
      total: 151.2,
      CE: 31.8,
      PE: 39.4,
      OE: 60.4,
      NBM: 19.7,
      n: 665,
      dq: 53.2,
    },
    {
      sector: "Transportation & Logistics",
      total: 150.2,
      CE: 29.9,
      PE: 39.0,
      OE: 64.4,
      NBM: 16.9,
      n: 617,
      dq: 53.2,
    },
    {
      sector: "Real Estate",
      total: 148.2,
      CE: 36.2,
      PE: 36.3,
      OE: 58.7,
      NBM: 17.0,
      n: 1342,
      dq: 52.7,
    },
    {
      sector: "Manufacturing",
      total: 147.5,
      CE: 26.3,
      PE: 40.4,
      OE: 62.8,
      NBM: 18.0,
      n: 3322,
      dq: 53.8,
    },
    {
      sector: "Construction",
      total: 144.2,
      CE: 25.8,
      PE: 38.8,
      OE: 62.7,
      NBM: 16.8,
      n: 828,
      dq: 53.6,
    },
    {
      sector: "Industrial Products",
      total: 143.9,
      CE: 26.1,
      PE: 37.8,
      OE: 62.7,
      NBM: 17.2,
      n: 807,
      dq: 52.0,
    },
    {
      sector: "Plantation & Agriculture",
      total: 138.8,
      CE: 19.8,
      PE: 39.0,
      OE: 63.9,
      NBM: 16.1,
      n: 574,
      dq: 52.3,
    },
  ],
  sectorCompanies: [
    { name: "Manufacturing", count: 361 },
    { name: "Real Estate", count: 138 },
    { name: "Technology", count: 125 },
    { name: "Industrial Products", count: 73 },
    { name: "Construction", count: 63 },
    { name: "Energy", count: 61 },
    { name: "Consumer Products", count: 59 },
    { name: "Plantation & Agriculture", count: 45 },
    { name: "Transportation", count: 44 },
    { name: "Financial Services", count: 35 },
    { name: "Retail", count: 30 },
    { name: "Business Services", count: 25 },
    { name: "Telecom & Media", count: 24 },
    { name: "Healthcare", count: 18 },
    { name: "Other", count: 31 },
  ],
  maturity: [
    { name: "Developing", value: 2103, pct: 77.8 },
    { name: "Basic", value: 597, pct: 22.1 },
    { name: "Advanced", value: 4, pct: 0.1 },
  ],
  maturityByYear: [
    { year: "2022", Basic: 179, Developing: 536, Advanced: 1 },
    { year: "2023", Basic: 181, Developing: 590, Advanced: 1 },
    { year: "2024", Basic: 208, Developing: 644, Advanced: 1 },
  ],
  strategicPriority: [
    { name: "High", value: 750, pct: 27.7 },
    { name: "Medium", value: 1664, pct: 61.5 },
    { name: "Low", value: 289, pct: 10.7 },
  ],
  topInitiatives: [
    { name: "Digital Transformation", count: 550, avgPLCT: 198.5 },
    { name: "Shareholder Engagement", count: 540, avgPLCT: 152.0 },
    { name: "Shareholder Communication", count: 470, avgPLCT: 145.9 },
    { name: "Process Automation", count: 317, avgPLCT: 145.9 },
    { name: "Sustainability", count: 302, avgPLCT: 127.7 },
    { name: "Operational Efficiency", count: 291, avgPLCT: 183.1 },
    { name: "Sustainability Initiatives", count: 288, avgPLCT: 141.5 },
    { name: "Stakeholder Communication", count: 200, avgPLCT: 141.2 },
    { name: "Cybersecurity", count: 186, avgPLCT: 136.4 },
    { name: "Risk Management", count: 141, avgPLCT: 120.2 },
    { name: "Energy Efficiency", count: 139, avgPLCT: 131.9 },
    { name: "Process Improvement", count: 117, avgPLCT: 139.1 },
    { name: "Customer Experience", count: 114, avgPLCT: 192.6 },
    { name: "Technology Adoption", count: 107, avgPLCT: 150.2 },
  ],
  innovation: [
    { name: "Incremental", value: 6208, pct: 50.9 },
    { name: "Moderate", value: 5903, pct: 48.4 },
    { name: "Transformational", value: 78, pct: 0.6 },
  ],
  innovByYear: [
    { year: "2022", Incremental: 1819, Moderate: 1523, Transformational: 17 },
    { year: "2023", Incremental: 1907, Moderate: 1673, Transformational: 24 },
    { year: "2024", Incremental: 2083, Moderate: 1884, Transformational: 28 },
  ],
  investmentDist: [
    { name: "Minor", value: 5532, pct: 45.4 },
    { name: "Moderate", value: 5251, pct: 43.1 },
    { name: "Major", value: 600, pct: 4.9 },
    { name: "Not Specified", value: 809, pct: 6.6 },
  ],
  investBySector: [
    { sector: "Telecom & Media", Minor: 34, Moderate: 51, Major: 8, Other: 7 },
    { sector: "Technology", Minor: 38, Moderate: 44, Major: 5, Other: 13 },
    {
      sector: "Financial Services",
      Minor: 41,
      Moderate: 46,
      Major: 4,
      Other: 9,
    },
    { sector: "Energy", Minor: 46, Moderate: 40, Major: 5, Other: 9 },
    { sector: "Manufacturing", Minor: 44, Moderate: 42, Major: 4, Other: 10 },
    { sector: "Real Estate", Minor: 54, Moderate: 37, Major: 2, Other: 7 },
  ],
  disclosureTier: [
    { name: "Good (60-79)", value: 5074, pct: 41.6 },
    { name: "Moderate (40-59)", value: 5256, pct: 43.1 },
    { name: "Limited (0-39)", value: 1292, pct: 10.6 },
    { name: "Comprehensive (80+)", value: 128, pct: 1.0 },
    { name: "Tiered/Other", value: 442, pct: 3.6 },
  ],
  dqDistribution: [
    { range: "0-19", count: 113 },
    { range: "20-39", count: 1191 },
    { range: "40-59", count: 5285 },
    { range: "60-79", count: 5556 },
    { range: "80-99", count: 47 },
  ],
  confidence: [
    { name: "Medium", value: 11100, pct: 91.0 },
    { name: "Medium-High", value: 410, pct: 3.4 },
    { name: "Low", value: 604, pct: 5.0 },
    { name: "High", value: 77, pct: 0.6 },
  ],
  dominantDim: [
    { name: "Operational Efficiency", value: 8323, pct: 68.3 },
    { name: "Customer Experience", value: 2077, pct: 17.0 },
    { name: "People Empowerment", value: 1134, pct: 9.3 },
    { name: "New Business Models", value: 655, pct: 5.4 },
  ],
  topTech: [
    { name: "Digital Technologies", count: 1162 },
    { name: "Information Systems", count: 1017 },
    { name: "Automation Tools", count: 604 },
    { name: "AI / ML", count: 260 },
    { name: "Cloud Computing", count: 230 },
    { name: "Data Analytics", count: 192 },
    { name: "Cybersecurity", count: 186 },
    { name: "IoT", count: 181 },
    { name: "ERP Systems", count: 133 },
    { name: "E-commerce Platforms", count: 93 },
  ],
  weightedScores: [
    {
      name: "Investor-Weighted",
      value: 47.52,
      desc: "Emphasis on ROI & competitive advantage",
    },
    {
      name: "Policy-Weighted",
      value: 42.89,
      desc: "Emphasis on regulatory & social impact",
    },
    {
      name: "Strategic-Weighted",
      value: 38.83,
      desc: "Emphasis on long-term transformation",
    },
  ],
  reportTypes: [
    { name: "Annual Report", count: 2067 },
    { name: "CG Report", count: 545 },
    { name: "Integrated Report", count: 52 },
    { name: "Sustainability Rpt", count: 34 },
    { name: "Other", count: 8 },
  ],
  plctScoreDistOE: [
    { range: "0-9", count: 37 },
    { range: "10-19", count: 179 },
    { range: "20-29", count: 478 },
    { range: "30-39", count: 681 },
    { range: "40-49", count: 741 },
    { range: "50-59", count: 924 },
    { range: "60-69", count: 3517 },
    { range: "70-79", count: 4689 },
    { range: "80+", count: 946 },
  ],
  plctScoreDistCE: [
    { range: "0-9", count: 612 },
    { range: "10-19", count: 4108 },
    { range: "20-29", count: 2250 },
    { range: "30-39", count: 698 },
    { range: "40-49", count: 866 },
    { range: "50-59", count: 1282 },
    { range: "60-69", count: 1665 },
    { range: "70-79", count: 631 },
    { range: "80+", count: 80 },
  ],
  plctScoreDistNBM: [
    { range: "0-9", count: 633 },
    { range: "10-19", count: 7944 },
    { range: "20-29", count: 1495 },
    { range: "30-39", count: 246 },
    { range: "40-49", count: 520 },
    { range: "50-59", count: 295 },
    { range: "60-69", count: 398 },
    { range: "70-79", count: 612 },
    { range: "80+", count: 49 },
  ],
};

/* ── Recommendation data derived from deep analysis ───────────── */
const REC = {
  gapAnalysis: [
    {
      dim: "OE",
      label: "Operational Efficiency",
      current: 61.7,
      target2yr: 67.0,
      target5yr: 75.0,
      priority: "Maintain & Optimise",
      color: PAL[0],
    },
    {
      dim: "PE",
      label: "People Empowerment",
      current: 39.6,
      target2yr: 48.0,
      target5yr: 60.0,
      priority: "High Priority",
      color: PAL[1],
    },
    {
      dim: "CE",
      label: "Customer Experience",
      current: 30.5,
      target2yr: 42.0,
      target5yr: 55.0,
      priority: "Critical — Declining",
      color: PAL[2],
    },
    {
      dim: "NBM",
      label: "New Business Models",
      current: 19.0,
      target2yr: 28.0,
      target5yr: 40.0,
      priority: "Urgent — Lagging",
      color: PAL[3],
    },
  ],
  targetRadar: [
    { subject: "OE", Current: 61.7, Target2yr: 67.0, Target5yr: 75.0 },
    { subject: "PE", Current: 39.6, Target2yr: 48.0, Target5yr: 60.0 },
    { subject: "CE", Current: 30.5, Target2yr: 42.0, Target5yr: 55.0 },
    { subject: "NBM", Current: 19.0, Target2yr: 28.0, Target5yr: 40.0 },
  ],
  kpiTargets: [
    {
      kpi: "PLCT Index (Total/400)",
      baseline: "152.1",
      yr2026: "165",
      yr2027: "185",
      yr2029: "210",
      stretch: "250",
    },
    {
      kpi: "OE Score (/100)",
      baseline: "61.7",
      yr2026: "64",
      yr2027: "67",
      yr2029: "75",
      stretch: "82",
    },
    {
      kpi: "PE Score (/100)",
      baseline: "39.6",
      yr2026: "43",
      yr2027: "48",
      yr2029: "60",
      stretch: "70",
    },
    {
      kpi: "CE Score (/100)",
      baseline: "30.5",
      yr2026: "34",
      yr2027: "42",
      yr2029: "55",
      stretch: "65",
    },
    {
      kpi: "NBM Score (/100)",
      baseline: "19.0",
      yr2026: "23",
      yr2027: "28",
      yr2029: "40",
      stretch: "50",
    },
    {
      kpi: "Transformational Initiatives %",
      baseline: "0.6%",
      yr2026: "1.5%",
      yr2027: "3%",
      yr2029: "5%",
      stretch: "10%",
    },
    {
      kpi: "Major Investment %",
      baseline: "4.9%",
      yr2026: "6%",
      yr2027: "8%",
      yr2029: "12%",
      stretch: "18%",
    },
    {
      kpi: "Avg Disclosure Quality (/100)",
      baseline: "53.3",
      yr2026: "58",
      yr2027: "65",
      yr2029: "75",
      stretch: "85",
    },
    {
      kpi: "Advanced Maturity Companies %",
      baseline: "0.1%",
      yr2026: "1%",
      yr2027: "3%",
      yr2029: "10%",
      stretch: "20%",
    },
    {
      kpi: "Comprehensive DQ Initiatives%",
      baseline: "1.0%",
      yr2026: "4%",
      yr2027: "8%",
      yr2029: "20%",
      stretch: "35%",
    },
  ],
  roadmap: [
    {
      phase: 1,
      label: "Phase 1: Immediate (0–12 months)",
      color: C.danger,
      items: [
        {
          action:
            "Reverse CE decline — launch digital customer experience audits across all sectors",
          metric: "CE score ≥ 32.0",
          owner: "Companies",
          urgency: "Critical",
        },
        {
          action:
            "Establish NBM cross-sector working group — 5 pilot programmes",
          metric: "5 NBM pilots active",
          owner: "Policy",
          urgency: "Critical",
        },
        {
          action: "Mandate digital initiative reporting in MCCG next revision",
          metric: "DQ Score floor: 60",
          owner: "Regulator",
          urgency: "High",
        },
        {
          action:
            "Publish Islamic Digital Economy Index as annual public scorecard",
          metric: "Annual release",
          owner: "Research",
          urgency: "High",
        },
        {
          action: "Launch digital upskilling: +15% PE-tagged initiative target",
          metric: "PE ≥ 42.0",
          owner: "Companies",
          urgency: "Medium",
        },
      ],
    },
    {
      phase: 2,
      label: "Phase 2: Short-term (1–2 years)",
      color: C.warn,
      items: [
        {
          action:
            "Scale CE — target 20% of all initiatives (up from 17% dominant share)",
          metric: "CE ≥ 42.0",
          owner: "Companies",
          urgency: "High",
        },
        {
          action: "Double major digital investment ratio: 4.9% → 10%",
          metric: "Major invest: 10%",
          owner: "Companies",
          urgency: "High",
        },
        {
          action: "Deploy Islamic fintech sandbox for NBM experimentation",
          metric: "NBM ≥ 28.0",
          owner: "Policy",
          urgency: "High",
        },
        {
          action: "Sector digitalisation blueprints for bottom 5 sectors",
          metric: "All sectors ≥ 148",
          owner: "Policy",
          urgency: "Medium",
        },
        {
          action: "AI/ML adoption programme — from 260 to 500+ mentions",
          metric: "AI mentions +90%",
          owner: "Companies",
          urgency: "Medium",
        },
        {
          action: "Comprehensive DQ pilot — top 50 listed companies",
          metric: "50 cos: DQ ≥ 80",
          owner: "Regulator",
          urgency: "Medium",
        },
      ],
    },
    {
      phase: 3,
      label: "Phase 3: Strategic Vision (3–5 years)",
      color: C.mint,
      items: [
        {
          action: "Achieve PLCT Index of 210/400 (52%) — up from 38%",
          metric: "Total PLCT ≥ 210",
          owner: "All",
          urgency: "Target",
        },
        {
          action: "Grow transformational initiatives from 0.6% to 5% of total",
          metric: "≥ 609 trans. init.",
          owner: "Companies",
          urgency: "Target",
        },
        {
          action:
            "Advanced digital maturity: grow from 0.1% to 10% of companies",
          metric: "10% Advanced",
          owner: "Companies",
          urgency: "Target",
        },
        {
          action: "Comprehensive DQ coverage: 20% of initiatives (from 1%)",
          metric: "Avg DQ ≥ 75",
          owner: "All",
          urgency: "Target",
        },
        {
          action: "Close NBM–OE gap from 42.7 pts to under 25 pts",
          metric: "NBM ≥ 40.0",
          owner: "Companies",
          urgency: "Target",
        },
        {
          action:
            "Position Malaysia as leading ASEAN Islamic Digital Economy hub",
          metric: "ASEAN #1 benchmark",
          owner: "Policy",
          urgency: "Vision",
        },
      ],
    },
  ],
  corporatePillars: [
    {
      pillar: "Customer Experience (CE)",
      urgency: "CRITICAL",
      score: "30.5/100",
      trend: "↓ Declining −2.0 pts (2022–2024)",
      color: C.danger,
      icon: "👥",
      context:
        "CE is the only declining PLCT dimension. At −1.0 pts/year, without intervention CE will fall below 28 by 2026. Only 17% of initiatives are CE-dominant despite CE delivering avg PLCT of 192.6 — the second-highest impact category.",
      actions: [
        {
          text: "Conduct digital CX audit across every major product/service line",
          evidence:
            "CE fell −2.0pts over 3 years — structural neglect, not cyclical",
        },
        {
          text: "Allocate minimum 20% of digital budget to customer-facing initiatives",
          evidence:
            "CE only 17% of dominant dims vs OE 68.3% — massive imbalance",
        },
        {
          text: "Implement omnichannel digital engagement (web, mobile, AI chatbot)",
          evidence:
            "Digital Technologies 1,162 mentions — underutilised for CE outcomes",
        },
        {
          text: "Set CE improvement as board-level KPI with quarterly tracking",
          evidence:
            "Customer Experience avg PLCT: 192.6 — highest ROI initiative category",
        },
        {
          text: "Study Telecom & Media playbook — CE 46.8 vs avg 30.5 (+16.3 pts advantage)",
          evidence: "Sector best practice: Telecom leads CE with 46.8/100",
        },
      ],
    },
    {
      pillar: "New Business Models (NBM)",
      urgency: "URGENT",
      score: "19.0/100",
      trend: "↓ Declining −0.2 pts (2022–2024)",
      color: C.warn,
      icon: "💡",
      context:
        "NBM has the largest gap of all dimensions: 81 points from maximum. Only 5.4% of initiatives are NBM-dominant. The sector gap is stark — Telecom achieves 31.2 while Plantation achieves only 16.1. Without transformational NBM investment, Malaysia's Islamic Digital Economy risks permanent structural lag.",
      actions: [
        {
          text: "Pilot at least 1 transformational digital business model initiative per year",
          evidence:
            "Only 78 transformational initiatives nationally (0.6%) — most companies: zero",
        },
        {
          text: "Explore platform economics, ecosystem plays and API monetisation",
          evidence:
            "NBM avg 19.0 — only 19% of possible score; 81-point gap is largest of any dimension",
        },
        {
          text: "Invest in Islamic fintech, halal e-commerce, Shariah-compliant digital platforms",
          evidence:
            "Financial Services NBM: 19.8 — even the digital-forward sector is underdeveloped",
        },
        {
          text: "Increase major digital investments: target 10% (from 4.9% current)",
          evidence:
            "Telecom leads with 8% major investment — sets benchmark for NBM success",
        },
        {
          text: "Partner with MDEC/BNM for Islamic Digital Economy sandbox experimentation",
          evidence:
            "Without policy support, NBM pilots face regulatory and capital barriers",
        },
      ],
    },
    {
      pillar: "People Empowerment (PE)",
      urgency: "HIGH PRIORITY",
      score: "39.6/100",
      trend: "↑ Improving +0.7 pts (2022–2024)",
      color: C.accent,
      icon: "🎓",
      context:
        "PE is the only dimension showing consistent improvement, albeit slowly (+0.23 pts/year). The Technology sector leads PE at 42.6, while Hospitality lags at 32.5. The gap to target (39.6 → 60.0) of 20.4 points requires an 8× acceleration in current improvement rate to reach the 5-year goal.",
      actions: [
        {
          text: "Deploy structured digital literacy and reskilling programmes company-wide",
          evidence:
            "Current PE improvement rate of +0.23/yr needs to reach +4.1/yr to hit 60 by 2029",
        },
        {
          text: "Create digital champion roles to drive internal transformation culture",
          evidence:
            "PE-dominant initiatives: only 9.3% — proportional investment needed to match ambition",
        },
        {
          text: "Tie digital training outcomes to performance KPIs and bonus structures",
          evidence:
            "PE improving: indicates high ROI on human capital investment — scale it",
        },
        {
          text: "Partner with MDEC, universities for digital talent pipeline",
          evidence:
            "AI/ML: 260 mentions — trained workforce is the unlock for advanced tech adoption",
        },
        {
          text: "Address Hospitality PE gap: 32.5 vs avg 39.6 — sector-specific upskilling",
          evidence:
            "Hospitality CE is strong (43.9) but PE foundation will limit sustained performance",
        },
      ],
    },
    {
      pillar: "Operational Efficiency (OE)",
      urgency: "MAINTAIN",
      score: "61.7/100",
      trend: "→ Stable +0.8 pts (2022–2024)",
      color: C.emerald,
      icon: "⚙️",
      context:
        "OE is Malaysia's digital strength — 68.3% of all initiatives are OE-dominant. However, this dominance comes at the cost of CE and NBM investment. The strategic imperative is to redirect efficiency gains into higher-value CE and NBM activities, while sustaining OE through automation.",
      actions: [
        {
          text: "Redirect OE efficiency gains into CE and NBM investment budgets",
          evidence:
            "OE at 68.3% dominant share — over-indexed; CE and NBM are systematically underfunded",
        },
        {
          text: "Automate remaining manual OE processes via RPA and AI to free capital",
          evidence:
            "Automation Tools: 604 mentions — strong foundation, scale to reduce marginal OE cost",
        },
        {
          text: "Build OE digital maturity into ESG reporting frameworks",
          evidence:
            "Energy efficiency (139 init.) and process automation (317 init.) are proven OE levers",
        },
        {
          text: "Bridge OE data analytics to customer insight feeding CE strategy",
          evidence:
            "Data Analytics: 192 mentions — deploy OE data as CE intelligence source",
        },
      ],
    },
  ],
  policyPillars: [
    {
      category: "Regulatory Framework",
      color: "#3730A3",
      icon: "📜",
      rationale:
        "Current disclosure standards are insufficient for robust Islamic Digital Economy benchmarking. Average DQ of 53.3/100 and only 1.0% Comprehensive disclosure means policymakers lack the data quality to make evidence-based decisions.",
      actions: [
        {
          text: "Amend MCCG to mandate structured digital initiative disclosure (min DQ Score 70)",
          rationale:
            "DQ avg 53.3 today — regulatory floor of 70 achievable within 2 years via structured templates",
        },
        {
          text: "Introduce Islamic Digital Economy Index as mandatory KPI in Malaysia Digital Economy Blueprint",
          rationale:
            "No current national digital maturity benchmark for Bursa-listed companies exists",
        },
        {
          text: "Create Bursa Digital Disclosure Template — standardise reporting across 16 sectors",
          rationale:
            "43.1% initiatives at Moderate disclosure — template can elevate the floor to Good tier",
        },
        {
          text: "Require annual Digital Transformation Progress Reports from all listed companies",
          rationale:
            "Only 2% of reports are Sustainability Reports; digital content is ad hoc and unverifiable",
        },
      ],
    },
    {
      category: "Incentives & Programmes",
      color: "#065F46",
      icon: "💰",
      rationale:
        "With 88.5% of digital investments at Minor or Moderate scale, and only 4.9% Major, the investment climate for transformational digital initiatives is weak. Fiscal and programmatic incentives are required to shift the risk calculus.",
      actions: [
        {
          text: "Launch RM500M Islamic Digital Innovation Fund targeting NBM transformation initiatives",
          rationale:
            "NBM at 19.0/100 — 78 transformational initiatives in 3 years is critically insufficient",
        },
        {
          text: "Tax incentives for companies shifting ≥30% digital budget to CE and NBM",
          rationale:
            "88.5% Minor/Moderate investments — fiscal incentive needed to scale major digital bets",
        },
        {
          text: "Create MDEC-BNM joint Islamic Fintech Sandbox for halal digital NBM experimentation",
          rationale:
            "Financial Services NBM: 19.8 — strong sector but needs regulatory safe space to innovate",
        },
        {
          text: "Subsidise digital training for SMEs in bottom 5 sectors (Plantation, Industrial, Construction, Manufacturing)",
          rationale:
            "These 4 sectors: 1,672 companies, 5,531 initiatives all below PLCT average",
        },
      ],
    },
    {
      category: "Sector Development",
      color: "#7C3D0F",
      icon: "🏭",
      rationale:
        "The 37.3-point gap between the highest-scoring sector (Telecom & Media: 176.1) and lowest (Plantation: 138.8) is an equity and competitiveness problem. Sector-specific blueprints are essential to lift the national average.",
      actions: [
        {
          text: "Develop Digital Transformation Blueprints for all 16 industries with sector-specific PLCT targets",
          rationale:
            "Sector range: 138.8–176.1 — no sector-specific guidance exists to close this 37.3-pt gap",
        },
        {
          text: "Mandate Manufacturing sector (361 companies, below average) to adopt Industry 4.0 CE initiatives",
          rationale:
            "Largest sector at 147.5 PLCT — systemic drag; CE only 26.3 vs sector potential of 50+",
        },
        {
          text: "Launch Plantation & Agriculture digital leapfrog programme (AgriTech acceleration)",
          rationale:
            "Lowest sector at 138.8; CE only 19.8 — highest improvement potential of all sectors",
        },
        {
          text: "Establish cross-sector data sharing protocols for digital ecosystem development",
          rationale:
            "Siloed OE dominance (68.3%) limits ecosystem-level value creation and NBM emergence",
        },
      ],
    },
    {
      category: "Research & Measurement",
      color: "#9D174D",
      icon: "🔬",
      rationale:
        "The current data infrastructure — AI-extracted at Medium confidence (91%), DQ averaging 53.3 — provides a strong foundation but requires institutionalisation and expansion to drive sustained policy impact.",
      actions: [
        {
          text: "Publish annual Islamic Digital Economy Index with full sector rankings and trends",
          rationale:
            "No public digital maturity benchmark; companies need accountability mirror",
        },
        {
          text: "Expand to ASEAN comparison — benchmark Malaysia vs Singapore, Indonesia, Thailand",
          rationale:
            "National PLCT avg 152.1/400 (38%) needs external validation and competitive context",
        },
        {
          text: "Commission longitudinal CE decline study: root-cause analysis with investment correlation",
          rationale:
            "CE declining −1.0/year — structural cause unknown; policy response requires evidence",
        },
        {
          text: "Develop AI-readiness sub-index alongside PLCT to capture GenAI transformation wave",
          rationale:
            "AI/ML mentions: 260 — likely undercounted given GenAI adoption acceleration post-2023",
        },
      ],
    },
  ],
  sectorRecs: [
    {
      sector: "Plantation & Agriculture",
      score: 138.8,
      rank: 16,
      CE: 19.8,
      PE: 39.0,
      OE: 63.9,
      NBM: 16.1,
      color: "#7C3D0F",
      icon: "🌾",
      companies: 45,
      initiatives: 574,
      insight:
        "Lowest PLCT in all 16 sectors (138.8). CE at 19.8 is the worst of any dimension-sector combination. Despite strong OE (63.9), digital innovation is entirely absent. 45 companies hold enormous leapfrog potential if digital adoption is accelerated.",
      recs: [
        {
          action:
            "Deploy precision agriculture IoT + e-commerce to build digital supply chains",
          impact: "CE +12 pts",
          difficulty: "Medium",
        },
        {
          action:
            "Integrate ESG-linked digital reporting aligned with MSCI sustainability criteria",
          impact: "DQ +8 pts",
          difficulty: "Low",
        },
        {
          action:
            "Leverage commodity trading platforms to develop new NBM digital revenue streams",
          impact: "NBM +10 pts",
          difficulty: "High",
        },
        {
          action:
            "Partner with agri-fintech for Shariah-compliant digital financing tools",
          impact: "NBM +6 pts",
          difficulty: "Medium",
        },
        {
          action:
            "Develop digital extension services for smallholder farmer engagement",
          impact: "CE +8 pts",
          difficulty: "Low",
        },
      ],
    },
    {
      sector: "Industrial Products",
      score: 143.9,
      rank: 15,
      CE: 26.1,
      PE: 37.8,
      OE: 62.7,
      NBM: 17.2,
      color: "#3730A3",
      icon: "🔩",
      companies: 73,
      initiatives: 807,
      insight:
        "73 companies with 807 initiatives — significant scale but below average. PE (37.8) is the lowest people score in this sector cluster. The OE foundation is strong but entirely inward-facing, missing B2B digital opportunity.",
      recs: [
        {
          action:
            "Implement Industry 4.0 digital twin technology to bridge OE into CE value delivery",
          impact: "CE +10 pts",
          difficulty: "High",
        },
        {
          action:
            "Develop B2B digital marketplace for supply chain partners (NBM)",
          impact: "NBM +12 pts",
          difficulty: "High",
        },
        {
          action:
            "Create digital service layer on physical products — servitisation model",
          impact: "CE +8 pts",
          difficulty: "Medium",
        },
        {
          action:
            "Upskill workforce in digital operations — close PE gap vs avg 39.6",
          impact: "PE +4 pts",
          difficulty: "Low",
        },
        {
          action:
            "Deploy cloud ERP with customer-facing portal for order management",
          impact: "CE +6 pts",
          difficulty: "Medium",
        },
      ],
    },
    {
      sector: "Construction",
      score: 144.2,
      rank: 14,
      CE: 25.8,
      PE: 38.8,
      OE: 62.7,
      NBM: 16.8,
      color: "#065F46",
      icon: "🏗",
      companies: 63,
      initiatives: 828,
      insight:
        "63 companies, 828 initiatives but PLCT at 144.2 — below average. CE at 25.8 reflects a purely project-delivery mindset. The sector has strong OE discipline but has not translated this into client-facing digital value.",
      recs: [
        {
          action:
            "Adopt BIM (Building Information Modelling) as digital backbone for CE integration",
          impact: "CE +10 pts",
          difficulty: "Medium",
        },
        {
          action:
            "Launch PropTech digital platforms to improve CE for property buyers",
          impact: "CE +8 pts",
          difficulty: "Medium",
        },
        {
          action:
            "Develop modular/off-site construction NBMs for scalable digital manufacturing",
          impact: "NBM +10 pts",
          difficulty: "High",
        },
        {
          action:
            "Build digital project management client portals — shift from OE process to CE",
          impact: "CE +7 pts",
          difficulty: "Low",
        },
        {
          action:
            "Implement IoT-enabled site safety monitoring as digital value-add",
          impact: "PE +5 pts",
          difficulty: "Medium",
        },
      ],
    },
    {
      sector: "Manufacturing",
      score: 147.5,
      rank: 13,
      CE: 26.3,
      PE: 40.4,
      OE: 62.8,
      NBM: 18.0,
      color: PAL[0],
      icon: "🏭",
      companies: 361,
      initiatives: 3322,
      insight:
        "CRITICAL: Manufacturing is the largest sector with 361 companies and 3,322 initiatives — yet scores below the national PLCT average (147.5 vs 152.1). Its systemic underperformance pulls down the national index. CE at 26.3 and NBM at 18.0 are structurally weak despite the sector's scale.",
      recs: [
        {
          action:
            "PRIORITY: Shift from internal OE to customer-facing digital product experiences",
          impact: "CE +8 pts",
          difficulty: "Medium",
        },
        {
          action:
            "Explore Manufacturing-as-a-Service (MaaS) as transformational NBM pivot",
          impact: "NBM +10 pts",
          difficulty: "High",
        },
        {
          action:
            "Leverage ERP systems to build predictive analytics for CE improvement",
          impact: "CE +6 pts",
          difficulty: "Low",
        },
        {
          action:
            "Mandate digital reporting: DQ avg 53.8 needs structured disclosure improvement",
          impact: "DQ +8 pts",
          difficulty: "Low",
        },
        {
          action:
            "Deploy digital twin technology for production visibility and customer portals",
          impact: "CE +7 pts",
          difficulty: "High",
        },
      ],
    },
    {
      sector: "Financial Services",
      score: 163.2,
      rank: 3,
      CE: 42.1,
      PE: 42.0,
      OE: 59.4,
      NBM: 19.8,
      color: PAL[2],
      icon: "🏦",
      companies: 35,
      initiatives: 502,
      insight:
        "Financial Services is declining (171.8 → 163.2 → 155.9 trend extrapolated). Despite strong CE (42.1) and PE (42.0), NBM at 19.8 is the critical drag. Islamic fintech potential is underrealised. OE at 59.4 is the sector's weakest — below even Plantation.",
      recs: [
        {
          action:
            "Accelerate Islamic fintech NBM — digital sukuk, robo-advisory, Shariah DeFi",
          impact: "NBM +15 pts",
          difficulty: "High",
        },
        {
          action:
            "Reverse decline by investing in CE platforms: embedded finance, digital banking",
          impact: "CE +8 pts",
          difficulty: "Medium",
        },
        {
          action:
            "Strengthen OE through cloud migration and intelligent process automation",
          impact: "OE +6 pts",
          difficulty: "Medium",
        },
        {
          action:
            "Partner with BNM's FIKRA sandbox for digital financial product innovation",
          impact: "NBM +8 pts",
          difficulty: "Medium",
        },
        {
          action:
            "Build PE in data science / AI skills to support digital product development",
          impact: "PE +5 pts",
          difficulty: "Low",
        },
      ],
    },
  ],
};

/* ── Shared UI ─────────────────────────────────────────────────── */
const Card = ({ children, style = {} }) => (
  <div
    style={{
      background: C.white,
      borderRadius: 12,
      padding: "20px 24px",
      boxShadow: "0 2px 16px rgba(11,77,58,0.07)",
      border: `1px solid ${C.border}`,
      ...style,
    }}
  >
    {children}
  </div>
);

const SectionTitle = ({ children, sub, badge }) => (
  <div style={{ marginBottom: 14 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <h3
        style={{
          margin: 0,
          fontFamily: "'Playfair Display',Georgia,serif",
          fontSize: 16,
          color: C.emerald,
          fontWeight: 700,
        }}
      >
        {children}
      </h3>
      {badge && (
        <span
          style={{
            fontSize: 10,
            background: C.light,
            color: C.mint,
            border: `1px solid #1A7A5A40`,
            borderRadius: 20,
            padding: "2px 10px",
            fontWeight: 700,
          }}
        >
          {badge}
        </span>
      )}
    </div>
    {sub && (
      <p
        style={{
          margin: "4px 0 0",
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 11,
          color: C.muted,
        }}
      >
        {sub}
      </p>
    )}
  </div>
);

const KpiCard = ({ label, value, sub, color = C.emerald, icon, note }) => (
  <Card style={{ borderTop: `4px solid ${color}`, padding: "16px 18px" }}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 30,
            fontWeight: 700,
            color,
            lineHeight: 1,
          }}
        >
          {value}
        </div>
        <div
          style={{ fontSize: 12, fontWeight: 600, color: C.text, marginTop: 6 }}
        >
          {label}
        </div>
        {sub && (
          <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>
            {sub}
          </div>
        )}
      </div>
      <span style={{ fontSize: 24 }}>{icon}</span>
    </div>
    {note && (
      <div
        style={{
          marginTop: 8,
          padding: "3px 8px",
          borderRadius: 12,
          background: C.light,
          display: "inline-block",
          fontSize: 10,
          fontWeight: 700,
          color: C.mint,
        }}
      >
        {note}
      </div>
    )}
  </Card>
);

const TT = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: "10px 14px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
        fontSize: 12,
        minWidth: 130,
      }}
    >
      {label && (
        <div
          style={{
            fontWeight: 700,
            color: C.emerald,
            marginBottom: 5,
            borderBottom: `1px solid ${C.sand}`,
            paddingBottom: 5,
          }}
        >
          {label}
        </div>
      )}
      {payload.map((p, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 14,
            margin: "2px 0",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: p.color,
              }}
            />
            {p.name}
          </span>
          <strong>
            {typeof p.value === "number" ? p.value.toLocaleString() : p.value}
          </strong>
        </div>
      ))}
    </div>
  );
};

const InsightBox = ({ icon, title, body, color = C.emerald }) => (
  <div
    style={{
      display: "flex",
      gap: 12,
      padding: "12px 14px",
      background: C.cream,
      borderRadius: 8,
      borderLeft: `3px solid ${color}`,
      marginBottom: 10,
    }}
  >
    <span style={{ fontSize: 18, flexShrink: 0, lineHeight: 1.4 }}>{icon}</span>
    <div>
      <div style={{ fontSize: 12, fontWeight: 700, color }}>{title}</div>
      <div
        style={{ fontSize: 11, color: C.muted, marginTop: 3, lineHeight: 1.65 }}
      >
        {body}
      </div>
    </div>
  </div>
);

const ScoreBadge = ({ v }) => {
  const col =
    v >= 165
      ? "#065F46"
      : v >= 155
        ? C.mint
        : v >= 148
          ? C.accent
          : v >= 140
            ? C.warn
            : C.danger;
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 700,
        color: col,
        background: `${col}15`,
        borderRadius: 4,
        padding: "2px 7px",
      }}
    >
      {v.toFixed(1)}
    </span>
  );
};

const Btn = ({ active, onClick, children, color = C.emerald }) => (
  <button
    onClick={onClick}
    style={{
      padding: "5px 13px",
      borderRadius: 16,
      border: `1.5px solid ${active ? color : C.border}`,
      background: active ? color : C.white,
      color: active ? C.white : C.text,
      fontSize: 11,
      fontWeight: 700,
      cursor: "pointer",
    }}
  >
    {children}
  </button>
);

const TABS = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "plct", label: "PLCT Index", icon: "🔷" },
  { id: "sectors", label: "Sectors", icon: "🏭" },
  { id: "initiatives", label: "Initiatives", icon: "🚀" },
  { id: "disclosure", label: "Disclosure", icon: "📋" },
  { id: "benchmark", label: "Benchmarking", icon: "⚖️" },
  { id: "recommendations", label: "Recommendations", icon: "🎯" },
];

/* ── PAGE: Overview ─────────────────────────────────────────────── */
function OverviewPage() {
  return (
    <div>
      <div
        style={{
          background: `linear-gradient(135deg,${C.emerald},${C.deep} 60%,#0A3D2A)`,
          borderRadius: 16,
          padding: "34px 40px",
          marginBottom: 22,
          color: C.white,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <svg
          style={{
            position: "absolute",
            right: 16,
            top: "-10px",
            opacity: 0.07,
          }}
          width={280}
          height={280}
          viewBox="0 0 200 200"
        >
          <polygon
            points="100,10 122,70 190,70 134,110 156,170 100,130 44,170 66,110 10,70 78,70"
            fill={C.gold}
          />
          <polygon
            points="100,28 116,72 162,72 126,100 140,144 100,118 60,144 74,100 38,72 84,72"
            fill="none"
            stroke={C.gold}
            strokeWidth="2"
          />
        </svg>
        <p
          style={{
            margin: "0 0 6px",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: C.gold,
            fontWeight: 700,
          }}
        >
          Bursa Malaysia · 2022–2024 · AI-Extracted Research Data
        </p>
        <h1
          style={{
            margin: "0 0 10px",
            fontFamily: "'Playfair Display',Georgia,serif",
            fontSize: 24,
            fontWeight: 700,
            lineHeight: 1.3,
          }}
        >
          Advancing the Islamic Digital Economy in Malaysia
        </h1>
        <p
          style={{
            margin: "0 0 22px",
            fontSize: 13,
            color: "#BFE0D4",
            maxWidth: 600,
            lineHeight: 1.7,
          }}
        >
          A comprehensive conceptual framework and index measuring digital
          transformation maturity of Bursa Malaysia-listed companies using the{" "}
          <strong style={{ color: C.gold }}>PLCT Framework</strong> — People
          Empowerment, Operational Efficiency, Customer Experience, and New
          Business Models.
        </p>
        <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
          {[
            { v: "1,127", l: "Listed Companies" },
            { v: "2,706", l: "Annual Reports" },
            { v: "12,192", l: "Digital Initiatives" },
            { v: "16", l: "Industry Sectors" },
            { v: "3", l: "Years (2022–2024)" },
          ].map((d, i) => (
            <div key={i}>
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 24,
                  fontWeight: 700,
                  color: C.gold,
                }}
              >
                {d.v}
              </div>
              <div style={{ fontSize: 10, color: "#97C4B0" }}>{d.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 14,
          marginBottom: 18,
        }}
      >
        <KpiCard
          icon="🏢"
          label="Unique Listed Companies"
          value="1,127"
          color={C.emerald}
          sub="16 industry sectors"
        />
        <KpiCard
          icon="📄"
          label="Reports Analysed (AI)"
          value="2,706"
          color={C.gold}
          sub="Annual + CG + Sustainability"
          note="▲ +19.3% since 2022"
        />
        <KpiCard
          icon="🚀"
          label="Digital Initiatives Scored"
          value="12,192"
          color={C.mint}
          sub="PLCT multi-dimensional"
          note="▲ +19.0% since 2022"
        />
        <KpiCard
          icon="📈"
          label="Avg PLCT Index Score"
          value="152.1"
          color={C.accent}
          sub="Out of 400 maximum"
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <Card>
          <SectionTitle sub="Year-on-year growth in companies and digital initiatives">
            Report Coverage Growth 2022–2024
          </SectionTitle>
          <ResponsiveContainer width="100%" height={210}>
            <ComposedChart data={DB.yearCoverage}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.sand} />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="l" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="r" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip content={<TT />} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar
                yAxisId="l"
                dataKey="companies"
                name="Companies"
                fill={C.emerald}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                yAxisId="r"
                dataKey="initiatives"
                name="Initiatives"
                fill={C.gold}
                radius={[4, 4, 0, 0]}
              />
            </ComposedChart>
          </ResponsiveContainer>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 8,
              marginTop: 12,
            }}
          >
            {DB.yearCoverage.map((d, i) => (
              <div
                key={i}
                style={{
                  background: C.cream,
                  borderRadius: 8,
                  padding: "8px 12px",
                  borderLeft: `3px solid ${PAL[i]}`,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: 16,
                    fontWeight: 700,
                    color: PAL[i],
                  }}
                >
                  {d.year}
                </div>
                <div style={{ fontSize: 10, color: C.muted }}>
                  {d.companies} cos · {d.initiatives.toLocaleString()}{" "}
                  initiatives
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionTitle sub="Digital maturity across 2,706 company-reports">
            Digital Maturity Distribution
          </SectionTitle>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <PieChart width={170} height={170}>
              <Pie
                data={DB.maturity}
                cx={85}
                cy={85}
                innerRadius={52}
                outerRadius={80}
                dataKey="value"
                paddingAngle={4}
              >
                {DB.maturity.map((d, i) => (
                  <Cell key={i} fill={MATPAL[d.name]} />
                ))}
              </Pie>
              <Tooltip content={<TT />} />
            </PieChart>
            <div style={{ width: "100%" }}>
              {DB.maturity.map((d, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "7px 10px",
                    marginBottom: 5,
                    background: C.cream,
                    borderRadius: 7,
                    borderLeft: `3px solid ${MATPAL[d.name]}`,
                  }}
                >
                  <span style={{ fontSize: 12, fontWeight: 600 }}>
                    {d.name}
                  </span>
                  <div style={{ display: "flex", gap: 10 }}>
                    <span style={{ fontSize: 11, color: C.muted }}>
                      {d.value.toLocaleString()}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: MATPAL[d.name],
                      }}
                    >
                      {d.pct}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <Card>
          <SectionTitle sub="Mean scores per PLCT dimension across 12,192 initiatives (each /100)">
            PLCT Framework Scores
          </SectionTitle>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            {DB.plctOverall.map((d, i) => (
              <div
                key={i}
                style={{
                  background: C.cream,
                  borderRadius: 10,
                  padding: 14,
                  borderLeft: `4px solid ${d.color}`,
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{ fontSize: 11, fontWeight: 600, color: C.muted }}
                  >
                    {d.dim}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: 24,
                      fontWeight: 700,
                      color: d.color,
                    }}
                  >
                    {d.score}
                  </div>
                </div>
                <div
                  style={{
                    background: C.sand,
                    borderRadius: 4,
                    height: 6,
                    marginTop: 8,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${d.score}%`,
                      background: d.color,
                      height: "100%",
                      borderRadius: 4,
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: C.muted,
                    marginTop: 5,
                    textAlign: "right",
                  }}
                >
                  /100
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 12,
              padding: "9px 14px",
              background: C.light,
              borderRadius: 8,
              fontSize: 13,
              color: C.mint,
              fontWeight: 700,
              textAlign: "center",
              border: `1px solid ${C.mint}30`,
            }}
          >
            Combined PLCT Index: 152.1 / 400
          </div>
        </Card>
        <Card>
          <SectionTitle sub="Weighted index scores and strategic priority classification">
            Weighted Scores & Strategy
          </SectionTitle>
          <div style={{ marginBottom: 14 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: C.text,
                marginBottom: 8,
              }}
            >
              Strategic Digital Priority
            </div>
            {DB.strategicPriority.map((d, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 9,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: PAL[i],
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 3,
                    }}
                  >
                    <span style={{ fontSize: 12, fontWeight: 600 }}>
                      {d.name} Priority
                    </span>
                    <span style={{ fontSize: 11, color: C.muted }}>
                      {d.value.toLocaleString()} ({d.pct}%)
                    </span>
                  </div>
                  <div
                    style={{
                      background: C.sand,
                      borderRadius: 4,
                      height: 7,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${d.pct}%`,
                        background: PAL[i],
                        height: "100%",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${C.sand}`, paddingTop: 12 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: C.text,
                marginBottom: 8,
              }}
            >
              Weighted Index Scores
            </div>
            {DB.weightedScores.map((d, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "7px 10px",
                  background: C.cream,
                  borderRadius: 6,
                  marginBottom: 6,
                }}
              >
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{d.name}</div>
                  <div style={{ fontSize: 10, color: C.muted }}>{d.desc}</div>
                </div>
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: 20,
                    fontWeight: 700,
                    color: PAL[i + 3],
                  }}
                >
                  {d.value}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <SectionTitle badge="Policy Brief">Key Research Findings</SectionTitle>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: 8,
          }}
        >
          <InsightBox
            icon="⚠️"
            color={C.warn}
            title="Critical Innovation Gap"
            body="Only 0.6% of 12,192 initiatives are Transformational. Incremental (50.9%) and Moderate (48.4%) dominate — compliance-driven rather than innovation-led trajectory."
          />
          <InsightBox
            icon="🏆"
            color={C.emerald}
            title="OE Dominates (68.3%)"
            body="Operational Efficiency is dominant in 8,323 of 12,192 initiatives. New Business Models trails at 5.4% — a critical gap in the Islamic Digital Economy ecosystem."
          />
          <InsightBox
            icon="📉"
            color={C.danger}
            title="Customer Experience Declining"
            body="CE scores fell from 31.2 (2022) → 29.2 (2024). Companies are deprioritising customer-facing digital transformation at −1.0 pts/year."
          />
          <InsightBox
            icon="🔍"
            color={C.accent}
            title="Disclosure Quality: Moderate"
            body="Avg DQ Score 53.3/100. 43.1% Moderate, 41.6% Good, only 1.0% Comprehensive. Technology leads (54.8); Industrial Products lags (52.0)."
          />
        </div>
      </Card>
    </div>
  );
}

/* ── PAGE: PLCT ─────────────────────────────────────────────────── */
function PLCTPage() {
  const [distDim, setDistDim] = useState("OE");
  const distData = {
    OE: DB.plctScoreDistOE,
    CE: DB.plctScoreDistCE,
    NBM: DB.plctScoreDistNBM,
  };
  const distDesc = {
    OE: "Right-skewed — most initiatives score 60–79, reflecting a compliance-oriented operational focus.",
    CE: "Left-skewed — 4,108 initiatives score only 10–19, indicating very limited customer-centric digital transformation.",
    NBM: "Heavily concentrated at 10–19 (7,944 initiatives) — very limited new business model innovation.",
  };
  return (
    <div>
      <div
        style={{
          background: C.light,
          borderRadius: 10,
          padding: "12px 18px",
          marginBottom: 16,
          border: `1px solid ${C.mint}30`,
          fontSize: 12,
          color: C.muted,
          lineHeight: 1.7,
        }}
      >
        <strong style={{ color: C.emerald }}>About the PLCT Framework: </strong>
        Four dimensions, each scored 0–100. <strong>OE</strong> — process &
        governance. <strong>PE</strong> — workforce & digital skills.{" "}
        <strong>CE</strong> — digital engagement. <strong>NBM</strong> —
        innovation & disruption. Combined max: <strong>400 points</strong>.
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <Card>
          <SectionTitle sub="Overall average PLCT profile across all 12,192 initiatives">
            PLCT Radar Profile
          </SectionTitle>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart
              cx="50%"
              cy="50%"
              outerRadius="70%"
              data={DB.plctOverall.map((d) => ({
                subject: d.short,
                A: d.score,
                fullMark: 100,
              }))}
            >
              <PolarGrid stroke={C.sand} />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fontSize: 14, fontWeight: 700, fill: C.text }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fontSize: 9, fill: C.muted }}
                tickCount={5}
              />
              <Radar
                name="PLCT Score"
                dataKey="A"
                stroke={C.emerald}
                fill={C.emerald}
                fillOpacity={0.25}
                strokeWidth={2.5}
                dot={{ r: 5, fill: C.emerald }}
              />
              <Tooltip content={<TT />} />
            </RadarChart>
          </ResponsiveContainer>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: 8,
            }}
          >
            {DB.plctOverall.map((d, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "7px 10px",
                  background: C.cream,
                  borderRadius: 7,
                  borderLeft: `3px solid ${d.color}`,
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 600 }}>{d.short}</span>
                <span
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: 18,
                    fontWeight: 700,
                    color: d.color,
                  }}
                >
                  {d.score}
                </span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionTitle sub="Dimension scores with dominant dimension analysis">
            Dimension Detail
          </SectionTitle>
          <div style={{ paddingTop: 4 }}>
            {DB.plctOverall.map((d, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 5,
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{d.dim}</span>
                  <span
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: 16,
                      fontWeight: 700,
                      color: d.color,
                    }}
                  >
                    {d.score}
                    <span style={{ fontSize: 10, color: C.muted }}>/100</span>
                  </span>
                </div>
                <div
                  style={{
                    background: C.sand,
                    borderRadius: 6,
                    height: 10,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${d.score}%`,
                      background: `linear-gradient(90deg,${d.color},${d.color}BB)`,
                      height: "100%",
                      borderRadius: 6,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${C.sand}`, paddingTop: 12 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: C.text,
                marginBottom: 8,
              }}
            >
              Dominant Dimension per Initiative
            </div>
            {DB.dominantDim.map((d, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 7,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: PAL[i],
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 3,
                    }}
                  >
                    <span style={{ fontSize: 11, fontWeight: 600 }}>
                      {d.name}
                    </span>
                    <span style={{ fontSize: 11 }}>
                      {d.value.toLocaleString()} · {d.pct}%
                    </span>
                  </div>
                  <div
                    style={{
                      background: C.sand,
                      borderRadius: 4,
                      height: 6,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${d.pct}%`,
                        background: PAL[i],
                        height: "100%",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card style={{ marginBottom: 16 }}>
        <SectionTitle sub="PLCT dimension trends and weighted scores 2022–2024">
          Year-on-Year PLCT Trends
        </SectionTitle>
        <div
          style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 20 }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: C.muted,
                marginBottom: 8,
              }}
            >
              PLCT Dimensions (2022→2024)
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={DB.plctByYear}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.sand} />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis domain={[10, 70]} tick={{ fontSize: 11 }} />
                <Tooltip content={<TT />} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line
                  type="monotone"
                  dataKey="OE"
                  name="Operational Efficiency"
                  stroke={PAL[0]}
                  strokeWidth={2.5}
                  dot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="PE"
                  name="People Empowerment"
                  stroke={PAL[1]}
                  strokeWidth={2.5}
                  dot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="CE"
                  name="Customer Experience"
                  stroke={PAL[2]}
                  strokeWidth={2.5}
                  dot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="NBM"
                  name="New Business Models"
                  stroke={PAL[3]}
                  strokeWidth={2.5}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: C.muted,
                marginBottom: 8,
              }}
            >
              Weighted Scores (2022→2024)
            </div>
            <ResponsiveContainer width="100%" height={175}>
              <LineChart data={DB.plctByYear}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.sand} />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis domain={[36, 50]} tick={{ fontSize: 10 }} />
                <Tooltip content={<TT />} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Line
                  type="monotone"
                  dataKey="Investor"
                  name="Investor"
                  stroke="#3730A3"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="Policy"
                  name="Policy"
                  stroke="#B45309"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="Strategic"
                  name="Strategic"
                  stroke="#065F46"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div style={{ display: "grid", gap: 5, marginTop: 8 }}>
              {DB.weightedScores.map((d, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "5px 9px",
                    background: C.cream,
                    borderRadius: 6,
                  }}
                >
                  <span style={{ fontSize: 11, fontWeight: 600 }}>
                    {d.name}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      fontFamily: "'Playfair Display',serif",
                      color: PAL[i + 3],
                    }}
                  >
                    {d.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <SectionTitle sub="Frequency distribution of individual dimension scores">
            Score Frequency Distribution
          </SectionTitle>
          <div style={{ display: "flex", gap: 6 }}>
            {["OE", "CE", "NBM"].map((d) => (
              <Btn key={d} active={distDim === d} onClick={() => setDistDim(d)}>
                {d}
              </Btn>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={190}>
          <BarChart data={distData[distDim]} barCategoryGap="10%">
            <CartesianGrid strokeDasharray="3 3" stroke={C.sand} />
            <XAxis dataKey="range" tick={{ fontSize: 11 }} />
            <YAxis
              tickFormatter={(v) => v.toLocaleString()}
              tick={{ fontSize: 11 }}
            />
            <Tooltip content={<TT />} />
            <Bar dataKey="count" name="Initiatives" radius={[4, 4, 0, 0]}>
              {distData[distDim].map((_, i) => (
                <Cell key={i} fill={`hsl(155,${48 + i * 4}%,${35 + i * 3}%)`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div
          style={{
            fontSize: 11,
            color: C.muted,
            textAlign: "center",
            marginTop: 8,
            fontStyle: "italic",
          }}
        >
          {distDesc[distDim]}
        </div>
      </Card>
    </div>
  );
}

/* ── PAGE: Sectors ──────────────────────────────────────────────── */
function SectorsPage() {
  const [sortKey, setSortKey] = useState("total");
  const sorted = [...DB.sectorPLCT].sort((a, b) => b[sortKey] - a[sortKey]);
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <Card>
          <SectionTitle sub="Unique companies per sector across all three years">
            Companies by Sector
          </SectionTitle>
          <ResponsiveContainer width="100%" height={310}>
            <BarChart
              data={DB.sectorCompanies}
              layout="vertical"
              barCategoryGap="16%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke={C.sand} />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis
                type="category"
                dataKey="name"
                width={150}
                tick={{ fontSize: 11 }}
              />
              <Tooltip content={<TT />} />
              <Bar dataKey="count" name="Companies" radius={[0, 4, 4, 0]}>
                {DB.sectorCompanies.map((_, i) => (
                  <Cell key={i} fill={PAL[i % PAL.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <SectionTitle sub="Digital maturity progression across 2022–2024">
            Maturity by Year
          </SectionTitle>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={DB.maturityByYear} barCategoryGap="28%">
              <CartesianGrid strokeDasharray="3 3" stroke={C.sand} />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip content={<TT />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="Basic" fill={MATPAL.Basic} radius={[3, 3, 0, 0]} />
              <Bar
                dataKey="Developing"
                fill={MATPAL.Developing}
                radius={[3, 3, 0, 0]}
              />
              <Bar
                dataKey="Advanced"
                fill={MATPAL.Advanced}
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ marginTop: 14 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: C.text,
                marginBottom: 6,
              }}
            >
              Report Source Types
            </div>
            {DB.reportTypes.map((d, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px 0",
                  borderBottom: `1px solid ${C.sand}`,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 2,
                      background: PAL[i % PAL.length],
                      display: "inline-block",
                    }}
                  />
                  {d.name}
                </span>
                <span style={{ fontSize: 11, fontWeight: 600 }}>
                  {d.count.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card style={{ marginBottom: 16 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <SectionTitle sub="Normalised PLCT scores per industry sector">
            Sector PLCT Index — All 16 Sectors
          </SectionTitle>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {[
              { k: "total", l: "Total" },
              { k: "CE", l: "CE" },
              { k: "PE", l: "PE" },
              { k: "OE", l: "OE" },
              { k: "NBM", l: "NBM" },
              { k: "n", l: "Count" },
            ].map((m) => (
              <Btn
                key={m.k}
                active={sortKey === m.k}
                onClick={() => setSortKey(m.k)}
              >
                {m.l}
              </Btn>
            ))}
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}
          >
            <thead>
              <tr style={{ background: C.cream }}>
                {[
                  "Rank",
                  "Sector",
                  "PLCT Total",
                  "CE",
                  "PE",
                  "OE",
                  "NBM",
                  "Initiatives (n)",
                  "Avg DQ",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "8px 10px",
                      textAlign: "left",
                      fontWeight: 700,
                      color: C.emerald,
                      borderBottom: `2px solid ${C.sand}`,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((d, i) => (
                <tr
                  key={i}
                  style={{ background: i % 2 === 0 ? C.white : C.cream }}
                >
                  <td
                    style={{
                      padding: "7px 10px",
                      fontWeight: 700,
                      color:
                        i === 0
                          ? C.gold
                          : i === 1
                            ? "#6B7280"
                            : i === 2
                              ? "#B45309"
                              : C.muted,
                    }}
                  >
                    {i === 0
                      ? "🥇"
                      : i === 1
                        ? "🥈"
                        : i === 2
                          ? "🥉"
                          : `#${i + 1}`}
                  </td>
                  <td style={{ padding: "7px 10px", fontWeight: 600 }}>
                    {d.sector}
                  </td>
                  <td style={{ padding: "7px 10px" }}>
                    <ScoreBadge v={d.total} />
                  </td>
                  <td
                    style={{
                      padding: "7px 10px",
                      color:
                        d.CE >= 40 ? C.mint : d.CE >= 30 ? C.accent : C.muted,
                      fontWeight: 600,
                    }}
                  >
                    {d.CE.toFixed(1)}
                  </td>
                  <td
                    style={{
                      padding: "7px 10px",
                      color:
                        d.PE >= 42 ? C.mint : d.PE >= 38 ? C.accent : C.muted,
                      fontWeight: 600,
                    }}
                  >
                    {d.PE.toFixed(1)}
                  </td>
                  <td
                    style={{
                      padding: "7px 10px",
                      color: C.emerald,
                      fontWeight: 700,
                    }}
                  >
                    {d.OE.toFixed(1)}
                  </td>
                  <td
                    style={{
                      padding: "7px 10px",
                      color:
                        d.NBM >= 28 ? C.mint : d.NBM >= 20 ? C.accent : C.muted,
                      fontWeight: 600,
                    }}
                  >
                    {d.NBM.toFixed(1)}
                  </td>
                  <td style={{ padding: "7px 10px" }}>
                    {d.n.toLocaleString()}
                  </td>
                  <td
                    style={{
                      padding: "7px 10px",
                      fontWeight: 600,
                      color:
                        d.dq >= 55 ? C.mint : d.dq >= 52 ? C.accent : C.muted,
                    }}
                  >
                    {d.dq.toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card>
        <SectionTitle sub="PLCT total score year-on-year for 5 key sectors">
          Sector Score Trend 2022–2024
        </SectionTitle>
        <ResponsiveContainer width="100%" height={210}>
          <LineChart
            data={[
              {
                year: "2022",
                Tech: 165.9,
                FinSvc: 171.8,
                Telecom: 173.9,
                Retail: 152.0,
                Manuf: 142.1,
              },
              {
                year: "2023",
                Tech: 163.4,
                FinSvc: 158.5,
                Telecom: 178.5,
                Retail: 159.5,
                Manuf: 142.9,
              },
              {
                year: "2024",
                Tech: 167.9,
                FinSvc: 155.9,
                Telecom: 172.8,
                Retail: 155.6,
                Manuf: 142.3,
              },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={C.sand} />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
            <YAxis domain={[135, 185]} tick={{ fontSize: 11 }} />
            <Tooltip content={<TT />} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Line
              dataKey="Tech"
              name="Technology"
              stroke={PAL[0]}
              strokeWidth={2.5}
              dot={{ r: 5 }}
            />
            <Line
              dataKey="FinSvc"
              name="Financial Services"
              stroke={PAL[1]}
              strokeWidth={2.5}
              dot={{ r: 5 }}
            />
            <Line
              dataKey="Telecom"
              name="Telecom & Media"
              stroke={PAL[2]}
              strokeWidth={2.5}
              dot={{ r: 5 }}
            />
            <Line
              dataKey="Retail"
              name="Retail"
              stroke={PAL[3]}
              strokeWidth={2.5}
              dot={{ r: 5 }}
            />
            <Line
              dataKey="Manuf"
              name="Manufacturing"
              stroke={PAL[4]}
              strokeWidth={2.5}
              dot={{ r: 5 }}
              strokeDasharray="5 3"
            />
          </LineChart>
        </ResponsiveContainer>
        <div style={{ fontSize: 11, color: C.muted, marginTop: 8 }}>
          Financial Services declined 171.8 → 155.9 (2022–2024). Telecom & Media
          remained strongest (173.9 → 172.8). Manufacturing stable but
          below-average (142.1 → 142.3) despite 361 companies.
        </div>
      </Card>
    </div>
  );
}

/* ── PAGE: Initiatives ──────────────────────────────────────────── */
function InitiativesPage() {
  const [sortInit, setSortInit] = useState("count");
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 14,
          marginBottom: 18,
        }}
      >
        <KpiCard
          icon="🚀"
          label="Total Initiatives"
          value="12,192"
          color={C.emerald}
          sub="Across 2,706 reports"
        />
        <KpiCard
          icon="⚡"
          label="Transformational Only"
          value="78"
          color={C.danger}
          sub="0.6% of all initiatives"
          note="Critical gap"
        />
        <KpiCard
          icon="🔧"
          label="OE Dominant"
          value="68.3%"
          color={C.accent}
          sub="8,323 of 12,192 initiatives"
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <Card>
          <SectionTitle sub="Classification of 12,192 initiatives by innovation level">
            Innovation Level Distribution
          </SectionTitle>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <PieChart width={170} height={170}>
              <Pie
                data={DB.innovation}
                cx={85}
                cy={85}
                outerRadius={78}
                dataKey="value"
                paddingAngle={4}
              >
                {DB.innovation.map((_, i) => (
                  <Cell key={i} fill={[C.emerald, C.gold, C.accent][i]} />
                ))}
              </Pie>
              <Tooltip content={<TT />} />
            </PieChart>
            <div style={{ flex: 1 }}>
              {DB.innovation.map((d, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 7 }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 2,
                        background: [C.emerald, C.gold, C.accent][i],
                      }}
                    />
                    <span style={{ fontSize: 12, fontWeight: 700 }}>
                      {d.name}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: C.muted, marginLeft: 17 }}>
                    {d.value.toLocaleString()} ({d.pct}%)
                  </div>
                </div>
              ))}
              <div
                style={{
                  padding: "8px 10px",
                  background: "#FEF3C720",
                  border: `1px solid ${C.warn}40`,
                  borderRadius: 8,
                  fontSize: 10,
                  color: C.warn,
                  fontWeight: 600,
                }}
              >
                ⚠ Only 78 transformational initiatives across 3 years — critical
                Islamic Digital Economy gap
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <SectionTitle sub="Innovation level stacked by year 2022–2024">
            Innovation Trend by Year
          </SectionTitle>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={DB.innovByYear} barCategoryGap="28%">
              <CartesianGrid strokeDasharray="3 3" stroke={C.sand} />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip content={<TT />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="Incremental" fill={C.emerald} stackId="a" />
              <Bar dataKey="Moderate" fill={C.gold} stackId="a" />
              <Bar
                dataKey="Transformational"
                fill={C.accent}
                stackId="a"
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 5,
              marginTop: 10,
            }}
          >
            {DB.innovByYear.map((d, i) => (
              <div
                key={i}
                style={{
                  padding: "6px 8px",
                  background: C.cream,
                  borderRadius: 6,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700 }}>{d.year}</div>
                <div style={{ fontSize: 10, color: C.accent }}>
                  Trans: {d.Transformational}
                </div>
                <div style={{ fontSize: 9, color: C.muted }}>
                  (
                  {(
                    (d.Transformational /
                      (d.Incremental + d.Moderate + d.Transformational)) *
                    100
                  ).toFixed(1)}
                  %)
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <Card>
          <SectionTitle sub="Reported investment scale per initiative">
            Investment Distribution
          </SectionTitle>
          <PieChart width={220} height={200} style={{ margin: "0 auto" }}>
            <Pie
              data={DB.investmentDist}
              cx={110}
              cy={100}
              innerRadius={55}
              outerRadius={88}
              dataKey="value"
              paddingAngle={4}
            >
              {DB.investmentDist.map((_, i) => (
                <Cell key={i} fill={PAL[i]} />
              ))}
            </Pie>
            <Tooltip content={<TT />} />
          </PieChart>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 6,
              marginTop: 4,
            }}
          >
            {DB.investmentDist.map((d, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 6,
                  padding: "5px 8px",
                  background: C.cream,
                  borderRadius: 5,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 2,
                    background: PAL[i],
                    marginTop: 2,
                  }}
                />
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600 }}>{d.name}</div>
                  <div style={{ fontSize: 10, color: C.muted }}>{d.pct}%</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionTitle sub="Investment scale by sector (%) — Major, Moderate, Minor">
            Investment by Sector
          </SectionTitle>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart
              data={DB.investBySector}
              layout="vertical"
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke={C.sand} />
              <XAxis
                type="number"
                tickFormatter={(v) => `${v}%`}
                tick={{ fontSize: 11 }}
              />
              <YAxis
                type="category"
                dataKey="sector"
                width={135}
                tick={{ fontSize: 11 }}
              />
              <Tooltip content={<TT />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="Minor" name="Minor" fill={C.emerald} stackId="a" />
              <Bar
                dataKey="Moderate"
                name="Moderate"
                fill={C.gold}
                stackId="a"
              />
              <Bar dataKey="Major" name="Major" fill={C.accent} stackId="a" />
              <Bar dataKey="Other" name="Other" fill={C.sand} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <SectionTitle sub="14 most frequent initiative categories">
            Top Initiative Categories
          </SectionTitle>
          <div style={{ display: "flex", gap: 6 }}>
            <Btn
              active={sortInit === "count"}
              onClick={() => setSortInit("count")}
            >
              By Frequency
            </Btn>
            <Btn
              active={sortInit === "avgPLCT"}
              onClick={() => setSortInit("avgPLCT")}
            >
              By Avg PLCT
            </Btn>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={290}>
          <BarChart
            data={[...DB.topInitiatives].sort(
              (a, b) => b[sortInit] - a[sortInit],
            )}
            layout="vertical"
            barCategoryGap="10%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke={C.sand} />
            <XAxis type="number" tick={{ fontSize: 11 }} />
            <YAxis
              type="category"
              dataKey="name"
              width={195}
              tick={{ fontSize: 11 }}
            />
            <Tooltip content={<TT />} />
            <Bar
              dataKey={sortInit}
              name={sortInit === "count" ? "Count" : "Avg PLCT"}
              radius={[0, 4, 4, 0]}
            >
              {DB.topInitiatives.map((_, i) => (
                <Cell
                  key={i}
                  fill={`hsl(${152 - i * 6},${52 + i * 2}%,${35 + i * 2}%)`}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

/* ── PAGE: Disclosure ───────────────────────────────────────────── */
function DisclosurePage() {
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 14,
          marginBottom: 18,
        }}
      >
        <KpiCard
          icon="📊"
          label="Avg Disclosure Quality"
          value="53.3"
          color={C.accent}
          sub="Moderate tier (40–59 range)"
        />
        <KpiCard
          icon="✅"
          label="Good+ Quality"
          value="41.6%"
          color={C.mint}
          sub="5,074 initiatives"
        />
        <KpiCard
          icon="🏆"
          label="Comprehensive"
          value="1.0%"
          color={C.warn}
          sub="Only 128 of 12,192"
          note="Bottleneck"
        />
        <KpiCard
          icon="🤖"
          label="AI Confidence: Medium"
          value="91.0%"
          color={C.emerald}
          sub="11,100 initiatives"
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <Card>
          <SectionTitle sub="Simplified disclosure quality tier (n=12,192 initiatives)">
            Disclosure Quality Tiers
          </SectionTitle>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              paddingTop: 8,
            }}
          >
            <PieChart width={190} height={190}>
              <Pie
                data={DB.disclosureTier}
                cx={95}
                cy={95}
                outerRadius={82}
                dataKey="value"
                paddingAngle={3}
              >
                {DB.disclosureTier.map((_, i) => (
                  <Cell key={i} fill={PAL[i % PAL.length]} />
                ))}
              </Pie>
              <Tooltip content={<TT />} />
            </PieChart>
            <div style={{ flex: 1 }}>
              {DB.disclosureTier.map((d, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      marginBottom: 2,
                    }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 2,
                        background: PAL[i % PAL.length],
                      }}
                    />
                    <span style={{ fontSize: 12, fontWeight: 600 }}>
                      {d.name}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: C.muted, marginLeft: 17 }}>
                    {d.value.toLocaleString()} · {d.pct}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
        <Card>
          <SectionTitle sub="Numeric DQ score distribution (buckets of 20)">
            DQ Score Frequency Distribution
          </SectionTitle>
          <ResponsiveContainer width="100%" height={185}>
            <BarChart data={DB.dqDistribution} barCategoryGap="18%">
              <CartesianGrid strokeDasharray="3 3" stroke={C.sand} />
              <XAxis dataKey="range" tick={{ fontSize: 11 }} />
              <YAxis
                tickFormatter={(v) => v.toLocaleString()}
                tick={{ fontSize: 11 }}
              />
              <Tooltip content={<TT />} />
              <Bar dataKey="count" name="Initiatives" radius={[4, 4, 0, 0]}>
                {DB.dqDistribution.map((_, i) => (
                  <Cell key={i} fill={PAL[i % PAL.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div
            style={{
              fontSize: 11,
              color: C.muted,
              textAlign: "center",
              marginTop: 8,
            }}
          >
            Bimodal at 40–59 (5,285) and 60–79 (5,556). Avg = 53.3 (Moderate).
          </div>
        </Card>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <Card>
          <SectionTitle sub="AI extraction confidence per initiative">
            Confidence Level
          </SectionTitle>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={DB.confidence} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke={C.sand} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis
                tickFormatter={(v) => v.toLocaleString()}
                tick={{ fontSize: 11 }}
              />
              <Tooltip content={<TT />} />
              <Bar dataKey="value" name="Initiatives" radius={[4, 4, 0, 0]}>
                {DB.confidence.map((_, i) => (
                  <Cell
                    key={i}
                    fill={[C.emerald, C.mint, C.gold, C.accent][i]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: 6,
              marginTop: 10,
            }}
          >
            {DB.confidence.map((d, i) => (
              <div
                key={i}
                style={{
                  padding: "6px 9px",
                  background: C.cream,
                  borderRadius: 6,
                  borderLeft: `3px solid ${[C.emerald, C.mint, C.gold, C.accent][i]}`,
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 600 }}>{d.name}</div>
                <div style={{ fontSize: 10, color: C.muted }}>
                  {d.pct}% · {d.value.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionTitle sub="Top 10 technology mentions across all 2,706 reports">
            Technology Adoption Frequency
          </SectionTitle>
          <ResponsiveContainer width="100%" height={225}>
            <BarChart data={DB.topTech} layout="vertical" barCategoryGap="12%">
              <CartesianGrid strokeDasharray="3 3" stroke={C.sand} />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis
                type="category"
                dataKey="name"
                width={155}
                tick={{ fontSize: 11 }}
              />
              <Tooltip content={<TT />} />
              <Bar dataKey="count" name="Mentions" radius={[0, 4, 4, 0]}>
                {DB.topTech.map((_, i) => (
                  <Cell
                    key={i}
                    fill={`hsl(${152 - i * 10},${55 + i * 2}%,${34 + i * 3}%)`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <Card>
        <SectionTitle badge="For Policy Makers & Researchers">
          Disclosure Quality Insights
        </SectionTitle>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: 10,
          }}
        >
          <InsightBox
            icon="📋"
            color={C.accent}
            title="Moderate Disclosure Dominates"
            body="43.1% Moderate tier — limits rigorous benchmarking. Structured templates can elevate the floor to Good tier."
          />
          <InsightBox
            icon="🏆"
            color={C.mint}
            title="Technology Sector Leads DQ"
            body="Technology: 54.8 avg DQ, followed by Energy (53.9) and Telecom (53.9). Industrial Products (52.0) lowest."
          />
          <InsightBox
            icon="🤖"
            color={C.emerald}
            title="High AI Confidence"
            body="91.0% Medium confidence extractions. Combined High+Medium-High = 4.0%. Only 5.0% Low — validates GenAI reliability."
          />
          <InsightBox
            icon="📜"
            color={C.warn}
            title="Policy Recommendation"
            body="Mandating structured digital disclosure in MCCG could elevate avg DQ from 53.3 to Comprehensive tier (80+)."
          />
        </div>
      </Card>
    </div>
  );
}

/* ── PAGE: Benchmarking ─────────────────────────────────────────── */
function BenchmarkPage() {
  const [selected, setSelected] = useState([
    "Technology",
    "Financial Services",
    "Manufacturing",
  ]);
  const toggle = (s) =>
    setSelected((p) =>
      p.includes(s) ? p.filter((x) => x !== s) : p.length < 5 ? [...p, s] : p,
    );
  const filtered = DB.sectorPLCT.filter((d) => selected.includes(d.sector));
  return (
    <div>
      <div
        style={{
          padding: "12px 16px",
          background: C.light,
          borderRadius: 10,
          marginBottom: 16,
          fontSize: 12,
          color: C.mint,
          border: `1px solid ${C.mint}30`,
        }}
      >
        <strong>Interactive Benchmarking Tool</strong> — Select up to 5 sectors
        to compare PLCT profiles, dimension scores, and disclosure quality.
      </div>
      <Card style={{ marginBottom: 16 }}>
        <SectionTitle sub="Toggle sectors (max 5) — PLCT score shown in brackets">
          Select Sectors to Compare
        </SectionTitle>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {DB.sectorPLCT.map((d) => {
            const idx = selected.indexOf(d.sector);
            const active = idx >= 0;
            return (
              <button
                key={d.sector}
                onClick={() => toggle(d.sector)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  border: `2px solid ${active ? PAL[idx] : C.border}`,
                  background: active ? `${PAL[idx]}18` : C.white,
                  color: active ? PAL[idx] : C.muted,
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {d.sector}{" "}
                <span style={{ fontSize: 9, opacity: 0.8 }}>
                  ({d.total.toFixed(0)})
                </span>
              </button>
            );
          })}
        </div>
      </Card>
      {filtered.length > 0 && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 16,
            }}
          >
            <Card>
              <SectionTitle sub="PLCT radar overlay for selected sectors">
                Radar Comparison
              </SectionTitle>
              <ResponsiveContainer width="100%" height={270}>
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="68%"
                  data={["CE", "PE", "OE", "NBM"].map((dim) => {
                    const obj = { dim };
                    filtered.forEach((s) => {
                      obj[s.sector] = s[dim];
                    });
                    return obj;
                  })}
                >
                  <PolarGrid stroke={C.sand} />
                  <PolarAngleAxis
                    dataKey="dim"
                    tick={{ fontSize: 12, fontWeight: 700 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 75]}
                    tick={{ fontSize: 9, fill: C.muted }}
                  />
                  {filtered.map((s, i) => (
                    <Radar
                      key={s.sector}
                      name={s.sector}
                      dataKey={s.sector}
                      stroke={PAL[i]}
                      fill={PAL[i]}
                      fillOpacity={0.1}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  ))}
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Tooltip content={<TT />} />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
            <Card>
              <SectionTitle sub="Head-to-head scores — ★ = highest in selected group">
                Score Comparison Table
              </SectionTitle>
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: 11,
                  }}
                >
                  <thead>
                    <tr style={{ background: C.cream }}>
                      <th
                        style={{
                          padding: "7px 8px",
                          textAlign: "left",
                          fontWeight: 700,
                          color: C.emerald,
                          borderBottom: `2px solid ${C.sand}`,
                        }}
                      >
                        Metric
                      </th>
                      {filtered.map((s, i) => (
                        <th
                          key={i}
                          style={{
                            padding: "7px 8px",
                            textAlign: "right",
                            fontWeight: 700,
                            color: PAL[i],
                            borderBottom: `2px solid ${C.sand}`,
                          }}
                        >
                          {s.sector.split(" ").slice(0, 2).join(" ")}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { key: "total", label: "PLCT Total" },
                      { key: "CE", label: "Customer Exp." },
                      { key: "PE", label: "People Emp." },
                      { key: "OE", label: "Oper. Efficiency" },
                      { key: "NBM", label: "New Biz Models" },
                      { key: "n", label: "Initiatives (n)" },
                      { key: "dq", label: "Avg DQ Score" },
                    ].map((row, ri) => (
                      <tr
                        key={ri}
                        style={{ background: ri % 2 === 0 ? C.white : C.cream }}
                      >
                        <td style={{ padding: "6px 8px", fontWeight: 600 }}>
                          {row.label}
                        </td>
                        {filtered.map((s, j) => {
                          const v = s[row.key];
                          const isMax = filtered.every(
                            (ss) => ss[row.key] <= v,
                          );
                          return (
                            <td
                              key={j}
                              style={{
                                padding: "6px 8px",
                                textAlign: "right",
                                fontWeight: isMax ? 700 : 400,
                                color: isMax ? PAL[j] : C.text,
                              }}
                            >
                              {row.key === "n"
                                ? v.toLocaleString()
                                : v.toFixed(1)}
                              {isMax && filtered.length > 1 ? " ★" : ""}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
          <Card>
            <SectionTitle sub="Bar comparison of all 4 PLCT dimensions across selected sectors">
              Dimension Bar Comparison
            </SectionTitle>
            <ResponsiveContainer width="100%" height={230}>
              <BarChart
                data={[
                  { dim: "Customer Experience" },
                  { dim: "People Empowerment" },
                  { dim: "Operational Efficiency" },
                  { dim: "New Business Models" },
                ].map((row, ri) => {
                  const dimKey = ["CE", "PE", "OE", "NBM"][ri];
                  const obj = { ...row };
                  filtered.forEach((s) => {
                    obj[s.sector] = s[dimKey];
                  });
                  return obj;
                })}
                barCategoryGap="16%"
              >
                <CartesianGrid strokeDasharray="3 3" stroke={C.sand} />
                <XAxis dataKey="dim" tick={{ fontSize: 10 }} />
                <YAxis domain={[0, 75]} tick={{ fontSize: 11 }} />
                <Tooltip content={<TT />} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                {filtered.map((s, i) => (
                  <Bar
                    key={s.sector}
                    dataKey={s.sector}
                    fill={PAL[i]}
                    radius={[3, 3, 0, 0]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE: Recommendations — 8 sub-views, data-driven
   ══════════════════════════════════════════════════════════════ */
function RecommendationsPage() {
  const [view, setView] = useState("exec");
  const [corpIdx, setCorpIdx] = useState(0);
  const [policyIdx, setPolicyIdx] = useState(0);
  const [sectorIdx, setSectorIdx] = useState(0);
  const [phaseIdx, setPhaseIdx] = useState(0);

  const viewTabs = [
    { id: "exec", label: "Executive Summary" },
    { id: "gap", label: "Gap Analysis" },
    { id: "corp", label: "For Companies" },
    { id: "policy", label: "For Policy Makers" },
    { id: "sectors", label: "Sector Roadmaps" },
    { id: "roadmap", label: "Implementation Plan" },
    { id: "kpi", label: "KPI Targets" },
  ];

  /* ─── Executive Summary ─── */
  const renderExec = () => (
    <div>
      {/* Alert banner */}
      <div
        style={{
          background: `linear-gradient(135deg,#7C0000,#991B1B)`,
          borderRadius: 12,
          padding: "22px 28px",
          marginBottom: 20,
          color: C.white,
          display: "flex",
          gap: 20,
          alignItems: "flex-start",
        }}
      >
        <span style={{ fontSize: 36, flexShrink: 0 }}>🚨</span>
        <div>
          <div
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            3 Critical Findings Requiring Immediate Action
          </div>
          <div style={{ fontSize: 12, color: "#FFCDD2", lineHeight: 1.75 }}>
            The Islamic Digital Economy in Malaysia is at a crossroads. The PLCT
            Index of <strong>152.1/400 (38%)</strong> reveals companies are
            operationally focused but innovation-starved. Customer Experience is{" "}
            <strong>actively declining (−2.0 pts over 3 years)</strong>, New
            Business Models are{" "}
            <strong>critically underdeveloped (19.0/100)</strong>, and only{" "}
            <strong>0.6% of 12,192 initiatives are transformational</strong>.
            Without structural intervention, the gap between Malaysia and
            leading Islamic Digital Economy nations will widen.
          </div>
        </div>
      </div>

      {/* 3 critical KPIs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 14,
          marginBottom: 20,
        }}
      >
        {[
          {
            icon: "📉",
            label: "CE Actively Declining",
            val: "−1.0 pts/yr",
            sub: "31.2 → 29.2 over 3 years",
            color: C.danger,
            action:
              "Immediate digital CX strategy required — every year of inaction costs 1.0 point",
          },
          {
            icon: "💡",
            label: "NBM Critically Lagging",
            val: "81 pts gap",
            sub: "19.0/100 — only 19% achieved",
            color: C.warn,
            action:
              "New business model pilots needed urgently — 5.4% of initiatives is insufficient",
          },
          {
            icon: "⚡",
            label: "Innovation Desert",
            val: "0.6%",
            sub: "78 of 12,192 transformational",
            color: "#7C3D0F",
            action:
              "Transformational innovation fund required — target 5% (609 initiatives) by 2029",
          },
        ].map((d, i) => (
          <div
            key={i}
            style={{
              background: C.white,
              borderRadius: 12,
              padding: "18px 20px",
              border: `1px solid ${C.border}`,
              borderTop: `4px solid ${d.color}`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: 26 }}>{d.icon}</span>
              <span
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 26,
                  fontWeight: 700,
                  color: d.color,
                }}
              >
                {d.val}
              </span>
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: C.text,
                marginTop: 8,
              }}
            >
              {d.label}
            </div>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 10 }}>
              {d.sub}
            </div>
            <div
              style={{
                padding: "6px 10px",
                background: `${d.color}12`,
                borderRadius: 6,
                fontSize: 10,
                fontWeight: 600,
                color: d.color,
              }}
            >
              {d.action}
            </div>
          </div>
        ))}
      </div>

      {/* Radar: Current vs Target */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 20,
        }}
      >
        <Card>
          <SectionTitle sub="Current PLCT scores (2024) vs recommended 5-year targets (2029)">
            Current State vs 5-Year Vision
          </SectionTitle>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart
              cx="50%"
              cy="50%"
              outerRadius="68%"
              data={REC.targetRadar}
            >
              <PolarGrid stroke={C.sand} />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fontSize: 13, fontWeight: 700, fill: C.text }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fontSize: 9, fill: C.muted }}
                tickCount={5}
              />
              <Radar
                name="Current (2024)"
                dataKey="Current"
                stroke={C.danger}
                fill={C.danger}
                fillOpacity={0.18}
                strokeWidth={2.5}
                dot={{ r: 5 }}
              />
              <Radar
                name="2-Yr Target"
                dataKey="Target2yr"
                stroke={C.gold}
                fill={C.gold}
                fillOpacity={0.08}
                strokeWidth={2}
                strokeDasharray="5 3"
                dot={{ r: 4 }}
              />
              <Radar
                name="5-Yr Target"
                dataKey="Target5yr"
                stroke={C.emerald}
                fill={C.emerald}
                fillOpacity={0.1}
                strokeWidth={2}
                strokeDasharray="8 4"
                dot={{ r: 4 }}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Tooltip content={<TT />} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle sub="Improvement required per dimension to reach 5-year targets">
            Gap Analysis at a Glance
          </SectionTitle>
          {REC.gapAnalysis.map((d, i) => {
            const gap5 = d.target5yr - d.current;
            const gap2 = d.target2yr - d.current;
            const pct = (d.current / 100) * 100;
            return (
              <div key={i} style={{ marginBottom: 16 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 5,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <span style={{ fontSize: 12, fontWeight: 700 }}>
                      {d.dim}
                    </span>
                    <span
                      style={{
                        fontSize: 9,
                        background: `${d.color}15`,
                        color: d.color,
                        borderRadius: 12,
                        padding: "1px 8px",
                        fontWeight: 700,
                      }}
                    >
                      {d.priority}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: 14,
                      fontWeight: 700,
                      color: d.color,
                    }}
                  >
                    {d.current} → {d.target5yr}
                  </span>
                </div>
                {/* 3-layer progress bar */}
                <div
                  style={{
                    position: "relative",
                    background: C.sand,
                    borderRadius: 6,
                    height: 12,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${d.target5yr}%`,
                      background: `${d.color}25`,
                      height: "100%",
                      position: "absolute",
                    }}
                  />
                  <div
                    style={{
                      width: `${d.target2yr}%`,
                      background: `${d.color}50`,
                      height: "100%",
                      position: "absolute",
                    }}
                  />
                  <div
                    style={{
                      width: `${d.current}%`,
                      background: d.color,
                      height: "100%",
                      position: "absolute",
                      borderRadius: 6,
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 9,
                    color: C.muted,
                    marginTop: 3,
                  }}
                >
                  <span style={{ color: d.color, fontWeight: 700 }}>
                    Current: {d.current}
                  </span>
                  <span>
                    2yr: {d.target2yr} (+{gap2.toFixed(1)})
                  </span>
                  <span>
                    5yr: {d.target5yr} (+{gap5.toFixed(1)})
                  </span>
                </div>
              </div>
            );
          })}
          <div
            style={{
              marginTop: 10,
              padding: "8px 12px",
              background: C.light,
              borderRadius: 8,
              fontSize: 11,
              color: C.mint,
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            5-yr target: 210/400 (52%) — up from current 152.1/400 (38%)
          </div>
        </Card>
      </div>

      {/* 4 strategic imperatives */}
      <Card>
        <SectionTitle badge="Strategic Imperatives">
          Four Pillars of Action
        </SectionTitle>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: 10,
          }}
        >
          {[
            {
              icon: "👥",
              color: C.danger,
              title: "Reverse CE Decline",
              sub: "For Companies",
              body: "CE has fallen 2.0 points in 3 years. Set board-level CE KPIs, allocate ≥20% digital budget to customer-facing initiatives, and study Telecom & Media's playbook (CE 46.8 — the sector benchmark).",
            },
            {
              icon: "💡",
              color: C.warn,
              title: "Activate New Business Models",
              sub: "For Companies",
              body: "NBM at 19.0 has an 81-point gap to maximum. Pilot platform economics, Islamic fintech, halal e-commerce. Target at least 1 transformational initiative per company per year.",
            },
            {
              icon: "📜",
              color: "#3730A3",
              title: "Strengthen Disclosure",
              sub: "For Regulators",
              body: "Mandate DQ ≥70 in MCCG. Create standardised Bursa Digital Disclosure Template. Annual Islamic Digital Economy Index publication for public accountability.",
            },
            {
              icon: "🏭",
              color: "#7C3D0F",
              title: "Lift Bottom-5 Sectors",
              sub: "For Policy",
              body: "Plantation (138.8), Industrial (143.9), Construction (144.2) and Manufacturing (147.5) collectively hold 1,672 companies below the national average. Sector blueprints with targeted tax incentives are essential.",
            },
          ].map((d, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 12,
                padding: "14px 16px",
                background: C.cream,
                borderRadius: 10,
                borderLeft: `4px solid ${d.color}`,
              }}
            >
              <span style={{ fontSize: 22, flexShrink: 0 }}>{d.icon}</span>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{ fontSize: 13, fontWeight: 700, color: d.color }}
                  >
                    {d.title}
                  </span>
                  <span
                    style={{
                      fontSize: 9,
                      background: `${d.color}15`,
                      color: d.color,
                      borderRadius: 12,
                      padding: "1px 7px",
                      fontWeight: 700,
                    }}
                  >
                    {d.sub}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.65 }}>
                  {d.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  /* ─── Gap Analysis ─── */
  const renderGap = () => (
    <div>
      <Card style={{ marginBottom: 16 }}>
        <SectionTitle sub="Current 2024 scores vs 2-year (2026) and 5-year (2029) targets with required growth rate">
          PLCT Dimension Gap Analysis
        </SectionTitle>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={REC.gapAnalysis.map((d) => ({
              dim: d.dim,
              Current: d.current,
              "2yr Gap": +(d.target2yr - d.current).toFixed(1),
              "5yr Stretch": +(d.target5yr - d.target2yr).toFixed(1),
            }))}
            barCategoryGap="25%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke={C.sand} />
            <XAxis dataKey="dim" tick={{ fontSize: 13, fontWeight: 700 }} />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 11 }}
              label={{
                value: "Score (/100)",
                angle: -90,
                position: "insideLeft",
                fontSize: 10,
                fill: C.muted,
                dy: 50,
              }}
            />
            <Tooltip content={<TT />} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar
              dataKey="Current"
              name="Current (2024)"
              fill={C.emerald}
              radius={[0, 0, 0, 0]}
              stackId="a"
            />
            <Bar
              dataKey="2yr Gap"
              name="2-yr Gap to hit"
              fill={C.gold}
              radius={[0, 0, 0, 0]}
              stackId="a"
            />
            <Bar
              dataKey="5yr Stretch"
              name="5-yr Stretch"
              fill={`${C.mint}60`}
              radius={[4, 4, 0, 0]}
              stackId="a"
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: 14,
        }}
      >
        {REC.gapAnalysis.map((d, i) => {
          const gap2 = d.target2yr - d.current;
          const gap5 = d.target5yr - d.current;
          const annualNeeded = (gap5 / 5).toFixed(2);
          const pct = Math.round((d.current / 100) * 100);
          return (
            <Card key={i} style={{ borderLeft: `5px solid ${d.color}` }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 10,
                }}
              >
                <div>
                  <div
                    style={{ fontSize: 14, fontWeight: 700, color: d.color }}
                  >
                    {d.label} ({d.dim})
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      background: `${d.color}15`,
                      color: d.color,
                      borderRadius: 12,
                      padding: "2px 9px",
                      fontWeight: 700,
                      display: "inline-block",
                      marginTop: 4,
                    }}
                  >
                    {d.priority}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: 28,
                      fontWeight: 700,
                      color: d.color,
                      lineHeight: 1,
                    }}
                  >
                    {d.current}
                  </div>
                  <div style={{ fontSize: 10, color: C.muted }}>out of 100</div>
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                {[
                  {
                    label: "2-yr Target",
                    val: d.target2yr,
                    gain: `+${gap2.toFixed(1)}`,
                    col: C.gold,
                  },
                  {
                    label: "5-yr Target",
                    val: d.target5yr,
                    gain: `+${gap5.toFixed(1)}`,
                    col: C.mint,
                  },
                  {
                    label: "Needed/Year",
                    val: `+${annualNeeded}`,
                    gain: "pts/yr",
                    col: C.accent,
                  },
                ].map((m, j) => (
                  <div
                    key={j}
                    style={{
                      background: C.cream,
                      borderRadius: 8,
                      padding: "8px 10px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Playfair Display',serif",
                        fontSize: 16,
                        fontWeight: 700,
                        color: m.col,
                      }}
                    >
                      {m.val}
                    </div>
                    <div style={{ fontSize: 9, color: C.muted }}>{m.label}</div>
                    <div style={{ fontSize: 9, color: m.col, fontWeight: 700 }}>
                      {m.gain}
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  background: C.sand,
                  borderRadius: 6,
                  height: 8,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: `${d.target5yr}%`,
                    background: `${d.color}20`,
                    height: "100%",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    width: `${d.target2yr}%`,
                    background: `${d.color}50`,
                    height: "100%",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    width: `${d.current}%`,
                    background: d.color,
                    height: "100%",
                    borderRadius: 6,
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 9,
                  color: C.muted,
                  marginTop: 4,
                }}
              >
                <span>0</span>
                <span style={{ color: d.color, fontWeight: 700 }}>
                  {d.current} now
                </span>
                <span>{d.target2yr} (2yr)</span>
                <span>{d.target5yr} (5yr)</span>
                <span>100</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Key gap insight */}
      <div style={{ marginTop: 16 }}>
        <Card>
          <SectionTitle sub="Summary interpretation of the four dimension gaps">
            Gap Interpretation & Priority Order
          </SectionTitle>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: 10,
            }}
          >
            <InsightBox
              icon="🔴"
              color={C.danger}
              title="CE: Most Urgent (Gap = 69.5 pts to max)"
              body="CE is declining AND has the second-largest gap. At −1.0 pts/year, CE will reach 28.2 by 2026 without intervention. PLCT 5-yr target of 55.0 requires +24.5 pts from today — a 4.9 pts/year sustained improvement, 4.9× the current trend."
            />
            <InsightBox
              icon="🟠"
              color={C.warn}
              title="NBM: Structural Crisis (Gap = 81.0 pts to max)"
              body="NBM has the largest absolute gap. Moving from 19.0 → 40.0 requires +21 pts over 5 years (+4.2/yr). With only 78 transformational initiatives nationally, new capital and regulatory frameworks are prerequisites — companies cannot close this gap alone."
            />
            <InsightBox
              icon="🟡"
              color={C.accent}
              title="PE: Best Trajectory (Gap = 60.4 pts to max)"
              body="PE is the only dimension improving (+0.23 pts/year). Reaching the 5-yr target of 60.0 requires +20.4 pts, or +4.1/yr — 17× current improvement. It is achievable via corporate investment but requires deliberate acceleration, not organic drift."
            />
            <InsightBox
              icon="🟢"
              color={C.emerald}
              title="OE: Sustain, Don't Over-invest (Gap = 38.3 pts to max)"
              body="OE is the highest-scoring dimension but is over-allocated (68.3% of all initiatives). The 5-yr target of 75.0 is conservative (+13.3 pts). Energy should shift from OE to CE and NBM — OE capacity can be maintained through intelligent automation."
            />
          </div>
        </Card>
      </div>
    </div>
  );

  /* ─── Corporate Recommendations ─── */
  const renderCorp = () => {
    const p = REC.corporatePillars[corpIdx];
    const urgColor = {
      CRITICAL: C.danger,
      URGENT: C.warn,
      "HIGH PRIORITY": C.accent,
      MAINTAIN: C.emerald,
    };
    return (
      <div>
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 16,
            flexWrap: "wrap",
          }}
        >
          {REC.corporatePillars.map((pl, i) => (
            <button
              key={i}
              onClick={() => setCorpIdx(i)}
              style={{
                padding: "8px 18px",
                borderRadius: 20,
                border: `2px solid ${corpIdx === i ? pl.color : C.border}`,
                background: corpIdx === i ? pl.color : C.white,
                color: corpIdx === i ? C.white : C.muted,
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {pl.icon} {pl.pillar.split(" ")[0]}{" "}
              {pl.pillar.split(" ")[1] || ""}
            </button>
          ))}
        </div>

        {/* Pillar header */}
        <div
          style={{
            background: `linear-gradient(135deg,${p.color},${p.color}CC)`,
            borderRadius: 14,
            padding: "20px 24px",
            marginBottom: 16,
            color: C.white,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 6,
                }}
              >
                <span style={{ fontSize: 28 }}>{p.icon}</span>
                <div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: 18,
                      fontWeight: 700,
                    }}
                  >
                    {p.pillar}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      background: "rgba(255,255,255,0.25)",
                      borderRadius: 12,
                      padding: "2px 10px",
                      fontWeight: 700,
                      display: "inline-block",
                      marginTop: 3,
                    }}
                  >
                    {p.urgency}
                  </div>
                </div>
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.7,
                  maxWidth: 680,
                }}
              >
                {p.context}
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 20 }}>
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 26,
                  fontWeight: 700,
                }}
              >
                {p.score}
              </div>
              <div style={{ fontSize: 11, opacity: 0.8 }}>{p.trend}</div>
            </div>
          </div>
        </div>

        {/* Action items */}
        <Card>
          <SectionTitle
            sub={`${p.actions.length} evidence-based actions for ${p.pillar}`}
          >
            Recommended Actions
          </SectionTitle>
          {p.actions.map((a, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 14,
                padding: "14px 16px",
                background: i % 2 === 0 ? C.cream : C.white,
                borderRadius: 10,
                marginBottom: 8,
                borderLeft: `3px solid ${p.color}`,
              }}
            >
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: p.color,
                  color: C.white,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: C.text,
                    marginBottom: 5,
                  }}
                >
                  {a.text}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 10, color: C.muted }}>
                    📊 Evidence:
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      color: p.color,
                      fontWeight: 600,
                      fontStyle: "italic",
                    }}
                  >
                    {a.evidence}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Card>

        {/* Quick benchmark */}
        <div style={{ marginTop: 14 }}>
          <Card>
            <SectionTitle sub="Which sector leads this dimension — and by how much?">
              Sector Benchmark for this Dimension
            </SectionTitle>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={[...DB.sectorPLCT]
                  .sort((a, b) => {
                    const key = ["CE", "NBM", "PE", "OE"][corpIdx] || "CE";
                    return b[key] - a[key];
                  })
                  .slice(0, 8)
                  .map((s) => ({
                    name: s.sector.split(" ").slice(0, 2).join(" "),
                    score: s[["CE", "PE", "OE", "NBM"][corpIdx]],
                  }))}
                layout="vertical"
                barCategoryGap="12%"
              >
                <CartesianGrid strokeDasharray="3 3" stroke={C.sand} />
                <XAxis type="number" domain={[0, 80]} tick={{ fontSize: 11 }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={125}
                  tick={{ fontSize: 10 }}
                />
                <Tooltip content={<TT />} />
                <Bar
                  dataKey="score"
                  name={["CE", "PE", "OE", "NBM"][corpIdx] + " Score"}
                  radius={[0, 4, 4, 0]}
                  fill={p.color}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    );
  };

  /* ─── Policy Recommendations ─── */
  const renderPolicy = () => {
    const p = REC.policyPillars[policyIdx];
    const cols = ["#3730A3", "#065F46", "#7C3D0F", "#9D174D"];
    return (
      <div>
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 16,
            flexWrap: "wrap",
          }}
        >
          {REC.policyPillars.map((pl, i) => (
            <button
              key={i}
              onClick={() => setPolicyIdx(i)}
              style={{
                padding: "8px 16px",
                borderRadius: 20,
                border: `2px solid ${policyIdx === i ? cols[i] : C.border}`,
                background: policyIdx === i ? cols[i] : C.white,
                color: policyIdx === i ? C.white : C.muted,
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {pl.icon} {pl.category}
            </button>
          ))}
        </div>

        <div
          style={{
            background: `linear-gradient(135deg,${cols[policyIdx]},${cols[policyIdx]}BB)`,
            borderRadius: 14,
            padding: "18px 24px",
            marginBottom: 16,
            color: C.white,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 8,
            }}
          >
            <span style={{ fontSize: 28 }}>{p.icon}</span>
            <div>
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                {p.category}
              </div>
              <div style={{ fontSize: 10, opacity: 0.7, marginTop: 2 }}>
                Policy Recommendations for Regulators, BNM & MDEC
              </div>
            </div>
          </div>
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.75,
            }}
          >
            {p.rationale}
          </div>
        </div>

        <Card>
          <SectionTitle
            sub={`${p.actions.length} specific policy actions with data rationale`}
          >
            Policy Actions
          </SectionTitle>
          {p.actions.map((a, i) => (
            <div
              key={i}
              style={{
                padding: "14px 16px",
                background: i % 2 === 0 ? C.cream : C.white,
                borderRadius: 10,
                marginBottom: 8,
                borderLeft: `3px solid ${cols[policyIdx]}`,
              }}
            >
              <div
                style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
              >
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: cols[policyIdx],
                    color: C.white,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: C.text,
                      marginBottom: 5,
                    }}
                  >
                    {a.text}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: C.muted,
                      fontStyle: "italic",
                    }}
                  >
                    📊 {a.rationale}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Card>

        {/* Policy impact scorecard */}
        <div style={{ marginTop: 14 }}>
          <Card>
            <SectionTitle sub="Expected PLCT improvement if policy recommendations are implemented">
              Projected Policy Impact
            </SectionTitle>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 10,
              }}
            >
              {[
                { dim: "OE", current: 61.7, projected: 68.5, color: PAL[0] },
                { dim: "PE", current: 39.6, projected: 52.0, color: PAL[1] },
                { dim: "CE", current: 30.5, projected: 48.0, color: PAL[2] },
                { dim: "NBM", current: 19.0, projected: 36.5, color: PAL[3] },
              ].map((d, i) => (
                <div
                  key={i}
                  style={{
                    background: C.cream,
                    borderRadius: 10,
                    padding: "12px 14px",
                    textAlign: "center",
                    borderTop: `3px solid ${d.color}`,
                  }}
                >
                  <div
                    style={{ fontSize: 11, color: C.muted, fontWeight: 600 }}
                  >
                    {d.dim}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: 11,
                      fontWeight: 700,
                      color: C.muted,
                      marginTop: 4,
                    }}
                  >
                    {d.current}
                  </div>
                  <div
                    style={{ fontSize: 18, color: d.color, margin: "2px 0" }}
                  >
                    ↓
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: 22,
                      fontWeight: 700,
                      color: d.color,
                    }}
                  >
                    {d.projected}
                  </div>
                  <div style={{ fontSize: 10, color: C.mint, fontWeight: 700 }}>
                    +{(d.projected - d.current).toFixed(1)}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 12,
                padding: "9px 14px",
                background: C.light,
                borderRadius: 8,
                fontSize: 12,
                color: C.mint,
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              Projected PLCT: 205.0/400 (51%) — up from 152.1/400 (38%) if all
              policy actions are implemented by 2029
            </div>
          </Card>
        </div>
      </div>
    );
  };

  /* ─── Sector Roadmaps ─── */
  const renderSectors = () => {
    const s = REC.sectorRecs[sectorIdx];
    const dimKeys = ["CE", "PE", "OE", "NBM"];
    return (
      <div>
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 16,
            flexWrap: "wrap",
          }}
        >
          {REC.sectorRecs.map((sr, i) => (
            <button
              key={i}
              onClick={() => setSectorIdx(i)}
              style={{
                padding: "8px 15px",
                borderRadius: 20,
                border: `2px solid ${sectorIdx === i ? sr.color : C.border}`,
                background: sectorIdx === i ? sr.color : C.white,
                color: sectorIdx === i ? C.white : C.muted,
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {sr.icon} {sr.sector.split(" ").slice(0, 2).join(" ")}
            </button>
          ))}
        </div>

        <div
          style={{
            background: `linear-gradient(135deg,${s.color},${s.color}AA)`,
            borderRadius: 14,
            padding: "20px 24px",
            marginBottom: 16,
            color: C.white,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 6,
                }}
              >
                <span style={{ fontSize: 28 }}>{s.icon}</span>
                <div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: 18,
                      fontWeight: 700,
                    }}
                  >
                    {s.sector}
                  </div>
                  <div style={{ fontSize: 10, opacity: 0.75 }}>
                    Rank #{s.rank} of 16 · {s.companies} companies ·{" "}
                    {s.initiatives.toLocaleString()} initiatives
                  </div>
                </div>
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.75,
                }}
              >
                {s.insight}
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 20 }}>
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 28,
                  fontWeight: 700,
                }}
              >
                {s.score}
              </div>
              <div style={{ fontSize: 10, opacity: 0.75 }}>PLCT Total</div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginBottom: 14,
          }}
        >
          {/* Dimension scores */}
          <Card>
            <SectionTitle sub="This sector's PLCT dimension scores vs national average">
              Dimension Profile
            </SectionTitle>
            {dimKeys.map((dk, i) => {
              const sv = s[dk];
              const avg = [30.5, 39.6, 61.7, 19.0][i];
              const isAbove = sv >= avg;
              return (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 4,
                    }}
                  >
                    <span style={{ fontSize: 12, fontWeight: 700 }}>
                      {
                        [
                          "Customer Experience",
                          "People Empowerment",
                          "Operational Efficiency",
                          "New Business Models",
                        ][i]
                      }
                    </span>
                    <div
                      style={{ display: "flex", gap: 10, alignItems: "center" }}
                    >
                      <span style={{ fontSize: 10, color: C.muted }}>
                        Nat. avg: {avg}
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: isAbove ? C.mint : C.danger,
                        }}
                      >
                        {sv} {isAbove ? "▲" : "▼"}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      background: C.sand,
                      borderRadius: 6,
                      height: 10,
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        width: `${avg}%`,
                        background: `${C.muted}40`,
                        height: "100%",
                        borderRadius: 6,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        width: `${sv}%`,
                        background: isAbove ? C.mint : C.danger,
                        height: "100%",
                        borderRadius: 6,
                        opacity: 0.85,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </Card>

          {/* Recommended actions */}
          <Card>
            <SectionTitle sub="Impact estimate and implementation difficulty">
              Recommended Actions
            </SectionTitle>
            {s.recs.map((r, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 10,
                  padding: "8px 10px",
                  background: i % 2 === 0 ? C.cream : C.white,
                  borderRadius: 8,
                  marginBottom: 6,
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: s.color,
                    color: C.white,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: C.text,
                      marginBottom: 4,
                    }}
                  >
                    {r.action}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <span
                      style={{
                        fontSize: 9,
                        background: `${C.mint}20`,
                        color: C.mint,
                        borderRadius: 10,
                        padding: "1px 7px",
                        fontWeight: 700,
                      }}
                    >
                      📈 {r.impact}
                    </span>
                    <span
                      style={{
                        fontSize: 9,
                        background: `${C.muted}20`,
                        color: C.muted,
                        borderRadius: 10,
                        padding: "1px 7px",
                        fontWeight: 700,
                      }}
                    >
                      ⚙️ {r.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    );
  };

  /* ─── Implementation Roadmap ─── */
  const renderRoadmap = () => {
    const urgColor = {
      Critical: C.danger,
      High: C.warn,
      Medium: C.accent,
      Target: C.mint,
      Vision: C.emerald,
    };
    return (
      <div>
        <div
          style={{
            background: C.light,
            borderRadius: 10,
            padding: "12px 18px",
            marginBottom: 16,
            border: `1px solid ${C.mint}30`,
            fontSize: 12,
            color: C.muted,
            lineHeight: 1.7,
          }}
        >
          A phased 5-year implementation plan for all stakeholders — companies,
          regulators and researchers — derived from the PLCT data gaps and
          sector analysis. Actions are ordered by urgency and feasibility.
        </div>

        {/* Phase selector */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {REC.roadmap.map((ph, i) => (
            <button
              key={i}
              onClick={() => setPhaseIdx(i)}
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: 10,
                border: `2px solid ${phaseIdx === i ? ph.color : C.border}`,
                background: phaseIdx === i ? ph.color : C.white,
                color: phaseIdx === i ? C.white : C.muted,
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              Phase {ph.phase}
              <br />
              <span style={{ fontSize: 9, opacity: 0.8 }}>
                {ph.label.split("(")[1]?.replace(")", "") || ""}
              </span>
            </button>
          ))}
        </div>

        {REC.roadmap.map((ph, pi) =>
          pi !== phaseIdx ? null : (
            <div key={pi}>
              <div
                style={{
                  background: `linear-gradient(135deg,${ph.color},${ph.color}BB)`,
                  borderRadius: 14,
                  padding: "16px 24px",
                  marginBottom: 16,
                  color: C.white,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  {ph.label}
                </div>
                <div style={{ fontSize: 11, opacity: 0.8, marginTop: 4 }}>
                  {ph.items.length} key actions · Click to expand
                </div>
              </div>
              <Card>
                {ph.items.map((item, ii) => (
                  <div
                    key={ii}
                    style={{
                      display: "flex",
                      gap: 16,
                      padding: "16px 18px",
                      background: ii % 2 === 0 ? C.cream : C.white,
                      borderRadius: 10,
                      marginBottom: 8,
                      borderLeft: `4px solid ${ph.color}`,
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: ph.color,
                        color: C.white,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 13,
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {ii + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: C.text,
                            marginBottom: 6,
                            flex: 1,
                            paddingRight: 10,
                          }}
                        >
                          {item.action}
                        </div>
                        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                          <span
                            style={{
                              fontSize: 9,
                              background: `${urgColor[item.urgency] || C.accent}20`,
                              color: urgColor[item.urgency] || C.accent,
                              borderRadius: 12,
                              padding: "2px 9px",
                              fontWeight: 700,
                            }}
                          >
                            {item.urgency}
                          </span>
                          <span
                            style={{
                              fontSize: 9,
                              background: `${C.muted}15`,
                              color: C.muted,
                              borderRadius: 12,
                              padding: "2px 9px",
                              fontWeight: 700,
                            }}
                          >
                            {item.owner}
                          </span>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <span style={{ fontSize: 10, color: C.muted }}>
                          🎯 Success metric:
                        </span>
                        <span
                          style={{
                            fontSize: 10,
                            color: ph.color,
                            fontWeight: 700,
                          }}
                        >
                          {item.metric}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          ),
        )}

        {/* Gantt-style timeline summary */}
        <div style={{ marginTop: 16 }}>
          <Card>
            <SectionTitle sub="Key milestones across all three phases">
              Timeline Overview
            </SectionTitle>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 12,
              }}
            >
              {REC.roadmap.map((ph, i) => (
                <div
                  key={i}
                  style={{
                    borderTop: `4px solid ${ph.color}`,
                    borderRadius: 8,
                    padding: "12px 14px",
                    background: C.cream,
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: ph.color,
                      marginBottom: 6,
                    }}
                  >
                    {ph.label}
                  </div>
                  {ph.items
                    .filter((it) =>
                      ["Critical", "High", "Target", "Vision"].includes(
                        it.urgency,
                      ),
                    )
                    .map((it, j) => (
                      <div
                        key={j}
                        style={{
                          display: "flex",
                          gap: 6,
                          marginBottom: 5,
                          alignItems: "flex-start",
                        }}
                      >
                        <span
                          style={{ fontSize: 10, flexShrink: 0, marginTop: 1 }}
                        >
                          →
                        </span>
                        <span style={{ fontSize: 10, color: C.muted }}>
                          {it.action.split("—")[0].trim()}
                        </span>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  };

  /* ─── KPI Targets ─── */
  const renderKPI = () => (
    <div>
      <div
        style={{
          background: `linear-gradient(135deg,${C.emerald},${C.deep})`,
          borderRadius: 12,
          padding: "18px 24px",
          marginBottom: 16,
          color: C.white,
        }}
      >
        <div
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 17,
            fontWeight: 700,
            marginBottom: 6,
          }}
        >
          Islamic Digital Economy KPI Target Framework
        </div>
        <div style={{ fontSize: 12, color: "#BFE0D4", lineHeight: 1.7 }}>
          Evidence-based targets derived from gap analysis, peer sector
          performance and realistic growth trajectories. The stretch column
          represents best-case scenario if all structural barriers are resolved.
        </div>
      </div>

      <Card style={{ marginBottom: 16 }}>
        <SectionTitle sub="Baseline (2024) → 2026 → 2027 → 2029 targets → stretch goal">
          KPI Targets Table
        </SectionTitle>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}
          >
            <thead>
              <tr style={{ background: C.emerald }}>
                {[
                  "KPI",
                  "Baseline 2024",
                  "Target 2026",
                  "Target 2027",
                  "Target 2029",
                  "Stretch",
                ].map((h, i) => (
                  <th
                    key={i}
                    style={{
                      padding: "10px 12px",
                      textAlign: i === 0 ? "left" : "center",
                      fontWeight: 700,
                      color: C.white,
                      fontSize: 11,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {REC.kpiTargets.map((row, i) => (
                <tr
                  key={i}
                  style={{ background: i % 2 === 0 ? C.white : C.cream }}
                >
                  <td
                    style={{
                      padding: "10px 12px",
                      fontWeight: 700,
                      color: C.text,
                      fontSize: 12,
                    }}
                  >
                    {row.kpi}
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "center" }}>
                    <span
                      style={{
                        fontFamily: "'Playfair Display',serif",
                        fontSize: 14,
                        fontWeight: 700,
                        color: C.danger,
                      }}
                    >
                      {row.baseline}
                    </span>
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "center" }}>
                    <span
                      style={{
                        fontFamily: "'Playfair Display',serif",
                        fontSize: 14,
                        fontWeight: 700,
                        color: C.warn,
                      }}
                    >
                      {row.yr2026}
                    </span>
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "center" }}>
                    <span
                      style={{
                        fontFamily: "'Playfair Display',serif",
                        fontSize: 14,
                        fontWeight: 700,
                        color: C.accent,
                      }}
                    >
                      {row.yr2027}
                    </span>
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "center" }}>
                    <span
                      style={{
                        fontFamily: "'Playfair Display',serif",
                        fontSize: 14,
                        fontWeight: 700,
                        color: C.mint,
                      }}
                    >
                      {row.yr2029}
                    </span>
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "center" }}>
                    <span
                      style={{
                        fontFamily: "'Playfair Display',serif",
                        fontSize: 14,
                        fontWeight: 700,
                        color: C.emerald,
                      }}
                    >
                      {row.stretch}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          style={{
            display: "flex",
            gap: 20,
            marginTop: 12,
            fontSize: 10,
            color: C.muted,
            flexWrap: "wrap",
          }}
        >
          <span style={{ color: C.danger, fontWeight: 700 }}>■ Baseline</span>
          <span style={{ color: C.warn, fontWeight: 700 }}>■ 2026 (2yr)</span>
          <span style={{ color: C.accent, fontWeight: 700 }}>■ 2027 (3yr)</span>
          <span style={{ color: C.mint, fontWeight: 700 }}>■ 2029 (5yr)</span>
          <span style={{ color: C.emerald, fontWeight: 700 }}>
            ■ Stretch (aspirational)
          </span>
        </div>
      </Card>

      {/* PLCT trajectory chart */}
      <Card>
        <SectionTitle sub="Projected PLCT total index improvement trajectory 2024–2029">
          PLCT Index Improvement Trajectory
        </SectionTitle>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart
            data={[
              {
                year: "2024(now)",
                Baseline: 152.1,
                Conservative: 152.1,
                Target: 152.1,
                Stretch: 152.1,
              },
              {
                year: "2025",
                Baseline: 154,
                Conservative: 157,
                Target: 162,
                Stretch: 168,
              },
              {
                year: "2026",
                Baseline: 155,
                Conservative: 162,
                Target: 172,
                Stretch: 183,
              },
              {
                year: "2027",
                Baseline: 156,
                Conservative: 168,
                Target: 183,
                Stretch: 200,
              },
              {
                year: "2028",
                Baseline: 157,
                Conservative: 174,
                Target: 196,
                Stretch: 225,
              },
              {
                year: "2029",
                Baseline: 158,
                Conservative: 180,
                Target: 210,
                Stretch: 250,
              },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={C.sand} />
            <XAxis dataKey="year" tick={{ fontSize: 11 }} />
            <YAxis
              domain={[140, 260]}
              tick={{ fontSize: 11 }}
              label={{
                value: "PLCT Score /400",
                angle: -90,
                position: "insideLeft",
                fontSize: 10,
                fill: C.muted,
                dx: -10,
              }}
            />
            <Tooltip content={<TT />} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Line
              dataKey="Baseline"
              name="No-action baseline"
              stroke={C.muted}
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={{ r: 3 }}
            />
            <Line
              dataKey="Conservative"
              name="Conservative path"
              stroke={C.gold}
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              dataKey="Target"
              name="Recommended target"
              stroke={C.mint}
              strokeWidth={2.5}
              dot={{ r: 5 }}
            />
            <Line
              dataKey="Stretch"
              name="Stretch scenario"
              stroke={C.emerald}
              strokeWidth={2.5}
              strokeDasharray="6 2"
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div
          style={{
            fontSize: 11,
            color: C.muted,
            marginTop: 8,
            textAlign: "center",
          }}
        >
          No-action baseline reaches only 158 by 2029. Recommended target of 210
          is achievable if all structural recommendations are implemented.
        </div>
      </Card>
    </div>
  );

  const views = {
    exec: renderExec,
    gap: renderGap,
    corp: renderCorp,
    policy: renderPolicy,
    sectors: renderSectors,
    roadmap: renderRoadmap,
    kpi: renderKPI,
  };

  return (
    <div>
      {/* Rec header */}
      <div
        style={{
          background: `linear-gradient(135deg,${C.deep},${C.emerald})`,
          borderRadius: 14,
          padding: "18px 28px",
          marginBottom: 18,
          color: C.white,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -20,
            top: -20,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: `${C.gold}18`,
          }}
        />
        <div
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          🎯 Strategic Recommendations
        </div>
        <div style={{ fontSize: 11, color: "#97C4B0" }}>
          Data-driven actions for companies, policy makers and regulators —
          derived from PLCT index analysis of 1,127 companies, 12,192
          initiatives and 2,706 annual reports.
        </div>
      </div>

      {/* Sub-nav */}
      <div
        style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}
      >
        {[
          { id: "exec", label: "📊 Executive Summary" },
          { id: "gap", label: "📐 Gap Analysis" },
          { id: "corp", label: "🏢 For Companies" },
          { id: "policy", label: "🏛 For Policy Makers" },
          { id: "sectors", label: "🏭 Sector Roadmaps" },
          { id: "roadmap", label: "🗓 Implementation Plan" },
          { id: "kpi", label: "📈 KPI Targets" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setView(t.id)}
            style={{
              padding: "7px 14px",
              borderRadius: 20,
              border: `1.5px solid ${view === t.id ? C.emerald : C.border}`,
              background: view === t.id ? C.emerald : C.white,
              color: view === t.id ? C.white : C.text,
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {(views[view] || renderExec)()}
    </div>
  );
}

/* ── Root App ───────────────────────────────────────────────────── */
export default function App() {
  const [tab, setTab] = useState("overview");
  const pages = {
    overview: <OverviewPage />,
    plct: <PLCTPage />,
    sectors: <SectorsPage />,
    initiatives: <InitiativesPage />,
    disclosure: <DisclosurePage />,
    benchmark: <BenchmarkPage />,
    recommendations: <RecommendationsPage />,
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,600;0,9..40,700;1,9..40,400&display=swap"
        rel="stylesheet"
      />
      <div
        style={{
          minHeight: "100vh",
          background: C.cream,
          fontFamily: "'DM Sans',sans-serif",
        }}
      >
        {/* Header */}
        <div
          style={{ background: C.emerald, borderBottom: `3px solid ${C.gold}` }}
        >
          <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 32px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "13px 0 0",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
                <svg width={36} height={36} viewBox="0 0 100 100">
                  <polygon
                    points="50,5 61,35 95,35 67,57 79,91 50,70 21,91 33,57 5,35 39,35"
                    fill={C.gold}
                  />
                  <polygon
                    points="50,20 58,42 80,42 63,55 70,77 50,64 30,77 37,55 20,42 42,42"
                    fill={C.deep}
                    opacity="0.7"
                  />
                </svg>
                <div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: 15,
                      fontWeight: 700,
                      color: C.white,
                      lineHeight: 1.2,
                    }}
                  >
                    Islamic Digital Economy Index
                  </div>
                  <div
                    style={{
                      fontSize: 9,
                      color: "#97C4B0",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginTop: 2,
                    }}
                  >
                    Malaysia · Bursa Malaysia · 2022–2024 Research Dashboard
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 10, color: C.gold, fontWeight: 700 }}>
                  1,127 Companies · 12,192 Initiatives · PLCT Framework
                </div>
                <div style={{ fontSize: 9, color: "#6B9E8A" }}>
                  AI-Extracted · GenAI Validated · For Researchers, Companies &
                  Policy Makers
                </div>
              </div>
            </div>
            {/* Nav tabs */}
            <div
              style={{
                display: "flex",
                gap: 2,
                marginTop: 13,
                flexWrap: "wrap",
              }}
            >
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  style={{
                    padding: "9px 16px",
                    border: "none",
                    background: tab === t.id ? C.cream : "transparent",
                    color: tab === t.id ? C.emerald : "#C8E6D8",
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: "pointer",
                    borderRadius: "7px 7px 0 0",
                    borderTop:
                      tab === t.id
                        ? `2px solid ${C.gold}`
                        : "2px solid transparent",
                    transition: "all 0.15s",
                  }}
                >
                  {t.icon} {t.label}
                  {t.id === "recommendations" && (
                    <span
                      style={{
                        marginLeft: 5,
                        fontSize: 9,
                        background: C.gold,
                        color: C.deep,
                        borderRadius: 10,
                        padding: "1px 6px",
                        fontWeight: 900,
                      }}
                    >
                      NEW
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Page content */}
        <div
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: "22px 32px 52px",
          }}
        >
          {pages[tab]}
        </div>

        {/* Footer */}
        <div style={{ background: C.deep, padding: "14px 32px" }}>
          <div
            style={{ maxWidth: 1440, margin: "0 auto", textAlign: "center" }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: C.gold }}>
              Advancing the Islamic Digital Economy in Malaysia: Developing a
              Comprehensive Conceptual Framework and Index
            </div>
            <div style={{ fontSize: 10, color: "#4A7A62", marginTop: 4 }}>
              Data AI-extracted from 2,706 annual reports (2022–2024) · 1,127
              Bursa Malaysia-listed companies · 12,192 digital initiatives ·
              PLCT Multi-Dimensional Framework
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
