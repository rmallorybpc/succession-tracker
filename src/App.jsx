import React, { useState, useEffect, useMemo, useRef } from "react";
import { S } from "./lib/styles.js";
import { SECTORS, scoreOf, today, blankTarget, seedData } from "./lib/config.js";
import { loadTargets, saveTargets } from "./lib/storage.js";
import { exportCsv, importCsv } from "./lib/csv.js";
import { Stat, SaveBadge } from "./components/Shared.jsx";
import Board from "./components/Board.jsx";
import ListView from "./components/ListView.jsx";
import Editor from "./components/Editor.jsx";
import Playbook from "./components/Playbook.jsx";

export default function App() {
  const [targets, setTargets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("board");
  const [editing, setEditing] = useState(null);
  const [filterSector, setFilterSector] = useState("All");
  const [saveState, setSaveState] = useState("idle");
  const fileRef = useRef(null);

  // Load once
  useEffect(() => {
    const stored = loadTargets();
    setTargets(stored && stored.length ? stored : seedData());
    setLoading(false);
  }, []);

  const persist = (next) => {
    setTargets(next);
    setSaveState("saving");
    const ok = saveTargets(next);
    setSaveState(ok ? "saved" : "error");
    if (ok) setTimeout(() => setSaveState("idle"), 1200);
  };

  const upsert = (t) => {
    const exists = targets.some((x) => x.id === t.id);
    persist(exists ? targets.map((x) => (x.id === t.id ? t : x)) : [...targets, t]);
    setEditing(null);
  };

  const remove = (id) => {
    persist(targets.filter((x) => x.id !== id));
    setEditing(null);
  };

  const moveStage = (id, stage) =>
    persist(targets.map((x) => (x.id === id ? { ...x, stage } : x)));

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = importCsv(String(reader.result));
        if (imported.length) {
          persist([...targets, ...imported]);
          alert(`Imported ${imported.length} target(s).`);
        } else {
          alert("No valid rows found in that CSV.");
        }
      } catch (err) {
        alert("Could not read that file. Make sure it is a CSV exported from this tool.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const filtered = useMemo(
    () => (filterSector === "All" ? targets : targets.filter((t) => t.sector === filterSector)),
    [targets, filterSector]
  );

  const stats = useMemo(() => {
    const active = targets.filter((t) => !["closed", "passed"].includes(t.stage));
    const hot = targets.filter((t) => scoreOf(t) >= 70 && !["closed", "passed"].includes(t.stage));
    const dueFollow = targets.filter(
      (t) => t.followUp && t.followUp <= today() && !["closed", "passed"].includes(t.stage)
    );
    return { total: targets.length, active: active.length, hot: hot.length, dueFollow: dueFollow.length };
  }, [targets]);

  if (loading) {
    return (
      <div style={S.loadingWrap}>
        <div style={S.loadingText}>Loading pipeline…</div>
      </div>
    );
  }

  return (
    <div style={S.app}>
      <header style={S.header}>
        <div>
          <div style={S.kicker}>OPERATOR SEARCH</div>
          <h1 style={S.h1}>Succession Pipeline</h1>
        </div>
        <div style={S.headerRight}>
          <Stat label="Targets" value={stats.total} />
          <Stat label="Active" value={stats.active} />
          <Stat label="High-fit" value={stats.hot} accent="#1f8a4c" />
          <Stat label="Follow-ups due" value={stats.dueFollow} accent={stats.dueFollow ? "#d4622a" : undefined} />
        </div>
      </header>

      <div style={S.toolbar}>
        <div style={S.tabs}>
          {["board", "list", "playbook"].map((v) => (
            <button key={v} onClick={() => setView(v)} style={{ ...S.tab, ...(view === v ? S.tabActive : {}) }}>
              {v === "board" ? "Pipeline" : v === "list" ? "All Targets" : "Playbook"}
            </button>
          ))}
        </div>
        <div style={S.toolbarRight}>
          {view !== "playbook" && (
            <select value={filterSector} onChange={(e) => setFilterSector(e.target.value)} style={S.select}>
              <option>All</option>
              {SECTORS.map((s) => <option key={s}>{s}</option>)}
            </select>
          )}
          <button style={S.ghostBtn} onClick={() => exportCsv(targets)}>Export CSV</button>
          <button style={S.ghostBtn} onClick={() => fileRef.current?.click()}>Import CSV</button>
          <input ref={fileRef} type="file" accept=".csv" onChange={handleImport} style={{ display: "none" }} />
          <SaveBadge state={saveState} />
          {view !== "playbook" && (
            <button style={S.addBtn} onClick={() => setEditing(blankTarget())}>+ Add Target</button>
          )}
        </div>
      </div>

      <main style={S.main}>
        {view === "board" && <Board targets={filtered} onMove={moveStage} onEdit={setEditing} />}
        {view === "list" && <ListView targets={filtered} onEdit={setEditing} />}
        {view === "playbook" && <Playbook />}
      </main>

      {editing && (
        <Editor target={editing} onSave={upsert} onDelete={remove} onClose={() => setEditing(null)} />
      )}
    </div>
  );
}
