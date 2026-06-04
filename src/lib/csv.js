// ============================================================
// csv.js
// Export targets to a CSV file the user owns, and import them
// back. Signals are flattened to a single pipe-delimited column
// so the CSV stays human-readable in Excel / Google Sheets.
// ============================================================

import { SIGNALS, cryptoId, SECTORS, STAGE_DEFS } from "./config.js";

const FIELDS = ["name", "sector", "location", "stage", "contact", "lastContact", "followUp", "notes"];

function escapeCell(val) {
  const s = String(val ?? "");
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

export function exportCsv(targets) {
  const header = [...FIELDS, "signals"];
  const rows = targets.map((t) => {
    const sigList = SIGNALS.filter((s) => t.signals && t.signals[s.id]).map((s) => s.id).join("|");
    const base = FIELDS.map((f) => escapeCell(t[f]));
    base.push(escapeCell(sigList));
    return base.join(",");
  });
  const csv = [header.join(","), ...rows].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const stamp = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `succession-pipeline-${stamp}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Minimal CSV parser that handles quoted fields and embedded commas.
function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') { cell += '"'; i++; }
        else inQuotes = false;
      } else cell += ch;
    } else {
      if (ch === '"') inQuotes = true;
      else if (ch === ",") { row.push(cell); cell = ""; }
      else if (ch === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
      else if (ch === "\r") { /* skip */ }
      else cell += ch;
    }
  }
  if (cell.length > 0 || row.length > 0) { row.push(cell); rows.push(row); }
  return rows;
}

export function importCsv(text) {
  const rows = parseCsv(text).filter((r) => r.length > 1 && r.some((c) => c.trim() !== ""));
  if (rows.length < 2) return [];
  const header = rows[0].map((h) => h.trim());
  const idx = (name) => header.indexOf(name);

  const validSectors = new Set(SECTORS);
  const validStages = new Set(STAGE_DEFS.map((s) => s.id));
  const validSignals = new Set(SIGNALS.map((s) => s.id));

  return rows.slice(1).map((r) => {
    const get = (name) => {
      const i = idx(name);
      return i >= 0 ? (r[i] || "").trim() : "";
    };
    const sigStr = get("signals");
    const signals = {};
    sigStr.split("|").forEach((id) => {
      const clean = id.trim();
      if (validSignals.has(clean)) signals[clean] = true;
    });
    const sector = get("sector");
    const stage = get("stage");
    return {
      id: cryptoId(),
      name: get("name"),
      sector: validSectors.has(sector) ? sector : SECTORS[SECTORS.length - 1],
      location: get("location"),
      stage: validStages.has(stage) ? stage : "lead",
      contact: get("contact"),
      lastContact: get("lastContact"),
      followUp: get("followUp"),
      notes: get("notes"),
      signals,
    };
  }).filter((t) => t.name);
}
