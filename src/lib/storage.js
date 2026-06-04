// ============================================================
// storage.js
// Persistence abstraction. Currently backed by localStorage.
// This is the single seam to swap for a real backend (Supabase,
// Firebase, your own API) when the tool becomes multi-user.
// Keep the same function signatures and the rest of the app
// will not need to change.
// ============================================================

const KEY = "succession_tracker_v1";

export function loadTargets() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to load targets:", e);
    return null;
  }
}

export function saveTargets(targets) {
  try {
    localStorage.setItem(KEY, JSON.stringify(targets));
    return true;
  } catch (e) {
    console.error("Failed to save targets:", e);
    return false;
  }
}

export function clearTargets() {
  try {
    localStorage.removeItem(KEY);
    return true;
  } catch (e) {
    console.error("Failed to clear targets:", e);
    return false;
  }
}
