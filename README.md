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
- Supports local multi-page projects with browser persistence and manual JSON import/export.
- Exports a whole-project **Page Build Brief CSV** for solution architect to model builder handoff.
- Adds light Karta-branded Builder Controls using the v0.1.8 brand palette.
- Adds a Logo Placeholder card for client or page-level logo placement.
- Uses the UX shell page selector as the saved-page navigation menu.

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

## v0.1.8 lightweight project saves

v0.1.8 keeps the app static and local-first while adding enough persistence for individual workshop use.

- Saves a local multi-page project in the browser using `localStorage`.
- Uses the Anaplan-style page selector in the top UX shell row to switch between saved pages.
- Keeps Builder Controls focused on page actions: save, create, duplicate, rename, and delete.
- Exports and imports one JSON project file so users can manually share editable mockups.
- Keeps PDF export scoped to the active page.
- Uses a compact Karta icon in the Builder Controls header.
- Adds light Karta branding to the Builder Controls only, using:
  - San Felix `#113A2A`
  - Salem `#2A654E`
  - Stone Wall `#979187`
  - White `#FFFFFF`
- Adds a `+ Logo` card that creates an editable `Client Logo` placeholder.
- Hides card-level filter controls on compact cards where filters do not apply: Button, Checkbox, Title/Header, and Logo.
- Replaces browser prompt-based page renaming with an in-app rename dialog.

### Sharing editable work

Use **Export JSON** to download the full editable project. Send that file to another user, then have them choose **Import JSON**. Imported data stays local to that user's browser.

Malformed or unrelated JSON files are rejected without replacing the current project.

## v0.1.9 build handoff export

v0.1.9 adds a structured CSV handoff that translates saved page and card metadata into a Page Build Brief.

- Adds Page Details for functional area, persona, and page purpose.
- Adds card-level inputs and outputs to Card Build Details.
- Adds **Export Build Brief CSV** under Outputs.
- Exports one row per card across the whole project with page context, global selectors, card metadata, open questions, and build notes.
- Adds compact icon buttons for **Export UX PDF**, **Export JSON**, and **Import JSON**.
- Adds a visible warning when cards extend below the visible UX canvas.
- Aligns destructive and disclaimer styling with Karta orange.
- Keeps the app static and dependency-free by using native browser CSV generation.

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

For laptop distribution in v0.1.9, share this static app folder and have each user run the same local preview command from the folder. Electron and Tauri packaging are intentionally deferred until the team confirms native installers are needed.

## Workshop usage tips

1. Keep the Builder Controls pane for facilitator actions only.
2. Use the top shell page selector to switch between saved pages.
3. Use Builder Controls to save, create, duplicate, rename, and delete pages.
4. Use the Cards segmented control to choose Main Canvas or Additional Insights before adding cards.
5. Hover or focus the second header row and use the small `+` button to add context filters.
6. Use the shelf icon in the second header row to expand or collapse Additional Insights.
7. Hover or focus a grid card to reveal row/column editing controls.
8. Hover or focus full cards to add local filter chips or open card build details.
9. Type `x` into a grid cell to turn it into a checkbox when a simple selection marker is needed.
10. Double-click a checkbox cell to return it to editable text.
11. Use `Save Page` or rely on browser auto-save before switching pages.
12. Use `Page Details` to capture page-level handoff context.
13. Use `Export Build Brief CSV` to hand off structured page/card build notes.
14. Watch for the visible canvas warning when cards are placed below the currently visible UX page area.
15. Use `Export JSON` when you need to share editable work.
16. Use this as alignment artifact, not final UI specification.
