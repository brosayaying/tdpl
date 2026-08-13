# The Don't Panic Lab — Landing Site

A playful-but-professional multi-page site for a kids' coding academy, styled like a green-on-black terminal console.

## Pages

- **/** — Landing page
  - Top bar (on every page): logo/wordmark with blinking cursor, links to Schedule, About Us, and Student Portal (dummy `#` link, opens in new tab styling as an outbound button).
  - Hero: terminal-window frame with a typed-looking prompt line, headline, subhead, and two CTAs (Register interest, See the schedule).
  - What we teach: four cards — Scratch, Python, AI, Robotics — each with age range and a one-line outcome.
  - **Why coding still matters** (motivation section): the calculator/mathematics analogy written out as the section's core argument, laid out as a two-column "before/after" comparison (Calculators → Mathematics, AI → Coding) plus the closing point about thinking clearly, directing intelligent tools, and building your own ideas.
  - How it works: 3 short steps (Try a class → Pick a track → Build and ship projects).
  - Student projects / proof strip: playful project cards.
  - Register interest form (see below).
  - Footer with contact line and nav repeat.
- **/schedule** — Placeholder term schedule: table/cards of courses (Scratch Explorers, Python Foundations, AI Builders, Robotics Club) with day, time, age range, duration, and format; note that details are placeholders. CTA to the interest form.
- **/about** — Story, teaching philosophy (short, echoing the motivation theme), instructor bios (placeholder), safety/small-class notes, CTA.

## Register interest form

Fields: parent name, email, child age, course interest (select: Scratch / Python / AI / Robotics / Not sure), plus an optional message.

Submission goes to an **external form service** (Formspree by default). Validation with Zod client-side: trimmed, required name, valid email, age 6–18, course from the allowed list, message max 1000 chars. Success and error states shown inline as terminal-style output lines, with a spinner-ish "sending..." state.

I'll wire it to a single endpoint constant in one file. I need your Formspree form endpoint (looks like `https://formspree.io/f/xxxxxxx`) — until you paste it, the form will validate and show a friendly "form endpoint not configured yet" message instead of posting, so nothing silently disappears. Getform/Basin also work; just say which and give the URL.

## Design

- Terminal aesthetic: near-black background, phosphor-green primary, dim-green muted text, amber accent for highlights, subtle scanline/grid texture, thin green borders, monospace for UI chrome and code-ish bits.
- Elegant fonts: a refined serif or geometric display face for headings paired with a crisp mono (e.g. JetBrains Mono) for terminal chrome and body accents — loaded via `<link>` in the root route.
- Playful touches: blinking cursor, hover glow on cards, typed-prompt hero line, ASCII-flavoured dividers. Kept restrained so it still reads professional to parents.
- Generated images: hero visual (kids at a lit-up workbench with robots, dark/green graded) and 2–3 supporting images for tracks and about page.

## Technical notes

- TanStack Start file routes: `src/routes/index.tsx` (rewritten from the placeholder), `src/routes/schedule.tsx`, `src/routes/about.tsx`. Shared header/footer components rendered in `__root.tsx` around `<Outlet />`.
- Design tokens (colors, gradients, glow shadows, fonts) defined in `src/styles.css` under `:root` + `@theme inline` — no hardcoded color utilities in components.
- Each route gets its own `head()` with unique title, description, og:title, og:description.
- Form posts client-side via `fetch` to the external endpoint; no backend, no database, so Lovable Cloud is not enabled.
- Reusable components: `TerminalWindow`, `SectionHeading`, `TrackCard`, `InterestForm`.
