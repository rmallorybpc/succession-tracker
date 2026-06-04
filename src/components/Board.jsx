import React from "react";
import { S } from "../lib/styles.js";
import { STAGE_DEFS, scoreOf, scoreColor, today } from "../lib/config.js";

function Card({ target, onMove, onEdit }) {
  const pct = scoreOf(target);
  const due = target.followUp && target.followUp <= today();
  return (
    <div style={S.card} onClick={() => onEdit(target)}>
      <div style={S.cardTop}>
        <span style={S.cardName}>{target.name || "Untitled"}</span>
        <span style={{ ...S.scorePill, background: scoreColor(pct) }}>{pct}</span>
      </div>
      <div style={S.cardSector}>{target.sector}</div>
      {target.location && <div style={S.cardLoc}>{target.location}</div>}
      {due && <div style={S.dueFlag}>Follow-up due</div>}
      <select
        value={target.stage}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => onMove(target.id, e.target.value)}
        style={S.cardStageSelect}
      >
        {STAGE_DEFS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
      </select>
    </div>
  );
}

export default function Board({ targets, onMove, onEdit }) {
  return (
    <div style={S.board}>
      {STAGE_DEFS.map((stage) => {
        const items = targets.filter((t) => t.stage === stage.id);
        return (
          <div key={stage.id} style={S.column}>
            <div style={S.colHead}>
              <span style={{ ...S.colDot, background: stage.color }} />
              <span style={S.colTitle}>{stage.label}</span>
              <span style={S.colCount}>{items.length}</span>
            </div>
            <div style={S.colBody}>
              {items.map((t) => <Card key={t.id} target={t} onMove={onMove} onEdit={onEdit} />)}
              {items.length === 0 && <div style={S.emptyCol}>—</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
