import React, { useState } from "react";
import { S } from "../lib/styles.js";
import { SECTORS, STAGE_DEFS, SIGNALS, scoreOf, scoreColor } from "../lib/config.js";
import { Field } from "./Shared.jsx";

export default function Editor({ target, onSave, onDelete, onClose }) {
  const [t, setT] = useState({ ...target, signals: { ...(target.signals || {}) } });
  const set = (k, v) => setT((p) => ({ ...p, [k]: v }));
  const toggleSig = (id) => setT((p) => ({ ...p, signals: { ...p.signals, [id]: !p.signals[id] } }));
  const pct = scoreOf(t);

  return (
    <div style={S.modalOverlay} onClick={onClose}>
      <div style={S.modal} onClick={(e) => e.stopPropagation()}>
        <div style={S.modalHead}>
          <input
            style={S.nameInput}
            placeholder="Company name"
            value={t.name}
            onChange={(e) => set("name", e.target.value)}
          />
          <span style={{ ...S.scorePillLg, background: scoreColor(pct) }}>
            {pct}<span style={S.scoreOf}>/100 fit</span>
          </span>
        </div>

        <div style={S.modalGrid}>
          <Field label="Sector">
            <select style={S.input} value={t.sector} onChange={(e) => set("sector", e.target.value)}>
              {SECTORS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Location">
            <input style={S.input} value={t.location} onChange={(e) => set("location", e.target.value)} />
          </Field>
          <Field label="Stage">
            <select style={S.input} value={t.stage} onChange={(e) => set("stage", e.target.value)}>
              {STAGE_DEFS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </Field>
          <Field label="Contact (name / email / phone)">
            <input style={S.input} value={t.contact} onChange={(e) => set("contact", e.target.value)} />
          </Field>
          <Field label="Last contacted">
            <input type="date" style={S.input} value={t.lastContact} onChange={(e) => set("lastContact", e.target.value)} />
          </Field>
          <Field label="Next follow-up">
            <input type="date" style={S.input} value={t.followUp} onChange={(e) => set("followUp", e.target.value)} />
          </Field>
        </div>

        <div style={S.sigSection}>
          <div style={S.sigTitle}>Succession Signals</div>
          <div style={S.sigGrid}>
            {SIGNALS.map((s) => (
              <label key={s.id} style={{ ...S.sigItem, ...(t.signals[s.id] ? S.sigItemOn : {}) }}>
                <input
                  type="checkbox"
                  checked={!!t.signals[s.id]}
                  onChange={() => toggleSig(s.id)}
                  style={S.checkbox}
                />
                <span>{s.label}</span>
                <span style={S.sigWeight}>+{s.weight}</span>
              </label>
            ))}
          </div>
        </div>

        <Field label="Notes">
          <textarea
            style={{ ...S.input, minHeight: 90, resize: "vertical" }}
            value={t.notes}
            onChange={(e) => set("notes", e.target.value)}
          />
        </Field>

        <div style={S.modalFooter}>
          <button style={S.deleteBtn} onClick={() => onDelete(t.id)}>Delete</button>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={S.cancelBtn} onClick={onClose}>Cancel</button>
            <button style={S.saveBtn} onClick={() => onSave(t)}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
