# Anaplan Mockup Generator Accelerator

A lightweight, hand-drawn style mockup tool for client requirement workshops.

## What it does

- Uses a sketch-like visual style to keep discussion conceptual.
- Provides a consistent Anaplan-inspired page shell with an app-level shell row, page header row, main canvas, and Additional Insights shelf.
- Uses a **separate Builder Controls pane** outside the UX page mockup so workshop controls are clearly distinguishable from in-product UI.
- Uses a fixed **1600 × 900** UX mockup stage so local previews and exported PDFs stay consistent.
- Provides collapsible, sticky Builder Controls that stay available while preserving the mockup frame.
- Frames the Anaplan UX page as a single sketched page while keeping the concept disclaimer outside the page frame.
- Supports adding cards to:
  - Main Canvas
  - Additional Insights pane (auto-stacked top-to-bottom)
- Supports card types:
  - KPI
  - Grid/table
  - Chart
  - Button
  - Title/Header
  - Checkbox
  - Field
  - Text Box
- Supports adding context filters directly in the second header row using a hover/focus `+` affordance.
- Supports per-card context filter chips with editable filter names.
- Supports per-card build details for future handoff, including purpose, source, grain, editability, assumptions, open questions, and notes.
- Supports **expand/collapse Additional Insights** with a shelf icon and lets you place cards directly inside the shelf.
- Adds visible three-dot drag handles on cards for clear move affordance.
- Snaps main canvas cards to grid when added, moved, or resized.
- Prevents overlapping cards in the Main Canvas and preserves standard spacing from other cards and canvas edges.
- Supports editable grid headers and cells, inline row/column add/remove controls, tighter cell padding, simple `x` to checkbox conversion on grid cells, and double-click checkbox reversal back to editable text.
- Supports a vertically scrollable Main Canvas for larger workshop sketches while preserving the fixed export frame.
- Adds direct 16:9 landscape PDF export from Builder Controls for the UX mockup frame.
- Hides workshop-only controls from PDF export so the artifact stays clean.

## v0.1.6 workshop enhancements

v0.1.6 focuses on live workshop facilitation and downstream build handoff readiness.

- Card details are captured through a modal so the mockup stays visual-first while retaining build-support context.
- Card-level filter chips are name-only annotations that help communicate local context without creating data-binding rules.
- The Main Canvas can scroll vertically for larger working sessions; PDF export still captures the visible 1600 × 900 frame.
- New Checkbox, Field, and Text Box cards support common Anaplan-style page concepts from workshop screenshots.

## v0.1.7 polish

v0.1.7 aligns the workshop vocabulary with Anaplan card terminology.

- User-facing references now use "card" instead of "widget."
- The simple text control is labeled `+ Title/Header`.
- Grid-cell checkboxes can be reversed by double-clicking the checkbox cell, which restores an editable blank text cell.

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
3. Use Builder Controls for Main Canvas and Additional Insights cards only.
4. Use the shelf icon in the second header row to expand or collapse Additional Insights.
5. Hover or focus a grid card to reveal row/column editing controls.
6. Hover or focus any card to add local filter chips or open card build details.
7. Type `x` into a grid cell to turn it into a checkbox when a simple selection marker is needed.
8. Double-click a checkbox cell to return it to editable text.
9. Use this as alignment artifact, not final UI specification.
