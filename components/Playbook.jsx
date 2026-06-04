import React from "react";
import { S } from "../lib/styles.js";
import { PLAYBOOK, SOURCING_NOTE } from "../lib/config.js";

export default function Playbook() {
  return (
    <div style={S.playbook}>
      <div style={S.playIntro}>
        The repeatable process for working the non-listed succession market. Each target should move
        through these phases. The discipline is the edge — most people only work the public listings.
      </div>
      {PLAYBOOK.map((p, i) => (
        <div key={i} style={S.playPhase}>
          <div style={S.playPhaseHead}>{p.phase}</div>
          <ol style={S.playList}>
            {p.steps.map((s, j) => <li key={j} style={S.playStep}>{s}</li>)}
          </ol>
        </div>
      ))}
      <div style={S.playFootnote}>{SOURCING_NOTE}</div>
    </div>
  );
}
