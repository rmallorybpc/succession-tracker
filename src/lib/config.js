// ============================================================
// config.js
// All tunable definitions live here. Change scoring weights,
// add pipeline stages, or edit the playbook in one place.
// ============================================================

export const STAGE_DEFS = [
  { id: "lead", label: "Lead", color: "#8a93a3" },
  { id: "researching", label: "Researching", color: "#3b82c4" },
  { id: "advisor", label: "Via Advisor", color: "#8b5ca6" },
  { id: "contacted", label: "Contacted", color: "#c9892f" },
  { id: "conversation", label: "In Conversation", color: "#2f9e7d" },
  { id: "loi", label: "LOI / Terms", color: "#d4622a" },
  { id: "closed", label: "Closed", color: "#1f8a4c" },
  { id: "passed", label: "Passed", color: "#a04545" },
];

export const SECTORS = [
  "Distribution & Wholesale",
  "Engineering & Prof. Services",
  "Specialty Trades",
  "Light Manufacturing",
  "Other",
];

// Succession signal definitions used for scoring.
export const SIGNALS = [
  { id: "oldReg", label: "Registered 20+ years ago", weight: 25 },
  { id: "founderName", label: "Founder's name in company name", weight: 15 },
  { id: "ownerAge", label: "Owner appears 55+", weight: 25 },
  { id: "singleLoc", label: "Single location", weight: 10 },
  { id: "noSuccessor", label: "No visible 2nd-gen / successor", weight: 15 },
  { id: "noPE", label: "No private-equity backing", weight: 5 },
  { id: "datedWeb", label: "Modest / dated web presence", weight: 5 },
];

export const MAX_SCORE = SIGNALS.reduce((s, x) => s + x.weight, 0);

export const PLAYBOOK = [
  {
    phase: "1. Research & Qualify",
    steps: [
      "Look up the business on the Colorado Secretary of State database. Note registration date and registered agent.",
      "For engineering firms, check DORA licensing and ACEC Colorado membership to map the licensure picture.",
      "Estimate owner age and tenure from LinkedIn, the company About page, and licensing dates.",
      "Score the succession signals in this tool. Prioritize anything scoring 60%+.",
    ],
  },
  {
    phase: "2. Choose the Channel",
    steps: [
      "High-score + a known advisor connection -> route through the advisor (CPA, M&A attorney, broker).",
      "High-score, no advisor path -> direct, respectful owner outreach.",
      "Never lead with 'are you selling.' Lead with interest in the business and a low-commitment conversation.",
    ],
  },
  {
    phase: "3. First Contact",
    steps: [
      "Use the direct-owner template: admire what they built, introduce yourself as an operator, ask for 30 minutes, no agenda.",
      "Keep it under 150 words. One clear ask.",
      "Log the contact date and method here. Set a follow-up for 10-14 days out.",
    ],
  },
  {
    phase: "4. First Conversation",
    steps: [
      "Listen first. Understand what they built and what they want for its future.",
      "Confirm rough size/revenue band conversationally - this is where you validate the $1-5M fit.",
      "Signal you are not in a rush and that fit matters more than speed.",
      "Identify which structure fits: President/COO succession, earn-in equity, or acquisition with seller financing.",
    ],
  },
  {
    phase: "5. Advance or Pass",
    steps: [
      "If fit is real: propose a follow-up with their advisor present. Move stage to 'In Conversation.'",
      "If not: mark 'Passed' with a note on why, so you learn the pattern over time.",
      "Update the advisor who referred them, regardless of outcome. Relationships compound.",
    ],
  },
];

export const SOURCING_NOTE =
  "Sourcing data: Colorado Secretary of State business search · DORA professional licensing · ACEC Colorado · Denver Metro Chamber directory · OEDIT supplier lists.";

// ---- scoring helpers ----
export function scoreOf(target) {
  const sig = target.signals || {};
  const raw = SIGNALS.reduce((s, x) => s + (sig[x.id] ? x.weight : 0), 0);
  return Math.round((raw / MAX_SCORE) * 100);
}

export function scoreColor(pct) {
  if (pct >= 70) return "#1f8a4c";
  if (pct >= 45) return "#c9892f";
  return "#8a93a3";
}

export function today() {
  return new Date().toISOString().slice(0, 10);
}

export function cryptoId() {
  return "t_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

export function blankTarget() {
  return {
    id: cryptoId(),
    name: "",
    sector: SECTORS[0],
    location: "",
    stage: "lead",
    notes: "",
    contact: "",
    lastContact: "",
    followUp: "",
    signals: {},
  };
}

export const seedData = () => [
  {
    id: cryptoId(), name: "Cost Plus Electric Supply", sector: "Distribution & Wholesale",
    location: "Denver metro", stage: "lead",
    notes: "Independent family-owned electrical wholesaler. Route-based, niche.",
    contact: "", lastContact: "", followUp: "",
    signals: { oldReg: true, singleLoc: true, noPE: true },
  },
  {
    id: cryptoId(), name: "Select Distributing (SDI)", sector: "Distribution & Wholesale",
    location: "Denver", stage: "lead",
    notes: "Wholesale supplier to CO HVAC trade, 20+ yrs, in-house fabrication.",
    contact: "", lastContact: "", followUp: "",
    signals: { oldReg: true, singleLoc: true, noPE: true },
  },
  {
    id: cryptoId(), name: "MNA Inc.", sector: "Engineering & Prof. Services",
    location: "Denver", stage: "lead",
    notes: "Architectural + structural/forensic engineering, founded 1979. Strong succession-age signal.",
    contact: "", lastContact: "", followUp: "",
    signals: { oldReg: true, ownerAge: true, noSuccessor: true, noPE: true },
  },
  {
    id: cryptoId(), name: "S. A. Miro, Inc.", sector: "Engineering & Prof. Services",
    location: "Denver metro", stage: "lead",
    notes: "Civil & structural consulting since 1980. Founder-era firm.",
    contact: "", lastContact: "", followUp: "",
    signals: { oldReg: true, ownerAge: true, noPE: true },
  },
];
