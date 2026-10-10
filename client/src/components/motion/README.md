# Motion components

These components are published on [21st.dev](https://21st.dev) and come from two MIT-licensed libraries. They were copied from the upstream repositories because 21st.dev's registry requires an API key, and only the import path was changed (`motion/react` → `framer-motion`, the package already used in this project).

| File | Library | 21st.dev |
|---|---|---|
| `text-effect`, `text-shimmer`, `text-roll`, `text-scramble`, `animated-group`, `animated-background`, `animated-number`, `infinite-slider`, `progressive-blur`, `border-trail`, `spotlight`, `in-view` | [Motion Primitives](https://github.com/ibelick/motion-primitives) — Julien Thibeaut | `@ibelick` |
| `highlighter`, `number-ticker` (+ `locale` prop), `magic-card`, `border-beam`, `animated-beam`, `scroll-based-velocity` | [Magic UI](https://github.com/magicuidesign/magicui) | `@magicui` |
| `text-effect-in-view` | This project — starts `TextEffect` when it enters the viewport | — |

To install more components straight from 21st.dev, create a key at https://21st.dev/mcp and run:

```bash
npx shadcn@latest add "https://21st.dev/r/<author>/<component>?api_key=$API_KEY_21ST"
```

## Smooth scroll

Home moves the page with a transform, so `window.scrollY` runs ahead of what is on screen. Scroll-linked components here use `@/motion/visualScroll` (`useViewportProgress`, `usePinnedTrack`) instead of `useScroll`, and pin scenes by translating them rather than with `position: sticky`, which cannot work inside a transformed scroller.
