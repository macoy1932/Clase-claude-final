## Context

The app is currently the untouched Vite `react` scaffold (`src/App.jsx`, `src/App.css`, `src/index.css`) with no routing, state management, or components beyond the scaffold. There is a reference design, `Panel Kanban.html`, a bundled Claude Design canvas export (not a template Vite/React can import directly): it embeds a custom `DCLogic`-based component tree, its own attribute dialect (`sc-camel-on-click`, `sc-for`, `sc-if`, etc.), and a design-token CSS layer. See `proposal.md` - Why/What Changes for the feature scope; this document covers how that design is ported into a plain React/JS component.

## Goals / Non-Goals

**Goals:**
- Reproduce the reference design's layout, visual language (blueprint/wireframe corner brackets, Barlow/Barlow Condensed/IBM Plex Mono type, light/dark tokens), and interactions as idiomatic React/JSX in this Vite project.
- Keep the implementation dependency-free (no drag-and-drop or state-management library), matching the project's current zero-extra-dependency footprint.

**Non-Goals:**
- No backend/persistence beyond `localStorage` for the theme preference (card data resets on reload).
- No routing (single screen).
- No automated tests (no test framework configured in this project yet, per `CLAUDE.md`).

## Decisions

- **Single-component implementation**: Build the board as one `App.jsx` (state, derived view-model, and JSX) rather than splitting into many files. Rationale: this is the app's only screen and the reference design is itself one component; splitting now would be premature structure without a second consumer. If the app grows a second feature, extracting `KanbanBoard`, `Card`, etc. becomes worthwhile then.
- **State shape**: Mirror the design's `state.cols` (array of `{id, name, wip?, cards: [...]}`) using `useState`, plus `query`, `priority`, `view`, `theme`, `dragId`, `overCol`, `composerCol`, `composerText`, `openId`. Derived per-render values (filtered cards, styles, progress) are computed in render rather than stored, same as the source design's `renderVals()`.
- **Drag-and-drop**: Use native HTML5 DnD (`draggable`, `onDragStart/Over/Leave/Drop`) as the reference design does — avoids adding a DnD library for a single-list-reordering-free "move between columns" interaction.
- **Styling**: Port the design's CSS custom properties (`--k-*` tokens, light/dark via `[data-theme]`) and the small set of component styles (blueprint corners, tag/priority pills, progress bar) into `src/App.css`, replacing the scaffold's styles. Fonts (Barlow, Barlow Condensed, IBM Plex Mono) are loaded via a Google Fonts `<link>` in `index.html` rather than self-hosted `@font-face` files, since the reference design's embedded `woff2` files aren't available outside its bundle.
- **Sample data**: Reuse the reference design's seeded Spanish sample cards/columns verbatim as the initial state, since the user approved that design's content.
- **Card IDs for new cards**: Use an incrementing counter seeded past the sample IDs (matching the source design's `seq: 200` approach) to avoid collisions.

## Risks / Trade-offs

- [Single large component may get long (~5-8 well-organized sections: header, board, list, drawer, helpers)] → Acceptable for a single-screen app; revisit extraction if a second screen/route is added later.
- [Native HTML5 DnD has known quirks on touch devices] → Out of scope per the reference design (desktop-oriented mouse DnD); not required by the proposal.
- [No tests guard the drag/filter/composer logic] → Matches current project state (no test framework); acceptable per user's existing setup.
