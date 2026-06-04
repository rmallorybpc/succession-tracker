import React from "react";
import { S } from "../lib/styles.js";

export function Stat({ label, value, accent }) {
  return (
    <div style={S.stat}>
      <div style={{ ...S.statValue, color: accent || "#1a2233" }}>{value}</div>
      <div style={S.statLabel}>{label}</div>
    </div>
  );
}

export function SaveBadge({ state }) {
  const map = {
    idle: { t: "All changes saved", c: "#8a93a3" },
    saving: { t: "Saving…", c: "#c9892f" },
    saved: { t: "Saved ✓", c: "#1f8a4c" },
    error: { t: "Save failed", c: "#a04545" },
  };
  const m = map[state] || map.idle;
  return <span style={{ ...S.saveBadge, color: m.c }}>{m.t}</span>;
}

export function Field({ label, children }) {
  return (
    <div style={S.field}>
      <label style={S.fieldLabel}>{label}</label>
      {children}
    </div>
  );
}
