## 1. Fonts and theme foundation

- [x] 1.1 Swap `index.html`'s Google Fonts `<link>` to Poppins (600/700/800) + Inter (400/500/600) and verify the fonts load in the browser network tab
- [x] 1.2 In `src/App.jsx`, add the `hashStr`/`initials` helpers and the `TAG_PALETTE_LIGHT`/`TAG_PALETTE_DARK`/`AVATAR_PALETTE`/`PRIORITY_META` constants, and a `buildTheme(darkMode)` function returning the oklch token object, and verify `npm run build` succeeds
- [x] 1.3 Replace the seeded state with the "Proyecto Aurora" columns/cards (Por hacer, En progreso, Revisión, Hecho) and drop the old WIP-limit constant

## 2. Board rendering with the new visual system

- [x] 2.1 Rewrite the header (brand mark, search input, dark-mode toggle, "+ Nueva tarea") using the new theme tokens, and verify Scenario: Board renders seeded columns and cards
- [x] 2.2 Rewrite columns (rounded panel, accent dot, name, count badge, "+ Añadir tarea") and the empty-state placeholder, dropping the WIP badge
- [x] 2.3 Rewrite cards: tag chips (hashed colors), title, priority pill, assignee avatar (hashed color) + initials, due date — dropping the progress bar, comments/files counters, and thumbnail, and verify Scenario: Card shows its tags

## 3. Drag-and-drop with precise positioning

- [x] 3.1 Track `dragInfo` (cardId, source column) in a ref set on card drag-start
- [x] 3.2 Implement `moveCard(toColId, toIndex)` (remove from source, adjust index when reordering within the same column, clamp, insert) and wire per-card `onDragOver`/`onDrop` (drop position = that card's index) and per-column `onDragOver`/`onDrop` (drop at end of column), and verify Scenario: Card moved to a specific position in another column and Scenario: Card reordered within its own column

## 4. Task create/edit modal

- [x] 4.1 Implement modal state (`modalOpen`, `modalMode`, `draftCard`, target column) and open handlers from the header's "+ Nueva tarea", each column's "+ Añadir tarea" (create mode), and clicking a card (edit mode)
- [x] 4.2 Implement the modal form fields (title, description, tags as comma-separated text, column select, priority select, assignee, due date) bound to `draftCard`, and verify Scenario: Editing a task
- [x] 4.3 Implement save (parse tags, default assignee/due when blank, build the card, insert/replace in the target column) and verify Scenario: Creating a task and Scenario: Discarding an empty new task
- [x] 4.4 Implement delete (edit mode only) and verify Scenario: Deleting a task from the modal
- [x] 4.5 Implement cancel and overlay-click close without applying field changes, and verify Scenario: Closing without saving

## 5. Search filtering

- [x] 5.1 Implement the search box filtering cards by title, any tag, or assignee name (case-insensitive) across all columns, and verify Scenario: Search narrows visible cards

## 6. Cleanup of removed features

- [x] 6.1 Remove the inline per-column composer, the card-detail side drawer, the list/table view and its toggle button, and the priority filter buttons from `src/App.jsx` and `src/App.css`
- [x] 6.2 Rewrite `src/App.test.jsx` to cover the requirements in this change's delta spec (board/columns, card tags, drag-and-drop position/reorder, search, modal create/edit/delete/cancel) and remove tests for removed features; keep the existing theme-persistence test adapted to the new toggle markup

## 7. Verification

- [x] 7.1 Run `npm test` and verify all tests pass
- [x] 7.2 Run `npm run lint` and `npm run build` and verify both succeed
- [x] 7.3 Run `npm run dev`, exercise search, drag-and-drop (both across and within a column), create/edit/delete via the modal, and theme toggle + reload, in the browser; confirm the visual style matches the new reference and all UI text is in Spanish
