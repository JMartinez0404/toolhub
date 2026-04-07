@AGENTS.md

# ToolHub - Utility Tool Hub Website

## Project Overview
A collection of free online utility tools that run entirely in the browser, monetized via Google AdSense.

## Tech Stack
- Next.js 16 (App Router, SSG)
- TypeScript + Tailwind CSS v4
- Vercel hosting (free tier)
- Google AdSense for monetization

## Architecture
- **Tool Registry**: `src/lib/tools-registry.ts` is the single source of truth for all tools
- **Dynamic Routing**: `src/app/tools/[slug]/page.tsx` renders tools based on registry
- **Component Map**: Each tool slug maps to a component in `src/components/tools/`
- All tools are client-side only — no server data, no database

## Adding a New Tool
1. Add an entry to the `tools` array in `src/lib/tools-registry.ts`
2. Create a new component in `src/components/tools/NewTool.tsx` (use "use client")
3. Import and add it to `componentMap` in `src/app/tools/[slug]/page.tsx`
4. The homepage, sitemap, and SEO metadata auto-derive from the registry

## Build & Test
```bash
npm run build
npm run dev
npm run lint
```

## File Organization
- `/src/app` — Next.js App Router pages
- `/src/components/tools` — Tool components (one per tool)
- `/src/components/layout` — Header, Footer, AdUnit
- `/src/components/ui` — Reusable UI primitives
- `/src/lib` — Utilities, constants, tool registry
