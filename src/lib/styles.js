// ============================================================
// styles.js
// Shared inline style objects. Centralized so the visual
// language stays consistent across components.
// ============================================================

const MONO = '"IBM Plex Mono", "SF Mono", Menlo, monospace';

export const S = {
  app: { minHeight: "100vh", paddingBottom: 40 },

  loadingWrap: { display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" },
  loadingText: { color: "#8a93a3", fontSize: 15, letterSpacing: 0.3 },

  header: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-end",
    padding: "28px 32px 22px", background: "#fff", borderBottom: "1px solid #e3e8ef",
    flexWrap: "wrap", gap: 16,
  },
  kicker: { fontFamily: MONO, fontSize: 11, letterSpacing: 2.5, color: "#8a93a3", fontWeight: 600 },
  h1: { margin: "4px 0 0", fontSize: 30, fontWeight: 800, letterSpacing: -0.5, color: "#141b2b" },
  headerRight: { display: "flex", gap: 28 },
  stat: { textAlign: "right" },
  statValue: { fontSize: 26, fontWeight: 800, fontFamily: MONO, lineHeight: 1 },
  statLabel: { fontSize: 11, color: "#8a93a3", marginTop: 4, letterSpacing: 0.3, textTransform: "uppercase", fontWeight: 600 },

  toolbar: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "14px 32px", background: "#fff", borderBottom: "1px solid #e3e8ef",
    position: "sticky", top: 0, zIndex: 5, flexWrap: "wrap", gap: 12,
  },
  tabs: { display: "flex", gap: 4, background: "#eef1f6", padding: 4, borderRadius: 9 },
  tab: {
    border: "none", background: "transparent", padding: "7px 16px", borderRadius: 6,
    fontSize: 13, fontWeight: 600, color: "#5a6478", cursor: "pointer",
  },
  tabActive: { background: "#fff", color: "#141b2b", boxShadow: "0 1px 3px rgba(20,27,43,0.12)" },
  toolbarRight: { display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" },
  select: {
    border: "1px solid #d4dae3", borderRadius: 7, padding: "7px 12px", fontSize: 13,
    color: "#1a2233", background: "#fff", cursor: "pointer",
  },
  saveBadge: { fontSize: 12, fontFamily: MONO, fontWeight: 500 },
  ghostBtn: {
    border: "1px solid #d4dae3", background: "#fff", color: "#3a4456", padding: "8px 13px",
    borderRadius: 7, fontSize: 12.5, fontWeight: 600, cursor: "pointer",
  },
  addBtn: {
    border: "none", background: "#141b2b", color: "#fff", padding: "9px 16px",
    borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: "pointer",
  },

  main: { padding: "22px 32px" },

  board: { display: "flex", gap: 14, overflowX: "auto", paddingBottom: 12 },
  column: { minWidth: 220, width: 220, flexShrink: 0, background: "#eef1f6", borderRadius: 11, padding: 10 },
  colHead: { display: "flex", alignItems: "center", gap: 7, padding: "4px 6px 10px" },
  colDot: { width: 9, height: 9, borderRadius: "50%" },
  colTitle: { fontSize: 12.5, fontWeight: 700, color: "#3a4456", letterSpacing: 0.2, flex: 1, textTransform: "uppercase" },
  colCount: { fontSize: 12, fontFamily: MONO, color: "#8a93a3", fontWeight: 600 },
  colBody: { display: "flex", flexDirection: "column", gap: 9, minHeight: 40 },
  emptyCol: { textAlign: "center", color: "#c0c7d2", fontSize: 18, padding: "10px 0" },

  card: {
    background: "#fff", borderRadius: 9, padding: "11px 12px", cursor: "pointer",
    border: "1px solid #e3e8ef", boxShadow: "0 1px 2px rgba(20,27,43,0.04)",
  },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 },
  cardName: { fontSize: 13.5, fontWeight: 700, color: "#141b2b", lineHeight: 1.25 },
  cardSector: { fontSize: 11, color: "#5a6478", marginTop: 5 },
  cardLoc: { fontSize: 11, color: "#8a93a3", marginTop: 2 },
  dueFlag: {
    display: "inline-block", marginTop: 7, fontSize: 10.5, fontWeight: 700, color: "#d4622a",
    background: "#fbe9df", padding: "2px 7px", borderRadius: 5, letterSpacing: 0.2,
  },
  cardStageSelect: {
    marginTop: 9, width: "100%", border: "1px solid #e3e8ef", borderRadius: 6,
    padding: "5px 7px", fontSize: 11.5, color: "#5a6478", background: "#fafbfc", cursor: "pointer",
  },
  scorePill: {
    fontFamily: MONO, fontSize: 12, fontWeight: 700, color: "#fff",
    borderRadius: 6, padding: "2px 7px", minWidth: 26, textAlign: "center",
  },

  listWrap: { background: "#fff", borderRadius: 11, border: "1px solid #e3e8ef", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    textAlign: "left", padding: "12px 16px", fontSize: 11, textTransform: "uppercase",
    letterSpacing: 0.5, color: "#8a93a3", fontWeight: 700, borderBottom: "1px solid #e3e8ef", background: "#fafbfc",
  },
  tr: { cursor: "pointer", borderBottom: "1px solid #eef1f6" },
  td: { padding: "12px 16px", fontSize: 13.5, color: "#2a3346" },
  stageTag: { fontSize: 11.5, fontWeight: 600, border: "1px solid", borderRadius: 20, padding: "3px 11px" },

  modalOverlay: {
    position: "fixed", inset: 0, background: "rgba(20,27,43,0.45)", display: "flex",
    alignItems: "flex-start", justifyContent: "center", padding: "40px 20px", zIndex: 50, overflowY: "auto",
  },
  modal: {
    background: "#fff", borderRadius: 14, width: "100%", maxWidth: 620, padding: 26,
    boxShadow: "0 20px 60px rgba(20,27,43,0.3)",
  },
  modalHead: { display: "flex", gap: 14, alignItems: "center", marginBottom: 20 },
  nameInput: {
    flex: 1, border: "none", borderBottom: "2px solid #e3e8ef", fontSize: 22, fontWeight: 800,
    padding: "4px 0", color: "#141b2b", outline: "none",
  },
  scorePillLg: { fontFamily: MONO, fontSize: 18, fontWeight: 700, color: "#fff", borderRadius: 9, padding: "8px 12px" },
  scoreOf: { fontSize: 10, fontWeight: 500, marginLeft: 3, opacity: 0.85 },
  modalGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 13, marginBottom: 18 },
  field: { display: "flex", flexDirection: "column", gap: 5 },
  fieldLabel: { fontSize: 11.5, fontWeight: 600, color: "#5a6478", letterSpacing: 0.2 },
  input: {
    border: "1px solid #d4dae3", borderRadius: 7, padding: "8px 11px", fontSize: 13.5,
    color: "#1a2233", outline: "none", background: "#fff", width: "100%",
  },

  sigSection: { marginBottom: 18 },
  sigTitle: { fontSize: 11.5, fontWeight: 700, color: "#5a6478", letterSpacing: 0.3, textTransform: "uppercase", marginBottom: 9 },
  sigGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 },
  sigItem: {
    display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "#3a4456",
    border: "1px solid #e3e8ef", borderRadius: 8, padding: "8px 10px", cursor: "pointer", background: "#fafbfc",
  },
  sigItemOn: { borderColor: "#1f8a4c", background: "#f0f9f3", color: "#155e35" },
  checkbox: { accentColor: "#1f8a4c", width: 15, height: 15 },
  sigWeight: { marginLeft: "auto", fontFamily: MONO, fontSize: 11, color: "#8a93a3", fontWeight: 600 },

  modalFooter: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 22 },
  deleteBtn: {
    border: "1px solid #e5cccc", background: "#fff", color: "#a04545", padding: "9px 16px",
    borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: "pointer",
  },
  cancelBtn: {
    border: "1px solid #d4dae3", background: "#fff", color: "#5a6478", padding: "9px 18px",
    borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: "pointer",
  },
  saveBtn: {
    border: "none", background: "#141b2b", color: "#fff", padding: "9px 22px",
    borderRadius: 7, fontSize: 13, fontWeight: 700, cursor: "pointer",
  },

  playbook: { maxWidth: 760 },
  playIntro: {
    fontSize: 15, lineHeight: 1.6, color: "#3a4456", background: "#fff", padding: 20,
    borderRadius: 11, border: "1px solid #e3e8ef", marginBottom: 18,
  },
  playPhase: { background: "#fff", borderRadius: 11, border: "1px solid #e3e8ef", padding: "18px 22px", marginBottom: 12 },
  playPhaseHead: { fontSize: 16, fontWeight: 800, color: "#141b2b", marginBottom: 10, letterSpacing: -0.2 },
  playList: { margin: 0, paddingLeft: 20 },
  playStep: { fontSize: 13.5, lineHeight: 1.65, color: "#3a4456", marginBottom: 6 },
  playFootnote: { fontSize: 12.5, fontFamily: MONO, color: "#8a93a3", marginTop: 16, lineHeight: 1.6, padding: "0 4px" },
};
