## Context

The project is a Vite + React (JS, no TypeScript) app with a single feature component, `src/App.jsx` (see `openspec/specs/kanban-board/spec.md` for its behavior contract). No test framework is configured yet. `src/App.jsx` uses native HTML5 drag-and-drop (`draggable`, `dataTransfer`), `localStorage` for theme persistence, and plain CSS classes (no CSS Modules/data-testid convention yet).

## Goals / Non-Goals

**Goals:**
- Pick a test stack that runs fast in this Vite project with minimal config, and write one unit-test file that exercises every requirement/scenario in `kanban-board/spec.md`.
- Tests should query the DOM the way a user would (visible text, roles, labels) rather than reaching into component internals.

**Non-Goals:**
- No end-to-end/browser tests (Playwright) — those were already used ad hoc for manual verification; this change is unit-level only, run via `npm test`.
- No visual/screenshot regression testing.
- No CI workflow changes (no CI configured in this repo yet).

## Decisions

- **Vitest over Jest**: Vitest shares Vite's config/resolver (same `vite.config.js`, same esbuild transform for JSX), needs no separate Babel/ts-jest setup, and is the de facto default for Vite projects. Jest would require extra config (`transformIgnorePatterns`, ESM interop) for no benefit here.
- **React Testing Library (RTL) + `@testing-library/user-event`**: RTL encourages querying by role/text/label (matches how the spec's scenarios are phrased — "a user clicks...", "a user types..."), which keeps tests resilient to internal refactors (e.g., swapping the single-file `App.jsx` for split components later, per `add-kanban-board`'s design.md). `user-event` is used over raw `fireEvent` for realistic click/type/keyboard sequences (needed for the composer's Enter/Escape handling).
- **`jsdom` test environment**: needed for DOM APIs (`localStorage`, drag events). `happy-dom` is faster but has incomplete `DataTransfer`/drag-event support; `jsdom` is the safer default for DnD tests.
- **Native HTML5 DnD in tests**: `jsdom` does not implement real drag gestures, so tests fire the underlying events directly (`fireEvent.dragStart`/`dragOver`/`drop` with a manually constructed `dataTransfer` stub exposing `setData`/`getData`/an `effectAllowed`/`dropEffect` pair) on the source card and target column, mirroring what `App.jsx`'s handlers read. This avoids adding a browser-automation dependency for a single interaction.
- **No `data-testid` additions**: tests query by role/text already present in the UI (button labels, card titles, column headings) to keep tests as user-facing checks, consistent with the spec's scenario language. Falls back to a class-based query only where no accessible text distinguishes elements (e.g., selecting "the second column" for a drop target).
- **One test file (`src/App.test.jsx`)**: mirrors `add-kanban-board`'s single-file component decision — one component, one test file, organized into `describe` blocks per spec requirement.
- **`localStorage` isolation**: each test that touches theme persistence clears `localStorage` in `beforeEach`/`afterEach` so tests don't leak state into each other (Vitest runs a fresh module graph per file but jsdom's `localStorage` persists across tests within a file).

## Risks / Trade-offs

- [jsdom's DnD event support is partial] → Tests dispatch the specific events `App.jsx` listens for (dragstart/dragover/drop) with a minimal `dataTransfer` stub rather than relying on jsdom's native drag simulation, which is sufficient for this component's handlers.
- [Faking `dataTransfer` could drift from real browser behavior] → Mitigated by the existing manual Playwright verification already performed for `add-kanban-board`; unit tests complement, not replace, that check.
- [Google Fonts `<link>` tags in `index.html` are irrelevant to jsdom-rendered component tests] → No action needed; component tests render `App` directly, not `index.html`.
