# Zuvvy Playground Landing + Survey

Playful pre-launch validation site built with React + Tailwind + motion interactions.

## Story + Conversion Scenes

- Hero hook with dual CTA and floating app preview
- Problem awareness with research-backed stats and 3D-style bar chart
- Emotional pain contrast (passive scroll vs active creation)
- Solution scene with interactive split comparison graph
- How Zuvvy Works system cards (content, moments, time, points, profile, competition)
- Impact scene with radial chart + time meter + city leaderboard
- Trust scene for parents and teachers
- Survey conversion scene and fullscreen gamified survey flow

## Libraries Used

- `framer-motion` for animated scene transitions and chart entries
- `lenis` for smooth scrolling behavior
- `lucide-react` for iconography
- `@supabase/supabase-js` for backend response storage

## Run

1. Install dependencies:
   npm install
2. Create `.env` from `.env.example`.
3. Start dev server:
   npm run dev

## Supabase Setup

1. Create a Supabase project.
2. Run SQL from `supabase/schema.sql` in SQL editor.
3. Add keys to `.env`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

If env variables are missing, survey responses are saved in browser local storage.

## Component Structure

- `src/App.jsx` - Landing page, story sections, trust blocks, CTA entry.
- `src/components/SurveyGame.jsx` - Fullscreen mission flow survey with progress and completion reward.
- `src/components/Mascot.jsx` - Zuvvy character with mood states (wave, curious, clap, wink, celebrate).
- `src/components/RippleButton.jsx` - CTA buttons with click ripple animation.
- `src/components/TiltCard.jsx` - Card tilt interaction.
- `src/components/FloatingPlayground.jsx` - Motion background shapes and sparkles.
- `src/components/ProgressMission.jsx` - Gamified level progress display.
- `src/lib/saveResponse.js` - Persistence layer (Supabase + local fallback).

## Design Rules Implemented

- Strict color palette usage only:
  - `#6C5CE7`, `#00D1B2`, `#FFD166`, `#4DA8DA`, `#FFFFFF`, `#1A1A1A`
- Poppins for headings, Inter for body text
- Rounded UI, glassmorphism cards, playful motion
- Mobile-first responsive layout
