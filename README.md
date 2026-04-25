# Anaplan Mockup Generator Accelerator

A lightweight, hand-drawn style mockup tool for client requirement workshops.

## What it does

- Uses a sketch-like visual style to keep discussion conceptual.
- Provides a consistent Anaplan-inspired page shell (navigation, context filters, right insights rail).
- Uses a **separate Builder Controls pane** outside the UX page mockup so workshop controls are clearly distinguishable from in-product UI.
- Allows adding core planning widgets:
  - KPI cards
  - Grid/table widgets
  - Chart placeholders
- Supports drag + resize interactions for rapid page framing.
- Supports **show/hide Additional Insights** and lets you place widgets directly inside the Additional Insights pane.

## Fastest way to view in your browser

### Option A: Vercel UI (no local setup)

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your repo.
4. Framework preset: **Other** (or leave Auto).
5. Click **Deploy**.
6. Open the generated `https://<project>.vercel.app` URL.

This repo includes `vercel.json` so Vercel serves the static app correctly.

### Option B: GitHub Pages (one-click via Actions)

This repo includes a Pages deployment workflow at `.github/workflows/deploy-pages.yml`.

#### First-time setup (once per repo)

1. In GitHub, open **Settings → Pages**.
2. Under **Build and deployment**, set **Source = GitHub Actions**.

#### One-click deploy

Use this direct link to trigger deployment from your branch:

- [Run Deploy Pages workflow](../../actions/workflows/deploy-pages.yml)

Then click **Run workflow**, pick your branch (for example `codex/create-anaplan-mockup-generator-tool`), and deploy.

When complete, your site will be available at:

```text
https://<org-or-user>.github.io/<repo-name>/
```

## Branch alignment note

Codex work is on branch:

```text
codex/create-anaplan-mockup-generator-tool
```

If you want this branch to be the production source in Vercel, set it in **Vercel → Project Settings → Git → Production Branch**.

## Local preview (optional)

If you later want to run it locally:

```bash
python -m http.server 8000
```

Open:

```text
http://localhost:8000
```

## Workshop usage tips

1. Keep the Builder Controls pane for facilitator actions only.
2. Place KPI cards on the main canvas for top-line outcomes.
3. Use the Additional Insights pane for supporting grids/charts/KPIs.
4. Toggle Insights On/Off to mimic stakeholder UX behavior.
5. Use this as alignment artifact, not final UI specification.
