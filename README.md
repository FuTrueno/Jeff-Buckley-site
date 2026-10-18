# Jeff Buckley — Grace & Legacy

An immersive, editorial redesign of the three-page Jeff Buckley site, built with
**React 19 + Vite + Tailwind CSS v4 + Framer Motion**. Dark "Nocturne" palette,
bronze light, Cormorant Garamond display type, cursor-aware cards, a canvas
particle field, a lightbox gallery, and a working custom audio player.

![Home page hero](docs/screenshots/hero.jpg)

---

## Quick start

Requires **Node 20.19+** (Vite 8).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs to dist/
npm run preview    # serve the production build
```

The site uses **hash routing** (`#/information`), so the built `dist/` folder can
be dropped on GitHub Pages, Netlify, or any static host without rewrite rules.

---

## What changed

| | Before | After |
|---|---|---|
| Theme | Flat dark greys, inline styles | Obsidian surfaces, bronze gradients, glass panels, film grain |
| Type | Two families, one weight | Cormorant Garamond display / Inter body / JetBrains Mono labels |
| Hero | Static text + image | Video-capable background, split-text headline, particles, dot grid, tilting album card |
| Cards | Plain boxes | Spotlight-tracking hover glow, border beam, bento layout |
| Media | Bare `<audio>` / `<video>` | Custom player with waveform seeking, video lightbox, masonry gallery |
| Motion | None | Scroll reveals, staggered text, parallax, marquee, page-level micro-interactions |
| Form | Unstyled native controls | Custom radios/checkboxes, inline validation, animated success summary |

