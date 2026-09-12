## Context

`src/App.jsx` currently implements the "blueprint" kanban board from `add-kanban-board` (5 columns, single-tag cards, inline composer, side-drawer card detail with subtasks, list view, WIP limit, `--k-*` CSS custom properties). `src/App.test.jsx` (from `add-kanban-board-tests`) covers that implementation's behavior. The new reference, `Kanban Board.dc.html` (from `Panel kanban moderno.zip`), is a Claude Design canvas source (not bundled/obfuscated like the first reference), making it straightforward to read directly. See `proposal.md` for what's changing and why.

## Goals / Non-Goals

**Goals:**
- Reproduce the new reference's visual language (rounded corners, soft shadows, Poppins/Inter, oklch light/dark tokens, hashed tag/avatar colors) and interaction model (modal create/edit, precise-position drag-and-drop) as idiomatic React/JSX, continuing the project's zero-extra-runtime-dependency approach.
- Rewrite `src/App.test.jsx` so it covers the new behavior (the old composer/drawer/WIP/list-view tests no longer apply).

**Non-Goals:**
- No persistence beyond the existing theme `localStorage` key (card/task data still resets on reload, as before).
- No undo for delete, no confirmation dialog on delete (the reference has none).
- Not fixing the reference's own edge case where drag-and-drop position is computed from the *search-filtered* card list rather than the unfiltered column array — reproduced faithfully since the design doc is the source of truth for behavior, and it isn't reachable from the spec's own scenarios (which don't combine search with drag-and-drop).

## Decisions

- **Keep the single-file `App.jsx` approach** established in `add-kanban-board`'s design.md — still one screen, one component tree.
- **Theme as a JS token object, not CSS custom properties**: the new reference computes a `theme` object (`pageBg`, `textPrimary`, `cardBg`, …) in `oklch(...)` strings per `darkMode` boolean and threads it through inline `style` props, rather than toggling a `[data-theme]` attribute with CSS variables (the previous approach). Adopt the same pattern here for fidelity to the reference and because the two themes' values are genuinely different formulas (not just palette swaps), not a fixed set of custom properties. CSS classes are still used for structural/layout rules (flex, gap, border-radius, etc.) that don't vary by theme; only color values flow through the `theme` object.
- **Hashed color palettes for tags and avatars**: port `hashStr`/`initials`/`TAG_PALETTE_LIGHT`/`TAG_PALETTE_DARK`/`AVATAR_PALETTE` verbatim — deterministic, no extra dependency, matches the reference exactly.
- **Drag-and-drop**: keep native HTML5 DnD (as decided in `add-kanban-board`), now tracking a `dragInfo` ref (`{ cardId, fromCol }`) instead of component state, since the reference doesn't need to re-render on drag-start for a highlight effect (the new design has no drop-target highlight, unlike the old one) — a plain `useRef` avoids unnecessary re-renders.
- **Modal is a single component reused for create and edit**, keyed by a `mode` (`'create' | 'edit'`) plus a `draftCard` object holding in-progress field edits, mirroring the reference's `modalCard`/`modalMode` state shape.
- **Sample data**: adopt the reference's seeded "Proyecto Aurora" cards/columns verbatim (Por hacer/En progreso/Revisión/Hecho with its 6 sample cards), replacing the old seeded data, since the new design ships its own sample content.
- **Fonts**: swap `index.html`'s Google Fonts `<link>` from Barlow/Barlow Condensed/IBM Plex Mono to Poppins (600/700/800) + Inter (400/500/600), matching the reference.

## Risks / Trade-offs

- [Replacing the composer/drawer/list-view/WIP features is a breaking UX change for anyone used to the previous board] → Explicitly called out as **BREAKING** in the proposal; the user supplied this redesign directly.
- [`oklch()` inline styles require a modern browser] → Already a constraint of the first design (used `color-mix`/`oklch` too); no new risk introduced.
- [Existing `src/App.test.jsx` tests will fail against the new component] → Rewritten in this change (see tasks) rather than kept alongside dead functionality.
