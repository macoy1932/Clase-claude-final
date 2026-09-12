## Why

The app is currently the unmodified Vite/React scaffold with no real feature. A design for a personal kanban board ("Mi tablero") was provided (`Panel Kanban.html`, a Claude Design canvas export) and the user wants it implemented as the app's actual UI, in Spanish, matching that design.

## What Changes

- Replace the scaffold content of `App.jsx` with a personal kanban board:
  - Header with board title/summary, search box, priority filter (Alta/Media/Baja), board/list view toggle, and light/dark theme toggle (persisted in `localStorage`).
  - Board view: columns (Ideas, Esta semana, En curso, En espera, Hecho) with drag-and-drop cards between columns, a WIP limit indicator on "En curso", an inline composer to add a card to a column, and an empty-state placeholder.
  - Cards: category tag, priority badge, title, subtask progress bar, assignee initials, due date, comment/file counters, and points.
  - List view: a single sortable-by-column-order table of all cards across columns.
  - Card detail panel (side drawer): full card metadata, a subtasks checklist (toggle done/undone), notes, an "advance to next column" action, and a delete action.
  - Search and priority filter apply to both board and list views.
- Introduce the visual design tokens/system from the reference design (Barlow/Barlow Condensed/IBM Plex Mono fonts via Google Fonts, blueprint/wireframe corner-bracket styling, light/dark CSS custom properties) as project CSS.
- Card and board state is in-memory component state seeded with sample data (no backend/API).

## Capabilities

### New Capabilities
- `kanban-board`: a single-page kanban board (board + list views, drag-and-drop, filtering, search, card detail panel, theming) that is the app's main UI.

### Modified Capabilities
(none — this is a greenfield feature for this project)

## Impact

- `src/App.jsx`: rewritten to render the kanban board instead of the Vite scaffold.
- `src/App.css`, `src/index.css`: replaced/extended with the design's tokens and component styles.
- `index.html`: add Google Fonts preconnect/stylesheet links for Barlow, Barlow Condensed, and IBM Plex Mono.
- No new runtime dependencies; drag-and-drop and state are implemented with native HTML5 DnD and React state.
