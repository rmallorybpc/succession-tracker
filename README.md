# Succession Pipeline

A personal pipeline tracker for the **non-listed business succession market** — the retiring owners and founder-led businesses that never hit a public marketplace. Built to be run privately as a personal operating tool, and structured cleanly enough to grow into a product later.

## What it does

- **Pipeline board** — track targets across eight stages, from Lead to Closed/Passed.
- **Succession-signal scoring** — each target gets a 0–100 fit score from weighted signals (firm age, owner age, founder-named company, no visible successor, single location, no PE backing, dated web presence). Tune the weights in `src/lib/config.js`.
- **All-targets table** — ranked by fit score, with overdue follow-ups flagged.
- **Playbook** — the five-phase systematic outreach process, built into the app.
- **CSV export / import** — own your data in a portable file you control.

Your data is stored locally in your browser (`localStorage`). Nothing is sent anywhere. Use **Export CSV** regularly to keep a real backup.

## Prerequisites

- [Node.js](https://nodejs.org/) version 18 or newer (check with `node -v`).

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL it prints (usually http://localhost:5173).

## Build for production

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

## Deploy to GitHub Pages

There are two ways. The automated way is recommended.

### Option A — Automated (GitHub Actions)

1. Create a new repo on GitHub named `succession-tracker`.
2. Confirm the `base` in `vite.config.js` matches your repo name (`/succession-tracker/`).
3. Push this project to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/succession-tracker.git
   git push -u origin main
   ```
4. In the repo: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
5. The included workflow (`.github/workflows/deploy.yml`) builds and deploys automatically on every push to `main`.
6. Your site will be live at `https://<your-username>.github.io/succession-tracker/`.

### Option B — Manual (gh-pages branch)

```bash
npm run deploy
```

This builds and pushes the `dist` folder to a `gh-pages` branch. Then set **Settings → Pages → Source** to the `gh-pages` branch. (The `deploy` script uses the `gh-pages` package included in devDependencies.)

> **Note on the base path:** if you later use a custom domain or deploy to a root page (`<username>.github.io`), change `base` in `vite.config.js` to `"/"`.

## Project structure

```
succession-tracker/
├─ index.html
├─ vite.config.js          # base path for GitHub Pages lives here
├─ package.json
├─ .github/workflows/
│  └─ deploy.yml            # auto-deploy to GitHub Pages
└─ src/
   ├─ main.jsx              # entry point
   ├─ App.jsx               # state, storage wiring, CSV, view switching
   ├─ index.css             # fonts + base styles
   ├─ components/
   │  ├─ Board.jsx          # kanban pipeline + cards
   │  ├─ ListView.jsx       # sortable table
   │  ├─ Editor.jsx         # add/edit modal + signal scoring
   │  ├─ Playbook.jsx       # the outreach process
   │  └─ Shared.jsx         # small shared UI pieces
   └─ lib/
      ├─ config.js          # stages, sectors, signals, weights, playbook, seed data
      ├─ storage.js         # localStorage abstraction (swap point for a backend)
      ├─ csv.js             # export / import
      └─ styles.js          # shared inline styles
```

## Customizing

- **Scoring weights, stages, sectors, playbook text:** all in `src/lib/config.js`.
- **Look and feel:** `src/lib/styles.js`.
- **Seed/example targets:** `seedData()` in `src/lib/config.js`.

## Roadmap (toward a product)

The architecture leaves clear seams for a product version:

1. **Backend storage.** `src/lib/storage.js` is the single swap point. Replace `localStorage` calls with a service like Supabase or Firebase — keep the same function signatures and the rest of the app is unchanged. This adds cross-device sync and multi-user support.
2. **Authentication.** Add login on top of the backend so each user has a private pipeline.
3. **Data acquisition.** The real moat: automated sourcing from public records (Secretary of State, professional licensing boards) with signal scoring applied on ingest. This is the hard, valuable part — and where legal/compliance review matters.
4. **Outreach compliance.** Any direct-contact features need to respect anti-spam and contact regulations.

## License

MIT — see `LICENSE`.
