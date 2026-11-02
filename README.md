# Mike Interiors

A responsive Next.js website for Mike Interiors, Abraka, Delta State, Nigeria.

## Stack
- Next.js App Router
- React + TypeScript
- Tailwind CSS v4 with a custom editorial design system
- Framer Motion
- Lucide icons

## Local development
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm start
```

## Vercel deployment
This repository is configured as a standard Next.js project for Vercel.

- **Framework preset:** Next.js
- **Root directory:** repository root
- **Build command:** automatically detected from `npm run build`
- **Install command:** automatically detected
- **Node.js:** 24.x
- **Environment variables:** none required for the current frontend

Connect the GitHub repository `leephil1907-lab/mike-interiors` to the Vercel project. Keep the production branch set to `main`; pushes to other branches should create Preview Deployments.

## Important content notes
- Existing Mike Interiors brand name, location, phone number and original project imagery are retained.
- Editorial imagery on the Design Ideas page is inspiration imagery, not represented as client work.
- The portfolio avoids invented projects or testimonials. Captions and project claims should only be added when verified.
- The enquiry form currently prepares an email on the visitor's device; it does not claim server-side delivery. Connect a transactional email provider before implementing server submission.
