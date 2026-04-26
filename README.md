# Anaplan Mockup Generator Accelerator

A lightweight, hand-drawn style mockup tool for client requirement workshops.

## What it does

- Uses a sketch-like visual style to keep discussion conceptual.
- Provides a consistent Anaplan-inspired page shell with an app-level shell row, page header row, main canvas, and Additional Insights shelf.
- Uses a **separate Builder Controls pane** outside the UX page mockup so workshop controls are clearly distinguishable from in-product UI.
- Uses a fixed **1600 × 900** UX mockup stage so local previews and exported PDFs stay consistent.
- Provides collapsible, sticky Builder Controls that stay available while preserving the mockup frame.
- Frames the Anaplan UX page as a single sketched page while keeping the concept disclaimer outside the page frame.
- Supports adding widgets to:
  - Main Canvas
  - Additional Insights pane (auto-stacked top-to-bottom)
- Supports widget types:
  - KPI
  - Grid/table
  - Chart
  - Button
  - Text
- Supports adding context filters directly in the second header row using a hover/focus `+` affordance.
- Supports **expand/collapse Additional Insights** with a shelf icon and lets you place widgets directly inside the shelf.
- Adds visible three-dot drag handles on widgets for clear move affordance.
- Snaps main canvas widgets to grid when added, moved, or resized.
- Prevents overlapping widgets in the Main Canvas and preserves standard spacing from other widgets and canvas edges.
- Supports editable grid headers and cells, plus inline row/column add/remove controls on grid widgets.
- Adds direct 16:9 landscape PDF export from Builder Controls for the UX mockup frame.
- Hides workshop-only controls from PDF export so the artifact stays clean.

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

Current work is on branch:

```text
main
```

If you want this branch to be the production source in Vercel, set **main** in **Vercel → Project Settings → Git → Production Branch**.

## Local preview (optional)

If you later want to run it locally:

```bash
python3 -m http.server 8000
```

Open:

```text
http://localhost:8000
```

## Workshop usage tips

1. Keep the Builder Controls pane for facilitator actions only.
2. Hover or focus the second header row and use the small `+` button to add context filters.
3. Use Builder Controls for Main Canvas and Additional Insights widgets only.
4. Use the shelf icon in the second header row to expand or collapse Additional Insights.
5. Hover or focus a grid widget to reveal row/column editing controls.
6. Use this as alignment artifact, not final UI specification.
