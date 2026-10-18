# Using React Bits with this project

This redesign borrows React Bits' visual vocabulary, but the shipped components
are local, dependency-light implementations. Nothing below is required to run the
site — it is the upgrade path if you want the "official" versions.

Docs: <https://reactbits.dev/get-started/installation>
Catalogue: <https://reactbits.dev/llms.txt>

---

## 1. How React Bits ships

React Bits distributes **source code you own**, not an npm package. Every
component comes in four flavours:

| Language | Styling | CLI suffix | Example identifier |
|---|---|---|---|
| JavaScript | CSS file | `-JS-CSS` | `SplitText-JS-CSS` |
| JavaScript | Tailwind | `-JS-TW` | `SplitText-JS-TW` |
| TypeScript | CSS file | `-TS-CSS` | `SplitText-TS-CSS` |
| TypeScript | Tailwind | `-TS-TW` | `SplitText-TS-TW` |

This project is **JavaScript + Tailwind v4**, so use the `-JS-TW` variants.

## 2. Install commands

The current CLI (shadcn registry):

```bash
npx shadcn@latest add @react-bits/SplitText-JS-TW
```

or with the plain registry URL:

```bash
npx shadcn@latest add https://reactbits.dev/r/SplitText-JS-TW
```

jsrepo works too:

```bash
npx jsrepo@latest add https://reactbits.dev/r/SplitText-JS-TW
```

Notes:

- The first `shadcn add` run may ask to initialise a `components.json`. Accept
  the defaults (JavaScript, Tailwind) — the component files land in
  `src/components/` (or the alias you choose).
- If you don't want a CLI touching your config, use the **By hand** path on each
  component page: copy the code from the Code tab, paste it into
  `src/components/ui/`, and install the dependencies listed on that page.
- Component URLs are kebab-case (`/components/spotlight-card`), identifiers are
  PascalCase (`SpotlightCard`).

## 3. Dependencies vary per component

React Bits does not have one dependency set. Split Text uses GSAP, several
pointer/shader backgrounds use Three.js or OGL, and some components need nothing
beyond React. The component page lists its own dependencies — install those
before running.

The local equivalents in this project avoid all of that:

| Need | This project | Official option |
|---|---|---|
| Staggered characters | Framer Motion | `SplitText` (GSAP) |
| Rotating word | Framer Motion | `RotatingText` |
| Scroll reveal | Framer Motion `whileInView` | `AnimatedContent`, `ScrollReveal` |
| Spotlight card | CSS variables + pointermove | `SpotlightCard` |
| Border light | CSS `@property` + conic gradient | `BorderGlow`, `StarBorder`, `ElectricBorder` |
| 3D tilt | Framer Motion springs | `TiltedCard` |
| Particle field | 2D canvas | `Particles` (Three/OGL) |
| Dot grid | CSS radial-gradient | `DotGrid` |
| Gallery + modal | CSS columns + custom Lightbox | `Masonry`, `Carousel`, `CircularGallery` |

## 4. Recommended installs for this look

```bash
# Hero + headings
npx shadcn@latest add @react-bits/SplitText-JS-TW
npx shadcn@latest add @react-bits/RotatingText-JS-TW

# Scroll choreography
npx shadcn@latest add @react-bits/AnimatedContent-JS-TW
npx shadcn@latest add @react-bits/ScrollReveal-JS-TW

# Cards and borders
npx shadcn@latest add @react-bits/SpotlightCard-JS-TW
npx shadcn@latest add @react-bits/BorderGlow-JS-TW
npx shadcn@latest add @react-bits/TiltedCard-JS-TW

# Backgrounds
npx shadcn@latest add @react-bits/Particles-JS-TW
npx shadcn@latest add @react-bits/DotGrid-JS-TW
npx shadcn@latest add @react-bits/Aurora-JS-TW

# Gallery
npx shadcn@latest add @react-bits/Masonry-JS-TW
npx shadcn@latest add @react-bits/Carousel-JS-TW
```

Optional polish: `CountUp` for the stat row, `ShinyText` for the eyebrow,
`GradualBlur` behind the header, `Magnet` on the primary CTA, `ClickSpark` for
click feedback.

## 5. Dropping one in

Example: replacing the local spotlight card.

1. Install:
   ```bash
   npx shadcn@latest add @react-bits/SpotlightCard-JS-TW
   ```
2. It usually lands as `src/components/SpotlightCard.jsx`. Move it to
   `src/components/ui/SpotlightCard.jsx` (or update imports).
3. Check its props against the call sites:
   ```jsx
   // src/components/sections/FeatureGrid.jsx
   <SpotlightCard className="h-full">{content}</SpotlightCard>
   ```
   The official component expects a `spotlightColor` prop and uses its own
   wrapper div, so you may need to move `h-full` onto the inner content.
4. Delete the local file only after every import is switched.
5. Re-check the reduced-motion path: the local components use
   `useReducedMotion()`; the official ones may not, so wrap or gate them if you
   care about that.

Same routine for `SplitText`: our version takes `text`, `trigger`, `delay`,
`stagger`; the official one splits with GSAP and animates on mount/scroll, so
`text` and `className` transfer but the timing props do not.

## 6. Tailwind v4 compatibility

React Bits' `-TW` variants are written for Tailwind's utility syntax and work in
v4. Two things to watch:

- Their components sometimes assume a `components.json` alias
  (`@/components/...`). This project uses relative imports; adjust on paste.
- Custom colours differ. React Bits demos use neutral `zinc`/`white` values.
  Map them to this project's tokens (`text-ivory-100`, `bg-ink-900`,
  `text-bronze-300`) after installing so the component inherits the Nocturne
  palette.

## 7. Gradient headlines caveat

If you install `SplitText` and try to wrap it in a `text-bronze-gradient` span,
Chromium will drop the gradient: `background-clip: text` does not survive
transformed child spans. Either:

- apply the gradient per character (gradient restarts on each glyph), or
- animate the accent phrase as one element with an opacity fade — which is what
  this project does in `Hero.jsx`, `Information.jsx`, and `ListeningForm.jsx`.

## 8. License

React Bits is free and open source, but each component's licence lives with its
source. Check the LICENSE in the component/repo before shipping commercially.
