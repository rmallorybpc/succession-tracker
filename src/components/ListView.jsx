import React from "react";
import { S } from "../lib/styles.js";
import { STAGE_DEFS, scoreOf, scoreColor, today } from "../lib/config.js";

export default function ListView({ targets, onEdit }) {
  const sorted = [...targets].sort((a, b) => scoreOf(b) - scoreOf(a));
  return (
    <div style={S.listWrap}>
      <table style={S.table}>
        <thead>
          <tr>
            {["Fit", "Company", "Sector", "Location", "Stage", "Follow-up"].map((h) => (
              <th key={h} style={S.th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((t) => {
            const pct = scoreOf(t);
            const stage = STAGE_DEFS.find((s) => s.id === t.stage);
            const due = t.followUp && t.followUp <= today();
            return (
              <tr key={t.id} style={S.tr} onClick={() => onEdit(t)}>
                <td style={S.td}>
                  <span style={{ ...S.scorePill, background: scoreColor(pct) }}>{pct}</span>
                </td>
                <td style={{ ...S.td, fontWeight: 600 }}>{t.name || "Untitled"}</td>
                <td style={S.td}>{t.sector}</td>
                <td style={S.td}>{t.location || "—"}</td>
                <td style={S.td}>
                  <span style={{ ...S.stageTag, color: stage?.color, borderColor: stage?.color }}>
                    {stage?.label}
                  </span>
                </td>
                <td style={{ ...S.td, color: due ? "#d4622a" : "#8a93a3", fontWeight: due ? 600 : 400 }}>
                  {t.followUp || "—"}
                </td>
              </tr>
            );
          })}
          {sorted.length === 0 && (
            <tr><td style={S.td} colSpan={6}>No targets in this filter.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
