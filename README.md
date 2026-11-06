# DLR Consulting Ltd.

Public website for DLR Consulting Ltd., a professional negotiation and representation practice.

The site is a single page with sections for services, who the firm works with, professional coverage, payment terms, and contact. The privacy policy opens in a dialog.

## Develop

```bash
npm install
npm run dev
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the local dev server |
| `npm run build` | Typecheck and write a production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run Oxlint |

## Edit copy

Visible text lives in `src/locales/en/translation.json`. `src/i18n.ts` loads that file and sets the document language. The browser title comes from `meta.title`.

Section order and which copy keys each section uses are defined in `src/App.tsx`.

## Layout

- `src/App.tsx` — page sections and navigation
- `src/App.css` — layout and section styles
- `src/index.css` — color tokens and base styles
- `src/PrivacyPolicy.tsx` — privacy policy dialog
- `src/icons.tsx` — Lucide icons used on the page
- `src/locales/en/translation.json` — site copy
- `src/assets/` — logo and photography
- `public/` — favicon

## Stack

React, TypeScript, Vite, i18next, and Lucide.