Every piece of copy and every assignment requirement from the original site is
still present — see [Assignment coverage](#assignment-coverage).

---

## Folder structure

```
jeff-buckley-site/
├─ index.html                  # fonts, meta, #root
├─ vite.config.js              # base: "./" + Tailwind v4 plugin
├─ package.json
├─ public/
│  ├─ favicon.svg
│  ├─ images/                  # your images live here (see below)
│  ├─ audio/                   # drop your MP3s here
│  └─ video/                   # drop your MP4s here
├─ docs/
│  ├─ react-bits.md            # how to install/replace React Bits components
│  └─ screenshots/
├─ tools/
│  └─ generate_placeholders.py # regenerates the abstract placeholder art
└─ src/
   ├─ main.jsx                 # HashRouter + StrictMode
   ├─ App.jsx                  # routes + listening context
   ├─ index.css                # design tokens, utilities, effects
   ├─ data/
   │  ├─ site.js               # all copy: nav, features, songs, quote
   │  └─ media.js              # ← the only file you edit to swap media
   ├─ lib/utils.js             # cn(), time formatting, waveform seeding
   ├─ context/
   │  └─ ListeningProvider.jsx # lets any "play" button drive the player
   ├─ hooks/
   │  ├─ usePageMeta.js        # per-route <title> / description
   │  └─ useSectionNav.js      # in-page + cross-page section scrolling
   ├─ components/
   │  ├─ layout/
   │  │  ├─ Layout.jsx         # shell, scroll restore, grain overlay
   │  │  ├─ Navbar.jsx         # glass nav, active pill, mobile menu
   │  │  ├─ ScrollProgress.jsx # top reading-progress bar
   │  │  └─ Footer.jsx         # closing statement, link columns, wordmark
   │  ├─ sections/
   │  │  ├─ Hero.jsx           # video/poster background, split text, album card
   │  │  ├─ SongMarquee.jsx    # running track-title ribbon
   │  │  ├─ Story.jsx          # album sleeve + parallax still + narrative
   │  │  ├─ FeatureGrid.jsx    # bento of spotlight cards + border beam
   │  │  ├─ MediaShowcase.jsx  # video cards + masonry gallery + lightbox
   │  │  ├─ ListeningRoom.jsx  # custom audio player + tracklist
   │  │  ├─ QuoteBand.jsx      # inverted ivory band with lyric
   │  │  ├─ SongTable.jsx      # the assignment table, restyled + playable
   │  │  └─ CTA.jsx            # registration panel + spinning vinyl
   │  └─ ui/
   │     ├─ SplitText.jsx      # per-character reveal
   │     ├─ RotatingText.jsx   # 3D flip word cycler
   │     ├─ Reveal.jsx         # scroll-triggered fade/rise
   │     ├─ SpotlightCard.jsx  # cursor-tracked radial glow
   │     ├─ BorderBeam.jsx     # travelling light on the card border
   │     ├─ TiltCard.jsx       # 3D pointer tilt + glare
   │     ├─ Particles.jsx      # canvas dust + constellation links
   │     ├─ DotGrid.jsx        # dot field with cursor spotlight
   │     ├─ Marquee.jsx        # seamless ticker
   │     ├─ Lightbox.jsx       # image/video modal, keyboard + focus handled
   │     ├─ Button.jsx         # primary/ghost/outline/dark variants
   │     └─ SectionHeading.jsx # eyebrow + display title + action
   └─ pages/
      ├─ Home.jsx
      ├─ Information.jsx       # article, notes sidebar, table, player, gallery
      └─ ListeningForm.jsx     # validated form + success state
```

---

## Where your media goes

All paths are centralised in **`src/data/media.js`**. Drop files into `public/`
using these names (or edit the paths once), and they appear everywhere.

| Asset | Path | Used by |
|---|---|---|
| Album sleeve | `public/images/grace-cover.jpg` | Hero card, story, player thumbnail, gallery |
| Video still | `public/images/lover-still.jpg` | Hero poster, featured video card, gallery |
| Hero loop | `public/video/hero-loop.mp4` | Hero background (poster remains if missing) |
| Featured video | `public/video/lover-official.mp4` | Video card → lightbox |
| Second video | `public/video/grace-official.mp4` | Grace official video card → lightbox |
| Tracks | `public/audio/*.mp3` | Listening room (5 files) |
| Gallery art | `public/images/placeholder-0*.jpg` | Masonry gallery — replace one-for-one |

Notes:

- The archive you sent did not include the `audio/` or `video/` files, so those
  are placeholder paths. The player detects a missing file and shows
  *“Add Grace.mp3 to public/audio”* instead of breaking.
- `lover-still.jpg` was cropped from your AVIF still to remove the player's white
  corner artifacts and the Vevo watermark strip. Swap it for a cleaner still if
  you have one.
- Video poster fallbacks mean the page still looks finished before any MP4 exists.
- Four gallery images are procedural art generated by
  `tools/generate_placeholders.py` — safe to delete once you add your own.

---

## Design system

Everything is CSS-first via Tailwind v4 `@theme` in `src/index.css` — there is no
`tailwind.config.js`.

**Colour**

| Token | Hex | Role |
|---|---|---|
| `ink-950 … ink-600` | `#060608 → #23232c` | Surfaces, borders, depth |
| `ivory-50 / 100` | `#fbf9f4 / #f2ede2` | Headlines, inverted quote band |
| `mist-200 … 500` | `#d8d3c8 → #6b665e` | Body copy, secondary labels |
| `bronze-200 … 600` | `#f6e9cd → #a5874e` | Accent, gradients, focus |
| `steel-300 … 500` | `#b8c3d2 → #65748b` | Secondary glow in gradients |

**Type** — `font-display` Cormorant Garamond, `font-sans` Inter, `font-mono`
JetBrains Mono. Headline sizes use `clamp()` so they scale without breakpoints.

**Custom utilities** — `.glass`, `.grain`, `.text-bronze-gradient`, `.dot-grid`,
`.border-beam`, `.mask-fade-x`, `.option-mark` (form controls), `.seek` (range
input).

**Motion** — Framer Motion springs/easing `[0.22, 1, 0.36, 1]`. Every component
checks `useReducedMotion()`, and `index.css` neutralises CSS animation for
`prefers-reduced-motion`.

---

## React Bits

The visual language follows React Bits patterns, but **every effect is
implemented locally with Framer Motion + CSS** — no extra runtime dependencies,
no GSAP, no Three.js. That keeps the bundle small and the code yours to edit.

If you want the official library components instead, see
**[docs/react-bits.md](docs/react-bits.md)** for exact CLI commands, variants,
and how to swap them in. Short version:

```bash
npx shadcn@latest add @react-bits/SpotlightCard-JS-TW
```

Suffix rule: `-<JS|TS>-<CSS|TW>`. This project is JavaScript + Tailwind.

| Pattern | Local file | React Bits component |
|---|---|---|
| Split-text headline | `ui/SplitText.jsx` | `SplitText`, `BlurText` |
| Rotating words | `ui/RotatingText.jsx` | `RotatingText` |
| Scroll reveal | `ui/Reveal.jsx` | `AnimatedContent`, `ScrollReveal` |
| Cursor spotlight card | `ui/SpotlightCard.jsx` | `SpotlightCard`, `BorderGlow` |
| Travelling border light | `ui/BorderBeam.jsx` | `StarBorder`, `BorderGlow` (Border Beam itself is a Magic UI component) |
| 3D tilt | `ui/TiltCard.jsx` | `TiltedCard`, `ProfileCard` |
| Hero particles | `ui/Particles.jsx` | `Particles`, `DotField` |
| Dot field | `ui/DotGrid.jsx` | `DotGrid` |
| Seamless ticker | `ui/Marquee.jsx` | `LogoLoop`, `ScrollVelocity` |
| Gallery modal | `ui/Lightbox.jsx` | `Masonry`, `Carousel` |

One implementation note worth keeping: don't wrap animated per-character spans in
a `background-clip: text` parent — Chromium drops the gradient when the children
are transformed. The bronze accent phrases are therefore animated as a single
opacity fade (`Hero.jsx`, `Information.jsx`, `ListeningForm.jsx`).

---

## Assignment coverage

The original brief (semantic HTML, a 3+ column / 4+ row table, audio, video, and
all form control types) is fully preserved in the React build:

- **Semantic HTML** — `header`, `nav`, `main`, `section`, `article`, `aside`,
  `figure`, `figcaption`, `fieldset`, `legend`, `table`, `footer`.
- **Table** — `SongTable.jsx`: 5 rows × 4 content columns (song, album, focus,
  listen) plus an index column.
- **Audio** — `ListeningRoom.jsx`, five tracks with a custom transport.
- **Video** — `MediaShowcase.jsx` + `Lightbox.jsx`, poster fallbacks.
- **Form** — `ListeningForm.jsx`: text, email, password, number, date, radio,
  checkbox group, select, textarea, submit and reset, plus client-side
  validation and a success summary.

The original three HTML/CSS files are kept untouched in the separate
`legacy-site/` folder (next to this project, outside the repo) for submission or
comparison. Because this redesign is React + Tailwind, the "three CSS methods"
requirement (inline / embedded / external) no longer applies to the new build —
the legacy folder is the artefact that demonstrates it.

---

## Accessibility & performance

- Keyboard: lightbox supports `Esc` / `←` / `→`, focus moves to the close button,
  body scroll locks; the mobile menu closes on `Esc`; all controls are real
  buttons with labels.
- Screen readers: split text keeps an `aria-label`; decorative layers are
  `aria-hidden`; gallery buttons announce the image caption.
- Contrast: body copy is `mist-300` on near-black (≥ 7:1), labels are the smallest
  intentional pair (mono 8–10px) and never carry essential information alone.
- Performance: images are lazy-loaded and sized, the particle canvas caps DPR at
  2 and pauses off-screen/hidden, and animation is disabled for reduced motion.
  Build output is ~14 kB CSS and ~157 kB JS gzipped.

---

## Deploying to GitHub Pages

The repo ships `.github/workflows/deploy.yml`, which builds the site and
publishes `dist/` on every push to `main`.

1. Push the project to a GitHub repository.
2. Open **Settings → Pages → Build and deployment**, and set **Source** to
   **GitHub Actions** (not "Deploy from a branch" — that would serve the Vite
   source `index.html` and show a blank page).
3. Push to `main`, or run the workflow manually from the **Actions** tab.

The site is then at `https://<username>.github.io/<repo>/`.

Why this works without path fixes:

- `base: "./"` in `vite.config.js` makes every asset URL relative.
- `HashRouter` means deep links look like `#/information`, so no server
  rewrites are needed.
- The workflow writes `dist/.nojekyll` so GitHub does not strip `_`-prefixed
  files.

Manual alternative: run `npm run build` and publish the contents of `dist/` to a
`gh-pages` branch, then point Pages at that branch.

For a different host that serves `index.html` for every path, swap
`HashRouter` for `BrowserRouter` in `src/main.jsx`.

---

## Credits

Design and build: React 19, Vite 8, Tailwind CSS 4, Framer Motion, Lucide.
Typefaces: Cormorant Garamond, Inter, JetBrains Mono (Google Fonts).
Educational project — not affiliated with the Jeff Buckley estate.
