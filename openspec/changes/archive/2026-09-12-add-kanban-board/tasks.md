## 1. Fonts and global styles

- [x] 1.1 Add Google Fonts `<link>` tags (preconnect + Barlow, Barlow Condensed, IBM Plex Mono) to `index.html` and verify the fonts load in the browser network tab
- [x] 1.2 Replace `src/index.css` and `src/App.css` with the design tokens (`--k-*` custom properties for light/dark) and base component styles (blueprint corners, tag/priority pills, progress track, buttons) and verify `npm run build` succeeds with no unused-scaffold leftovers

## 2. Board state and sample data

- [x] 2.1 In `src/App.jsx`, replace the scaffold body with the kanban board's initial state: `cols` (Ideas, Esta semana, En curso con wip 3, En espera, Hecho) seeded with the sample Spanish cards, plus `query`, `priority`, `view`, `theme`, `dragId`, `overCol`, `composerCol`, `composerText`, `openId`, `seq`
- [x] 2.2 Implement theme init/toggle reading/writing `localStorage` and setting a `data-theme` attribute on `<html>`, and verify reloading after switching to dark keeps dark theme (Scenario: Theme persists after reload)

## 3. Header controls

- [x] 3.1 Implement the header: title/summary (`N tareas · N hechas · N abiertas`), search input, priority filter buttons (Alta/Media/Baja, click-to-toggle), board/list view toggle, theme toggle button and verify each control updates state and re-renders
- [x] 3.2 Implement search + priority filtering logic shared by board and list views and verify Scenario: Search narrows visible cards and Scenario: Priority filter toggles

## 4. Board view

- [x] 4.1 Render columns with header (name, count, WIP limit badge when over limit), and verify Scenario: Board renders seeded columns and cards and Scenario: Column reports a WIP limit
- [x] 4.2 Render cards with tag, priority badge, title, progress bar + done/total label, avatar initials, due date, comment/file counters, points, and verify Scenario: Card shows progress
- [x] 4.3 Implement drag-and-drop (`draggable`, dragstart/dragover/dragleave/drop handlers) moving a card between columns, including drop-target highlight, and verify Scenario: Card moved to another column and Scenario: Column highlights while dragging over it
- [x] 4.4 Implement the per-column inline composer (open/type/confirm via button or Enter, cancel via button or Escape) and verify Scenario: New card added via composer and Scenario: Composer cancelled
- [x] 4.5 Implement the empty-column placeholder and verify Scenario: Empty column placeholder

## 5. List view

- [x] 5.1 Implement the list view table (Tarea, Estado, Etiqueta, Prioridad, Fecha, Avance) driven by the same filtered cards and verify Scenario: Switching to list view

## 6. Card detail panel

- [x] 6.1 Implement opening a card (from board or list) into a side detail panel showing status, priority, assignee, due date, estimate, subtasks, and notes, and verify Scenario: Opening a card shows its details
- [x] 6.2 Implement subtask toggling and progress recompute, and verify Scenario: Toggling a subtask
- [x] 6.3 Implement the advance action (move to next column or close if last) with correct button label, and verify Scenario: Advancing a card
- [x] 6.4 Implement the delete action, and verify Scenario: Deleting a card

## 7. Manual verification

- [x] 7.1 Run `npm run dev`, exercise search, priority filters, both views, drag-and-drop, composer, card panel (toggle/advance/delete), and theme toggle + reload in the browser; confirm all UI text is in Spanish
- [x] 7.2 Run `npm run lint` and `npm run build` and verify both succeed
