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

## Run locally

Because this project is dependency-free static HTML/CSS/JS, run with any static file server.

Example:

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
