## Why

The project has no test framework configured (per `CLAUDE.md`), so the kanban board's behavior (filtering, drag-and-drop, composer, card detail panel, theming) is only verified manually. Automated unit tests catch regressions as the board evolves and encode the `kanban-board` spec's scenarios as executable checks.

## What Changes

- Add Vitest + React Testing Library (+ `jsdom`, `@testing-library/jest-dom`, `@testing-library/user-event`) as dev dependencies, with a `test` script and minimal Vitest config.
- Add unit tests for `src/App.jsx` covering the `kanban-board` capability's requirements: board rendering, WIP limit indicator, card summary fields, drag-and-drop move between columns, composer add/cancel, empty-column placeholder, card detail panel (open/toggle subtask/advance/delete), search + priority filtering, list view, and theme toggle + persistence.
- No application behavior changes — this only adds test tooling and test files.

## Capabilities

### New Capabilities
(none)

### Modified Capabilities
(none — this is pure test tooling with no spec-level behavior change; `.openspec.yaml` sets `skip_specs: true`)

## Impact

- `package.json`: new devDependencies (`vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`) and a `test` script.
- `vite.config.js`: add a `test` block (environment `jsdom`, globals, setup file).
- New file `src/setupTests.js` (jest-dom matchers).
- New file `src/App.test.jsx` with the unit tests.
- `CLAUDE.md`'s "No hay framework de testing configurado todavía." note becomes stale and should be updated once this lands.
