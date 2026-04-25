# Anaplan Mockup Generator Accelerator

A lightweight, hand-drawn style mockup tool for client requirement workshops.

## What it does

- Uses a sketch-like visual style to keep discussion conceptual.
- Provides a consistent Anaplan-inspired page shell (navigation, context filters, right insights rail).
- Allows adding core planning widgets:
  - KPI cards
  - Grid/table widgets
  - Chart placeholders
- Supports drag + resize interactions for rapid page framing.

## Fastest way to view in your browser (Vercel)

You can deploy this in ~2 minutes and open it from any browser.

### Option A: Vercel UI (no local setup)

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your repo.
4. Framework preset: **Other** (or leave Auto).
5. Click **Deploy**.
6. Open the generated `https://<project>.vercel.app` URL.

This repo includes `vercel.json` so Vercel serves the static app correctly. 

### Option B: One-click deploy button

After replacing `YOUR_GITHUB_REPO_URL` below, use this button:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_GITHUB_REPO_URL)

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

1. Start with KPI cards for top-line outcomes.
2. Add a grid where users input planning numbers.
3. Add charts that summarize or compare trends.
4. Rename each widget to mirror business language from the client.
5. Use this as alignment artifact, not final UI specification.
